import React from "react";
import NiceModal, { useModal } from "@ebay/nice-modal-react";
import { useRouter } from "next/router";
import Image from "next/image";
import BasicModal from "../../global/basicmodal/BasicModal";
import { Button } from "../../global/button/Button";
import Steps from "../../../enums/steps.enum";
import { UN_AUTHENTICATED_ROUTES } from "../../../constants/routes";
import { useDebouncedClick } from "../../../hooks/useDebouncedClick";
import { images } from "../../../assets/images";
import { handleAuthentication } from "../../../utils/authUtils";

const AccountVerified = NiceModal.create(({ response, formatEmail }: any) => {
  const router = useRouter();
  const [handleClick, loadingStates] = useDebouncedClick();

  const modal = useModal();
  const handleAuth = (modalName: string) => {
    handleClick(async () => {
      const next_step = response?.payload?.nextStep as string;
      modal.remove();

      // Determine the route based on the next step
      if (next_step === Steps.SETUP_PASSWORD) {
        let route = UN_AUTHENTICATED_ROUTES.SETUP_PASSWORD as Function;
        router.push(route(formatEmail));
        return;
      }
      if (next_step == Steps.VERIFY_EMAIL) {
        let route = UN_AUTHENTICATED_ROUTES.VERIFY_EMAIL as Function;
        router.push(route(formatEmail));
        return;
      }

      // Use shared authentication handling
      await handleAuthentication(response, {
        router,
        onSuccess: () => {
          // Additional success handling if needed
        }
      });
    }, "verifyEmailLoading");
  };
  return (
    <BasicModal show={modal.visible} hide={modal.hide} close notOnsideclick>
      <div className="flex w-full flex-col items-center rounded-[20px] bg-whiteSmoke dark:bg-blackRussian2 p-5 sm:w-[538px] md:p-10">
        <figure className="mx-auto h-[234px] w-[234px]">
          <Image
            src={images.successGif}
            width={234}
            height={234}
            alt="email send image"
          />
        </figure>
        <h2 className="fs-24 mb-2.5 font-medium leading-[30px]">
          Account Verified
        </h2>
        <p className="mb-8 text-base text-dark-50">
          Your account has been verified successfully.
        </p>
        <Button
          className="!w-full"
          size="lg"
          onClick={handleAuth}
          isLoading={loadingStates["verifyEmailLoading"]}
          disabled={loadingStates["verifyEmailLoading"]}
        >
          Continue
        </Button>
      </div>
    </BasicModal>
  );
});

export default AccountVerified;
