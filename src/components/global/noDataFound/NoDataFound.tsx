import React from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import { Button } from "../button/Button";

interface IProps {
  showButton?: any;
  className?: any;
}

const NoDataFound = ({ showButton, className }: IProps) => {
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
          className="h-40 w-56 object-cover lg:h-[12.5rem] lg:w-[16rem] xs:w-[12.5rem] xs:h-36"
          src="/assets/images/no-data.svg"
        />
      </figure>
      <div className="flex flex-col gap-2">
        <h2 className="fs-48 font-Baloo font-black leading-none text-black">
          No Data Found
        </h2>
        {/* <p className="fs-16 leading-5 text-dolphin">There is no data found</p> */}
      </div>
      {showButton && (
        <div className="flex items-center justify-center">
          <Button
            size="lg"
            type="button" // Specify the type as "button"
            color="primary"
            onClick={handleGoBack}
            className="w-40 py-[0.785rem] sm:w-64 sm:py-[1.188rem]"
          >
            Go back
          </Button>
        </div>
      )}
    </div>
  );
};

export default NoDataFound;
