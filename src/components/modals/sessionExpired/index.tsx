import React from "react";
import Image from "next/legacy/image";
import { useRouter } from "next/router";
import { images } from "../../../assets/images";
import { Button } from "../../global/button/Button";
import BasicModal from "../../global/basicmodal/BasicModal";
import NiceModal, { useModal } from "@ebay/nice-modal-react";
import { UN_AUTHENTICATED_ROUTES } from "../../../constants/routes";

const SessionExpired = NiceModal.create(() => {
  const router = useRouter();
  const modal = useModal();

  return (
    <BasicModal show={modal.visible} hide={modal.hide} close notOnsideclick>
      <div className="rounded-2xl bg-whiteSmoke p-5 dark:bg-blackRussian2 sm:w-[31.25rem] md:p-8">
        <figure>
          <Image
            priority
            className="mx-auto mb-8 object-cover"
            src={images.warningImg}
            alt="Success"
            height={84}
            width={102}
          />
        </figure>
        <h2 className="fs-32 mb-4 font-semibold dark:text-white">
          Session Expired
        </h2>
        <p className="dark:text-white mb-8 text-sm">For security purposes, your session has expired due to inactivity. Please log in again to continue using.</p>
        <Button
          onClick={() => {
            router.push(UN_AUTHENTICATED_ROUTES.LOGIN as string);
            modal.hide();
          }}
          size="lg"
          type="button"
          color="primary"
          className="w-full"
        >
         Login
        </Button>
      </div>
    </BasicModal>
  );
});

export default SessionExpired;
