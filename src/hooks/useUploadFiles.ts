import { useState, useEffect } from "react";
import { toast } from "react-hot-toast";
import { useRouter } from 'next/router';
import { v4 as uuidv4 } from "uuid";

import { UploadedFile, useConversation } from "../context/conversation.context";
import { conversationService } from "../services/conversation.service";
import { ChatGPTDisplay } from "../constants/chat-models-data";
import { 
    analyzeFilesForDuplicates, 
    validateFileUploadLimits, 
    showReplacementConfirmation,
    showFileUploadSuccessMessage,
    validateFileSizes,
    validateFileTypeConsistency,
    MAX_UPLOAD_FILES,
    MAX_FILE_SIZE
} from "../utils/fileUploadUtils";

export const useUploadFiles = () => {
    const {
        files,
        setFiles,
        currentChatId,
        setCurrentChat,
        setCurrentChatId,
        setRouterId,
        selected,
        setIsFileUploading
    } = useConversation();

    const [currentModel, setCurrentModel] = useState<any>({});

    useEffect(() => {
        if (selected?.name) {
            setCurrentModel(selected);
        } else {
            setCurrentModel(ChatGPTDisplay);
        }
    }, [selected]);

    const router = useRouter();

    const handleUploadChange = async (selectedFiles: File[], selectedTab: number) => {
        if (selectedFiles.length === 0) {
            toast.error("Please select at least 1 file.");
            return;
        }

        // Validate file sizes
        if (!validateFileSizes(selectedFiles, MAX_FILE_SIZE)) {
            return;
        }

        // Validate file type consistency with existing files
        if (!validateFileTypeConsistency(selectedFiles, files)) {
            return;
        }

        // Analyze files for duplicates
        const { duplicateFiles, newFiles, replacementInfo } = analyzeFilesForDuplicates(selectedFiles, files);

        // Validate upload limits
        if (!validateFileUploadLimits(newFiles.length, files.length, duplicateFiles.length, MAX_UPLOAD_FILES)) {
            return;
        }

        // Show confirmation for replacements
        showReplacementConfirmation(duplicateFiles);

        await handleFileUpload(selectedFiles, selectedTab, replacementInfo);
    };

    // Helper function to create file data from File object
    const createFileData = (file: File): UploadedFile => ({
        name: file.name,
        originalName: file.name,
        size: file.size,
        id: uuidv4(),
        url: "",
        processed: false,
        readable: true,
        type: file.type,
    });

    // Helper function to process replacement files
    const processReplacements = (updatedFiles: UploadedFile[], replacementInfo: Array<{file: File, index: number, originalFile: UploadedFile}>) => {
        for (const { file, index } of replacementInfo) {
            const newFileData = createFileData(file);
            updatedFiles[index] = newFileData;
        }
        return updatedFiles;
    };

    // Helper function to filter new files
    const filterNewFiles = (filesWithId: UploadedFile[], replacementInfo: Array<{file: File, index: number, originalFile: UploadedFile}>) => {
        return filesWithId.filter(fileWithId => 
            !replacementInfo.some(info => info.file.name === fileWithId.name)
        );
    };

    // Helper function to update files optimistically
    const updateFilesOptimistically = (filesToUpload: File[], replacementInfo: Array<{file: File, index: number, originalFile: UploadedFile}>) => {
        const filesWithId = filesToUpload.map(createFileData);
        
        setFiles((prevFiles: UploadedFile[]) => {
            let updatedFiles = [...prevFiles];
            updatedFiles = processReplacements(updatedFiles, replacementInfo);
            const newFiles = filterNewFiles(filesWithId, replacementInfo);
            return [...updatedFiles, ...newFiles];
        });
    };

    const handleFileUpload = async (
        filesToUpload: File[], 
        selectedTab: number, 
        replacementInfo: Array<{file: File, index: number, originalFile: UploadedFile}> = []
    ) => {
        setIsFileUploading(true);
        try {
            updateFilesOptimistically(filesToUpload, replacementInfo);

            const formData = new FormData();
            for (const file of filesToUpload) {
                formData.append(`file`, file);
            }
            formData.append("chat", currentChatId);
            formData.append("model", currentModel.key);

            let data;
            
            if (selectedTab === 0) {
                data = await conversationService.uploadImageFiles(formData);
            } else if (selectedTab === 1) {
                data = await conversationService.uploadPDFFiles(formData);
            } else {
                data = await conversationService.uploadAudioFiles(formData);
            }
            
            setCurrentChat({ ...data.payload.chat });
            setCurrentChatId(data.payload.chat._id);
            setRouterId(data.payload.chat._id);

            const signedUrls: string[] = Array.isArray(data?.payload?.files) ? data.payload.files : [];
            if (signedUrls.length > 0) {
                updateFilesWithUrls(signedUrls, filesToUpload, replacementInfo);
            }
            
            router.replace(`${router.pathname}?id=${data.payload.chat._id}`, undefined, {
                shallow: true,
            });
            
            const replacementCount = replacementInfo.length;
            const newCount = filesToUpload.length - replacementCount;
            
            showFileUploadSuccessMessage(replacementCount, newCount, false);
        } catch (error: any) {
            revertOptimisticUpdates(filesToUpload, replacementInfo);
            const errorMessage = error?.response?.data?.statusCode === 413 
                ? "File size exceeds the maximum limit." 
                : "Failed to upload files. Please try again.";
            toast.error(errorMessage);
        } finally {
            setIsFileUploading(false);
        }
    };

    // Helper function to update replacement files with URLs
    const updateReplacementFiles = (updated: UploadedFile[], signedUrls: string[], replacementInfo: Array<{file: File, index: number, originalFile: UploadedFile}>) => {
        let urlIndex = 0;
        for (const { index } of replacementInfo) {
            if (urlIndex < signedUrls.length && updated[index]) {
                updated[index] = {
                    ...updated[index],
                    url: signedUrls[urlIndex],
                };
                urlIndex++;
            }
        }
        return urlIndex;
    };

    // Helper function to update new files with URLs and metadata
    const updateNewFiles = (updated: UploadedFile[], signedUrls: string[], filesToUpload: File[], replacementInfo: Array<{file: File, index: number, originalFile: UploadedFile}>, startUrlIndex: number) => {
        const newFilesCount = filesToUpload.length - replacementInfo.length;
        const newFilesStartIndex = updated.length - newFilesCount;
        let urlIndex = startUrlIndex;
        
        for (let i = 0; i < newFilesCount && urlIndex < signedUrls.length; i++) {
            const fileIndex = newFilesStartIndex + i;
            if (updated[fileIndex]) {
                const sourceFileIndex = replacementInfo.length + i;
                const sourceFile = filesToUpload[sourceFileIndex];
                updated[fileIndex] = {
                    ...updated[fileIndex],
                    url: signedUrls[urlIndex],
                    originalName: sourceFile?.name ?? updated[fileIndex].originalName,
                    name: sourceFile?.name ?? updated[fileIndex].name,
                    type: sourceFile?.type ?? updated[fileIndex].type,
                };
                urlIndex++;
            }
        }
    };

    // Helper function to update files with signed URLs
    const updateFilesWithUrls = (signedUrls: string[], filesToUpload: File[], replacementInfo: Array<{file: File, index: number, originalFile: UploadedFile}>) => {
        setFiles((prevFiles: UploadedFile[]) => {
            const updated = [...prevFiles];
            const urlIndex = updateReplacementFiles(updated, signedUrls, replacementInfo);
            updateNewFiles(updated, signedUrls, filesToUpload, replacementInfo, urlIndex);
            return updated;
        });
    };

    // Helper function to revert optimistic updates on error
    const revertOptimisticUpdates = (filesToUpload: File[], replacementInfo: Array<{file: File, index: number, originalFile: UploadedFile}>) => {
        setFiles((uploadFiles: UploadedFile[]) => {
            let revertedFiles = [...uploadFiles];
            
            // Revert replacements - restore original files
            for (const { index, originalFile } of replacementInfo) {
                revertedFiles[index] = originalFile;
            }
            
            // Remove newly added files
            const newFilesCount = filesToUpload.length - replacementInfo.length;
            revertedFiles = revertedFiles.slice(0, Math.max(0, revertedFiles.length - newFilesCount));
            
            return revertedFiles;
        });
    };

    // Helper function to delete a specific file
    const deleteSpecificFile = async (chat: string, fileIndex: number) => {
        await conversationService.deleteUnprocessedFile({ chat, fileIndex });
        const newFiles = files.filter((_: UploadedFile, idx: number) => idx !== fileIndex);
        setFiles(newFiles);
    };

    // Helper function to delete all files
    const deleteAllFiles = async (chat: string) => {
        await conversationService.deleteUnprocessedFile({ chat, fileIndex: -1 });
        setFiles([]);
    };

    const handleDeleteFile = async (chat: string, fileIndex?: number) => {
        try {
            if (fileIndex === undefined) {
                await deleteAllFiles(chat);
            } else {
                await deleteSpecificFile(chat, fileIndex);
            }
            return true;
        } catch (error) {
            console.error("Error deleting file(s):", error);
            toast.error("Failed to delete files. Please try again.");
            return false;
        }
    };

    return {
        handleUploadChange,
        handleDeleteFile,
    };
};