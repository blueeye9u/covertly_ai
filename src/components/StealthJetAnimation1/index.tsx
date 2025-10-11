'use client';

import React, { useEffect, useState, useRef } from 'react';
import Image from 'next/image';

interface StealthJetAnimation1Props {
    buttonRef: React.RefObject<HTMLElement>;
    className?: string;
    // Configuration props for scale, distance, and movement
    config?: {
        initialScale?: number; // Starting scale of the jet
        maxScale?: number; // Maximum scale as it approaches
        distance?: number; // How far above the button to start
        scrollSensitivity?: number; // How much scroll distance to complete animation
        zDistance?: number; // How much the jet moves "forward" (simulated with scale)
        downwardMovement?: number; // How much the jet moves down when scrolling (in pixels)
    };
}

const StealthJetAnimation1: React.FC<StealthJetAnimation1Props> = ({
    buttonRef,
    className = '',
    config = {}
}) => {
    const jetRef = useRef<HTMLDivElement>(null);
    const [imageLoaded, setImageLoaded] = useState(false);

    // Note: Config props are kept for backwards compatibility but not used in new script-based logic

    // Track jet position and visibility based on button viewport position
    const [jetState, setJetState] = useState({ opacity: 0, width: 0, height: 0, top: 0 });
    const [maxWidth, setMaxWidth] = useState(0);
    const [maxHeight, setMaxHeight] = useState(0);

    // Preload the jet image to ensure it's ready when animation starts
    useEffect(() => {
        const img = new globalThis.window.Image();
        img.onload = () => setImageLoaded(true);
        img.onerror = () => setImageLoaded(true); // Still allow animation even if image fails
        img.src = '/assets/images/stealth-jet-flip.png';
    }, []);  

    // Initialize max dimensions
    useEffect(() => {
        const updateMaxDimensions = () => {
            const newMaxWidth = window.innerWidth;
            const newMaxHeight = newMaxWidth / 3; // 3 times as wide as tall
            setMaxWidth(newMaxWidth);
            setMaxHeight(newMaxHeight);
        };

        updateMaxDimensions();
        window.addEventListener('resize', updateMaxDimensions);
        return () => window.removeEventListener('resize', updateMaxDimensions);
    }, []);

    const calculateProgress = (buttonRect: DOMRect, vh: number) => {
        const animationTriggerPoint = vh * 0.7;
        if (buttonRect.top > animationTriggerPoint) {
            return { progress: 0, scaleProgress: 0 };
        }

        const extendedAnimationDistance = vh * 1.5;
        const progress = Math.max(0, Math.min(1, (animationTriggerPoint - buttonRect.top) / extendedAnimationDistance));
        
        const scaleDistance = vh * 1.2;
        const scaleProgress = Math.max(0, Math.min(1, (animationTriggerPoint - buttonRect.top) / scaleDistance));
        
        return { progress, scaleProgress };
    };

    const applyEasing = (progress: number) => {
        if (progress < 0.67) {
            return Math.pow(progress / 0.67, 2.5) * 0.67;
        }
        return 0.67 + Math.pow((progress - 0.67) / 0.33, 1.5) * 0.33;
    };

    const calculateScale = (scaleProgress: number) => {
        const scaleEaseInProgress = applyEasing(scaleProgress);
        const minScale = 0.05;
        const maxScale = 1;
        return minScale + (scaleEaseInProgress * (maxScale - minScale));
    };

    const calculateOpacity = (buttonRect: DOMRect, scaleProgress: number, top: number, vh: number) => {
        if (buttonRect.top > vh || buttonRect.top < -vh) {
            return 0;
        }

        if (scaleProgress === 0) {
            return 0.01;
        }

        const isAtOrPastButton = top >= buttonRect.top;
        if (isAtOrPastButton) {
            return 1;
        }

        const fastOpacityProgress = 1 - Math.pow(1 - scaleProgress, 1.5);
        const opacity = 0.01 + (fastOpacityProgress * 0.99);
        
        if (scaleProgress >= 0.3 && opacity < 0.8) {
            return Math.max(opacity, 0.8);
        }
        
        return opacity;
    };

    const isJetVisible = (buttonRect: DOMRect, vh: number) => {
        return buttonRect.top < vh && buttonRect.bottom > -vh;
    };

    useEffect(() => {
        let rafId: number;
        
        const updateJet = () => {
            if (rafId) {
                cancelAnimationFrame(rafId);
            }
            
            rafId = requestAnimationFrame(() => {
                const button = buttonRef.current;
                if (!button || maxWidth === 0 || !imageLoaded) return;

                const buttonRect = button.getBoundingClientRect();
                const vh = window.innerHeight;

                if (!isJetVisible(buttonRect, vh)) {
                    setJetState({ opacity: 0, width: 0, height: 0, top: 0 });
                    return;
                }

                const { progress, scaleProgress } = calculateProgress(buttonRect, vh);
                const easeInProgress = applyEasing(progress);
                const scale = calculateScale(scaleProgress);
                
                const width = maxWidth * scale;
                const height = maxHeight * scale;
                
                const fixedStartTop = buttonRect.top - 220;
                const extendedEndTop = vh * 2;
                const top = progress === 0 ? fixedStartTop : fixedStartTop + easeInProgress * (extendedEndTop - fixedStartTop);
                
                const opacity = calculateOpacity(buttonRect, scaleProgress, top, vh);

                setJetState({ opacity, width, height, top });
            });
        };

        window.addEventListener('scroll', updateJet, { passive: true });
        window.addEventListener('resize', updateJet);
        updateJet(); // Initial call

        return () => {
            window.removeEventListener('scroll', updateJet);
            window.removeEventListener('resize', updateJet);
            if (rafId) {
                cancelAnimationFrame(rafId);
            }
        };
    }, [buttonRef, maxWidth, maxHeight, imageLoaded]);

    const getJetTransform = () => {
        // Use the jetState calculated in the useEffect
        return {
            position: 'fixed' as const,
            left: '50%', // Horizontally centered
            top: `${jetState.top}px`,
            width: `${jetState.width}px`,
            height: `${jetState.height}px`,
            opacity: jetState.opacity,
            transform: 'translateX(-50%) rotate(180deg)',
            zIndex: 10,
            transition: 'none' // Remove CSS transition to rely on scroll-driven animation only
        };
    };

    const jetStyles = getJetTransform();

    if (jetState.opacity === 0) {
        return null;
    }

    return (
        <div
            ref={jetRef}
            className={`pointer-events-none relative ${className}`}
            style={jetStyles}
        >
            <Image
                src="/assets/images/stealth-jet-flip.png"
                alt="Stealth Jet"
                fill
                className="object-contain"
                priority
            />
        </div>
    );
};

export default StealthJetAnimation1;