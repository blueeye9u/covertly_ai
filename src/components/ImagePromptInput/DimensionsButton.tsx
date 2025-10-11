import React from "react";
import Image from "next/image";
import { useImageGeneration } from "../../context/imageGeneration.context";
import { Image_Generation_Model_Data } from "../../constants/image-generation-models-data";
import { useDropdown, BUTTON_CLASSES, DROPDOWN_CLASSES, ChevronIcon, createImageGenerationHandler } from "./shared/buttonUtils";

const DimensionsButton: React.FC = () => {
  const { showDropdown, toggleDropdown, closeDropdown, containerRef, triggerRef, panelRef, panelStyle } = useDropdown(320);
  
  const { imageGeneration, setImageGeneration } = useImageGeneration();
  const { model, size, isImageGenerating } = imageGeneration;
  
  const currentConfig = Image_Generation_Model_Data.find(config => config.key === model) || Image_Generation_Model_Data[0];
  const handleImageGenerationChange = createImageGenerationHandler(imageGeneration, setImageGeneration, isImageGenerating);

  if (!currentConfig?.size) {
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
        <span className="hidden lg:block">Size: </span>
        <span>{size}</span>
        <ChevronIcon isOpen={showDropdown} />
      </button>
      {showDropdown && (
        <div
          ref={panelRef}
          style={panelStyle}
          className={`${DROPDOWN_CLASSES.base} p-4 sm:min-w-[350px]`}>
          <div className="grid grid-cols-3 gap-4">
            {currentConfig.size.map((s, i) => (
              <button
                key={s}
                className="flex flex-col cursor-pointer w-full items-center justify-center gap-2 text-sm duration-300 hover:bg-linkWater dark:hover:bg-blackRussian3 rounded-md p-2"
                onClick={() => {
                  handleImageGenerationChange({ size: s });
                  closeDropdown();
                }}
              >
                {currentConfig.sizeImages && (
                  <figure className={`w-16 h-12 flex justify-center items-center rounded-md bg-blackRussian border 
                          ${s === size ? "border-[#30C5D2]" : "border-transparent"}
                           ${isImageGenerating ? "opacity-50 cursor-not-allowed" : "opacity-100 cursor-pointer"}
                          `}
                  >
                    <Image
                      src={currentConfig.sizeImages[i]}
                      alt={`size-image-${s}`}
                      width={20}
                      height={20}
                    />
                  </figure>
                )}
                <span className="text-xs dark:text-white text-black">{s}</span>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default DimensionsButton;