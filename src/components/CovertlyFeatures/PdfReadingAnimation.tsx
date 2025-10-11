import React, { useEffect, useState } from "react";

const PdfReadingAnimation = () => {

    const [currentStep, setCurrentStep] = useState(0);
    const [isResetting, setIsResetting] = useState(false);

    useEffect(() => {
        const totalSteps = 10;
        const stepDelays = [500,500,500,500,500,500,500,500,500,500]; // Adjust timing for smooth flow

        if (currentStep < totalSteps) {
            const timeout = setTimeout(() => {
                setCurrentStep((prev) => prev + 1);
            }, stepDelays[currentStep]);
            return () => clearTimeout(timeout);
        } else {
            // Smooth reset after completion
            setTimeout(() => {
                setIsResetting(true);
                setTimeout(() => {
                    setCurrentStep(0);
                    setIsResetting(false);
                }, 500);
            }, 500);
        }
    }, [currentStep]);
   
    return (
        <div className={`${isResetting ? 'fade-out' : ''} pdf_reading_animation`}>
            <div className={`${currentStep >= 1 ? 'fade-in' : 'hidden'} pdf_reading_animation_pdf-container w-[180px] mx-auto h-[160px] bg-[#101217] rounded-3xl mb-9 gap-1 flex flex-col text-center py-3 px-4`}>
                    <p className={`text-[10px] text-white pdf_reading_animation_typing1 text-start p-[2px] ${currentStep >= 2 ? 'fade-in' : 'hidden'}`}>
                        Covertly AI is Completely
                    </p>

                    <p className={`text-[10px] text-white pdf_reading_animation_typing2 text-start p-[2px] ${currentStep >= 8 ? 'bg-[#404145] !w-[20.5ch]' : ''} rounded-sm ${currentStep >= 3 ? 'fade-in' : 'hidden'}`}>
                        Anonymous, Uncoderate and
                    </p>

                    <p className={`text-[10px] text-white pdf_reading_animation_typing3 text-start p-[2px] ${currentStep >= 4 ? 'fade-in' : 'hidden'}`}>
                        <span className={`${currentStep >= 9 ? 'bg-[#404145] p-[2px] rounded-sm' : ''} `}>Secure.</span> Effortlessly Streamline
                    </p>

                    <p className={`text-[10px] text-white pdf_reading_animation_typing4 text-start p-[2px] ${currentStep >= 5 ? 'fade-in' : 'hidden'}`}>
                        Your AI Workflow and Maximize
                    </p>

                    <p className={`text-[10px] text-white pdf_reading_animation_typing5 text-start p-[2px] ${currentStep >= 6 ? 'fade-in' : 'hidden'}`}>
                        Productivity With Our Powerful
                    </p>

                    <p className={`text-[10px] text-white pdf_reading_animation_typing6 text-start p-[2px] rounded-sm ${currentStep >= 10 ? 'bg-[#404145] !w-[5ch]' : ''}  ${currentStep >= 7 ? 'fade-in' : 'hidden'}`}>
                       LLMs.
                    </p>
              
            </div>
        </div>
    );
};

export default PdfReadingAnimation;
