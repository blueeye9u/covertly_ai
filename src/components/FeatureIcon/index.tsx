import React, { useState, useEffect } from 'react';
import Image from "next/image";

interface FeatureIconProps {
    src: string;
    alt: string;
    height: number;
    width: number;
}

const FeatureIcon: React.FC<FeatureIconProps> = ({ src, alt, height, width }) => {
    const [Lottie, setLottie] = useState<any>(null);
    const [animationData, setAnimationData] = useState<any>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    
    const isLottieAnimation = src.endsWith('.json');
    
    useEffect(() => {
        if (isLottieAnimation) {
            import('lottie-react').then((module) => {
                setLottie(() => module.default);
            }).catch((error) => {
                console.warn('Lottie library not available:', error);
                setError('Lottie library not installed');
                setIsLoading(false);
            });
            
            fetch(src)
                .then(response => {
                    if (!response.ok) {
                        throw new Error(`HTTP error! status: ${response.status}`);
                    }
                    return response.json();
                })
                .then(data => {
                    setAnimationData(data);
                    setIsLoading(false);
                })
                .catch(error => {
                    console.error('Failed to load animation:', error);
                    setError('Failed to load animation');
                    setIsLoading(false);
                });
        } else {
            setIsLoading(false);
        }
    }, [src, isLottieAnimation]);
    
    if (isLottieAnimation) {
        if (isLoading) {
            return (
                <div 
                    className="flex items-center justify-center bg-gray-200 rounded-lg"
                    style={{ width: width, height: height }}
                >
                    <span className="text-xs text-gray-600">
                        Loading...
                    </span>
                </div>
            );
        }
        
        if (error) {
            return (
                <div 
                    className="flex items-center justify-center bg-gray-200 rounded-lg"
                    style={{ width: width, height: height }}
                >
                    <span className="text-xs text-gray-600 text-center">
                        {error}
                    </span>
                </div>
            );
        }
        
        if (Lottie && animationData) {
            return (
                <Lottie
                    animationData={animationData}
                    style={{ width: 'auto', height: 'auto' }}
                    className="lottie-no-full-size"
                    loop={true}
                    autoplay={true}
                />
            );
        }
        
        return (
            <div 
                className="flex items-center justify-center bg-gray-200 rounded-lg"
                style={{ width: width, height: height }}
            >
                <span className="text-xs text-gray-600">
                    Animation
                </span>
            </div>
        );
    }
    
    return (
        <Image
            src={src}
            alt={alt}
            height={height}
            width={width}
        />
    );
};

export default FeatureIcon; 