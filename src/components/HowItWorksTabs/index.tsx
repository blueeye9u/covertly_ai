import { useState, ReactNode } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface Tab {
  label: string;
  content: ReactNode;
}

interface TabsProps {
  tabs: Tab[];
}

const HowItWorksTabs: React.FC<TabsProps> = ({ tabs }) => {
  const [activeTab, setActiveTab] = useState(0);

  const handleTabClick = (index: number) => {
    setActiveTab(index);
  };

  return (
    <div className="tabs-container w-full">
      <div className="flex max-w-[570px] overflow-x-auto mx-auto relative mb-5 md:mb-0 md:top-10 z-10 p-1 rounded-full dark:bg-vulcan bg-linkWater">
        {tabs.map((tab, index) => (
          <button
            key={tab.label}
            className={`cursor-pointer sm:px-8 px-4 py-5 rounded-full w-full text-center whitespace-nowrap   ${
              index === activeTab
                ? " dark:text-white dark:bg-black bg-whiteSmoke"
                : "dark:text-manatee"
            }`}
            onClick={() => handleTabClick(index)}
          >
            {tab.label}
          </button>
        ))}
      </div>
      <div className="">
        <AnimatePresence mode="wait">
          <motion.div
          className="tabs_border_gradient"
            key={activeTab}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 10 }}
            transition={{ duration: 0.2 }}
          >
            {tabs[activeTab].content}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

export default HowItWorksTabs;