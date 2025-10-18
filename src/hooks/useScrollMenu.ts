import { useState, useEffect, useRef } from 'react';

export const useScrollMenu = () => {
    const [isMenuExpanded, setIsMenuExpanded] = useState(false);
    const [isAtBottom, setIsAtBottom] = useState(false);
    const bottomSentinelRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        const handleScroll = () => {
            const rect = bottomSentinelRef.current?.getBoundingClientRect();
            if (rect) {
                setIsAtBottom(rect.top <= window.innerHeight);
            }
        };

        let observer: IntersectionObserver | null = null;
        if ('IntersectionObserver' in globalThis.window && bottomSentinelRef.current) {
            observer = new IntersectionObserver(
                (entries) => {
                    for (const entry of entries) {
                        setIsAtBottom(entry.isIntersecting);
                    }
                },
                {
                    root: null,
                    threshold: 0.01,
                }
            );
            observer.observe(bottomSentinelRef.current);
        } else {
            window.addEventListener('scroll', handleScroll, { passive: true });
            handleScroll();
        }

        return () => {
            if (observer && bottomSentinelRef.current) {
                observer.unobserve(bottomSentinelRef.current);
            }
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    const toggleMenu = () => {
        setIsMenuExpanded(!isMenuExpanded);
    };

    return {
        isMenuExpanded,
        isAtBottom,
        bottomSentinelRef,
        toggleMenu
    };
};
