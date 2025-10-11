import clsx from "clsx";
import React from "react";
import { FiSearch } from "react-icons/fi";
import { AiOutlineLoading } from "react-icons/ai";
import { CrossIcon } from "../../../svgs/svg";

interface SsProps {
  sm: string;
  lg: string;
  md: string;
}

interface IProps {
  className?: string;
  placeholder?: string;
  size?: "sm" | "md" | "lg";
  SearchIcon?: string;
  ParentClassName?: string;
  name?: string;
  onChange?: any;
  value?: string;
  required?: boolean;
  isLoading?: boolean;
  onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  onSearchIconClick?: () => void;
}

const sizeStyles: SsProps = {
  sm: "form-control-sm",
  md: "form-control-md",
  lg: "form-control-lg",
};

const Search = ({
  size="sm",
  className,
  placeholder,
  SearchIcon,
  ParentClassName,
  name,
  onChange,
  value,
  required = true,
  isLoading = false,
  onSearchIconClick,
  ...rest
}: IProps) => {
  // Handler to clear the input
  const handleClear = (e: React.MouseEvent) => {
    e.preventDefault();
    if (onChange) {
      // Simulate an event with empty value
      onChange({ target: { value: "", name } });
    }
  };
  return (
    <div className="relative w-full">
      <input
        required={required}
        id="search"
        type="search"
        placeholder={placeholder}
        name={name}
        value={value}
        onChange={(e) => onChange(e)}
        className={clsx(
          className,
          sizeStyles[size],
            "form-control input-text form-placeholder pr-14 !py-3"
        )}
        {...rest}
        onKeyDown={rest.onKeyDown}
      />
      <div className="form-search-icon-group flex items-center absolute right-3 top-1/2 -translate-y-1/2 space-x-2">
        {value && value.length > 0 && (
          <button
            type="button"
            aria-label="Clear search"
            onClick={handleClear}
            className="focus:outline-none mr-1 z-10 bg-transparent" // add z-10 and bg-transparent
            tabIndex={0}
            style={{ pointerEvents: 'auto' }} // force pointer events
          >
            <CrossIcon className="w-4 h-4 text-gray-400 hover:text-gray-600 transition-colors" />
          </button>
        )}
        <span>
          {isLoading ? (
            <AiOutlineLoading className="animate-spin" />
          ) : (
            <button
              type="button"
              onClick={onSearchIconClick}
              style={{ cursor: onSearchIconClick ? 'pointer' : undefined, pointerEvents: 'auto' }}
              aria-label="Search"
              className="bg-transparent p-0 border-0"
            >
              <FiSearch />
            </button>
          )}
        </span>
      </div>
    </div>
  );
};

export default Search;
