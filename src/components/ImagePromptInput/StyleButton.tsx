import React from "react";
import Image from "next/image";
import { useImageGeneration } from "../../context/imageGeneration.context";
import { Image_Generation_Model_Data } from "../../constants/image-generation-models-data";
import { useDropdown, BUTTON_CLASSES, DROPDOWN_CLASSES, ChevronIcon, createImageGenerationHandler } from "./shared/buttonUtils";

const StyleButton: React.FC = () => {
  const { showDropdown, toggleDropdown, closeDropdown, containerRef, triggerRef, panelRef, panelStyle } = useDropdown(300);
  
  const { imageGeneration, setImageGeneration } = useImageGeneration();
  const { model, style, isImageGenerating } = imageGeneration;
  
  const currentConfig = Image_Generation_Model_Data.find(config => config.key === model) || Image_Generation_Model_Data[0];
  const handleImageGenerationChange = createImageGenerationHandler(imageGeneration, setImageGeneration, isImageGenerating);

  if (!currentConfig?.style) {
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
        <span>Style: {style ? style.charAt(0).toUpperCase() + style.slice(1) : ""}</span>
        <ChevronIcon isOpen={showDropdown} />
      </button>
      {showDropdown && (
        <div ref={panelRef} style={panelStyle} className={`${DROPDOWN_CLASSES.base} p-6 sm:min-w-[200px]`}>
          <div className="flex gap-6 items-center justify-center">
            {currentConfig.style?.map((s) => (
              <div key={s} className="flex flex-col gap-2 justify-center items-center">
                <button
                  type="button"
                  onClick={() => {
                    handleImageGenerationChange({ style: s });
                    closeDropdown();
                  }}
                  className={`border-2 rounded-md duration-300 p-[2px] hover:bg-linkWater dark:hover:bg-blackRussian3
                       ${s === style ? "border-[#30C5D2]" : "border-transparent"}
                       ${isImageGenerating ? "cursor-not-allowed opacity-50" : "cursor-pointer hover:border-[#30C5D2]"} 
                      `}
                >
                  <Image 
                    src={s === "vivid" ? "/assets/images/vivid.svg" : "/assets/images/natural.svg"} 
                    width={56} 
                    height={56} 
                    alt="style logo" 
                    className="rounded"
                  />
                </button>
                <p className="dark:text-white text-black text-sm font-medium">{s.charAt(0).toUpperCase() + s.slice(1)}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default StyleButton;