import React from 'react';
import { CiDark, CiLight } from "react-icons/ci";
import { useTheme } from '../context/themeContext';

interface ThemeToggleSidebarProps {
    className?: string;
    switchSmallSidebar: boolean;
}

const ThemeToggleSidebar: React.FC<ThemeToggleSidebarProps> = ({
    className,
    switchSmallSidebar
}) => {
    const { isDarkMode, setLightMode, setDarkMode } = useTheme();

    const handleToggle = () => {
        isDarkMode ? setLightMode() : setDarkMode();
    };

    const getContainerClasses = () => {
        const baseClasses = "flex gap-2 p-1 rounded-md dark:bg-blackRussian3 bg-linkWater50 transition-all duration-500";
        const layoutClasses = switchSmallSidebar
            ? "flex-col md:flex-row"
            : "flex-row md:flex-col";

        return `${layoutClasses} ${baseClasses} ${className ?? ''}`;
    };

    const renderCompactModeButton = () => {
        const IconComponent = isDarkMode ? CiLight : CiDark;
        const rotationClass = isDarkMode ? "rotate-[360deg]" : "rotate-[-360deg]";
    
        return (
            <button
                onClick={handleToggle}
                className="flex items-center justify-center p-2 py-1.5 rounded-lg w-full text-sm transition-all duration-300 dark:bg-blackRussian4 bg-linkWater50 text-white"
            >
                <span className={`text-lg text-center transition-transform duration-500 ${rotationClass}`}>
                    <IconComponent />
                </span>
            </button>
        );
    };

 

    return (
        <div className={getContainerClasses()}>
            {renderCompactModeButton() }
        </div>
    );
};

export default ThemeToggleSidebar;