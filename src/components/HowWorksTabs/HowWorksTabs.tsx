import React, { useState, ReactNode } from "react";
import Image from "next/image";
import { StarsIcon } from "../../svgs/svg";

interface Tab {
    label: string;
    des: any;
    content: ReactNode;
}

interface TabsProps {
    tabs: Tab[];
}

function getFigureHeight(activeTab: number): string {
    if (activeTab === 0) {
        return "h-[13%]";
    } else if (activeTab === 1) {
        return "h-[47%]";
    } else {
        return "h-[80%] top-[-18px]";
    }
}

const HowWorksTabs: React.FC<TabsProps> = ({ tabs }) => {
    const [activeTab, setActiveTab] = useState(0);

    const handleTabClick = (index: number) => {
        setActiveTab(index);
    };

    return (
        <div className="w-full flex lg:flex-row flex-col gap-[4.5rem]">
            <div className="flex flex-col lg:w-[480px] shrink-0 relative">
                <div className={`bg-whiteSmoke dark:bg-vulcan absolute top-0 left-0 h-full rounded-t-full w-[1px] flex justify-center`}>
                    <figure className={`${getFigureHeight(activeTab)} w-[18px] !absolute left-[46%] -translate-x-1/2 -top-4`}>
                        <Image alt="progress-img" layout={"fill"} className="w-full !h-full" src={"/assets/images/how-works/progress-line.png"} />
                        <span className="absolute bottom-0 opacity-50 dark:opacity-100 dark:text-white"><StarsIcon /></span>
                    </figure>
                </div>
                {tabs.map((tab, index) => (
                    <button
                        key={tab.label}
                        className={`cursor-pointer p-8 py-5 w-full hover:opacity-100 duration-500 ${index === activeTab ? "" : "opacity-20"}`}
                        onClick={() => handleTabClick(index)}
                    >
                        <h4 className={`fs-24 mb-3`}>{tab.label}</h4>
                        <p className={``}>{tab.des}</p>
                    </button>
                ))}
            </div>
            <div className="mt-4 w-full grow">{tabs[activeTab].content}</div>
        </div>
    );
};

export default HowWorksTabs;