import React, { useEffect, useState, useRef } from 'react';

const HeroBackgroundVideo = () => {
    const videoRef = useRef<HTMLVideoElement>(null);
    const [hasPlayedOnce, setHasPlayedOnce] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
        const scrolledDown = window.scrollY > 0;

        if (videoRef.current) {
            if (scrolledDown && !hasPlayedOnce) {
            // Play the video
            const playPromise = videoRef.current.play();
            setHasPlayedOnce(true);

            if (playPromise !== undefined) {
                playPromise.catch((error) => {
                console.warn('Video play failed:', error);
                });
            }
            }

            if (!scrolledDown && hasPlayedOnce) {
            // Pause and reset the video
            videoRef.current.pause();
            videoRef.current.currentTime = 0;
            setHasPlayedOnce(false);
            }
        }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [hasPlayedOnce]);

    return (
        <div className='!absolute inset-0 w-full h-full overflow-hidden'>
            <video 
                ref={videoRef} 
                controls={false} 
                playsInline 
                loop 
                muted 
                className="absolute inset-0 w-full h-full object-cover sm:object-cover md:object-cover"
                style={{
                    objectPosition: 'center center'
                }}
            >
                <source src="/assets/videos/foyer-small.mp4" type="video/mp4" />
                Your browser does not support the video tag.
            </video>
        </div>
    )
}

export default HeroBackgroundVideo