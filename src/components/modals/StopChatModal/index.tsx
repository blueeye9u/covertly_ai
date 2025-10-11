import React from "react";
import Image from "next/image";
import NiceModal, { useModal } from "@ebay/nice-modal-react";
import { images } from "../../../assets/images";
import { Button } from "../../global/button/Button";
import BasicModal from "../../global/basicmodal/BasicModal";

interface StopChatModalProps {
  onConfirm?: () => Promise<void> | void;
}

const StopChatModal = NiceModal.create(({ onConfirm }: StopChatModalProps = {}) => {

  const modal = useModal();
  const handleConfirm = async () => {
    if (onConfirm) {
      await onConfirm();
      await modal.hide();
    }
  };

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
        <h2 className="fs-32 font-semibold mb-4 leading-tight dark:text-white">Stop Chat</h2>
        <p className="dark:text-grayLight mb-8">A chat response is currently being generated. If you stop, this process will be interrupted and any unsaved progress will be lost.</p>
        <div className="flex gap-2 items-center">
          <Button
            onClick={handleConfirm}
            size="lg"
            type="submit"
            className="w-full"
          >
            Stop
          </Button>
        </div>

      </div>
    </BasicModal>
  );
});

export default StopChatModal;
