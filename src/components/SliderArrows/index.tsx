import React from "react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

interface CustomArrowProps {
  onClick?: () => void;
  className?: string;
}

/**
 * Custom Previous Arrow for React Slick slider
 * @param onClick - Click handler provided by React Slick
 * @param className - CSS class provided by React Slick (includes "slick-disabled" when at beginning)
 */
export const CustomPrevArrow: React.FC<CustomArrowProps> = ({ onClick, className }) => {
  const isDisabled = className?.includes("slick-disabled");

  return (
    <button
      className={`absolute left-0 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white p-2 crossIconStyle !w-10 !h-10 flex justify-center items-center rounded-full z-10 
        ${isDisabled ? "opacity-50 cursor-not-allowed" : "hover:bg-gray-600"}`}
      onClick={onClick}
      disabled={isDisabled}
    >
      <FaArrowLeft size={24} />
    </button>
  );
};

/**
 * Custom Next Arrow for React Slick slider
 * @param onClick - Click handler provided by React Slick
 * @param className - CSS class provided by React Slick (includes "slick-disabled" when at end)
 */
export const CustomNextArrow: React.FC<CustomArrowProps> = ({ onClick, className }) => {
  const isDisabled = className?.includes("slick-disabled");

  return (
    <button
      className={`absolute right-0 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white p-2 crossIconStyle !w-10 !h-10 flex justify-center items-center rounded-full z-10 
        ${isDisabled ? "opacity-50 cursor-not-allowed" : "hover:bg-gray-600"}`}
      onClick={onClick}
      disabled={isDisabled}
    >
      <FaArrowRight size={24} />
    </button>
  );
};