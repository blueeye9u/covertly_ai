import React from "react";
import {
  useImageGeneration,
  ImageGeneration,
} from "../../context/imageGeneration.context";
import { ImageGenerationModelData } from "../../constants/image-generation-models-data";
import Image from "next/image";

interface IProps {
  config: ImageGenerationModelData;
  className?: string;
}

const StyleDimensions: React.FC<IProps> = ({ config, className }) => {
  const { imageGeneration, setImageGeneration } = useImageGeneration();
  const { style, isImageGenerating } = imageGeneration;

  const handleChange = (val: ImageGeneration) => {
    if (!isImageGenerating) {
      setImageGeneration({ ...imageGeneration, ...val });
    }
  };

  return (
    <div className={`flex gap-5 items-center w-full ${className}`}>
      {config?.style?.map((s) => (
        <div
          key={`style-${s}`}
          className="flex flex-col gap-1 justify-center items-center w-full"
        >
          <button
            onClick={() => handleChange({ style: s })}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                handleChange({ style: s });
              }
            }}
            disabled={isImageGenerating}
            className={`border-2 rounded-md duration-300 w-full h-16 py-2 relative 
              ${s === style ? "border-[#30C5D2]" : "border-transparent"}
              ${isImageGenerating ? "cursor-not-allowed opacity-50" : "cursor-pointer hover:border-[#30C5D2]"}
            `}
          >
            <Image
              src={s === "vivid" ? "/assets/images/vivid.svg" : "/assets/images/natural.svg"}
              layout="fill"
              className="!w-full !h-full object-cover rounded-md"
              alt="style logo"
            />
          </button>
          <p className="text-white text-xs">{s.charAt(0).toUpperCase() + s.slice(1)}</p>
        </div>
      ))}
    </div>
  );
};

export default StyleDimensions;
