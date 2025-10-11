import React from 'react';
import { FaqProps } from '../../../types/faq.types';
import FaqList from '../../../components/common/FaqList/index';

const GeneralFaq: React.FC<FaqProps> = ({ faqData }) => {
    return (
        <section className='!w-full z-[1] relative'>
            <div className='w-full'>
                <FaqList faqData={faqData} useVerticalPaddingOnly />
            </div>
        </section>
    );
};

export default GeneralFaq;