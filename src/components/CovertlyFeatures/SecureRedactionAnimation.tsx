import React, { useEffect, useState } from 'react';
import Image from 'next/image';

const SecureRedactionAnimation = () => {
    const [currentStep, setCurrentStep] = useState(0);

    const totalSteps = 18;
    const stepDelays = [500, 500, 500, 500, 500, 500, 500, 800, 500, 500, 500, 500, 500, 500, 500, 500, 500, 500];

    const handleStepChange = () => {
        if (currentStep < totalSteps) {
            setTimeout(() => {
                setCurrentStep((prev) => prev + 1);
            }, stepDelays[currentStep]);
        } else {
            setTimeout(() => {
                setTimeout(() => {
                    setCurrentStep(0);
                }, 500);
            }, 500);
        }
    };

    useEffect(() => {
        handleStepChange();
    }, [currentStep]);

    const renderBox1Content = () => (
        <div className={`${currentStep >= 1 ? 'secure_redaction_animation_box1' : ''} sm:w-[130px] w-[100px] xs:!w-[60px] sm:h-[165px] h-[150px] xs:!h-[130px] p-4 xs:!px-1 space-y-3 rounded-lg`}>
            {[
                { step: 2, text: <>My name is <span className="bg-[#404145] p-1 rounded-md text-white">{"{NAME-1}."}</span></> },
                { step: 3, text: <>I live in <span className="bg-[#404145] p-1 rounded-md text-white">{"Location"}</span> and</> },
                { step: 4, text: <>make $ <span className="bg-[#404145] p-1 rounded-md text-white">{"{Money-1}"}</span> per </> },
                { step: 5, text: <>year as a <span className="bg-[#404145] p-1 rounded-md text-white">{"{Occupation-1}"}</span>.</> },
                { step: 6, text: <>My birthday is <span className="bg-[#404145] p-1 rounded-md text-white">{"{DOB-1}"}</span></> },
                { step: 7, text: <>so I&apos;m <span className="bg-[#404145] p-1 rounded-md text-white">{"{AGE-1}"}</span> year old.</> },
            ].map((item, index) => (
                <p key={item.step} className={`sm:text-[8px] text-[6px] xs:!text-[4px] text-[#A5A6A9] secure_redaction_animation_typing${index + 1} ${currentStep >= item.step ? 'fade-in' : 'hidden'}`}>
                    {item.text}
                </p>
            ))}
        </div>
    );

    const renderBox2Content = () => (
        <div className={`${currentStep >= 9 ? 'secure_redaction_animation_box2' : ''} sm:w-[130px] w-[100px] xs:!w-[60px] sm:h-[170px] h-[155px] xs:!h-[135px] p-4 xs:!px-1 space-y-1 rounded-lg -mt-10`}>
            {[
                { step: 10, text: <> Covertly AI is <span className="backdrop-blur-lg bg-[#88898B] text-[#88898B] rounded-sm p-[2px]">completely</span></> },
                { step: 11, text: 'Anonymous, Secure and' },
                { step: 12, text: 'Unmoderated. Effortlessly' },
                { step: 13, text: 'Streamline your AI' },
                { step: 14, text: <> <span className="backdrop-blur-lg bg-[#88898B] text-[#88898B] rounded-sm p-[2px]">Workflow</span> and Maximize </>},
                { step: 15, text: 'Productivity with our' },
                { step: 16, text: 'powerful LLMs.' },
            ].map((item, index) => (
                <p key={item.step} className={`sm:text-[8px] text-[6px] xs:!text-[4px] text-white secure_redaction_animation_typing${index + 7} ${currentStep >= item.step ? 'fade-in' : 'hidden'}`}>
                    {item.text}
                </p>
            ))}
            <div className={`secure_redaction_animation_line1 !mt-2 ${currentStep >= 17 ? 'fade-in' : 'hidden'}`}></div>
            <div className={`secure_redaction_animation_line2 !mt-2 ${currentStep >= 18 ? 'fade-in' : 'hidden'}`}></div>
        </div>
    );

    const renderImage = () => (
        <figure className={`secure_redaction_animation_image ${currentStep >= 8 ? 'fade-in' : 'hidden'}`}>
            <Image className='h-full w-full' src={"/assets/images/covertly-features/redaction-wire.svg"} layout='fill' alt='redaction wire' />
        </figure>
    );

    return (
        <div className='secure_redaction_animation overflow-hidden flex justify-center grow'>
            <div className='flex sm:gap-16 gap-10 items-center justify-center h-full relative'>
                {renderBox1Content()}
                {renderImage()}
                {renderBox2Content()}
            </div>
        </div>
    );
};

export default SecureRedactionAnimation;