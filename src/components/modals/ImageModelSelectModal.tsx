import React from "react";
import NiceModal, { useModal } from "@ebay/nice-modal-react";
import { useRouter } from "next/router";
import BasicModal from "../global/basicmodal/BasicModal";
import ImageComponent from "../global/imageComponent/ImageComponent";
import { useImageGeneration } from "../../context/imageGeneration.context";
import { Image_Generation_Model_Data } from "../../constants/image-generation-models-data";
import { ArrowIcon } from "../../svgs/svg";

const ImageModelSelectModal = NiceModal.create(() => {
  const modal = useModal();
  const router = useRouter();
  const { imageGeneration, setImageGeneration } = useImageGeneration();

  const handleSelectModel = (item: any) => {
    setImageGeneration({
      _id: "",
      model: item.key,
      prompt: "",
      size: item.size ? item.size[0] : "",
      style: item.style ? item.style[0] : "",
      negativePrompt: "",
      count: item.count ? item.count[0] : 1,
      imageUrls: [],
      isImageGenerating: false,
      error: "",
    });
    modal.hide();
    if (router.pathname !== "/image-generate") {
      router.push("/image-generate");
    }
  };

  return (
    <BasicModal show={modal.visible} hide={modal.hide}>
      <div className="rounded-2xl bg-whiteSmoke dark:bg-blackRussian2 p-8 md:p-10 w-full max-w-[44rem] mx-auto relative">
        <div className='absolute flex gap-2 right-0 2xl:-right-32 -top-10'>
          <span>
            <ArrowIcon />
          </span>
          <p className='text-lavender -rotate-12'>Choose the image model</p>
        </div>
        <div>
          <h3 className="text-lg font-semibold text-center text-gray-800 dark:text-gray-200">AI Models</h3>
          <p className="mt-1 mb-6 text-center text-xs text-gray-600 dark:text-gray-300">Pick a model to start generating images</p>
          <div className="mx-auto grid w-full max-w-[520px] grid-cols-1 sm:grid-cols-2 gap-4">
            {Image_Generation_Model_Data.map((item) => {
              const isSelected = imageGeneration.model === item.key;
              return (
                <button
                  key={item.key}
                  className={`group flex items-center gap-4 p-4 rounded-lg border transition-all duration-200 cursor-pointer ${
                    isSelected 
                      ? "border-1 border-scooter bg-scooter/10 shadow-lg ring-2 ring-scooter/20" 
                      : "border-linkWater dark:border-blackRussian3 bg-white dark:bg-blackRussian shadow-sm hover:shadow-md hover:bg-linkWater/50 dark:hover:bg-blackRussian3/60"
                  }`}
                  onClick={() => handleSelectModel(item)}
                >
                <div className="shrink-0 h-9 w-9 rounded-md overflow-hidden flex items-center justify-center bg-whiteSmoke dark:bg-blackRussian2">
                  <ImageComponent
                    src={item.modelIcon || "/assets/images/dark-small-logo.svg"}
                    height={28}
                    width={28}
                    figClassName="shrink-0"
                    className="rounded-md"
                    alt={item.name}
                  />
                </div>
                <div className="flex flex-col items-start text-left">
                  <p className={`text-sm font-medium leading-5 group-hover:opacity-90 ${isSelected ? 'text-scooter' : ''}`}>{item.name}</p>
                  <span className="text-[11px] text-gray-600 dark:text-gray-300">Image Generation</span>
                </div>
              </button>
              );
            })}
          </div>
        </div>
      </div>
    </BasicModal>
  );
});

export default ImageModelSelectModal;


