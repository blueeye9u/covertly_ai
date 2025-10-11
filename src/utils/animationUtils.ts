import { useState, useEffect } from 'react';

/**
 * A custom hook for creating step-based animations with configurable timing
 * 
 * @param totalSteps - The total number of steps in the animation
 * @param stepDelays - Array of delays (in ms) for each step
 * @param resetDelay - Delay before restarting the animation cycle (in ms)
 * @returns Animation state variables and controls
 */
export const useStepAnimation = (
  totalSteps: number,
  stepDelays: number[],
  resetDelay: number = 2000
) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [isTyping, setIsTyping] = useState(true);
  const [isFadingOut, setIsFadingOut] = useState(false);

  useEffect(() => {
    const cycleAnimation = () => {
      setCurrentStep(0);
      setIsTyping(true);
    };

    if (currentStep < totalSteps) {
      const timeout = setTimeout(() => {
        if (currentStep === 0) setIsTyping(false); // Stop typing after step 1
        setCurrentStep((prevStep) => prevStep + 1);
      }, stepDelays[currentStep] || stepDelays[0]);
      return () => clearTimeout(timeout);
    } else {
      setIsFadingOut(true);
      const resetTimeout = setTimeout(() => {
        setIsFadingOut(false);
        cycleAnimation();
      }, resetDelay);
      return () => clearTimeout(resetTimeout);
    }
  }, [currentStep, totalSteps, stepDelays, resetDelay]);

  return {
    currentStep,
    isTyping,
    isFadingOut,
    setCurrentStep,
    setIsTyping,
    setIsFadingOut
  };
};