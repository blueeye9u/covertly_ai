import React from 'react'
import { GoogleIcon } from '../../svgs/svg';
import { useStepAnimation } from '../../utils/animationUtils';

export const GoogleIntegrationAnimation = () => {
  // 8 steps with 500ms delay for each step
  const { currentStep, isTyping, isFadingOut } = useStepAnimation(
    8, // totalSteps
    [500, 500, 500, 500, 500, 500, 500, 500], // stepDelays
    2000 // resetDelay
  );

  return (
    <div className="googleIntegration w-full bg-blackRussian p-2 rounded-xl">
      <div className="flex gap-2 items-center mb-3">
        <div className="googleIntegration_dot1 w-2 h-2 bg-[#D95A57] rounded-full"></div>
        <div className="googleIntegration_dot2 w-2 h-2 bg-[#585A5D] rounded-full"></div>
        <div className="googleIntegration_dot2 w-2 h-2 bg-[#52BE80] rounded-full"></div>
      </div>

      <div className={`px-4 ${isFadingOut ? 'fade-out' : ''}`}>
        <div className="border-b border-blackRussian3 pb-2 mb-3">
          <div className="googleIntegration_search_div w-full h-8 bg-blackRussian3 rounded-full p-2 relative">
            <span className='absolute top-1/2 -translate-y-1/2 left-2'><GoogleIcon/></span>
            <div className={`googleIntegration_search_btn ${isTyping ? "left-2" : "left-[calc(100%-52px)] duration-500"
              }`}>Search</div>
          </div>
        </div>
        <div className="flex justify-between">
          <div className="flex flex-col gap-2">
            <div className={`${currentStep >= 2 ? "fade-in" :"invisible"} googleIntegration_slide1 w-[96px] h-[5px] rounded-full bg-[#404145]`}></div>
            <div className={`${currentStep >= 3 ? "fade-in" :"invisible"} googleIntegration_slide2  w-[76px] h-[5px] rounded-full bg-blackRussian3`}></div>
            <div className={`${currentStep >= 4 ? "fade-in" :"invisible"} googleIntegration_slide3 w-[96px] h-[5px] rounded-full bg-[#404145]`}></div>
            <div className={`${currentStep >= 5 ? "fade-in" :"invisible"} googleIntegration_slide4 w-10 h-[5px] rounded-full bg-blackRussian3`}></div>
          </div>

          <figure className={`${currentStep >= 6 ? "fade-in" :"invisible"} googleIntegration_search googleIntegration_search_animation`}>
            <div className={`${currentStep >= 8 ? "fade-in" :"invisible"} googleIntegration_blue googleIntegration_blue_animation`}></div>
            <div className={`${currentStep >= 7 ? "fade-in" :"invisible"} googleIntegration_green googleIntegration_green_animation`}></div>
          </figure>
        </div>
      </div>
    </div>
  )
}