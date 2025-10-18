import React, { useEffect, useRef, useState } from 'react';
import { FiPlus } from 'react-icons/fi';
import { FaqItem } from '../../../types/faq.types';
import { handleFaqClick, getBorderClasses, getButtonClasses, getAnswerClasses } from '../../../utils/faqUtils';

interface FaqListProps {
    faqData: FaqItem[];
    useVerticalPaddingOnly?: boolean;
}

const FaqList: React.FC<FaqListProps> = ({ faqData, useVerticalPaddingOnly }) => {
    const [faqs, setFaqs] = useState<FaqItem[]>([]);
    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
    const contentRefs = useRef<(HTMLDivElement | null)[]>([]);

    useEffect(() => {
        setFaqs(faqData);
    }, [faqData]);

    useEffect(() => {
        contentRefs.current = contentRefs.current.slice(0, faqs.length);
    }, [faqs]);

    const handleClick = (id: string) => {
        handleFaqClick(id, faqs, setFaqs);
    };

    const handleMouseEnter = (index: number) => {
        setHoveredIndex(index);
    };

    const handleMouseLeave = () => {
        setHoveredIndex(null);
    };

    return (
        <div className='w-full'>
            {faqs.map(({ id, isOpen, question, answer }, index) => {
                const isHovered = hoveredIndex === index;
                const isPrevHovered = hoveredIndex === index - 1;
                const isNextHovered = hoveredIndex === index + 1;
                const isPrevOpen = faqs[index - 1]?.isOpen ?? false;
                const isNextOpen = faqs[index + 1]?.isOpen ?? false;
                
                return (
                    <div key={id} className="faq-item-wrapper">
                        <div 
                            className={getBorderClasses(index, isOpen, isHovered, isPrevHovered, isNextHovered, isPrevOpen, isNextOpen)}
                            onMouseEnter={() => handleMouseEnter(index)}
                            onMouseLeave={handleMouseLeave}
                        >
                            <button
                                onClick={() => handleClick(id)}
                                aria-expanded={isOpen}
                                {...(isOpen && { 'aria-controls': id })}
                                className={`${getButtonClasses(isOpen, faqs.some(f => f.isOpen))}`}
                            >
                                <p className='font-normal fs-20'>{question}</p>
                                <span className='flex-shrink-0 dark:text-white'>
                                    <FiPlus className={`${isOpen ? 'rotate-45 transform' : ''} h-5 w-5 transition-all flex-shrink-0 dark:text-white`} />
                                </span>
                            </button>
                            <div
                                className={getAnswerClasses(isOpen)}
                                ref={(el) => (contentRefs.current[index] = el)}
                                style={isOpen ? { maxHeight: contentRefs.current[index]?.scrollHeight } : { maxHeight: 0 }}
                            >
                                <p className='pt-2 pb-3 text-greyChateau'>{answer}</p>
                            </div>
                        </div>
                    </div>
                );
            })}
        </div>
    );
};

export default FaqList;


