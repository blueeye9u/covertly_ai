export interface StealthJetAnimationProps {
    /** Custom className for the container */
    className?: string;
    /** Animation speed multiplier (default: 1) */
    speed?: number;
    /** Maximum horizontal movement in pixels (default: 200) */
    maxMovement?: number;
    /** Initial position from left (default: 10%) */
    initialLeft?: string;
    /** Initial position from top (default: 50%) */
    initialTop?: string;
    /** Enable rotation based on movement direction (default: true) */
    enableRotation?: boolean;
    /** Enable vertical movement (default: true) */
    enableVerticalMovement?: boolean;
    /** Theme variant for trail color (default: 'default') */
    theme?: 'default' | 'electric' | 'fire' | 'cyber';
    /** Reference to button element for positioning calculations */
    buttonRef?: React.RefObject<HTMLDivElement>;
}

export interface AnimationValues {
    horizontalOffset: number;
    verticalOffset: number;
    rotation: number;
    scale: number;
}

export interface ScrollState {
    scrollY: number;
    isVisible: boolean;
    direction: 'up' | 'down' | 'idle';
}
