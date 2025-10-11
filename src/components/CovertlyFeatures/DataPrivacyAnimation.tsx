import Image from 'next/image';
import React, { useEffect, useState } from 'react';

const DataPrivacyAnimation = () => {
    const [currentStep, setCurrentStep] = useState(0);
    const [isResetting, setIsResetting] = useState(false);

    useEffect(() => {
        const totalSteps = 5;
        const stepDelays = [500, 500, 500, 500, 500]; // Adjust timing for smooth flow

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
                }, 1500);
            }, 2500);
        }
    }, [currentStep]);

    return (
        <div className={`dataPrivacy`}>
            <div className={`${isResetting ? 'fade-out' : ''}`}>
                <div className={`dataPrivacy_line1 ${currentStep >= 1 ? 'fade-in' : 'hidden'}`}/>
                <div className={`dataPrivacy_line2 ${currentStep >= 2 ? 'fade-in' : 'hidden'}`}/>
                <div className={`dataPrivacy_line3 ${currentStep >= 3 ? 'fade-in' : 'hidden'}`}/>
                <button className={`dataPrivacy_btn ${currentStep >= 4 ? 'fade-in' : 'hidden'}`}>Explore</button>
                <figure className={`dataPrivacy_lock_img  ${currentStep >= 5 ? 'fade-in' : 'hidden'}`}>
                    <Image src="/assets/images/covertly-features/data-privacy/lock.webp" alt="lock" width={120} height={120} />
                </figure>
            </div>
        </div>

    );
};

export default DataPrivacyAnimation;
