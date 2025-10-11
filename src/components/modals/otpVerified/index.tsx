import NiceModal, { useModal } from "@ebay/nice-modal-react";
import React from "react";
import BasicModal from "../../global/basicmodal/BasicModal";
import { Button } from "../../global/button/Button";
import Image from "next/image";
import { UN_AUTHENTICATED_ROUTES } from "../../../constants/routes";
import { useRouter } from "next/router";

import { useDebouncedClick } from "../../../hooks/useDebouncedClick";
import { images } from "../../../assets/images";

const OtpVerified = NiceModal.create(({ otp, email }: { otp: string; email: string }) => {
  const router = useRouter();
  const [handleClick, loadingStates] = useDebouncedClick();

  const modal = useModal();
  const handleAuth = () => {
    handleClick(async () => {
      modal.remove();
      let route = UN_AUTHENTICATED_ROUTES.RESET_PASSWORD as Function;
      router.push(route(otp, email));
    }, "verifyOTPLoading");
  };
  return (
    <BasicModal show={modal.visible} hide={modal.hide} close notOnsideclick>
      <div className="flex w-full flex-col items-center rounded-[20px] bg-white dark:bg-blackRussian2 p-5 md:p-10 sm:w-[538px]">
        <figure className="w-[234px] h-[234px] mx-auto">
            <Image src={images.successGif} width={234} height={234} alt="email send image" />
        </figure>
        <h2 className="fs-24 mb-2.5 font-medium leading-[30px]">
          OTP Verified
        </h2>
        <p className="mb-8 text-base text-dark-50">
          Your otp has been verified successfully.
        </p>
        <Button
        className="!w-full"
          size="lg"
          onClick={handleAuth}
          isLoading={loadingStates["verifyOTPLoading"]}
          disabled={loadingStates["verifyOTPLoading"]}
        >
          Continue
        </Button>
      </div>
    </BasicModal>
  );
});

export default OtpVerified;
