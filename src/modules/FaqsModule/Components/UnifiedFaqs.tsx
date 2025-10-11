import React, {useState} from 'react'
import {GeneralFaqData} from "../../../constants/faq-data";
import SearchBox from './SearchBox';
import GeneralFaq from "./GeneralFaq";
import FaqsAboutFeatures from "./FaqsAboutFeatures";

const UnifiedFaqs = () => {
    const [query, setQuery] = useState<string>('');
    const handleSearchSubmit = (q: any) => {
        console.log("Searching:", q);
    };
    return (
        <div className='py-10 flex flex-col justify-center items-center container-landingpage'>
            <SearchBox
                value={query}
                onChange={setQuery}
                onSubmit={handleSearchSubmit}
            />
            <h3 className='fs-48 mt-8 mb-1 font-semibold text-left w-full'>General Covertly FAQs</h3>
            <div className="w-full py-4 max-w-7xl mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                    <GeneralFaq faqData={GeneralFaqData}/>
                    <FaqsAboutFeatures/>
                </div>
            </div>
        </div>
    )
}

export default UnifiedFaqs
