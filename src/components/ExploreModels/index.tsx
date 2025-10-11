import React, { useRef } from 'react'
import Link from 'next/link'
import useLoggedInStatus from '../../hooks/useLoggedInStatus';
import { AUTHENTICATED_ROUTES, UN_AUTHENTICATED_ROUTES } from '../../constants/routes';
import { useTheme } from '../../context/themeContext';
import { Button } from "../global/button/Button";
import { RightArrow } from "../../svgs/svg";
import StealthJetAnimation1 from '../StealthJetAnimation1';

// Extract SVG paths to reduce conditional complexity
const VisiblePaths = ({ strokeColor }: { strokeColor: string }) => (
    <>
        <path id="motionPath2"
            d="M586.5 166.5H509C500.163 166.5 493 159.337 493 150.5V48C493 39.1634 500.163 32 509 32H751.5C760.337 32 767.5 24.837 767.5 16V-108"
            stroke={strokeColor} strokeOpacity="0.05" />
        <path id="motionPath1" d="M322 107.5H21.5C12.6634 107.5 5.5 100.337 5.5 91.5V7" stroke={strokeColor}
            strokeOpacity="0.05" />
        <path id="motionPath"
            d="M255.5 166.5H333C341.837 166.5 349 159.337 349 150.5V48C349 39.1634 341.837 32 333 32H90.5C81.6634 32 74.5 24.837 74.5 16V-108"
            stroke={strokeColor} strokeOpacity="0.05" />
        <path id="M421 189V34.5M538" stroke={strokeColor} strokeOpacity="0.05" />
        <path id="motionPath3" d="M538 107.5H819.5C828.337 107.5 835.5 100.337 835.5 91.5V7" stroke={strokeColor}
            strokeOpacity="0.05" />
        <path id="motionPath4"
            d="M421 189V34.5M538M457 199C457 199 457 -41.182 457 -16.174M385 199C385 199 385 -41.182 385 -16.174"
            stroke={strokeColor} strokeOpacity="0.05" />
        {/* <path id="motionPath5"
              d="M385 199C385 199 385 -41.182 385 -16.174M457 199C457 199 457 -41.182 457 -16.174M421 189V34.5M538"
              stroke={strokeColor} strokeOpacity="0.05"/> */}
        {/* <path id="motionPath6"
              d="M457 199C457 199 457 -250 457 -225M385 199C385 199 385 -250 385 -225M421 189V34.5M538"
              stroke={strokeColor} strokeOpacity="0.05"/> */}

        <path id="motionPath6"
            d="M457 326C457 326 457 -108 457 -108M385 326C385 326 385 -108 385 -108M421 189V34.5M538"
            stroke={strokeColor} strokeOpacity="0.05" />
    </>
);

// Extract animated masks to reduce complexity
const AnimatedMasks = () => (
    <>
        <mask id="animatedMask">
            <circle r="50" fill="#30C5D2">
                <animateMotion
                    repeatCount="indefinite"
                    dur="2s"
                    keyPoints="1;0.8;0.6;0.4;0.2;0"
                    keyTimes="0;0.2;0.4;0.6;0.8;1"
                    calcMode="linear"
                >
                    <mpath href="#motionPath" />
                </animateMotion>
            </circle>
        </mask>

        <mask id="animatedMask1">
            <circle r="50" fill="#0C79FE">
                <animateMotion
                    repeatCount="indefinite"
                    dur="2s"
                    keyPoints="1;0.8;0.6;0.4;0.2;0"
                    keyTimes="0;0.2;0.4;0.6;0.8;1"
                    calcMode="linear"
                >
                    <mpath href="#motionPath1" />
                </animateMotion>
            </circle>
        </mask>

        <mask id="animatedMask2">
            <circle r="50" fill="#0C79FE">
                <animateMotion
                    repeatCount="indefinite"
                    dur="2s"
                    keyPoints="1;0.8;0.6;0.4;0.2;0"
                    keyTimes="0;0.2;0.4;0.6;0.8;1"
                    calcMode="linear"
                >
                    <mpath href="#motionPath2" />
                </animateMotion>
            </circle>
        </mask>

        <mask id="animatedMask3">
            <circle r="50" fill="#30C5D2">
                <animateMotion
                    repeatCount="indefinite"
                    dur="2s"
                    keyPoints="1;0.8;0.6;0.4;0.2;0"
                    keyTimes="0;0.2;0.4;0.6;0.8;1"
                    calcMode="linear"
                >
                    <mpath href="#motionPath3" />
                </animateMotion>
            </circle>
        </mask>

        <mask id="animatedMask4">
            <circle r="15" fill="#0C79FE">
                <animateMotion
                    repeatCount="indefinite"
                    dur="2s"
                    keyPoints="1;0.8;0.6;0.4;0.2;0"
                    keyTimes="0;0.2;0.4;0.6;0.8;1"
                    calcMode="linear"
                >
                    <mpath href="#motionPath4" />
                </animateMotion>
            </circle>
        </mask>

        <mask id="animatedMask5">
            <circle r="15" fill="#0C79FE">
                <animateMotion
                    repeatCount="indefinite"
                    dur="2s"
                    keyPoints="1;0.8;0.6;0.4;0.2;0"
                    keyTimes="0;0.2;0.4;0.6;0.8;1"
                    calcMode="linear"
                >
                    <mpath href="#motionPath5" />
                </animateMotion>
            </circle>
        </mask>

        <mask id="animatedMask6">
            <circle r="15" fill="#30C5D2">
                <animateMotion
                    repeatCount="indefinite"
                    dur="2s"
                    keyPoints="1;0.8;0.6;0.4;0.2;0"
                    keyTimes="0;0.2;0.4;0.6;0.8;1"
                    calcMode="linear"
                >
                    <mpath href="#motionPath6" />
                </animateMotion>
            </circle>
        </mask>
    </>
);

// Extract highlighted paths with animation
const HighlightedPaths = () => (
    <>
        <path
            d="M255.5 166.5H333C341.837 166.5 349 159.337 349 150.5V48C349 39.1634 341.837 32 333 32H90.5C81.6634 32 74.5 24.837 74.5 16V-108"
            stroke="#30C5D2"
            strokeWidth="1"
            strokeLinecap="round"
            mask="url(#animatedMask)"
            fill="none"
        />
        <path
            d="M322 107.5H21.5C12.6634 107.5 5.5 100.337 5.5 91.5V7"
            stroke="#0C79FE"
            strokeWidth="1"
            strokeLinecap="round"
            mask="url(#animatedMask1)"
            fill="none"
        />
        <path
            d="M586.5 166.5H509C500.163 166.5 493 159.337 493 150.5V48C493 39.1634 500.163 32 509 32H751.5C760.337 32 767.5 24.837 767.5 16V-108"
            stroke="#0C79FE"
            strokeWidth="1"
            strokeLinecap="round"
            mask="url(#animatedMask2)"
            fill="none"
        />
        <path
            d="M538 107.5H819.5C828.337 107.5 835.5 100.337 835.5 91.5V7"
            stroke="#30C5D2"
            strokeWidth="1"
            strokeLinecap="round"
            mask="url(#animatedMask3)"
            fill="none"
        />
        <path
            d="MM421 189V34.5M538M457 199C457 199 457 -41.182 457 -16.174M385 199C385 199 385 -41.182 385 -16.174"
            stroke="#0C79FE"
            strokeWidth="1"
            strokeLinecap="round"
            mask="url(#animatedMask4)"
            fill="none"
        />
        <path
            d="M385 326C385 326 385 -108 385 -108M457 326C457 326 457 -108 457 -108M421 189V34.5M538"
            stroke="#0C79FE"
            strokeWidth="1"
            strokeLinecap="round"
            mask="url(#animatedMask5)"
            fill="none"
        />
        <path
            d="M457 326C457 326 457 -108 457 -108M385 326C385 326 385 -108 385 -108M421 189V34.5M538"
            stroke="#30C5D2"
            strokeWidth="1"
            strokeLinecap="round"
            mask="url(#animatedMask6)"
            fill="none"
        />
    </>
);

// Extract filter definitions
const FilterDefinitions = () => (
    <>
        <filter id="filter0_f_6545_8045" x="399" y="34" width="44" height="56" filterUnits="userSpaceOnUse"
            colorInterpolationFilters="sRGB">
            <feFlood floodOpacity="0" result="BackgroundImageFix" />
            <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
            <feGaussianBlur stdDeviation="8" result="effect1_foregroundBlur_6545_8045" />
        </filter>
        <filter id="filter1_f_6545_8045" x="502" y="70" width="56" height="44" filterUnits="userSpaceOnUse"
            colorInterpolationFilters="sRGB">
            <feFlood floodOpacity="0" result="BackgroundImageFix" />
            <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
            <feGaussianBlur stdDeviation="8" result="effect1_foregroundBlur_6545_8045" />
        </filter>
        <filter id="filter2_f_6545_8045" x="327" y="94" width="44" height="56" filterUnits="userSpaceOnUse"
            colorInterpolationFilters="sRGB">
            <feFlood floodOpacity="0" result="BackgroundImageFix" />
            <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
            <feGaussianBlur stdDeviation="8" result="effect1_foregroundBlur_6545_8045" />
        </filter>
        <filter id="filter3_f_6545_8045" x="288" y="74" width="48" height="36" filterUnits="userSpaceOnUse"
            colorInterpolationFilters="sRGB">
            <feFlood floodOpacity="0" result="BackgroundImageFix" />
            <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
            <feGaussianBlur stdDeviation="6" result="effect1_foregroundBlur_6545_8045" />
        </filter>
        <filter id="filter4_f_6545_8045" x="475" y="98" width="36" height="48" filterUnits="userSpaceOnUse"
            colorInterpolationFilters="sRGB">
            <feFlood floodOpacity="0" result="BackgroundImageFix" />
            <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
            <feGaussianBlur stdDeviation="6" result="effect1_foregroundBlur_6545_8045" />
        </filter>
    </>
);

// Extract gradient definitions
const GradientDefinitions = () => (
    <>
        <linearGradient id="paint0_linear_6545_8045" x1="385.5" y1="1" x2="385.5" y2="218"
            gradientUnits="userSpaceOnUse">
            <stop stopColor="#161522" stopOpacity="0.2" />
            <stop offset="1" stopColor="white" stopOpacity="0.05" />
        </linearGradient>
        <linearGradient id="paint1_linear_6545_8045" x1="457.5" y1="1" x2="457.5" y2="218"
            gradientUnits="userSpaceOnUse">
            <stop stopColor="#161522" stopOpacity="0.2" />
            <stop offset="1" stopColor="white" stopOpacity="0.05" />
        </linearGradient>
        <linearGradient id="paint2_linear_6545_8045" x1="385" y1="61.5" x2="385" y2="54" gradientUnits="userSpaceOnUse">
            <stop stopColor="#929292" />
            <stop offset="0.475" stopColor="#101217" />
            <stop offset="1" stopColor="#585858" />
        </linearGradient>
        <linearGradient id="paint3_linear_6545_8045" x1="385" y1="122.5" x2="385" y2="130"
            gradientUnits="userSpaceOnUse">
            <stop stopColor="#929292" />
            <stop offset="0.475" stopColor="#101217" />
            <stop offset="1" stopColor="#585858" />
        </linearGradient>
        <linearGradient id="paint4_linear_6545_8045" x1="349" y1="61.5" x2="349" y2="54" gradientUnits="userSpaceOnUse">
            <stop stopColor="#929292" />
            <stop offset="0.475" stopColor="#101217" />
            <stop offset="1" stopColor="#585858" />
        </linearGradient>
        <linearGradient id="paint5_linear_6545_8045" x1="349" y1="122.5" x2="349" y2="130"
            gradientUnits="userSpaceOnUse">
            <stop stopColor="#30C5D2" />
            <stop offset="0.475" stopColor="#101217" />
            <stop offset="1" stopColor="#0D484E" />
        </linearGradient>
        <linearGradient id="paint6_linear_6545_8045" x1="311.5" y1="92" x2="304" y2="92" gradientUnits="userSpaceOnUse">
            <stop stopColor="#682990" />
            <stop offset="0.475" stopColor="#101217" />
            <stop offset="1" stopColor="#602387" />
        </linearGradient>
        <linearGradient id="paint7_linear_6545_8045" x1="530.5" y1="92" x2="538" y2="92" gradientUnits="userSpaceOnUse">
            <stop stopColor="#30C5D2" />
            <stop offset="0.475" stopColor="#101217" />
            <stop offset="1" stopColor="#0D484E" />
        </linearGradient>
        <linearGradient id="paint8_linear_6545_8045" x1="421" y1="61.5" x2="421" y2="54" gradientUnits="userSpaceOnUse">
            <stop stopColor="#929292" />
            <stop offset="0.475" stopColor="#101217" />
            <stop offset="1" stopColor="#585858" />
        </linearGradient>
        <linearGradient id="paint9_linear_6545_8045" x1="421" y1="122.5" x2="421" y2="130"
            gradientUnits="userSpaceOnUse">
            <stop stopColor="#929292" />
            <stop offset="0.475" stopColor="#101217" />
            <stop offset="1" stopColor="#585858" />
        </linearGradient>
        <linearGradient id="paint10_linear_6545_8045" x1="457" y1="61.5" x2="457" y2="54"
            gradientUnits="userSpaceOnUse">
            <stop stopColor="#929292" />
            <stop offset="0.475" stopColor="#101217" />
            <stop offset="1" stopColor="#585858" />
        </linearGradient>
        <linearGradient id="paint11_linear_6545_8045" x1="457" y1="122.5" x2="457" y2="130"
            gradientUnits="userSpaceOnUse">
            <stop stopColor="#929292" />
            <stop offset="0.475" stopColor="#101217" />
            <stop offset="1" stopColor="#585858" />
        </linearGradient>
        <linearGradient id="paint12_linear_6545_8045" x1="493" y1="61.5" x2="493" y2="54"
            gradientUnits="userSpaceOnUse">
            <stop stopColor="#929292" />
            <stop offset="0.475" stopColor="#101217" />
            <stop offset="1" stopColor="#585858" />
        </linearGradient>
        <linearGradient id="paint13_linear_6545_8045" x1="493" y1="122.5" x2="493" y2="130"
            gradientUnits="userSpaceOnUse">
            <stop stopColor="#682990" />
            <stop offset="0.475" stopColor="#101217" />
            <stop offset="1" stopColor="#602387" />
        </linearGradient>
    </>
);

// Other static SVG elements, including themed circles
const OtherElements = ({ isDarkMode }: { isDarkMode: boolean }) => {
    const fillColor = isDarkMode ? "#1E2129" : "white";
    const strokeColor = isDarkMode ? "#35383F" : "black";
    const fillOpacity = isDarkMode ? "" : "0.05";
    const strokeOpacity = isDarkMode ? "" : "0.05";

    return (
        <>
            {/* Themed circles */}
            <path
                d="M5.5 10C7.98528 10 10 7.98528 10 5.5C10 3.01472 7.98528 1 5.5 1C3.01472 1 1 3.01472 1 5.5C1 7.98528 3.01472 10 5.5 10Z"
                fill={fillColor} fillOpacity={fillOpacity} strokeOpacity={strokeOpacity} stroke={strokeColor}
                strokeWidth="1.4" />
            <path
                d="M251 170C253.485 170 255.5 167.985 255.5 165.5C255.5 163.015 253.485 161 251 161C248.515 161 246.5 163.015 246.5 165.5C246.5 167.985 248.515 170 251 170Z"
                fill={fillColor} fillOpacity={fillOpacity} strokeOpacity={strokeOpacity} stroke={strokeColor}
                strokeWidth="1.4" />
            <path
                d="M420.5 198C422.985 198 425 195.985 425 193.5C425 191.015 422.985 189 420.5 189C418.015 189 416 191.015 416 193.5C416 195.985 418.015 198 420.5 198Z"
                fill={fillColor} fillOpacity={fillOpacity} strokeOpacity={strokeOpacity} stroke={strokeColor}
                strokeWidth="1.4" />
            <path
                d="M420.5 34C422.985 34 425 31.9853 425 29.5C425 27.0147 422.985 25 420.5 25C418.015 25 416 27.0147 416 29.5C416 31.9853 418.015 34 420.5 34Z"
                fill={fillColor} fillOpacity={fillOpacity} strokeOpacity={strokeOpacity} stroke={strokeColor}
                strokeWidth="1.4" />
            <path
                d="M835.5 10C833.015 10 831 7.98528 831 5.5C831 3.01472 833.015 1 835.5 1C837.985 1 840 3.01472 840 5.5C840 7.98528 837.985 10 835.5 10Z"
                fill={fillColor} fillOpacity={fillOpacity} strokeOpacity={strokeOpacity} stroke={strokeColor}
                strokeWidth="1.4" />
            <path
                d="M590 170C587.515 170 585.5 167.985 585.5 165.5C585.5 163.015 587.515 161 590 161C592.485 161 594.5 163.015 594.5 165.5C594.5 167.985 592.485 170 590 170Z"
                fill={fillColor} fillOpacity={fillOpacity} strokeOpacity={strokeOpacity} stroke={strokeColor}
                strokeWidth="1.4" />

            {/* Other elements */}
            {/* <path d="M385 1C385 1 385 241.182 385 216.174" stroke="url(#paint0_linear_6545_8045)"/> */}
            <g opacity="0.4" filter="url(#filter0_f_6545_8045)">
                <rect x="415" y="50" width="12" height="24" rx="6" fill="#929292" />
            </g>
            <path d="M387 62H383V55C383 54.4477 383.448 54 384 54H386C386.552 54 387 54.4477 387 55V62Z"
                fill="url(#paint2_linear_6545_8045)" />
            <g opacity="0.4" filter="url(#filter1_f_6545_8045)">
                <rect x="518" y="98" width="12" height="24" rx="6" transform="rotate(-90 518 98)" fill="#30C5D2" />
            </g>
            <path d="M387 122H383V129C383 129.552 383.448 130 384 130H386C386.552 130 387 129.552 387 129V122Z"
                fill="url(#paint3_linear_6545_8045)" />
            <g opacity="0.4" filter="url(#filter2_f_6545_8045)">
                <rect x="343" y="110" width="12" height="24" rx="6" fill="#30C5D2" />
            </g>
            <path d="M351 62H347V55C347 54.4477 347.448 54 348 54H350C350.552 54 351 54.4477 351 55V62Z"
                fill="url(#paint4_linear_6545_8045)" />
            <path d="M351 122H347V129C347 129.552 347.448 130 348 130H350C350.552 130 351 129.552 351 129V122Z"
                fill="url(#paint5_linear_6545_8045)" />
            <g opacity="0.4" filter="url(#filter3_f_6545_8045)">
                <rect x="300" y="98" width="12" height="24" rx="6" transform="rotate(-90 300 98)" fill="#682990" />
            </g>
            <path d="M312 90L312 94L305 94C304.448 94 304 93.552 304 93L304 91C304 90.448 304.448 90 305 90L312 90Z"
                fill="url(#paint6_linear_6545_8045)" />
            <path d="M530 90L530 94L537 94C537.552 94 538 93.552 538 93L538 91C538 90.448 537.552 90 537 90L530 90Z"
                fill="url(#paint7_linear_6545_8045)" />
            <path d="M423 62H419V55C419 54.4477 419.448 54 420 54H422C422.552 54 423 54.4477 423 55V62Z"
                fill="url(#paint8_linear_6545_8045)" />
            <path d="M423 122H419V129C419 129.552 419.448 130 420 130H422C422.552 130 423 129.552 423 129V122Z"
                fill="url(#paint9_linear_6545_8045)" />
            <path d="M459 62H455V55C455 54.4477 455.448 54 456 54H458C458.552 54 459 54.4477 459 55V62Z"
                fill="url(#paint10_linear_6545_8045)" />
            <path d="M459 122H455V129C455 129.552 455.448 130 456 130H458C458.552 130 459 129.552 459 129V122Z"
                fill="url(#paint11_linear_6545_8045)" />
            <path d="M495 62H491V55C491 54.4477 491.448 54 492 54H494C494.552 54 495 54.4477 495 55V62Z"
                fill="url(#paint12_linear_6545_8045)" />
            <g opacity="0.4" filter="url(#filter4_f_6545_8045)">
                <rect x="487" y="110" width="12" height="24" rx="6" fill="#682990" />
            </g>
            <path
                d="M491 122L495 122L495 129C495 129.552 494.552 130 494 130L492 130C491.448 130 491 129.552 491 129L491 122Z"
                fill="url(#paint13_linear_6545_8045)" />
            <path d="M33 92.5H205" stroke="url(#paint14_linear_6545_8045)" />
            <path d="M203 166.5H313" stroke="url(#paint15_linear_6545_8045)" />
            <path d="M812 92.5H640" stroke="url(#paint16_linear_6545_8045)" />
            <path d="M630 166.5H520" stroke="url(#paint17_linear_6545_8045)" />
        </>
    );
};

const ExploreModelAnimation = () => {
    const [isLoggedIn] = useLoggedInStatus();
    const { isDarkMode } = useTheme();
    const buttonRef = useRef<HTMLDivElement>(null);

    // Determine stroke color based on theme
    const strokeColor = isDarkMode ? "white" : "black";

    return (
        <div className="sm:h-[434px] flex justify-center items-center md:w-[839px] w-full mx-auto relative">

            <Link href={isLoggedIn ? AUTHENTICATED_ROUTES.CHAT : UN_AUTHENTICATED_ROUTES.SIGNUP as string}>
                <div ref={buttonRef}>
                    <Button size='lg' className="btn rounded-full !min-w-auto !flex-none absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 text-[#E9EBF1] text-[24px] font-semibold z-20">Take It for a Spin{' '}
                        <span className='rotate-180 pb-1'><RightArrow /></span>
                    </Button>
                    <StealthJetAnimation1
                        buttonRef={buttonRef}
                        config={{
                            initialScale: 0.25,
                            maxScale: 1,
                            distance: 180,
                            scrollSensitivity: 600,
                            zDistance: 400,
                            downwardMovement: 1000
                        }}
                    />
                </div>
            </Link>
            <svg width="100%" height="100%" viewBox="0 0 841 219" fill="none" xmlns="http://www.w3.org/2000/svg">
                {/* Visible paths with reduced opacity */}
                <VisiblePaths strokeColor={strokeColor} />

                {/* Animated masks */}
                <AnimatedMasks />

                {/* Highlighted paths with animation */}
                <HighlightedPaths />

                {/* Static paths */}
                {/* <path d="M457 1C457 1 457 241.182 457 216.174" stroke={strokeColor} strokeOpacity="0.05"/> */}

                {/* Other elements including themed circles */}
                <OtherElements isDarkMode={isDarkMode} />

                <defs>
                    {/* Filter definitions */}
                    <FilterDefinitions />

                    {/* Gradient definitions */}
                    <GradientDefinitions />
                </defs>
            </svg>
        </div>
    );
};

export default ExploreModelAnimation;