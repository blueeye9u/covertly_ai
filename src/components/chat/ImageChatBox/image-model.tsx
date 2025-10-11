import React, { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import SwitchToggle from "../../global/forms/SwitchToggle";
import StableDimensionsDropdown from "../../StableDimensionDropdown";
import {
  useImageGeneration,
  ImageGeneration,
} from "../../../context/imageGeneration.context";
import { ImageGenerationModelData } from "../../../constants/image-generation-models-data";
import StyleDropdown from "../../sizeDropdown.tsx";
import ImageModelSwitcher from "../../ImageModleSwitcher";
import {InfoIcon} from "../../../svgs/svg";
import { MAX_INPUT_LENGTH_NEGATIVE_PROMPT } from "../../../constants/input-limits";

interface ImageModelProps {
  config: ImageGenerationModelData;
}

const ImageModel: React.FC<ImageModelProps> = ({ config }) => {
  const { imageGeneration, setImageGeneration } = useImageGeneration();
  const [enableNP, setEnableNP] = useState(false);
  const { isImageGenerating } = imageGeneration;
  const { negativePrompt, count } = imageGeneration;
  const negativePromptLength = negativePrompt?.length ?? 0;
  const atOrExceedsNegativePrompt = negativePromptLength >= MAX_INPUT_LENGTH_NEGATIVE_PROMPT;

  useEffect(() => {
    if (!enableNP) {
      setImageGeneration({ ...imageGeneration, negativePrompt: "" });
    }
  }, [enableNP]);

  useEffect(() => {
    const hasNegativePrompt = Boolean(
        imageGeneration?.negativePrompt?.trim?.()
    );
    setEnableNP(hasNegativePrompt);
  }, [imageGeneration?._id, imageGeneration?.negativePrompt]);


  const handleChange = (val: ImageGeneration) => {
    if (!isImageGenerating) {
      setImageGeneration({ ...imageGeneration, ...val });
    }
  };

  return (
    <div>
      <p className="mb-4 border-b pb-3 text-lg font-medium dark:border-[#404145] border-linkWater50 dark:text-white text-gray">
        Image Settings
      </p>
      <span className="dark:text-white text-gray mb-4 block">Model</span>
      <ImageModelSwitcher />

      {config?.negativePrompt && (
        <>
          <div className="mb-4 mt-2 flex items-center justify-between gap-3">
            <div className="flex items-center justify-center">
              <p className="text-sm dark:text-white text-gray">Negative prompt</p>
              <span className="rt-tooltip group/tooltip -translate-y-0 px-3">
                <InfoIcon />
                <span className="tooltip-info tooltip invisible not-italic group-hover/tooltip:visible">
                  A <b>Negative Prompt</b> is an instruction that tells the AI what you do not want to appear in the generated image. It works as an explicit “avoid this” filter during generation.
                </span>
              </span>
            </div>
            <SwitchToggle isImageGenerating={isImageGenerating} enabled={enableNP} setEnabled={() => setEnableNP(!enableNP)} />
          </div>
          {enableNP && (
            <>
              <textarea
                value={negativePrompt}
                onChange={(e) => handleChange({ negativePrompt: e.target.value })}
                disabled={isImageGenerating}
                placeholder={"Write here..."}
                className="h-[160px] w-full resize-none rounded-md border border-transparent opacity-100 duration-500 focus:border-primary-100 dark:bg-[#1E2129] bg-white dark:text-white text-gray"
                maxLength={MAX_INPUT_LENGTH_NEGATIVE_PROMPT}
              />
              <div
                className={`mt-1 flex justify-end text-xs ${
                  atOrExceedsNegativePrompt
                    ? "text-red-500"
                    : "text-gray-500 dark:text-gray-400"
                }`}
              >
                {negativePromptLength}/{MAX_INPUT_LENGTH_NEGATIVE_PROMPT}
              </div>
            </>
          )}
        </>
      )}

      {config?.count && (
        <div className="mb-4 mt-4">
          <p className="mb-2 dark:text-white text-gray">Number of images</p>
          <div className="grid grid-cols-4 gap-3">
            {config?.count.map((c) => (
              <button
                key={uuidv4()}
                onClick={() => handleChange({ count: c })}
                className={`${count === c ? "border-[#30C5D2] text-[#30C5D2]" : "border-transparent"} 
                 ${isImageGenerating ? "cursor-not-allowed opacity-50" : "cursor-pointer hover:border-[#30C5D2]"} 
                flex h-12 w-full dark:text-white text-gray items-center justify-center rounded-md border hover:text-[#30C5D2] dark:bg-blackRussian2 bg-whiteSmoke`}
              >
                {c}
              </button>
            ))}
          </div>
        </div>
      )}
      {config?.size && (
        <>
          <p className="mt-4 mb-2 dark:text-white text-gray">Dimensions</p>
          <StableDimensionsDropdown config={config} />
        </>
      )}
      {config?.style && (
        <>
          <p className="mt-4 mb-2 dark:text-white text-gray">Style</p>
          <StyleDropdown config={config} />
        </>
      )}
    </div>
  );
};

export default ImageModel;
