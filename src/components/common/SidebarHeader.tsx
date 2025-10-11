import React from 'react';
import { Button } from '../global/button/Button';
import Search from '../global/forms/Search';
import { PlusIcon, ChevronIcon } from '../../svgs/svg';
import CommonTooltip from '../ComonTooltip';

interface SidebarHeaderProps {
    title: string;
    buttonText: string;
    buttonDisabled: boolean;
    onButtonClick: () => void;
    searchPlaceholder: string;
    searchValue: string;
    searchOnChange: (e: { target: { value: any } }) => void;
    searchOnKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) => void;
    searchOnSearchIconClick: () => void;
    searchClassName: string;
    searchIconClassName: string;
    isSearchLoading: boolean;
    switchSidebar: any;
    setSwitchSmallSidebar: (value: any) => void;
}

const SidebarHeader: React.FC<SidebarHeaderProps> = ({
    title,
    buttonText,
    buttonDisabled,
    onButtonClick,
    searchPlaceholder,
    searchValue,
    searchOnChange,
    searchOnKeyDown,
    searchOnSearchIconClick,
    searchClassName,
    searchIconClassName,
    isSearchLoading,
    switchSidebar,
    setSwitchSmallSidebar
}) => {
    return (
        <div className="sidebar__head mb-2.5 flex flex-col gap-2.5 px-5">
            <div className="mb-5 flex justify-between items-center">
                <p className="text-lg dark:text-white text-gray">{title}</p>
                <button
                    tabIndex={0}
                    className="cursor-pointer"
                    onClick={() => {
                        setSwitchSmallSidebar(true);
                    }}
                    onKeyDown={(event) => {
                        if (event.key === "Enter" || event.key === " ") {
                            setSwitchSmallSidebar(true);
                        }
                    }}
                >
                    <CommonTooltip position='right' name="Hide" className={"mt-4 !px-2 pb-[5px] !pt-[1px] !py-1"}>
                        <ChevronIcon isCollapsed={!switchSidebar} />
                    </CommonTooltip>
                </button>
            </div>
            <Button
                size="md"
                type="button"
                color="primary"
                className="w-full"
                disabled={buttonDisabled}
                onClick={onButtonClick}
            >
                {buttonText}
                <div className="text-white">
                    <PlusIcon/>
                </div>
            </Button>
            <Search
                placeholder={searchPlaceholder}
                name="search"
                value={searchValue}
                onChange={searchOnChange}
                onKeyDown={searchOnKeyDown}
                className={searchClassName}
                SearchIcon={searchIconClassName}
                isLoading={isSearchLoading}
                onSearchIconClick={searchOnSearchIconClick}
            />
        </div>
    );
};

export default SidebarHeader;
