import React from "react";
import Image from "next/image";
import { v4 as uuidv4 } from "uuid";
import { useStepAnimation } from "../../utils/animationUtils";

const AiGeneratedAnimation = () => {
  // 4 steps with 500ms delay for each step
  const { currentStep, isTyping, isFadingOut } = useStepAnimation(
    4, // totalSteps
    [500, 500, 500, 500], // stepDelays
    2000 // resetDelay
  );

  return (
    <div className="gaiGeneration w-full bg-blackRussian p-2 rounded-xl">
      <div className="flex gap-2 items-center mb-3">
        <div className="googleIntegration_dot1 w-2 h-2 bg-[#D95A57] rounded-full"></div>
        <div className="googleIntegration_dot2 w-2 h-2 bg-[#585A5D] rounded-full"></div>
        <div className="googleIntegration_dot3 w-2 h-2 bg-[#52BE80] rounded-full"></div>
      </div>
      <div className={`px-4 ${isFadingOut ? 'fade-out' : ''}`}>
        <div className="border-b border-blackRussian3 pb-2 mb-3">
          <div className="gaiGeneration_search_div w-full h-8 bg-blackRussian3 rounded-full p-2 relative">
            <div
              className={`gaiGeneration_search_btn ${
                isTyping ? "left-2" : "left-[calc(100%-52px)] duration-500"
              }`}
            >
              Search
            </div>
          </div>
        </div>
        <div className={`grid grid-cols-3 gap-2`}>
          {[
            { step: 1, src: "/assets/images/ai-generated-library/ai-generated-library-01.webp" },
            { step: 2, src: "/assets/images/ai-generated-library/ai-generated-library-02.webp" },
            { step: 3, src: "/assets/images/ai-generated-library/ai-generated-library-03.webp" },
          ].map((item) => (
            <div key={uuidv4()} className="relative">
              <Image
                width={52}
                height={52}
                className="absolute top-0 left-0 w-full"
                src="/assets/images/ai-generated-library/ai-generated-library-skelton-img.webp"
                alt={`skeleton-image-${uuidv4()}`}
              />
              <Image
                width={52}
                height={52}
                className={`${
                  currentStep > item.step ? "fade-in" : "invisible"
                } gaiGeneration_image w-full ${item.step}`}
                src={item.src}
                alt={`Image ${item.step}`}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AiGeneratedAnimation;