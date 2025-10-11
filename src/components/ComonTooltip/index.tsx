import React from 'react';
import ReactDOM from 'react-dom';
import Image from 'next/image';
import { getModelImage } from '../../utils/chatUtils';
import { useTheme } from '../../context/themeContext';

interface CommonTooltipProps {
    position?: 'top' | 'bottom' | 'left' | 'right' | 'topResponsive';
    name?: any;
    children?: any;
    className?: any;
    parentClassName?: any;
    source?: any;
    link?: any;
    des?: any;
    img?: any;
    showImg?: any;
    showOnFocus?: boolean;

}

const CommonTooltip: React.FC<CommonTooltipProps> = ({ name, position = 'top', children, className, parentClassName, source, link, des, img, showImg, showOnFocus = false }) => {
    const { isDarkMode } = useTheme();
    const triggerRef = React.useRef<HTMLButtonElement | null>(null);
    const [isVisible, setIsVisible] = React.useState(false);
    const [coords, setCoords] = React.useState<{ top: number; left: number; transform?: string } | null>(null);
    const [isTouchDevice, setIsTouchDevice] = React.useState(false);
    const touchTimeoutRef = React.useRef<NodeJS.Timeout | null>(null);

    const computeCoords = React.useCallback(() => {
        const node = triggerRef.current;
        if (!node) return;
        const rect = node.getBoundingClientRect();
        const gap = 8; // space between trigger and tooltip
        let top = 0;
        let left = 0;
        let transform: string | undefined;

        switch (position) {
            case 'bottom':
                top = rect.bottom + gap;
                left = rect.left + rect.width / 2;
                transform = 'translateX(-50%)';
                break;
            case 'left':
                top = rect.top + rect.height / 2;
                left = rect.left - gap;
                transform = 'translate(-100%, -50%)';
                break;
            case 'right':
                top = rect.top + rect.height / 2;
                left = rect.right + gap;
                transform = 'translate(0, -50%)';
                break;
            case 'topResponsive':
            case 'top':
            default:
                top = rect.top - gap;
                left = rect.left + rect.width / 2;
                transform = 'translate(-50%, -100%)';
                break;
        }

        setCoords({ top, left, transform });
    }, [position]);

    React.useEffect(() => {
        const checkTouchDevice = () => {
            setIsTouchDevice('ontouchstart' in globalThis.window || navigator.maxTouchPoints > 0);
        };
        checkTouchDevice();
    }, []);

    React.useEffect(() => {
        if (!isVisible) return;
        computeCoords();
        const handle = () => computeCoords();
        window.addEventListener('scroll', handle, true);
        window.addEventListener('resize', handle);
        return () => {
            window.removeEventListener('scroll', handle, true);
            window.removeEventListener('resize', handle);
        };
    }, [isVisible, computeCoords]);

    const handleShowTooltip = React.useCallback(() => {
        setIsVisible(true);
        computeCoords();
        
        if (touchTimeoutRef.current) {
            clearTimeout(touchTimeoutRef.current);
        }
        
        if (isTouchDevice) {
            touchTimeoutRef.current = setTimeout(() => {
                setIsVisible(false);
            }, 1000);
        }
    }, [computeCoords, isTouchDevice]);

    const handleTouchStart = React.useCallback((e: React.TouchEvent) => {
        if (isTouchDevice) {
            handleShowTooltip();
        }
    }, [isTouchDevice, handleShowTooltip]);

    const handleHideTooltip = React.useCallback(() => {
        setIsVisible(false);
        if (touchTimeoutRef.current) {
            clearTimeout(touchTimeoutRef.current);
            touchTimeoutRef.current = null;
        }
    }, []);

    React.useEffect(() => {
        return () => {
            if (touchTimeoutRef.current) {
                clearTimeout(touchTimeoutRef.current);
            }
        };
    }, []);

    const isBrowser = typeof document !== 'undefined';
    const portalTooltip = (isBrowser && isVisible && coords) ? ReactDOM.createPortal(
        <div
            role="tooltip"
            className={`${className} fixed z-[1000] inline-block w-max bg-blackRussian dark:bg-blackRussian3 text-sm py-3 px-4 rounded-md shadow-lg pointer-events-none ${className?.includes('whitespace-normal') ? 'whitespace-normal' : 'whitespace-nowrap'}`}
            style={{ top: coords.top, left: coords.left, transform: coords.transform }}
        >
            {source ?
                <div className='flex flex-col gap-1'>
                    <div className='flex gap-2 items-start'>
                        {showImg && <Image alt="chat model" src={getModelImage({img}, isDarkMode)} width={20} height={20} className="rounded-sm !shrink-0" />}
                        <p className='!mb-0 text-white'>{link}</p>
                    </div>
                    <p className='text-white font-semibold !mb-0'>{name}</p>
                    <p className='text-white'>{des}</p>
                </div>
                :
                <span className={`text-center text-white text-sm ${className?.includes('whitespace-normal') ? 'whitespace-normal' : 'whitespace-nowrap'}`}>{name}</span>
            }
        </div>,
        document.body
    ) : null;

    return (
        <button
            ref={triggerRef}
            type="button"
            className={`relative group bg-transparent border-none p-0 m-0 cursor-default ${parentClassName}`}
            onMouseEnter={handleShowTooltip}
            onMouseLeave={handleHideTooltip}
            onTouchStart={isTouchDevice ? handleTouchStart : undefined}
            onFocus={showOnFocus ? handleShowTooltip : undefined}
            onBlur={showOnFocus ? handleHideTooltip : undefined}
            style={{ all: 'unset', position: 'relative', display: 'inline-block' }}
        >
            {children}
            {portalTooltip}
        </button>
    );
};

export default CommonTooltip;
