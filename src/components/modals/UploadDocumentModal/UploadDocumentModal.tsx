import React from "react";
import { Button } from "../../global/button/Button";
import BasicModal from "../../global/basicmodal/BasicModal";
import NiceModal, { useModal } from "@ebay/nice-modal-react";
import { FileUploader } from "react-drag-drop-files";
import { UploadDocumentIcon } from "../../../svgs/svg";
import { toast } from "react-hot-toast";
import { useConversation } from "../../../context/conversation.context";
import { EChatType } from "../../../enums/gpt-models.enum";

const MAX_FILE_SIZE = 20 * 1024 * 1024; // 20MB

const UploadDocumentModal = NiceModal.create((): JSX.Element => {
    const modal = useModal();

    const {files,setFiles} = useConversation();
    const fileTypes = ["pdf", "application/pdf"];

    // Handle file change, allowing 1-3 files only
 const handleChange = (fileList: FileList) => {
    const selectedFiles = Array.from(fileList);

    if (selectedFiles.length > 3) {
        toast.error("You can only upload up to 3 files.");
        return;
    }
    if (selectedFiles.length === 0) {
        toast.error("Please select at least 1 file.");
        return;
    }

    const oversizedFiles = selectedFiles.filter(file => file.size > MAX_FILE_SIZE);
    if (oversizedFiles.length > 0) {
        toast.error(`File(s) ${oversizedFiles.map(f => f.name).join(', ')} exceed the 20MB limit.`);
        return;
    }

    setFiles(selectedFiles);
    handleFileUpload()
};

    const handleFileUpload = () => {
        modal.hide();
        const currentUrl = new URL(globalThis.window.location.href);
        currentUrl.searchParams.set('type', EChatType.PDF_CHAT);  // Add or update the query param 'type=pdf'
        globalThis.window.history.pushState({}, '', currentUrl);
    }

    return (
        <BasicModal show={modal.visible} hide={modal.hide}>
            <div className="rounded-2xl bg-whiteSmoke dark:bg-blackRussian2 p-5 md:p-8 !pt-16 sm:w-[43rem]">
                <FileUploader
                    handleChange={(file:any) => handleChange(file)}
                    multiple={true} // Allow multiple file selection
                    name="file"
                    prefixClass="ew"
                    classes="drag_drop mb-4 p-5 !w-full"
                    types={fileTypes}
                >
                    <span className="w-16 h-16 bg-blackRussian dark:bg-white text-white dark:text-black rounded-full flex justify-center items-center mb-6">
                        <UploadDocumentIcon />
                    </span>
                    <h4 className="fs-24 mb-2">Upload Document</h4>
                    <p className="truncate w-full">
                        {files.length > 0
                            ? files.map((file:any) => file.name).join(", ") // Display file names
                            : "Please click or drag and drop your document(s) to upload (1 to 3 files)"}
                    </p>
                </FileUploader>

                <Button size="lg" disabled={files?.length == 0} className="btn w-full" onClick={handleFileUpload}>Upload</Button>
            </div>
        </BasicModal>
    );
});

export default UploadDocumentModal;
