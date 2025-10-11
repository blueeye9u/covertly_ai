import React from "react";
import ImageComponent from "../../global/imageComponent/ImageComponent";
import { images } from "../../../assets/images";
import { getCookie } from "../../../utils/getCookie";
import { getFullName } from "../../../utils/getRandomName";
import useLoggedInUser from "../../../hooks/useLoggedInUser";

export default function ImageQuestion({ questionContent }: any) {
  const [,,selectedImage] = useLoggedInUser();
  
  return (
    <div className="chatBoot__sender chatBoot__message">
      <div className="flex items-center gap-3">
        <ImageComponent
          src={selectedImage || images.avatar}
          fill={"fill"}
          figClassName="shrink-0 w-8 h-8"
          className="rounded-full object-cover"
        />
        <p className="text-gradient !mb-0 text-sm font-semibold">
          {getFullName(getCookie("fullName") ?? "")}
        </p>
      </div>

      <div className="grow w-full">{questionContent}</div>
    </div>
  );
}
