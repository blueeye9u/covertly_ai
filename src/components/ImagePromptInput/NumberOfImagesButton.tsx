import React from "react";
import { v4 as uuidv4 } from "uuid";
import { useImageGeneration } from "../../context/imageGeneration.context";
import { Image_Generation_Model_Data } from "../../constants/image-generation-models-data";
import { useDropdown, BUTTON_CLASSES, DROPDOWN_CLASSES, ChevronIcon, createImageGenerationHandler } from "./shared/buttonUtils";

const NumberOfImagesButton: React.FC = () => {
  const { showDropdown, toggleDropdown, closeDropdown, containerRef, triggerRef, panelRef, panelStyle } = useDropdown(320);
  
  const { imageGeneration, setImageGeneration } = useImageGeneration();
  const { model, count, isImageGenerating } = imageGeneration;
  
  const currentConfig = Image_Generation_Model_Data.find(config => config.key === model) || Image_Generation_Model_Data[0];
  const handleImageGenerationChange = createImageGenerationHandler(imageGeneration, setImageGeneration, isImageGenerating);

  if (!currentConfig?.count) {
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
        <span className="hidden lg:block">Images: </span>
        <span>{count}</span>
        <ChevronIcon isOpen={showDropdown} />
      </button>
      {showDropdown && (
        <div ref={panelRef} style={panelStyle} className={`${DROPDOWN_CLASSES.base} p-4 sm:min-w-[300px]`}>
          <div className="grid grid-cols-4 gap-3">
            {currentConfig?.count.map((c) => (
              <button
                key={uuidv4()}
                onClick={() => {
                  handleImageGenerationChange({ count: c });
                  closeDropdown();
                }}
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
    </div>
  );
};

export default NumberOfImagesButton;