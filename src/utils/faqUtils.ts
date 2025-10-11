import { FaqItem } from '../types/faq.types';

/**
 * Handles FAQ item click to toggle open/closed state
 */
export const handleFaqClick = (
  id: string,
  faqs: FaqItem[],
  setFaqs: React.Dispatch<React.SetStateAction<FaqItem[]>>
) => {
  setFaqs((prevFaqs) =>
    prevFaqs.map((faq) =>
      faq.id === id ? { ...faq, isOpen: !faq.isOpen } : { ...faq, isOpen: false }
    )
  );
};

/**
 * Gets the border classes for FAQ items based on index
 */
export const getBorderClasses = (index: number): string => {
  return `border-2 border-x-0 border-b-2 ${index === 0 ? 'border-t-2' : 'border-t-0'} border-linkWater50 dark:border-blackRussian3`;
};

/**
 * Gets the button classes for FAQ items
 */
export const getButtonClasses = (isOpen: boolean): string => {
  return `${isOpen ? 'bg-linkWater50 dark:bg-blackRussian2 mt-4' : ''} transition-all duration-300 cursor-pointer flex items-center w-full justify-between gap-2 p-4 text-left dark:text-white focus:outline-none focus-visible:ring focus-visible:ring-purple-500 focus-visible:ring-opacity-75`;
};

/**
 * Gets the answer container classes
 */
export const getAnswerClasses = (isOpen: boolean): string => {
  return `At-Answer ${isOpen ? 'AtOpen' : ''} px-4`;
};
