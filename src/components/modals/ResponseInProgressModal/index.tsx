import React, { useEffect } from "react";
import Image from "next/image";
import NiceModal, { useModal } from "@ebay/nice-modal-react";
import { images } from "../../../assets/images";
import { Button } from "../../global/button/Button";
import BasicModal from "../../global/basicmodal/BasicModal";
import { useConversation } from "../../../context/conversation.context";

const ResponseInProgressModal = NiceModal.create(() => {
    const modal = useModal();
    const {
        deleteChatLoading,
        fetchingData,
        selectedModelLoading,
        generatingMessage,
        changeChatLoading,
        startChatLoading,
        generatingPDFChats
    } = useConversation();

    const isAnyLoading = deleteChatLoading || fetchingData || selectedModelLoading || 
        generatingMessage || changeChatLoading || startChatLoading || generatingPDFChats;

    useEffect(() => {
        if (modal.visible && !isAnyLoading) {
            modal.hide();
        }
    }, [isAnyLoading, modal.visible, modal.hide]);

    return (
        <BasicModal show={modal.visible} hide={modal.hide}>
            <div className="rounded-2xl bg-white dark:bg-blackRussian2 p-5 md:p-8 sm:w-[35.25rem]">
                <figure>
                    <Image
                        priority
                        className="mx-auto mb-6 object-cover"
                        src={images.warningImg}
                        alt="Success"
                        height={84}
                        width={102}
                    />
                </figure>
                <h2 className="fs-32 font-semibold mb-4 leading-tight dark:text-white">Response in Progress</h2>
                <p className="dark:text-grayLight mb-8">A chat response is currently being generated. If you navigate away, this process will be interrupted and any unsaved progress will be lost.</p>
                <div className="flex gap-2 items-center">
                    <Button
                        onClick={() => { modal.hide() }}
                        size="lg"
                        type="submit"
                        className="w-full"
                    >
                        Stay & Continue
                    </Button>
                </div>

            </div>
        </BasicModal>
    );
});

export default ResponseInProgressModal;
