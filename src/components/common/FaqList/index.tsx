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

    return (
        <div className='w-full'>
            {faqs.map(({ id, isOpen, question, answer }, index) => (
                <div key={id}>
                    <div className={getBorderClasses(index)}>
                        <button
                            onClick={() => handleClick(id)}
                            aria-expanded={isOpen}
                            {...(isOpen && { 'aria-controls': id })}
                            className={`${useVerticalPaddingOnly ? getButtonClasses(isOpen).replace('p-4', 'py-4') : getButtonClasses(isOpen)}`}
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
                            <p className='mt-4 pb-2 text-greyChateau'>{answer}</p>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default FaqList;


