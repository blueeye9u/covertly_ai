'use client';

import { useEffect, useState, useRef } from 'react';
import Image from 'next/image';

interface StealthJetAnimationProps {
    className?: string;
    scrollRange?: number; // Total scroll distance for complete animation
    buttonRef: React.RefObject<HTMLElement>; // Ref to the button element to orbit around
}

const StealthJetAnimation: React.FC<StealthJetAnimationProps> = ({
                                                                     className = '',
                                                                     scrollRange = 300,
                                                                     buttonRef
                                                                 }) => {
    const [scrollY, setScrollY] = useState(0);
    const containerRef = useRef<HTMLDivElement>(null);
    const [animationStartScrollY, setAnimationStartScrollY] = useState(0);
    const [buttonPosition, setButtonPosition] = useState({ x: 0, y: 0, width: 0, height: 0 });
    const [buttonVisible, setButtonVisible] = useState(false);

    // Track scroll
    useEffect(() => {
        const handleScroll = () => setScrollY(window.scrollY);
        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Track button position + visibility
    useEffect(() => {
        const updateButtonPosition = () => {
            const targetButton = buttonRef.current;
            if (targetButton) {
                const rect = targetButton.getBoundingClientRect();
                setButtonPosition({
                    x: rect.left + rect.width / 2,
                    y: rect.top + rect.height / 2,
                    width: rect.width,
                    height: rect.height
                });
            }
        };

        const observer = new IntersectionObserver(
            (entries) => {
                for (const entry of entries) {
                    if (entry.isIntersecting && !buttonVisible) {
                        setButtonVisible(true);
                        setAnimationStartScrollY(window.scrollY);
                        updateButtonPosition();
                    }
                }
            },
            { threshold: 0.1 }
        );

        const targetButton = buttonRef.current;
        if (targetButton) {
            observer.observe(targetButton);
            updateButtonPosition();
        }

        window.addEventListener('scroll', updateButtonPosition, { passive: true });
        window.addEventListener('resize', updateButtonPosition);

        return () => {
            if (targetButton) observer.unobserve(targetButton);
            window.removeEventListener('scroll', updateButtonPosition);
            window.removeEventListener('resize', updateButtonPosition);
        };
    }, [buttonRef, buttonVisible]);

    // Progress after button appears
    const relativeScroll = buttonVisible ? Math.max(0, scrollY - animationStartScrollY) : 0;
    const progress = Math.min(relativeScroll / scrollRange, 1);

    const getAnimationStyles = () => {
        if (!buttonVisible) {
            return {
                container: { height: '0px' },
                jet: { opacity: 0, position: 'fixed' as const }
            };
        }

        let jetX;
        let jetY;
        let rotation;
        let scale;

        // Split animation into two phases
        if (progress <= 0.5) {
            // ----------------------
            // Phase 1: Orbit around button starting from left
            // ----------------------
            const localProgress = progress / 0.5;

            const baseRadius = Math.max(80, buttonPosition.width + 50) + 25; // Add 25px radius (50px diameter)
            const radius = baseRadius * (1 + localProgress * 0.5); // Slower radius growth

            // Start from left side (π) and go clockwise: left → top → right → bottom
            // For clockwise motion: π → π/2 → 0 → 3π/2
            const startAngle = Math.PI; // Left side of button
            const angle = startAngle + (localProgress * 3 * Math.PI / 2); // Add for clockwise

            // Move a bit to the right while orbiting
            const xOffset = 315 + (300 * localProgress); // Start 330px right, then add more
            jetX = buttonPosition.x + Math.cos(angle) * radius + xOffset;
            jetY = buttonPosition.y + Math.sin(angle) * radius;

            // Calculate rotation - jet should be upright (0°) when at top position
            // At top position (angle = -π/2), we want rotation = 0
            const tangentAngle = angle + Math.PI / 2;
            rotation = tangentAngle * (180 / Math.PI);

            // Scale starts small and grows
            scale = 0.1 + localProgress * 0.3; // From 0.2 to 0.5
        } else {
            // ----------------------
            // Phase 2: Exit toward left-bottom
            // ----------------------
            const localProgress = (progress - 0.5) / 0.5; // normalize 0 → 1

            // Calculate exact ending position of Phase 1 for smooth transition
            const phase1EndProgress = 1;
            const baseRadius = Math.max(80, buttonPosition.width + 50) + 25; // Add 25px radius (50px diameter)
            const endRadius = baseRadius * (1 + phase1EndProgress * 0.5);
            const endAngle = Math.PI + (phase1EndProgress * 3 * Math.PI / 2);
            const phase1EndXOffset = 330 + (300 * phase1EndProgress);

            const startX = buttonPosition.x + Math.cos(endAngle) * endRadius + phase1EndXOffset;
            const startY = buttonPosition.y + Math.sin(endAngle) * endRadius;

            // End point: off-screen bottom-left
            const endX = -300; // far left off-screen
            const endY = window.innerHeight + 300; // below screen

            jetX = startX + (endX - startX) * localProgress;
            jetY = startY + (endY - startY) * localProgress;

            // Continue rotation from Phase 1 end angle
            const phase1EndTangentAngle = endAngle + Math.PI / 2;
            const phase1EndRotation = phase1EndTangentAngle * (180 / Math.PI);
            rotation = phase1EndRotation + localProgress * 90; // Continue rotating

            // Maintain scale during exit
            scale = 0.5;
        }

        return {
            container: {
                position: 'fixed' as const,
                top: 0,
                left: 0,
                width: '100vw',
                height: '100vh',
                pointerEvents: 'none' as const,
                zIndex: 999
            },
            jet: {
                position: 'fixed' as const,
                top: `${jetY}px`,
                left: `${jetX}px`,
                transform: `
           translate(-50%, -50%)
           scale(${scale})
           rotate(${rotation}deg)
         `,
                opacity: 1,
                zIndex: 999,
                transition: 'transform 0.05s linear'
            }
        };
    };

    const styles = getAnimationStyles();

    return (
        <div
            ref={containerRef}
            className={`relative w-full overflow-hidden ${className}`}
            style={styles.container}
        >
            <div style={styles.jet}>
                <Image
                    src="/assets/images/stealth-jet-flip.png"
                    alt="Stealth Jet"
                    width={1000}
                    height={1000}
                    className="w-auto h-auto max-w-none"
                    priority
                />
            </div>
        </div>
    );
};

export default StealthJetAnimation;
