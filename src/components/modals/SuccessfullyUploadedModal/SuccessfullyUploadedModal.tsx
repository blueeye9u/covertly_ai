import React from "react";
import Image from "next/image";
import { Button } from "../../global/button/Button";
import BasicModal from "../../global/basicmodal/BasicModal";
import NiceModal, { useModal } from "@ebay/nice-modal-react";
import { images } from "../../../assets/images";

const SuccessfullyUploadedModal = NiceModal.create((): JSX.Element => {
    const modal = useModal();
    return (
        <BasicModal show={modal.visible} hide={modal.hide}>
            <div className="rounded-2xl bg-whiteSmoke dark:bg-blackRussian2 p-5 md:p-8 !pt-16 sm:w-[43rem]">
                <div className="drag_drop mb-4 p-5 !w-full">
                    <figure className="w-[150px] h-[150px] mx-auto">
                        <Image src={images.successGif} width={150} height={150} alt="email send image" />
                    </figure>
                    <h4 className="fs-24 mb-2">Successfully Uploaded</h4>
                    <p className="truncate w-full">Congratulation, your document successfully uploaded</p>
                </div>
                <Button size="lg" className="btn w-full">Next</Button>
            </div>
        </BasicModal>
    );
});

export default SuccessfullyUploadedModal;