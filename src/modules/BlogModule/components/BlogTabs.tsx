import { useState, ReactNode } from "react";
import { v4 as uuidv4 } from "uuid";

interface Tab {
    label: string;
    content: ReactNode;
}

interface TabsProps {
    tabs: Tab[];
}

const BlogTabs: React.FC<TabsProps> = ({ tabs }) => {
    const [activeTab, setActiveTab] = useState(0);

    const handleTabClick = (index: number) => {
        setActiveTab(index);
    };

    return (
        <div className="tabs-container w-full">
            <div className="flex sm:flex-row flex-col gap-4 sm:gap-6 justify-center items-center max-w-[720px] mx-auto w-full">
                <p className="dark:text-white shrink-0">Top Suggestion:</p>
                <div className="flex space-x-6 overflow-auto w-full">
                    {tabs.map((tab, index) => (
                        <button
                            key={uuidv4()}
                            className={`cursor-pointer border-b text-center whitespace-nowrap ${index === activeTab ? "border-[#30C5D2] text-[#30C5D2]" : "border-transparent dark:text-white"
                                }`}
                            onClick={() => handleTabClick(index)}
                            role="tab"
                            aria-selected={index === activeTab}
                            tabIndex={0}
                        >
                            {tab.label}
                        </button>
                    ))}
                </div>
            </div>
            <div className="md:mt-16 mt-8">{tabs[activeTab].content}</div>
        </div>
    );
};

export default BlogTabs;
