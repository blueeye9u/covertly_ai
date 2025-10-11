import React from "react";
import Image from "next/image";

interface MultipleLlmsIconProps {
  className?: string;
  iconPath?: string;
  iconSize?: number;
}

/**
 * MultipleLlmsIcon component displays the rotating background with icon for Multiple LLMs feature
 */
const MultipleLlmsIcon: React.FC<MultipleLlmsIconProps> = ({
  className = "",
  iconPath = "/assets/images/covertly-features/multiple-llms/multiple-llm-logo.webp",
  iconSize = 64
}) => {
  return (
    <figure className={`multiple_LLMs_img relative flex justify-center items-center ${className}`}>
      <div className="rotating-background">
        <div className="multiple_LLMs_img-background" />
      </div>
      <Image
        src={iconPath}
        className="object-contain"
        alt="feature-image"
        width={iconSize}
        height={iconSize}
      />
    </figure>
  );
};

export default MultipleLlmsIcon;