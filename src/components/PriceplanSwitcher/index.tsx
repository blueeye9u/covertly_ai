import React from "react";
import { v4 as uuidv4 } from "uuid";

const tabs = [
    { name: "Monthly", current: true },
    { name: "Annually", current: false },
];

interface PricePlanSwitcherProps {
    selectedTabIdx: number;
    setSelectedTabIdx: (idx: number) => void;
}

const PricePlanSwitcher: React.FC<PricePlanSwitcherProps> = ({ selectedTabIdx, setSelectedTabIdx }) => {
    return (
        <ul className="price_plan_tabs rounded-[8px]" aria-label="Tabs">
            {tabs.map((tab, i) => (
                <li key={tab.name}>
                    <button
                        key={uuidv4()}
                        onClick={() => setSelectedTabIdx(i)}
                        className={`rounded-[6px] px-[32px] py-[15.5px] ${i === selectedTabIdx ? "btn-active" : ""}`}
                    >
                        <span className="p-4 text-white">{tab.name}</span>
                    </button>
                </li>
            ))}
        </ul>
    );
};

export default PricePlanSwitcher;
