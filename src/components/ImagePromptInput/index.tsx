import React, { ChangeEvent, KeyboardEvent, useState, useMemo } from "react";
import { toast } from "react-hot-toast";
import { ImSpinner9 } from "react-icons/im";
import { IoMdRefresh } from "react-icons/io";
import NiceModal from "@ebay/nice-modal-react";
import AutoResizeImageChatTextarea from "../AutoResizeImageChatTextarea";
import { Button } from "../global/button/Button";
import { GenerateIcon } from "../../svgs/svg";
import { promptEnhancerService } from "../../services/prompt-enhancer.service";
import { MAX_INPUT_LENGTH_IMAGE_GENERATION } from "../../constants/input-limits";
import { Image_Generation_Model_Data } from "../../constants/image-generation-models-data";
import { useImageGeneration } from "../../context/imageGeneration.context";
import ModelSelectionButton from "./ModelSelectionButton";
import NumberOfImagesButton from "./NumberOfImagesButton";
import DimensionsButton from "./DimensionsButton";
import NegativePromptButton from "./NegativePromptButton";
import StyleButton from "./StyleButton";
import CommonTooltip from "../ComonTooltip";

interface ImagePromptInputProps {
  prompt: string;
  onPromptChange: (e: ChangeEvent<HTMLTextAreaElement>) => void;
  onKeyDown: (e: KeyboardEvent<HTMLTextAreaElement>) => void;
  onGenerate: () => void;
  isGenerating?: boolean;
  disabled?: boolean;
  placeholder?: string;
  className?: string;
  spaceAdd?: boolean;
  maxHeight?: string;
  showImproveButton?: boolean;
  showGenerateButton?: boolean;
  onPromptImprove?: (improvedPrompt: string) => void;
  wasPromptImproved?: boolean;
  selectedImageId?: string;
  originalPrompt?: string;
  showResetButton?: boolean;
}

const ImagePromptInput: React.FC<ImagePromptInputProps> = ({
  prompt,
  onPromptChange,
  onKeyDown,
  onGenerate,
  isGenerating = false,
  disabled = false,
  placeholder = "Describe the image you want to generate",
  className = "",
  spaceAdd = false,
  maxHeight = "175px",
  showImproveButton = true,
  showGenerateButton = true,
  onPromptImprove,
  wasPromptImproved = false,
  selectedImageId,
  originalPrompt,
  showResetButton = true,
}) => {
  const [improving, setImproving] = useState<boolean>(false);
  const { imageGeneration, setImageGeneration } = useImageGeneration();

  const defaultModel = Image_Generation_Model_Data[0];
  const isDefaultState = useMemo(() => {
    return (
      (imageGeneration.model || "") === (defaultModel?.key || "") &&
      (imageGeneration.prompt || "") === "" &&
      (imageGeneration.size || "") === (defaultModel?.size ? defaultModel.size[0] : "") &&
      (imageGeneration.style || "") === (defaultModel?.style ? defaultModel.style[0] : "") &&
      (imageGeneration.negativePrompt || "") === "" &&
      (imageGeneration.count || 1) === (defaultModel?.count ? defaultModel.count[0] : 1)
    );
  }, [imageGeneration]);

  const handleReset = () => {
    if (imageGeneration.isImageGenerating) {
      NiceModal.show("GenerationInProgressModal");
      return;
    }

    // Reset to default values
    setImageGeneration({
      _id: "",
      model: defaultModel.key,
      prompt: "",
      size: defaultModel.size ? defaultModel.size[0] : "",
      style: defaultModel.style ? defaultModel.style[0] : "",
      negativePrompt: "",
      count: defaultModel.count ? defaultModel.count[0] : 1,
      imageUrls: [],
      isImageGenerating: false,
      error: "",
    });

    toast.success("Reset Successfully");
  };

  const handleImprovePrompt = async () => {
    try {
      if (!prompt?.trim()) {
        toast.error("Please enter some text to improve");
        return;
      }

      if (wasPromptImproved) {
        toast.error("This prompt has already been improved. Please modify the prompt to improve it again.");
        return;
      }

      setImproving(true);
      const res = await promptEnhancerService.improvePrompt({ prompt });
      if (res?.payload?.improvedPrompt) {
        if (onPromptImprove) {
          onPromptImprove(res.payload.improvedPrompt);
        }
        toast.success("Prompt improved successfully!");
      } else {
        toast.error("Failed to improve prompt");
      }
    } catch (error) {
      console.error("Error improving prompt:", error);
      toast.error("Failed to improve prompt. Please try again.");
    } finally {
      setImproving(false);
    }
  };

  const promptLength = prompt?.length || 0;
  // Strictly over limit should block actions, but color should warn at the limit
  const exceedsLength = promptLength > MAX_INPUT_LENGTH_IMAGE_GENERATION;
  const atOrExceedsLength = promptLength >= MAX_INPUT_LENGTH_IMAGE_GENERATION;
  const isDisabled = disabled || isGenerating;
  const canImprove = showImproveButton && prompt?.trim() && !isDisabled && !wasPromptImproved;
  const canGenerate = showGenerateButton && prompt?.trim() && !exceedsLength && !isDisabled;
  
  const isExistingImageSelected = Boolean(selectedImageId);
  const isPromptModified = selectedImageId && originalPrompt && prompt !== originalPrompt;
  const buttonLabel = (isExistingImageSelected && !isPromptModified) ? "Regenerate Image" : "Generate Image";

  return (
    <div className="flex flex-col">
      <AutoResizeImageChatTextarea
        placeholder={placeholder}
        value={prompt || ""}
        onChange={onPromptChange}
        onKeyDown={onKeyDown}
        disabled={isDisabled}
        spaceAdd={spaceAdd}
        className={`!px-4 !py-2.5 !pt-8 placeholder:!text-sm lg:sm:placeholder:!text-base ${className}`}
        maxHeight={maxHeight}
        maxLength={MAX_INPUT_LENGTH_IMAGE_GENERATION}
      >
        {showResetButton && (
          <button
            onClick={handleReset}
            disabled={isDefaultState}
            aria-disabled={isDefaultState}
            className={`hover:text-gray-700 flex items-center gap-1 text-greyChateau transition-colors dark:hover:text-white ${
              imageGeneration.isImageGenerating || isDefaultState
                ? "cursor-not-allowed opacity-60"
                : "cursor-pointer"
            }`}
          >
            <CommonTooltip
              position="bottom"
              name={"Reset"}
              className={"mt-4 !px-2 !py-1 !pt-[1px] pb-[5px]"}
            >
              <IoMdRefresh className="text-sm" />
            </CommonTooltip>
            <span className="text-sm dark:text-white">Reset</span>
          </button>
        )}
      </AutoResizeImageChatTextarea>

      <div className="m-1 flex flex-col items-end justify-end">
        <div className="flex flex-wrap items-center gap-2">
          <div
            className={`flex items-center text-xs ${
              atOrExceedsLength
                ? "text-red-500"
                : "text-gray-500 dark:text-gray-400"
            }`}
          >
            {promptLength}/{MAX_INPUT_LENGTH_IMAGE_GENERATION}
          </div>

          {showImproveButton &&
            (improving ? (
              <div className="flex items-center gap-2 rounded-md bg-whiteSmoke px-4 py-2 dark:bg-blackRussian3">
                <ImSpinner9 className="animate-spin text-lg" />
                <span className="text-sm">Improving...</span>
              </div>
            ) : (
              <button
                className={`flex items-center gap-2 rounded-md bg-whiteSmoke px-4 py-2 text-sm text-black transition-colors duration-300 hover:bg-linkWater dark:bg-blackRussian3 dark:text-white dark:hover:bg-blackRussian4 ${
                  canImprove
                    ? "cursor-pointer"
                    : "cursor-not-allowed opacity-25"
                }`}
                disabled={!canImprove}
                onClick={handleImprovePrompt}
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M6.69449 3.0482C6.98277 2.31726 8.01723 2.31727 8.30551 3.0482L9.19886 5.31332C9.28687 5.53648 9.46352 5.71313 9.68668 5.80114L11.9518 6.69449C12.6827 6.98277 12.6827 8.01723 11.9518 8.30551L9.68668 9.19886C9.46352 9.28687 9.28687 9.46352 9.19886 9.68668L8.30551 11.9518C8.01723 12.6827 6.98277 12.6827 6.69449 11.9518L5.80114 9.68668C5.71313 9.46352 5.53648 9.28687 5.31332 9.19886L3.0482 8.30551C2.31726 8.01723 2.31727 6.98277 3.0482 6.69449L5.31332 5.80114C5.53648 5.71313 5.71313 5.53648 5.80114 5.31332L6.69449 3.0482Z"
                    stroke="currentColor"
                    strokeWidth="1.25"
                  />
                  <path
                    d="M13.7401 11.1231C13.8926 10.7363 14.4401 10.7363 14.5926 11.1231L15.2598 12.8147C15.3064 12.9328 15.3998 13.0263 15.5179 13.0729L17.2096 13.7401C17.5964 13.8926 17.5964 14.4401 17.2096 14.5926L15.5179 15.2598C15.3998 15.3064 15.3064 15.3998 15.2598 15.5179L14.5926 17.2096C14.4401 17.5964 13.8926 17.5964 13.7401 17.2096L13.0729 15.5179C13.0263 15.3998 12.9328 15.3064 12.8147 15.2598L11.1231 14.5926C10.7363 14.4401 10.7363 13.8926 11.1231 13.7401L12.8147 13.0729C12.9328 13.0263 13.0263 12.9328 13.0729 12.8147L13.7401 11.1231Z"
                    stroke="currentColor"
                    strokeWidth="1.25"
                  />
                </svg>
                <span className="hidden lg:block">
                  {wasPromptImproved ? "Improved prompt" : "Improve prompt"}
                </span>
              </button>
            ))}
          {/* Image Generation Control Buttons */}
          <NumberOfImagesButton />
          <DimensionsButton />
          <NegativePromptButton />
          <StyleButton />
          <ModelSelectionButton />

          {showGenerateButton && (
            <Button
              size="sm"
              className="!rounded-full lg:!rounded-md"
              disabled={!canGenerate}
              onClick={onGenerate}
            >
              <GenerateIcon />
              <span className="hidden lg:block">{buttonLabel}</span>
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ImagePromptInput;