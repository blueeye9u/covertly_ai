import NiceModal, { useModal } from "@ebay/nice-modal-react";
import React from "react";
import BasicModal from "../../global/basicmodal/BasicModal";
import { Button } from "../../global/button/Button";
import Image from "next/image";

const EmailSend = NiceModal.create(() => {
  const modal = useModal();
  return (
    <BasicModal show={modal.visible} hide={modal.hide}>
      <div className="flex w-full flex-col items-center rounded-[20px] bg-white px-10 md:px-20 py-12 md:py-20 sm:max-w-[538px]">
        <h2 className="fs-32 leading-10 mb-3">Email has been sent!</h2>
        <p className="text-base text-dark-50 mb-8">Check your inbox and click on th received link to reset password.</p>
        <figure className="w-[180px] h-[180px] mb-8 mx-auto">
            <Image src="/assets/images/email-sendimg.svg" width={180} height={180} alt="email send image" />
        </figure>
        <Button size="lg" className="w-full">Continue</Button>
      </div>
    </BasicModal>
  );
});

export default EmailSend;
