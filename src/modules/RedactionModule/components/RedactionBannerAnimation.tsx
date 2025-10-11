import Image from 'next/image'
import React, { useEffect, useState } from 'react'

const RedactionBannerAnimation = () => {

    const [currentStep, setCurrentStep] = useState(0);

    useEffect(() => {
        const totalSteps = 18;
        const stepDelays = [500,500,500,500,500,500,500,800,500,500,500,500,500,500,500,500,500,500]; // Adjust timing for smooth flow

        if (currentStep < totalSteps) {
            const timeout = setTimeout(() => {
                setCurrentStep((prev) => prev + 1);
            }, stepDelays[currentStep]);
            return () => clearTimeout(timeout);
        } else {
            // Smooth reset after completion
            setTimeout(() => {
                setTimeout(() => {
                    setCurrentStep(0);
                }, 500);
            }, 500);
        }
    }, [currentStep]);
    return (
        <div className='secure_redaction_animation overflow-hidden  justify-center grow hidden lg:flex'>
            <div className='flex gap-56 items-center justify-center h-full relative py-20'>
                <div className={` ${currentStep >= 1 ? 'secure_redaction_animation_box1' : ''} z-10 w-[327px] h-[400px] p-8 py-10 xs:!px-1 space-y-5 rounded-3xl`}>
                    <p className={`text-lg text-[#A5A6A9] secure_redaction_animation_typing1 ${currentStep >= 2 ? 'fade-in' : 'hidden'}`}>My name is <span className='bg-[#404145] px-3 py-1 inline-block rounded-full text-white'>{"Olivia Butler."}</span></p>
                    <p className={`text-lg text-[#A5A6A9] secure_redaction_animation_typing2 ${currentStep >= 3 ? 'fade-in' : 'hidden'}`}>{"I live in"} <span className='bg-[#404145] px-3 py-1 inline-block rounded-full text-white'>{"86 M Street, Cityville"}</span></p>
                    <p className={`text-lg text-[#A5A6A9] secure_redaction_animation_typing4 ${currentStep >= 4 ? 'fade-in' : 'hidden'}`}>{"and my contact number is"}</p>
                    <p className={`text-lg text-[#A5A6A9] secure_redaction_animation_typing3 ${currentStep >= 5 ? 'fade-in' : 'hidden'}` }><span className='bg-[#404145] px-3 py-1 inline-block rounded-full text-white'>{"(555) 809 3801."}</span> {"You can"}</p>
                    <p className={`text-lg text-[#A5A6A9] secure_redaction_animation_typing4 ${currentStep >= 6 ? 'fade-in' : 'hidden'}`}>{"reach me via email at"}</p>
                    <p className={`text-lg text-[#A5A6A9] secure_redaction_animation_typing5 ${currentStep >= 7 ? 'fade-in' : 'hidden'}`}><span className='bg-[#404145] px-3 py-1 inline-block rounded-full text-white'>{"{oliviabutler01@gmail.com.}"}</span></p>

                </div>
                <div className={` ${currentStep >= 10 ? 'secure_redaction_animation_box2' : ''} z-10 w-[327px] h-[400px] p-8 py-10 xs:!px-1 space-y-5 rounded-3xl -mt-10`}>
                    <p className={`text-lg text-white secure_redaction_animation_typing7 ${currentStep >= 11 ? 'fade-in' : 'hidden'}`}>My name is <span className='backdrop-blur-lg bg-white text-white px-3 py-1 inline-block rounded-full'>Olivia Butler.</span> </p>
                    <p className={`text-lg text-white secure_redaction_animation_typing8 ${currentStep >= 12 ? 'fade-in' : 'hidden'}`}>AI live at <span className='backdrop-blur-lg bg-white text-white px-3 py-1 inline-block rounded-full'>86 M Street, Cityville.</span></p>
                    <p className={`text-lg text-white secure_redaction_animation_typing9 ${currentStep >= 13 ? 'fade-in' : 'hidden'}`}>and my contact number is</p>
                    <p className={`text-lg text-white secure_redaction_animation_typing10 ${currentStep >= 14 ? 'fade-in' : 'hidden'}`}><span className='backdrop-blur-lg bg-white text-white px-3 py-1 inline-block rounded-full'>(555) 809 3801.</span> You can</p>
                    <p className={`text-lg text-white secure_redaction_animation_typing11 ${currentStep >= 15 ? 'fade-in' : 'hidden'}`}> reach me via email at</p>
                    <p className={`text-lg text-white secure_redaction_animation_typing12 ${currentStep >= 16 ? 'fade-in' : 'hidden'}`}> <span className='backdrop-blur-lg bg-white text-white px-3 py-1 inline-block rounded-full'>oliviabutler01@gmail.com.</span></p>
                    {/* <p className={`text-lg text-white secure_redaction_animation_typing13 ${currentStep >= 16 ? 'fade-in' : 'hidden'}`}>powerful LLMs.</p>

                    <div className={`secure_redaction_animation_line1 !mt-2 ${currentStep >= 17 ? 'fade-in' : 'hidden'}`}></div>
                    <div className={`secure_redaction_animation_line2 !mt-2 ${currentStep >= 18 ? 'fade-in' : 'hidden'}`}></div> */}


                </div>
                {/* ${currentStep >= 8 ? 'fade-in' : 'hidden'} */}
                <figure className={`secure_redaction_animation_wireImage relative ${currentStep >= 8 ? 'fade-in' : 'hidden'}`}>
                    <Image className='h-full w-full' src={"/assets/images/redaction/middle-wire.svg"} layout='fill' alt='redaction wire' />
                </figure>

            </div>

        </div>
    )
}

export default RedactionBannerAnimation