import { useState, useEffect, useRef } from "react";
import { RiArrowDownSLine } from "react-icons/ri";
import { RxCross2 } from "react-icons/rx";
import { IoMdCheckmark } from "react-icons/io";

interface Option {
  label: string;
  value: string;
}

interface MultiSelectProps {
  selected: string[];
  setSelected: (values: string[]) => void;
  options: Option[];
  placeholder?: string;
}

export const MultiSelect: React.FC<MultiSelectProps> = ({
  selected,
  setSelected,
  options,
  placeholder = "Choose patterns",
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  const toggleOption = (value: string) => {
    if (selected.includes(value)) {
      setSelected(selected.filter((v) => v !== value));
    } else {
      setSelected([...selected, value]);
    }
  };

  const removeOption = (value: string) => {
    setSelected(selected.filter((v) => v !== value));
  };

  const selectedLabels = options.filter((opt) => selected.includes(opt.value));

  // Handle outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div ref={wrapperRef} className="relative w-full">
      <button
        type="button"
        className="w-full flex justify-between items-center px-4 py-3 bg-light dark:bg-[#1E2129] text-[#88898B] rounded-md"
        onClick={() => setIsOpen((prev) => !prev)}
      >
        <div className="flex flex-wrap gap-1 max-w-[90%]">
          {selectedLabels.length === 0 ? (
            <span className="text-gray-400">{placeholder}</span>
          ) : (
            selectedLabels.map((opt) => (
              <span
                key={opt.value}
                className="py-1.5 px-2 flex gap-2 items-center text-[#079695] border border-[#07969566] rounded-md text-xs"
              >
                {opt.label}
                <RxCross2
                  size={12}
                  className="cursor-pointer shrink-0"
                  onClick={(e: any) => {
                    e.stopPropagation();
                    removeOption(opt.value);
                  }}
                />
              </span>
            ))
          )}
        </div>
        <RiArrowDownSLine
          className={`ml-2 transition-transform ${isOpen ? "rotate-180" : ""}`}
          size={18}
        />
      </button>

      {isOpen && (
        <div className="absolute z-10 w-full mt-2 bg-light dark:bg-[#1E2129] rounded-md shadow-lg max-h-60 overflow-y-auto p-4 space-y-1">
          {options.map((option) => (
            <button
              key={option.value}
              className={`p-2 cursor-pointer text-xs dark:text-[#CFD0D1] rounded-md flex justify-between w-full ${
                selected.includes(option.value) ? "bg-whiteSmoke dark:bg-[#282A2F]" : ""
              }`}
              onClick={() => toggleOption(option.value)}
            >
              {option.label}
              {selected.includes(option.value) && <span><IoMdCheckmark /></span>}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};
