import React, { ChangeEvent, KeyboardEvent, useState, useEffect } from "react";
import NiceModal from "@ebay/nice-modal-react";
import { useImageGeneration } from "../../../context/imageGeneration.context";
import ImageAnswer from "./image-answer";
import ImageSidebar from "../../ImageSidebar/ImageSidebar";
import Sidebar from "../../Sidebar";
import ImageGenerationHeader from "../../ImageGenerationHeader";
import { imageGenerationService } from "../../../services/image-generate";
import useSubscriptionPackage from "../../../hooks/useSubscriptionPackage";
import { MAX_INPUT_LENGTH_IMAGE_GENERATION } from "../../../constants/input-limits";
import ImagePromptInput from "../../ImagePromptInput";
import { InfoIcon } from "../../../svgs/svg";

// Define the shape of the imageGeneration state
interface ImageGenerationState {
  prompt: string;
  model: string;
  size: string;
  style: string;
  negativePrompt: string;
  count: number;
  isImageGenerating: boolean;
  error?: string;
  [key: string]: any; // Allow additional properties for flexibility
}

// Define the shape of the subscription package hook return
interface SubscriptionPackage {
  validateImageSubscription: (model: string) => boolean;
}

export default function ImageChatBox(): JSX.Element {
  const { imageGeneration, setImageGeneration, setImageGenerationLibrary } = useImageGeneration() as {
    imageGeneration: ImageGenerationState;
    setImageGeneration: (state: ImageGenerationState) => void;
    setImageGenerationLibrary: (state: any) => void;
  };
  const { validateImageSubscription }: SubscriptionPackage = useSubscriptionPackage();
  const [wasPromptImproved, setWasPromptImproved] = useState<boolean>(false);
  const [originalPrompt, setOriginalPrompt] = useState<string>("");
  
  // Sidebar state management
  const [toggleSidebar, setToggleSidebar] = useState<boolean>(true);
  const [switchSidebar, setSwitchSidebar] = useState<boolean>(true);
  const [switchSmallSidebar, setSwitchSmallSidebar] = useState<boolean>(false);
  
  useEffect(() => {
    if (imageGeneration._id && imageGeneration.prompt) {
      setOriginalPrompt(imageGeneration.prompt);
    } else {
      setOriginalPrompt("");
    }
  }, [imageGeneration._id]);

  const handleChange = async (e: ChangeEvent<HTMLTextAreaElement>) => {
    if (!validateImageSubscription(imageGeneration.model)) {
      NiceModal.show("subscriptionModal");
      return;
    }
    setImageGeneration({ ...imageGeneration, prompt: e.target.value });
    if (wasPromptImproved) setWasPromptImproved(false);
  };

  const handlePromptImprove = (improvedPrompt: string) => {
    setImageGeneration({ ...imageGeneration, prompt: improvedPrompt });
    setWasPromptImproved(true);
  };

  const handleSuccessfulGeneration = (response: any) => {
    if (response?.payload?.image && typeof response.payload.image === "object") {
      setImageGeneration({ ...response.payload.image, isImageGenerating: false });

      setImageGenerationLibrary((prev: any) => ({
        records: [response.payload.image, ...prev.records],
        paginationInfo: {
          ...prev.paginationInfo,
          totalRecords: prev.paginationInfo.totalRecords + 1,
        }
      }));
    }
  };

  const handleGenerationError = (error: unknown) => {
    const errorMessage = (error as any)?.response?.data?.message ??
      "Unable to generate image. Please try again.";
    setImageGeneration({
      ...imageGeneration,
      isImageGenerating: false,
      error: errorMessage
    });
  };

  const handleImageGenerate = async () => {
    if (!checkGenerationPreconditions()) return;

    try {
      setImageGeneration({
        ...imageGeneration,
        isImageGenerating: true,
        error: ""
      });

      const response = await imageGenerationService.postImageGeneration({
        prompt: imageGeneration.prompt,
        model: imageGeneration.model,
        size: imageGeneration.size,
        style: imageGeneration.style,
        negativePrompt: imageGeneration.negativePrompt,
        count: imageGeneration.count,
      });

      handleSuccessfulGeneration(response);
    } catch (error) {
      handleGenerationError(error);
    }
  };

  const checkGenerationPreconditions = (): boolean => {
    if (!validateImageSubscription(imageGeneration.model)) {
      NiceModal.show("subscriptionModal");
      return false;
    }
    if (imageGeneration?.isImageGenerating || !imageGeneration?.prompt?.trim()) {
      return false;
    }
    return true;
  };

  const handleInputKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey && imageGeneration.prompt.length > MAX_INPUT_LENGTH_IMAGE_GENERATION) {
      e.preventDefault(); // Prevent submission at character limit
      return;
    }
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleImageGenerate();
    } else if (e.key === "Enter" && e.shiftKey) {
      handleShiftEnter(e);
    }
  };

  const handleShiftEnter = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    e.preventDefault();
    const textarea = e.currentTarget;
    const { selectionStart, selectionEnd } = textarea;

    const newValue = insertNewlineAtCursor(
      textarea.value,
      selectionStart,
      selectionEnd
    );

    setImageGeneration({ ...imageGeneration, prompt: newValue });

    textarea.selectionStart = textarea.selectionEnd = selectionStart + 1;
  };

  const insertNewlineAtCursor = (
    value: string,
    start: number,
    end: number
  ): string => {
    return `${value.slice(0, start)}\n${value.slice(end)}`;
  };

  const renderErrorState = () => (
    <div className="flex flex-col items-center justify-center h-full w-full">
      <div className="flex gap-2 items-center border border-[#f93a37] rounded-md p-2 error_background">
        <span className="text-[#f93a37]"><InfoIcon /></span>
        <p>{imageGeneration.error}</p>
      </div>
    </div>
  );

  const renderMainContent = () => (
    <div className={`relative mx-auto w-full flex grow flex-col`}>
      <ImageAnswer/>
    </div>
  );

  useEffect(() => {
    if (globalThis.window !== undefined) {
      const isMobile = globalThis.window.matchMedia('(max-width: 639px)').matches;
      if (isMobile) {
        setToggleSidebar(true);
      }
    }
  }, [])

  useEffect(() => {
    if (globalThis.window === undefined) return;

    const applyResponsiveSidebarState = () => {
      if (setSwitchSmallSidebar) {
        const isMobile = window.innerWidth < 767;
        setSwitchSmallSidebar(isMobile);
      }
    };

    applyResponsiveSidebarState();

    window.addEventListener("resize", applyResponsiveSidebarState);
    return () => {
      window.removeEventListener("resize", applyResponsiveSidebarState);
    };
  }, [setSwitchSidebar, setSwitchSmallSidebar]);

  return (
    <>
      {/* Layout with sidebars similar to chat */}
      <main id={'main'} className={`main chatBootmain pl-0 md:pl-20 ${
        switchSidebar ? "md:pl-[368px]" : ""
      } ${switchSmallSidebar ? "md:pl-[260px]" : ""} duration-500`}>
        {/* Main navigation sidebar */}
        <Sidebar 
          toggleSidebar={toggleSidebar} 
          setToggleSidebar={setToggleSidebar} 
          setSwitchSidebar={setSwitchSidebar} 
          switchSidebar={switchSidebar} 
          setSwitchSmallSidebar={setSwitchSmallSidebar} 
          switchSmallSidebar={switchSmallSidebar}
        />
        {!toggleSidebar && (
          <button
            type="button"
            aria-label="Close sidebar"
            onClick={() => {
              setToggleSidebar(true);
              setSwitchSidebar(false);
              if (setSwitchSmallSidebar) {
                setSwitchSmallSidebar(true);
              }
            }}
            className="fixed inset-0 z-10 bg-black/50 md:hidden"
          />
        )}
        
        {/* Image history sidebar */}
        <ImageSidebar 
          switchSidebar={switchSidebar} 
          setSwitchSmallSidebar={setSwitchSmallSidebar} 
          switchSmallSidebar={switchSmallSidebar}
        />

        {/* Main content area */}
        <div className={"chatBoot w-full"}>
          <ImageGenerationHeader 
            toggleSidebar={toggleSidebar}
            setToggleSidebar={setToggleSidebar}
            switchSidebar={switchSidebar}
            switchSmallSidebar={switchSmallSidebar}
          />
          
          <div className="grow flex flex-col pt-20 pb-6">
            {imageGeneration.error ? renderErrorState() : renderMainContent()}

            <div className={`chatBoot__foot`}>
              <div className="chatBoot__container relative !max-w-full">
                <div className={"relative flex md:flex-row md:gap-0 gap-3 flex-col chatBoot__container__textarea"}>
                  <div className="relative w-full flex flex-col pt-2 group !border border-transparent dark:border-blackRussian3 focus-within:!border-blue-500 rounded-md">
                    <ImagePromptInput
                      prompt={imageGeneration?.prompt || ""}
                      onPromptChange={handleChange}
                      onKeyDown={handleInputKeyDown}
                      onGenerate={handleImageGenerate}
                      isGenerating={imageGeneration?.isImageGenerating}
                      disabled={imageGeneration?.isImageGenerating}
                      placeholder="Describe the image you want to generate"
                      className="!max-w-full"
                      maxHeight="175px"
                      onPromptImprove={handlePromptImprove}
                      wasPromptImproved={wasPromptImproved}
                      selectedImageId={imageGeneration?._id}
                      originalPrompt={originalPrompt}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}