import React, { useState, useEffect } from 'react';
import useAnchoredPopover from '../../../hooks/useAnchoredPopover';

/**
 * Common button styling classes
 */
export const BUTTON_CLASSES = {
  base: "flex items-center gap-2 bg-whiteSmoke hover:bg-linkWater dark:bg-blackRussian3 dark:hover:bg-blackRussian4 rounded-md px-4 py-2 transition-colors dark:text-white text-black text-sm duration-300",
  dropdown: "bg-white dark:bg-blackRussian2 border border-linkWater dark:border-blackRussian3 rounded-lg shadow-lg",
  chevron: "w-4 h-4 transition-transform",
  chevronRotated: "w-4 h-4 transition-transform rotate-180"
};

/**
 * Common dropdown panel styling classes
 */
export const DROPDOWN_CLASSES = {
  base: "bg-white dark:bg-blackRussian2 border border-linkWater dark:border-blackRussian3 rounded-lg shadow-lg",
  item: "w-full text-left px-4 py-2 hover:bg-linkWater dark:hover:bg-blackRussian3 transition-colors text-sm",
  itemSelected: "text-blue-500 dark:text-blue-400 font-medium",
  itemDefault: "text-black dark:text-white"
};

/**
 * Common chevron SVG icon
 */
export const ChevronIcon: React.FC<{ isOpen: boolean }> = ({ isOpen }) => (
  <svg 
    className={`${BUTTON_CLASSES.chevron} ${isOpen ? 'rotate-180' : ''}`} 
    fill="none" 
    stroke="currentColor" 
    viewBox="0 0 24 24"
  >
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
  </svg>
);

/**
 * Custom hook for dropdown functionality
 */
export const useDropdown = (minWidth: number = 240, minBelowHeight?: number, minAboveHeight?: number) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const { containerRef, triggerRef, panelRef, style: panelStyle } = useAnchoredPopover({ 
    isOpen: showDropdown, 
    minWidth,
    minBelowHeight,
    minAboveHeight
  });

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setShowDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [containerRef]);

  const toggleDropdown = () => setShowDropdown(!showDropdown);
  const closeDropdown = () => setShowDropdown(false);

  return {
    showDropdown,
    setShowDropdown,
    toggleDropdown,
    closeDropdown,
    containerRef,
    triggerRef,
    panelRef,
    panelStyle
  };
};

/**
 * Common image generation change handler
 */
export const createImageGenerationHandler = (
  imageGeneration: any,
  setImageGeneration: (val: any) => void,
  isImageGenerating: boolean | undefined
) => {
  return (val: any) => {
    if (!isImageGenerating) {
      setImageGeneration({ ...imageGeneration, ...val });
    }
  };
};
