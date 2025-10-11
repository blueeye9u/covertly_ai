import React, { useEffect, useState } from 'react'

const AnonymousAnimation = () => {

    const [currentStep, setCurrentStep] = useState(1);

    useEffect(() => {
      const stepDelays = [0, 6500, 6500, 4500]; // Step 1 starts instantly, others take 4.5s
  
      const timeout = setTimeout(() => {
        if (currentStep < 3) {
          setCurrentStep((prevStep) => prevStep + 1);
        } else {
          setCurrentStep(1); // Instantly restart to Step 1 after Step 3
        }
      }, stepDelays[currentStep]);
  
      return () => clearTimeout(timeout);
    }, [currentStep]);
    return (
        <div className="anonymousInteraction w-full bg-blackRussian p-2 rounded-xl pb-5">
            <div className="flex gap-2 items-center mb-3">
                <div className="anonymousInteraction_dot1 w-2 h-2 bg-[#D95A57] rounded-full"></div>
                <div className="anonymousInteraction_dot2 w-2 h-2 bg-[#585A5D] rounded-full"></div>
                <div className="anonymousInteraction_dot2 w-2 h-2 bg-[#52BE80] rounded-full"></div>
            </div>
            <div className='px-4 xs:px-2'>
            <p className='text-center text-white font-medium mb-2'>Secret Key Login (NO NAME, NO EMAIL)</p>
            <span className='text-manatee text-center text-[10px] mb-6 xs:mb-3 block'>Your unique 18-digit key is a cryptographic secret known only to you.</span>
            {/*  */}
            <div className={`${currentStep >= 3 ? " anonymousInteraction_animation_bg" :"bg-[#404145]"} max-w-[353px] mx-auto h-12 xs:h-8 rounded-full p-[1px] mb-6`}>
                <div className='w-full h-full flex justify-center items-center bg-blackRussian rounded-full px-4'>
                    {currentStep == 1 &&<p className={`${currentStep >= 1 ? 'fade-in' : 'hidden'} leading-0 text-lg xs:text-sm mt-2 anonymousInteraction_typing text-center`}>***** - **** - **** - *****</p>}
                   {(currentStep == 2 || currentStep == 3) && <p className={`${(currentStep >= 2 || currentStep >= 3) ? 'fade-in' : 'hidden'} text-[#30C5D2] text-lg xs:text-sm anonymousInteraction_typing text-center`}>GM456 - BGY0 - N86T-89UK0</p>}
                </div>
            </div>

            <div className='w-[171px] h-[5px] mb-2 rounded-full mx-auto bg-[#282A2F]'></div>
            <div className='w-[77px] h-[5px] rounded-full mx-auto bg-[#282A2F]'></div>
            </div>

        </div>
    )
}

export default AnonymousAnimation