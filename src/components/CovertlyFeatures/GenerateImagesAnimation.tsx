import Image from 'next/image';
import React, { useEffect, useState } from 'react';

const GenerateImagesAnimation = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [resetTyping, setResetTyping] = useState(false); // For resetting the typing animation
  const [isFadingOut, setIsFadingOut] = useState(false); // For fade-out effect

  useEffect(() => {
    const totalSteps = 7; // Total animation steps
    const stepDelays = [500, 500, 500, 500, 500, 500, 500, 700]; // Timing for each step in ms

    if (currentStep < totalSteps) {
      const timeout = setTimeout(() => {
        setCurrentStep((prevStep) => prevStep + 1);
      }, stepDelays[currentStep]);
      return () => clearTimeout(timeout);
    } else {
      // Trigger fade-out before resetting
      setIsFadingOut(true);
      const resetTimeout = setTimeout(() => {
        setCurrentStep(0);
        setIsFadingOut(false);
        setResetTyping(true);
        setTimeout(() => setResetTyping(false), 1000);
      }, 2000); // Adjust as needed for fade-out duration
      return () => clearTimeout(resetTimeout);
    }
  }, [currentStep]);

  return (
    <div className={`generateImages w-full bg-blackRussian p-2 rounded-xl h-full`}>
      <div className="flex gap-2 items-center mb-3">
        <div className="googleIntegration_dot1 w-2 h-2 bg-[#D95A57] rounded-full"></div>
        <div className="googleIntegration_dot2 w-2 h-2 bg-[#585A5D] rounded-full"></div>
        <div className="googleIntegration_dot2 w-2 h-2 bg-[#52BE80] rounded-full"></div>
      </div>

      <div className={`px-4 ${isFadingOut ? 'fade-out' : ''}`}>
        <div className="border-b border-blackRussian3 pb-2 mb-3">
          <div className="w-full h-[32px] bg-blackRussian3 rounded-full flex justify-between items-center px-2">
            <p className={`text-[8px] ${resetTyping ? 'reset-typing generateImages_typing' : ''}`}>
              Write your prompt...
            </p>
            <div className={`${currentStep == 1 ? 'scale-110 duration-300' : ''} generateImages_send_btn w-11 h-6 bg-blackRussian text-[8px] flex justify-center items-center rounded-full`}>
              Send
            </div>
          </div>
        </div>

        <p className={`generateImages_text text-[10px] mb-3 ${currentStep >= 2 ? 'fade-in' : 'invisible'}`}>
          Create an image of a robot exploring an alien landscape, interacting with the environment.
        </p>

        <div className={`generateImages_slide1 ${currentStep >= 3 ? 'fade-in' : 'invisible'}`}/>
        <div className={`generateImages_slide2 ${currentStep >= 4 ? 'fade-in' : 'invisible'}`}/>

        <figure>
          <Image
            src={'/assets/images/generate-images/generate-image-01.webp'}
            className={`mb-3 w-full generateImages_01 ${currentStep >= 5 ? 'fade-in' : 'invisible'}`}
            alt="featureImage"
            width={185}
            height={130}
          />
          <Image
            src={'/assets/images/generate-images/generate-image-02.webp'}
            className={`mb-3 w-full generateImages_02 ${currentStep >= 6 ? 'fade-in' : 'invisible'}`}
            alt="generate-image"
            width={183}
            height={222}
          />
          <p className={`generateImages_powered text-[10px] ${currentStep >= 7 ? 'fade-in' : 'invisible'}`}>
            Powered by DELL.E 3
          </p>
        </figure>
      </div>
    </div>
  );
};

export default GenerateImagesAnimation;
