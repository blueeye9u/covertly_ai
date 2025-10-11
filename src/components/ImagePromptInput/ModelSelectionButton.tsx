import React from "react";
import Image from "next/image";
import { useImageGeneration } from "../../context/imageGeneration.context";
import { Image_Generation_Model_Data } from "../../constants/image-generation-models-data";
import { handleModelChange as handleModelChangeUtil } from "../../utils/imageGenerationUtils";
import { useDropdown, BUTTON_CLASSES, DROPDOWN_CLASSES, ChevronIcon } from "./shared/buttonUtils";

const ModelSelectionButton: React.FC = () => {
  const { showDropdown, toggleDropdown, closeDropdown, containerRef, triggerRef, panelRef, panelStyle } = useDropdown(240);
  
  const { imageGeneration, setImageGeneration } = useImageGeneration();
  const { model, isImageGenerating } = imageGeneration;
  
  const currentConfig = Image_Generation_Model_Data.find(config => config.key === model) || Image_Generation_Model_Data[0];

  const handleModelSelection = (modelKey: string) => {
    const updatedImageGeneration = handleModelChangeUtil(imageGeneration, modelKey);
    setImageGeneration(updatedImageGeneration);
    closeDropdown();
  };

  return (
    <div className="relative" ref={containerRef}>
      <button
        className={BUTTON_CLASSES.base}
        onClick={toggleDropdown}
        ref={triggerRef}
        disabled={isImageGenerating}
      >
        <figure className="bg-primary-100 rounded-full">
          <Image src={currentConfig.modelIcon ?? ""} alt="model-icon" height={20} width={20} className="rounded-full"/>
        </figure>
        <span className="hidden lg:block">{currentConfig.name}</span>
        <ChevronIcon isOpen={showDropdown} />
      </button>
      {showDropdown && (
        <div ref={panelRef} style={panelStyle} className={`${DROPDOWN_CLASSES.base} py-2 sm:min-w-[180px]`}>
          {Image_Generation_Model_Data.map((config) => (
            <button
              key={config.key}
              className={`${DROPDOWN_CLASSES.item} flex items-center gap-2 ${
                model === config.key
                  ? DROPDOWN_CLASSES.itemSelected
                  : DROPDOWN_CLASSES.itemDefault
              }`}
              onClick={() => handleModelSelection(config.key)}
            >
              <figure className="bg-primary-100 rounded-full">
                <Image src={config.modelIcon ?? ""} alt="model-icon" height={16} width={16} className="rounded-full"/>
              </figure>
              <span>{config.name}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default ModelSelectionButton;