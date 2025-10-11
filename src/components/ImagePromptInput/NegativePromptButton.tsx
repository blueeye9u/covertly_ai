import React from "react";
import { useImageGeneration } from "../../context/imageGeneration.context";
import { Image_Generation_Model_Data } from "../../constants/image-generation-models-data";
import { InfoIcon } from "../../svgs/svg";
import { MAX_INPUT_LENGTH_NEGATIVE_PROMPT } from "../../constants/input-limits";
import { IoBan } from "react-icons/io5";
import CommonTooltip from "../ComonTooltip";
import { useDropdown, BUTTON_CLASSES, DROPDOWN_CLASSES, ChevronIcon, createImageGenerationHandler } from "./shared/buttonUtils";

const NegativePromptButton: React.FC = () => {
  const { showDropdown, toggleDropdown, containerRef, triggerRef, panelRef, panelStyle } = useDropdown(360, 220, 160);
  
  const { imageGeneration, setImageGeneration } = useImageGeneration();
  const { model, negativePrompt, isImageGenerating } = imageGeneration;
  
  const currentConfig = Image_Generation_Model_Data.find(config => config.key === model) || Image_Generation_Model_Data[0];
  const negativePromptLength = negativePrompt?.length ?? 0;
  const atOrExceedsNegativePrompt = negativePromptLength >= MAX_INPUT_LENGTH_NEGATIVE_PROMPT;
  const handleImageGenerationChange = createImageGenerationHandler(imageGeneration, setImageGeneration, isImageGenerating);

  if (!currentConfig?.negativePrompt) {
    return null;
  }

  return (
    <div className="relative" ref={containerRef}>
      <button
        className={BUTTON_CLASSES.base}
        onClick={toggleDropdown}
        ref={triggerRef}
        disabled={isImageGenerating}
      >
        <IoBan size={20}/>
        <span className="hidden lg:block">Negative Prompt</span>
        <ChevronIcon isOpen={showDropdown} />
      </button>
      {showDropdown && (
        <div ref={panelRef} style={panelStyle} className={`${DROPDOWN_CLASSES.base} p-4 sm:w-96`}>
          <div className="mb-4 flex items-center gap-3">
            <p className="text-sm dark:text-white text-gray">Negative prompt</p>
            <CommonTooltip 
              position="top" 
              name={`A Negative Prompt is an instruction that tells the AI what you do not want to appear in the generated image. It works as an explicit "avoid this" filter during generation.`}
              className="!px-3 !py-2 !max-w-xs !whitespace-normal !text-center !break-words"
            >
              <InfoIcon />
            </CommonTooltip>
          </div>
          <textarea
            value={negativePrompt}
            onChange={(e) => handleImageGenerationChange({ negativePrompt: e.target.value })}
            disabled={isImageGenerating}
            placeholder={"Write here what you don't want to see in the image..."}
            className="h-[160px] w-full resize-none rounded-md border border-transparent opacity-100 duration-500 focus:border-primary-100 dark:bg-[#1E2129] bg-white dark:text-white text-gray p-3"
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
        </div>
      )}
    </div>
  );
};

export default NegativePromptButton;