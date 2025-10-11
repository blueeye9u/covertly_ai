import React from 'react';
import { FaqProps } from '../../types/faq.types';
import FaqList from '../common/FaqList/index';

const Faq: React.FC<FaqProps> = ({ faqData }) => {
    return (
        <section className='container-sm !max-w-[740px] !w-full z-[1] relative container-landingpage'>
            <h3 className='fs-48 mb-1 text-center font-semibold'>Frequently Asked Questions</h3>
            <div className='w-full mt-6 md:mt-12'>
                <FaqList faqData={faqData} />
            </div>
        </section>
    );
};

export default Faq;