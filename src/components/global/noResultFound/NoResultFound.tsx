import React from "react";
import Image from "next/image";
import { Button } from "../button/Button";
import { useRouter } from "next/router";
interface IProps {
  showButton: boolean;
  className?: any;
}

const NoResultFound = ({ showButton, className }: IProps) => {
  const router = useRouter();
  const handleGoBack = () => {
    router.back();
  };
  return (
    <div className={`flex h-full flex-col items-center justify-center gap-6 text-center lg:gap-11 ${className}`}>
      <figure className="flex h-full w-full items-center justify-center">
        <Image
          width={352}
          height={286}
          alt="No Data"
          className="h-40 w-56 object-cover lg:h-[17.875rem] lg:w-[22rem] xs:w-[12.5rem] xs:h-36"
          src="/assets/images/no-result.svg"
        />
      </figure>
      <div className="flex flex-col gap-2">
        <h2 className="fs-48 font-Baloo font-black leading-none text-black">
          No Result Found
        </h2>
        {/* <p className="fs-16 leading-5 text-dolphin">
          Please enter the information below to log in to your account.
        </p> */}
      </div>
      <div className="flex items-center justify-center">
        {showButton && (
          <Button
            size="lg"
            type="submit"
            color="primary"
            onClick={handleGoBack}
            className="w-48 py-[0.785rem] sm:w-60 sm:py-[1.188rem]"
          >
            Search Again
          </Button>
        )}
      </div>
    </div>
  );
};

export default NoResultFound;
