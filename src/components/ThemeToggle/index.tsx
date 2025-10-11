import React from 'react';
import { CiDark, CiLight } from "react-icons/ci";
import { useTheme } from '../../context/themeContext';

const ThemeToggle: React.FC<{ className?: string }> = ({ className }) => {
  const { isDarkMode, setLightMode, setDarkMode } = useTheme();

  return (
    <div className={`flex space-x-1 rounded-[8px] p-[2px] bg-[#393C45] w-[225px] h-[48px] ${className}`}>
      <button
        onClick={setLightMode}
        className={`flex rounded-[6px] items-center justify-center w-full disabled:!opacity-100 ${isDarkMode ? 'text-white hover:text-white hover:bg-[#393C45]' : 'btn-primary cursor-not-allowed'}`}
        disabled={!isDarkMode}
      >
        <div className="flex items-center px-[5px]">
            <span className="text-lg">
              <CiLight/>
            </span>
            <span className="px-[5px]">Daybreak</span>
        </div>
      </button>

      <button
        onClick={setDarkMode}
        className={`flex rounded-[6px] items-center justify-center w-full disabled:!opacity-100 ${isDarkMode ? 'btn-primary cursor-not-allowed' : 'text-white hover:text-white hover:bg-[#393C45]'}`}
        disabled={isDarkMode}
      >
        <div className="flex items-center px-[5px]">
          <span className="text-lg">
            <CiDark/>
          </span>
          <span className="px-[5px]">Nightfall</span>
        </div>
      </button>
    </div>
  );
};

export default ThemeToggle;
