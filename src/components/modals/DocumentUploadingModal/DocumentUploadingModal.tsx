import React from "react";
import NiceModal, { useModal } from "@ebay/nice-modal-react";
import { Button } from "../../global/button/Button";
import BasicModal from "../../global/basicmodal/BasicModal";
import DocumentProgressBar from "../../DocumentProgressBar/DocumentProgressBar";
import { useConversation } from "../../../context/conversation.context";

const DocumentUploadingModal = NiceModal.create((): JSX.Element => {
    const modal = useModal();
    const { files } = useConversation();

    return (
        <BasicModal show={modal.visible} hide={modal.hide}>
            <div className="rounded-2xl bg-whiteSmoke dark:bg-blackRussian2 p-5 md:p-8 !pt-16 sm:w-[43rem]">
                <label className="drag_drop mb-4 p-5 !w-full">
                    <DocumentProgressBar completed={0} />
                    <h4 className="fs-24 mb-2 mt-5">Uploading</h4>
                    <p className="truncate w-full">
                        {files.length > 0
                            ? files.map((file: any) => file.name).join(", ") // Display file names
                            : "Please click or drag and drop your document(s) to upload (1 to 3 files)"}
                    </p>
                </label>
                <Button size="lg" className="btn w-full">Cancel Uploading</Button>
            </div>
        </BasicModal>
    );
});

export default DocumentUploadingModal;
