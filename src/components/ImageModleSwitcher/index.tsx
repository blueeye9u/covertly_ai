import React from "react";
import { useImageGeneration } from "../../context/imageGeneration.context";
import { Image_Generation_Model_Data } from "../../constants/image-generation-models-data";
import Image from "next/image";
import { handleModelChange } from "../../utils/imageGenerationUtils";

const ImageModelSwitcher = () => {
  const { imageGeneration, setImageGeneration } = useImageGeneration();
  const { isImageGenerating } = imageGeneration;
  
  const handleChange = (modelKey: string) => {
    const updatedImageGeneration = handleModelChange(imageGeneration, modelKey);
    setImageGeneration(updatedImageGeneration);
  };

  return (
    <div className="mb-3 flex bg-stormGrey dark:bg-blackRussian rounded-lg p-1">
      {Image_Generation_Model_Data.map((config: any) => (
        <button
        disabled={isImageGenerating}
          key={config.key}
          onClick={() => handleChange(config.key)}
          className={`w-full rounded-lg p-2 text-xs flex gap-1 items-center justify-center text-nowrap disabled:opacity-50 
            ${ imageGeneration.model === config.key? "btn_gradient text-white": "text-white"}
            ${isImageGenerating ? "cursor-not-allowed":"cursor-pointer"}
          `}
        >
          <figure className="bg-primary-100 rounded-full">
          <Image src={config.modelIcon} alt="model-rounded-icon" height={22} width={22} className="rounded-full"/>
          </figure>
          {config.name}
        </button>
      ))}
    </div>
  );
};

export default ImageModelSwitcher;
