import React, {useState} from "react";
import {FaqFeaturesData, FaqFeaturesTabs} from "../../../constants/faq-data";
import GeneralFaq from "./GeneralFaq";

interface FaqsFeatureSwitcherProps {
    selectedTabIdx: number;
    setSelectedTabIdx: (idx: number) => void;
}

const FaqsAboutFeatures = () => {
    const [selectedTabIdx, setSelectedTabIdx] = useState(0);

    const handleTabClick = (i: number) => {
        setSelectedTabIdx(i);
    };

    return (
        <div className="mt-[-24px] w-full">
            <h5 className="fs-32 font-semibold text-left w-full mb-5">
                FAQs About Covertly Features
            </h5>
            <ul className="price_plan_tabs rounded-[8px] mb-8 w-full overflow-x-auto" aria-label="Tabs">
                {FaqFeaturesTabs.map((tab, i) => (
                    <li key={tab.name} className='w-full'>
                        <button
                            onClick={() => handleTabClick(i)}
                            className={`h-[60px] rounded-[6px] px-[32px] py-[15.5px] flex justify-center items-center w-full ${
                                i === selectedTabIdx ? "btn-active" : ""
                            }`}
                        >
                            <span className="p-1 text-white leading-none">{tab.name}</span>
                        </button>
                    </li>
                ))}
            </ul>
            <GeneralFaq faqData={FaqFeaturesData[selectedTabIdx]} />
        </div>
    );
};

export default FaqsAboutFeatures