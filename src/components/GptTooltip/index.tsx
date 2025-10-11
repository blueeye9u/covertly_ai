import Image from 'next/image';
import React, { ReactNode } from 'react';
import { getModelImage } from '../../utils/chatUtils';
import { useTheme } from '../../context/themeContext';

interface GptTooltipProps {
    children: ReactNode;
    position?: 'top' | 'bottom' | 'left' | 'right';
    name?:any;
    des?:any;
    img?:any
}

const GptTooltip: React.FC<GptTooltipProps> = ({ children,name,des,img, position = 'top' }) => {
    const { isDarkMode } = useTheme();
    
    return (
        <div className="relative group">
            {/* The trigger element */}
            {children}

            {/* The Tooltip */}
            <div
                className={`absolute w-[360px] bg-white dark:bg-blackRussian2 invisible opacity-0 group-hover:visible group-hover:opacity-100 transition-opacity duration-200 
          ${position === 'top' ? 'bottom-full left-1/2 -translate-x-1/2 mb-2' : ''}
          ${position === 'bottom' ? 'top-12 left-0 -translate-x-1/2 mt-2' : ''}
          ${position === 'left' ? 'right-full top-1/2 -translate-y-1/2 mr-2' : ''}
          ${position === 'right' ? 'left-full top-1/2 -translate-y-1/2 ml-2' : ''}
          text-sm py-5 px-4 rounded-xl shadow-lg z-10
        `}
            >
                <div className='flex flex-col gap-1'>
                    <div className='flex gap-2 items-center'>
                        <Image alt="chat model" src={getModelImage({img}, isDarkMode)} width={20} height={20} className="rounded-sm" />
                         <p className='text-lg font-bold dark:text-white'>{name}</p>
                    </div>
                    <p className='dark:text-white'>{des}</p>


                </div>
                <span
                    className={`absolute z-10 h-0 w-0 border-transparent border-[8px] rotate-180
                    ${position === 'top' ? 'border-b-white dark:border-b-blackRussian2 top-full left-1/2 -translate-x-1/2' : ''}
                    ${position === 'bottom' ? 'border-t-white dark:border-t-blackRussian2 -top-[15px] right-10 -translate-x-1/2' : ''}
                    ${position === 'left' ? 'border-r-white dark:border-r-blackRussian2 left-full top-1/2 -translate-y-1/2' : ''}
                    ${position === 'right' ? 'border-l-white dark:border-l-blackRussian2 right-full top-1/2 -translate-y-1/2' : ''}
                  `}
                />
            </div>
        </div>
    );
};

export default GptTooltip;
