import React, { useState, useEffect } from "react";
import NiceModal, { useModal } from "@ebay/nice-modal-react";
import { FileUploader } from "react-drag-drop-files";
import { toast } from "react-hot-toast";
import Image from "next/image";

import { useConversation } from "../../../context/conversation.context";
import { Button } from "../../global/button/Button";
import BasicModal from "../../global/basicmodal/BasicModal";
import { useUploadFiles } from "../../../hooks/useUploadFiles";
import { ChatGPTDisplay } from "../../../constants/chat-models-data";
import {
  FileNameIcon,
  UploadFileIcon,
  UploadSvg,
  DeleteIcon,
} from "../../../svgs/svg";
import { 
  analyzePendingFilesForDuplicates,
  showFileUploadSuccessMessage,
  replaceDuplicateFiles,
  SUPPORTED_FILE_TYPES,
  validateSameFileType,
  getFileTypeTabIndex,
  FileTypeTab,
  MAX_UPLOAD_FILES
} from "../../../utils/fileUploadUtils";
import CommonTooltip from '../../ComonTooltip';

type PendingFilesByTab = Record<FileTypeTab, File[]>;

const createEmptyPendingFiles = (): PendingFilesByTab => ({
  [FileTypeTab.IMAGE]: [],
  [FileTypeTab.PDF]: [],
  [FileTypeTab.AUDIO]: [],
});

const UploadFilesModal = NiceModal.create((): JSX.Element => {
  const [selectedTab, setSelectedTab] = useState<FileTypeTab>(FileTypeTab.IMAGE);
  const [currentModel, setCurrentModel] = useState<any>({});
  const [pendingFilesByTab, setPendingFilesByTab] = useState<PendingFilesByTab>(createEmptyPendingFiles());
  const modal = useModal();
  const { isFileUploading, selected, files } = useConversation();
  const { handleUploadChange } = useUploadFiles();

  const getFileTypes = () => {
    if (selectedTab === FileTypeTab.IMAGE) {
      return ["png", "jpg", "jpeg"];
    }
    if (selectedTab === FileTypeTab.PDF) {
      return ["pdf"];
    }
    if (selectedTab === FileTypeTab.AUDIO) {
      return ["mp3", "wav"];
    }
    return SUPPORTED_FILE_TYPES;
  };

  const handleTypeError = () => {
    const allowed = getFileTypes().join(", ");
    toast.error(`Unsupported file type. Allowed: ${allowed}`);
  };

  const handleChange = (fileList: FileList) => {
    const newFiles = Array.from(fileList);
    
    // Validate file types using utility
    if (!validateSameFileType(newFiles)) {
      return;
    }

    // Get appropriate tab index using utility
    const tabIndex = getFileTypeTabIndex(newFiles[0]);

    if (tabIndex !== selectedTab) {
      setSelectedTab(tabIndex);
    }
    const existing = pendingFilesByTab[tabIndex] ?? [];
    
    // Analyze files for duplicates in pending files
    const { duplicateFiles, actuallyNewFiles } = analyzePendingFilesForDuplicates(newFiles, existing);

    // Check upload limits
    const totalCount = existing.length + actuallyNewFiles.length; // Don't count replacements against the limit
    if (totalCount > MAX_UPLOAD_FILES) {
      const available = MAX_UPLOAD_FILES - existing.length + duplicateFiles.length;
      if (available <= 0) {
        return toast.error(`You can only upload up 3 files`);
      }
      toast.error(`You can only upload up to ${available} more file(s). ${duplicateFiles.length} duplicate(s) will be replaced.`);
      return;
    }

    // Update pending files - replace duplicates and add new files
    setPendingFilesByTab((prev) => {
      const currentFiles = [...(prev[tabIndex] ?? [])];
      const updatedWithReplacements = replaceDuplicateFiles(currentFiles, duplicateFiles);
      return { ...prev, [tabIndex]: [...updatedWithReplacements, ...actuallyNewFiles] };
    });

    // Show success message
    showFileUploadSuccessMessage(duplicateFiles.length, actuallyNewFiles.length, true);
  };

  const handleTabChange = async (tabIndex: FileTypeTab) => {
    setSelectedTab(tabIndex);
  };

  const handleClose = () => {
    const currentPending = pendingFilesByTab[selectedTab] ?? [];
    const newFilesToUpload = currentPending.filter(file => !('isUploaded' in file && file.isUploaded));
    
    if (newFilesToUpload.length > 0) {
      handleUploadChange(newFilesToUpload, selectedTab);
    }
    setPendingFilesByTab(createEmptyPendingFiles());
    modal.hide();
  };

  const handleDiscard = () => {
    setPendingFilesByTab(createEmptyPendingFiles());
    modal.hide();
  };

  // Reset modal state when it's hidden
  useEffect(() => {
    if (!modal.visible) {
      setPendingFilesByTab(createEmptyPendingFiles());
    }
  }, [modal.visible]);

  const handleRemovePending = (index: number) => {
    const currentPending = pendingFilesByTab[selectedTab] ?? [];
    const fileToRemove = currentPending[index];
    
    // If it's an already uploaded file, we should handle it differently
    if ((fileToRemove as any)?.isUploaded) {
      // For now, just remove from the display - the actual deletion would need to be handled
      // by the parent component or through a separate delete API call
      console.log('Removing uploaded file:', fileToRemove.name);
    }
    
    setPendingFilesByTab((prev) => ({ ...prev, [selectedTab]: currentPending.filter((_, i) => i !== index) }));
  };

  // Helper function to convert uploaded files to File objects for display
  const convertUploadedFilesToFiles = React.useCallback((uploadedFiles: any[]): PendingFilesByTab => {
    const result = createEmptyPendingFiles();

    return uploadedFiles
      .filter(uploadedFile => uploadedFile.url && uploadedFile.name)
      .reduce((acc, uploadedFile) => {
        const extension = uploadedFile.name.split('.').pop()?.toLowerCase();
        let tab: FileTypeTab | undefined;

        if (['png', 'jpg', 'jpeg'].includes(extension || '')) {
          tab = FileTypeTab.IMAGE;
        } else if (extension === 'pdf') {
          tab = FileTypeTab.PDF;
        } else if (['mp3', 'wav'].includes(extension || '')) {
          tab = FileTypeTab.AUDIO;
        }

        if (tab !== undefined) {
          const fileObj = {
            name: uploadedFile.name,
            size: uploadedFile.size || 0,
            type: uploadedFile.type || getMimeType(extension || ''),
            isUploaded: true,
            url: uploadedFile.url,
            lastModified: Date.now(),
            webkitRelativePath: '',
            arrayBuffer: () => Promise.resolve(new ArrayBuffer(0)),
            slice: () => new Blob(),
            stream: () => new ReadableStream(),
            text: () => Promise.resolve('')
          } as unknown as File;

          acc[tab].push(fileObj);
        }

        return acc;
      }, result);
  }, []);
  
  // Helper function to get MIME type from extension
  const getMimeType = (extension: string): string => {
    const mimeTypes: Record<string, string> = {
      'png': 'image/png',
      'jpg': 'image/jpeg',
      'jpeg': 'image/jpeg',
      'pdf': 'application/pdf',
      'mp3': 'audio/mp3',
      'wav': 'audio/wav'
    };
    return mimeTypes[extension] || '';
  };

  // Initialize modal with existing files when it opens
  useEffect(() => {
    if (modal.visible && files && files.length > 0) {
      const convertedFiles = convertUploadedFilesToFiles(files);
      setPendingFilesByTab(convertedFiles);
      
      // Set the tab to the first available file type
      const tabsWithFiles = Object.entries(convertedFiles).find(([_, tabFiles]) => (tabFiles as File[]).length > 0);
      if (tabsWithFiles) {
        setSelectedTab(tabsWithFiles[0] as unknown as FileTypeTab);
      }
    }
  }, [modal.visible, files, convertUploadedFilesToFiles]);

  useEffect(() => {
    if (selected?.name) {
      setCurrentModel(selected);
    } else {
      setCurrentModel(ChatGPTDisplay);
    }
  }, [selected]);

  useEffect(() => {
    if (currentModel?.supports?.includes("Image")) {
      setSelectedTab(FileTypeTab.IMAGE);
    } else if (currentModel?.supports?.includes("PDF")) {
      setSelectedTab(FileTypeTab.PDF);
    } else if (currentModel?.supports?.includes("Audio")) {
      setSelectedTab(FileTypeTab.AUDIO);
    }

    return () => {
      setSelectedTab(FileTypeTab.IMAGE);
    };
  }, [currentModel]);

  const handleHideModal = () => {
    if (!isFileUploading) {
      modal.hide();
    }
  };

  return (
    <BasicModal
      show={modal.visible}
      hide={handleHideModal}
      crosstyle="!top-3.5"
    >
      <div className="w-[90vw] min-w-[310px] max-w-[1133px] rounded-2xl bg-whiteSmoke !p-0 dark:bg-blackRussian2 mx-auto p-4 sm:p-6">
        <div className="rounded-t-2xl bg-manatee p-3 px-4 text-start dark:bg-blackRussian2 dark:text-white">
          Upload Files
        </div>
        <div className="flex grow flex-col lg:!h-[485px] lg:flex-row">
          <div className="flex w-full flex-row border-b border-manatee p-4 dark:border-tuna space-x-2 lg:w-[150px] lg:shrink-0 lg:flex-col lg:border-r lg:border-b-0 lg:p-6 lg:space-x-0 lg:space-y-4">
            {currentModel?.supports?.includes("Image") && (
              <button
                className={`relative overflow-hidden rounded-md flex-1 lg:mb-2 lg:flex-none ${
                  selectedTab === FileTypeTab.IMAGE
                    ? "bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 p-[1px]"
                    : "border dark:border-tuna border-blackRussian3"
                }`}
                onClick={() => handleTabChange(FileTypeTab.IMAGE)}
                disabled={isFileUploading}
              >
                <span
                  className={`flex flex-col gap-1 items-center justify-center rounded-md py-3 px-2 w-full ${
                    selectedTab === FileTypeTab.IMAGE
                      ? "dark:bg-blackRussian3 bg-white dark:text-white"
                      : "bg-none dark:text-white"
                  }`}
                >
                  <Image src={"assets/images/image-color.svg"} alt="image" width={20} height={20} />
                  <span className="text-sm">Image</span>
                </span>
              </button>
            )}
            {currentModel?.supports?.includes("PDF") && (
            <button
            className={`relative overflow-hidden rounded-md flex-1 lg:mb-2 lg:flex-none ${
              selectedTab === FileTypeTab.PDF
                ? "bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 p-[1px]"
                : "border dark:border-tuna border-blackRussian3"
            }`}
            onClick={() => handleTabChange(FileTypeTab.PDF)}
            disabled={isFileUploading}
          >
            <span
                  className={`flex flex-col gap-1 items-center justify-center rounded-md py-3 px-2 w-full ${
                    selectedTab === FileTypeTab.PDF
                      ? "dark:bg-blackRussian3 bg-white dark:text-white"
                      : "bg-none dark:text-white"
                  }`}
                >
                  <Image src={"assets/images/pdf-color.svg"} alt="image" width={20} height={20} />
                  <span className="text-sm">PDF</span>
                </span>
          </button>

            )}
            {currentModel?.supports?.includes("Audio") && (
            <button
            className={`relative overflow-hidden rounded-md flex-1 lg:mb-2 lg:flex-none ${
              selectedTab === FileTypeTab.AUDIO
                ? "bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 p-[1px]"
                : "border dark:border-tuna border-blackRussian3"
            }`}
            onClick={() => handleTabChange(FileTypeTab.AUDIO)}
            disabled={isFileUploading}
          >
            <span
                  className={`flex flex-col gap-1 items-center justify-center rounded-md py-3 px-2 w-full ${
                    selectedTab === FileTypeTab.AUDIO
                      ? "dark:bg-blackRussian3 bg-white dark:text-white"
                      : "bg-none dark:text-white"
                  }`}
                >
                  <Image src={"assets/images/audio-color.svg"} alt="image" width={20} height={20} />
                  <span className="text-sm">Audio</span>
                </span>
          </button>
            )}
          </div>
          {["Image", "Audio", "PDF"].some((type) =>
            currentModel?.supports?.includes(type)
          ) ? (
            <div className="w-full grow p-4 lg:p-10 min-w-0">
              <FileUploader
                handleChange={handleChange}
                multiple={true} 
                name="file"
                prefixClass="ew"
                classes="drag_drop mb-4 p-5 !w-full !h-full rounded-[20px] !min-w-0"
                types={getFileTypes()}
                onTypeError={handleTypeError}
              >
                <span className="mb-10 block">
                  <UploadFileIcon />
                </span>
                <p className="mb-3 font-medium dark:text-white">
                  Click to upload or drag and drop
                </p>
                <div className="mb-5 min-h-[20px] flex items-center justify-center">
                  {selectedTab === FileTypeTab.IMAGE && (
                    <span className="text-aluminium text-center">
                      Supported formats: .png & .jpg & .jpeg
                    </span>
                  )}
                  {selectedTab === FileTypeTab.PDF && (
                    <span className="text-aluminium text-center">
                      Supported formats: .pdf
                    </span>
                  )}
                  {selectedTab === FileTypeTab.AUDIO && (
                    <span className="text-aluminium text-center">
                      Supported formats: .mp3 & .wav
                    </span>
                  )}
                </div>
                <button className="flex items-center justify-center gap-2 rounded-md border border-tuna p-3 text-sm dark:text-white">
                  <UploadSvg /> Upload from device
                </button>
              </FileUploader>
            </div>
          ) : (
            <div className="grow p-10">Does not support Multimodelity</div>
          )}
          <div className="w-full border-t border-manatee p-4 dark:border-tuna lg:h-full lg:w-[365px] lg:shrink-0 lg:border-t-0 lg:border-l lg:p-5">
            <div className="flex justify-between">
              <p>Uploaded files</p>
              <span>
                {(pendingFilesByTab[selectedTab] ?? []).length}/{MAX_UPLOAD_FILES}
              </span>
            </div>

            {(pendingFilesByTab[selectedTab] ?? []).length === 0 ? (
              <div className="flex h-20 lg:h-full items-center justify-center">
                <span>No files yet!</span>
              </div>
            ) : (
              <div className="mt-4 lg:mt-10 w-full space-y-4">
                {(pendingFilesByTab[selectedTab] ?? []).map((file: File, index: number) => (
                  <div
                    key={`${file.name}-${index}`}
                    className={`flex w-full items-center justify-between gap-3 ${
                      ""
                    }`}
                  >
                    <div className="flex items-center gap-3 flex-1 min-w-0">
                      <div
                        className={`flex h-[34px] w-[34px] shrink-0 items-center justify-center rounded-full bg-manatee text-white dark:bg-[#282A2F]`}
                      >
                        <figure className="shrink-0">
                          {(() => {
                            const ext = file.name.split('.').pop()?.toLowerCase();
                            if (["png", "jpg", "jpeg"].includes(ext as string)) {
                              return <Image src={"assets/images/image-color.svg"} alt="image" width={20} height={20} />;
                            }
                            if (ext === "pdf") {
                              return <Image src={"assets/images/pdf-color.svg"} alt="pdf" width={20} height={20} />;
                            }
                            if (["mp3", "wav"].includes(ext as string)) {
                              return <Image src={"assets/images/audio-color.svg"} alt="audio" width={20} height={20} />;
                            }
                            return <FileNameIcon />;
                          })()}
                        </figure>
                      </div>
                      <div className="flex flex-col justify-start flex-1 min-w-0">
                        <CommonTooltip position='bottom' name={file.name} className='!px-2 pb-[5px] !pt-[1px] !py-1'>
                          <span className="truncate text-sm dark:text-white block text-left">
                            {file.name}
                            {(file as any)?.isUploaded && (
                              <span className="ml-2 text-xs text-green-500">(uploaded)</span>
                            )}
                          </span>
                        </CommonTooltip>
                        <span
                          className={`shrink-0 text-start text-sm text-aluminium`}
                        >
                          {Math.round((file.size || 0) / 1024)} KB
                        </span>
                      </div>
                    </div>
                    <CommonTooltip position='bottom' name='Delete' className='!px-2 pb-[5px] !pt-[1px] !py-1'>
                      <button
                        className="text-red-500 shrink-0"
                        onClick={() => handleRemovePending(index)}
                      >
                        <DeleteIcon />
                      </button>
                    </CommonTooltip>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
        <div className="flex justify-end border-t border-manatee p-2.5 dark:border-tuna">
          <div className="flex items-center gap-3">
            <button
              className={`rounded-md px-6 py-3 ${
                (pendingFilesByTab[selectedTab] ?? []).length > 0
                  ? "bg-red-500 hover:bg-red-600 text-white"
                  : "bg-manatee dark:bg-[#35383F] text-gray-400 dark:text-gray-500"
              } transition-colors duration-200`}
              onClick={handleDiscard}
              disabled={!((pendingFilesByTab[selectedTab] ?? []).length)}
            >
              Discard
            </button>
            <Button
              size="lg"
              className="btn w-full"
              onClick={handleClose}
              disabled={!((pendingFilesByTab[selectedTab] ?? []).length)}
            >
              Save & Close
            </Button>
          </div>
        </div>
      </div>
    </BasicModal>
  );
});

export default UploadFilesModal;
