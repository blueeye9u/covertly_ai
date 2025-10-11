import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import NiceModal from "@ebay/nice-modal-react";
import { images } from "../../assets/images";
import {
    ChevronIcon,
    GenerationIconImage,
    ImageLibraryIcon,
    MessageIcon,
    TokenIcon,
    RedactionIcon,
    BookIcon,
    Setting,
    StarIcon,
    VerifiedIcon,
    DeepSearchIcon,
} from "../../svgs/svg";
import { useConversation } from "../../context/conversation.context";
import useLoggedInStatus from "../../hooks/useLoggedInStatus";
import UserDropDown from "../global/userDropdown/UserDropdown";
import useSubscriptionPackage from "../../hooks/useSubscriptionPackage";
import { useTheme } from "../../context/themeContext";
import { ISubscriptionType } from "../../enums/subscription.enum";
import { checkAutoRedactionAuth, clearAutoRedactionAuth } from "../../utils/autoRedactionAuth";
import CommonTooltip from "../ComonTooltip";

interface IProps {
    toggleSidebar: any;
    setToggleSidebar: any;
    switchSidebar: any;
    setSwitchSidebar: any;
    switchSmallSidebar: any;
    setSwitchSmallSidebar: any;
}

const Sidebar = ({
    toggleSidebar,
    setToggleSidebar,
    switchSidebar,
    setSwitchSidebar,
    switchSmallSidebar,
    setSwitchSmallSidebar
}: IProps) => {
    const [isHovered, setIsHovered] = useState(false);
    const [isMobile, setIsMobile] = useState(false);
    const sidebarRef = useRef<HTMLDivElement>(null);
    const [isLoggedIn] = useLoggedInStatus();
    const router = useRouter();
    const {
        changeChatLoading,
        startChatLoading,
        deleteChatLoading,
        fetchingData,
        selectedModelLoading,
        generatingMessage,
        generatingPDFChats,
        setChatMessages,
    } = useConversation();
    const { currentPackage }: any = useSubscriptionPackage();
    const { isDarkMode } = useTheme();
    const isAnyLoading = deleteChatLoading || fetchingData || selectedModelLoading ||
        generatingMessage || changeChatLoading || startChatLoading || generatingPDFChats;

    const handleSubscription = (modalName: string) => {
        NiceModal.show(modalName);
    };

    const handleNavigation = (path: string) => {
        if (isAnyLoading) {
            NiceModal.show("ResponseInProgressModal");
        } else {
            setChatMessages([]);
            router.push(path);
        }
    };

    const toggleSidebarVisibility = () => {
        setSwitchSidebar((prev: boolean) => {
            setSwitchSmallSidebar(prev);
            return !prev;
        })
    };

    const getResponsiveClasses = () => {
        return {
            sidebarWidth: switchSidebar ? "md:w-20 w-16" : "md:w-[260px] w-16",
            sidebarPadding: switchSidebar ? "md:px-3 px-3" : "md:px-5 px-3",
            headerJustify: switchSidebar ? "md:justify-center justify-center" : "md:justify-between justify-center",
            itemJustify: switchSidebar ? "md:justify-center justify-center" : "md:justify-start justify-center",
            textTransition: switchSidebar
                ? "md:opacity-0 md:duration-0 opacity-0 translate-x-[-10px]"
                : "md:opacity-100 md:translate-x-0 md:duration-500 opacity-0 translate-x-[-10px]",
            countTransition: switchSidebar
                ? "md:opacity-0 md:scale-75 md:duration-0 opacity-0 scale-75"
                : "md:opacity-100 md:scale-100 md:duration-500 opacity-0 scale-75",
            flexDirection: switchSidebar ? "flex-col" : "flex-row",
            alignItems: switchSidebar ? "md:items-center items-center" : "items-center md:items-start",
        };
    };

    const getUpgradeButtonHeight = () => {
        return switchSidebar ? "md:h-auto md:duration-500 h-[65px] duration-500" : "md:h-[65px] md:duration-500 h-auto duration-500";
    };

    const getSmallLogoSrc = () => {
        return isDarkMode ? "/assets/images/dark-small-logo.svg" : "/assets/images/light-small-logo.svg";
    };

    const renderCollapseButton = (isVisible: boolean, isMobile: boolean) => {
        if (!isVisible) return null;
        // Do not show collapse toggle on mobile (<md). Sidebar is forced collapsed there.
        if (isMobile) return null;

        return (
            <button
                onClick={() => {setSwitchSidebar(!switchSidebar); if(switchSidebar) setSwitchSmallSidebar(true);}}
                className={"cursor-pointer md:block hidden min-h-[26px]"}
            >
                <CommonTooltip position='right' name={`${switchSidebar ? "Show Navigation" : "Hide"}`} className={"mt-4 !px-2 pb-[5px] !pt-[1px] !py-1"}>
                    <ChevronIcon isCollapsed={switchSidebar}/>
                </CommonTooltip>
            </button>
        );
    };

    const renderLogo = () => {
        const logoSrc = isDarkMode ? images.lightLogo : images.logo;
        
        if (!isLoggedIn) {
            return (
                <div className="w-full">
                    {switchSidebar ? (
                        <Image src={images.lightLogo} alt="logo" width={106} height={20} />
                    ) : (
                        <Image
                            src={getSmallLogoSrc()}
                            width={26}
                            height={26}
                            className="w-[26px] h-[26px] mx-auto"
                            alt="logo"
                        />
                    )}
                </div>
            );
        }

        // On mobile (<md), always show the compact square logo.
        // On desktop, show full wordmark only when the small sidebar is expanded.
        return (
            <>
                {switchSidebar ? (
                    <div className="w-auto">
                        <Image
                            src={getSmallLogoSrc()}
                            width={26}
                            height={26}
                            className="w-[26px] h-[26px] mx-auto block"
                            alt="logo"
                        />
                    </div>
                ) : (
                    <div className="md:block hidden">
                        <Image
                            className="md:block hidden"
                            src={logoSrc}
                            alt="logo"
                            width={106}
                            height={20}
                        />
                    </div>
                )}
            </>
        );
    };

    const renderChatButton = () => {
        const classes = getResponsiveClasses();
        const isActive = router.pathname === "/chat";

        const handleChatClick = () => {
            if (isActive) {
                toggleSidebarVisibility();
            } else {
                handleNavigation("/chat");
            }
        };

        const buttonClasses = `${classes.itemJustify} flex gap-3 items-center text-sm p-2.5 rounded-lg relative cursor-pointer whitespace-nowrap w-full ${
            isActive 
                ? 'dark:text-white text-gray dark:bg-blackRussian3 bg-whiteSmoke' 
                : 'dark:text-white text-gray'
        }`;

        const buttonEl = (
            <button
                onClick={handleChatClick}
                className={buttonClasses}
            >
                <span className="shrink-0"><MessageIcon/></span>
                <span className={`absolute left-8 ml-3 ${classes.textTransition} whitespace-nowrap`}>Chat</span>
                <span className={`absolute top-1/2 -translate-y-1/2 right-2 w-5 h-5 flex justify-center items-center dark:bg-tuna bg-linkWater50 rounded-full ${classes.countTransition}`}>
                    <ChevronIcon isCollapsed={true} width={"14px"} height={"14px"} />
                </span>
            </button>
        );

        return (
            <div className="pb-4 md:border-b md:dark:border-blackRussian2 md:border-linkWater50">
                { switchSidebar ? (
                    <CommonTooltip position='right' name={"Chat"} className={"!px-2 pb-[5px] !pt-[1px] !py-1"} parentClassName="w-full">
                        {buttonEl}
                    </CommonTooltip>
                ) : buttonEl }
            </div>
        );
    };

    const renderSidebarItem = (icon: React.ReactNode, text: string, isComingSoon = false, onClick?: () => void, path?: string, count?: number, badge?: string) => {
        const classes = getResponsiveClasses();
        const isActive = path && router.pathname === path;

        const handleClick = () => {
            if (isActive) {
                toggleSidebarVisibility();
            } else {
                onClick?.();
            }
        };

        // Always hide badges below md; on desktop show when expanded and hide when collapsed
        const badgeClass = switchSidebar ?
            "md:opacity-0 md:scale-75 md:translate-y-[-5px] md:duration-0 opacity-0 scale-75 translate-y-[-5px]":
            "md:opacity-100 md:scale-100 md:translate-y-0 md:duration-500 opacity-0 scale-75 translate-y-[-5px]";

        if (isComingSoon) {
            return (
                <li className={`${classes.itemJustify} flex gap-3 items-center dark:text-white text-gray text-sm p-2.5 relative whitespace-nowrap w-full`}>
                    <span className="shrink-0">{icon}</span>
                    <span className={`absolute left-8 ml-3 ${classes.textTransition} whitespace-nowrap`}>{text}</span>
                    <span className={`absolute py-0.5 px-2 dark:bg-blackRussian3 bg-linkWater50 text-center rounded-full -right-1 text-[10px] ${badgeClass}`}>
                        Coming Soon
                    </span>
                </li>
            );
        }

        const buttonClasses = `${classes.itemJustify} flex gap-3 items-center text-sm p-2.5 cursor-pointer whitespace-nowrap w-full relative rounded-lg ${
            isActive 
                ? 'dark:text-white text-gray dark:bg-blackRussian3 bg-whiteSmoke' 
                : 'dark:text-white text-gray'
        }`;

        const buttonEl = (
            <button
                onClick={handleClick}
                className={buttonClasses}
            >
                <span className="shrink-0">{icon}</span>
                <span className={`absolute left-8 ml-3 ${classes.textTransition} whitespace-nowrap`}>{text}</span>
                {badge && (
                    <span className={`absolute py-0.5 px-2 dark:bg-blackRussian3 bg-linkWater50 text-center rounded-full -right-1 text-[10px] ${badgeClass}`}>
                        {badge}
                    </span>
                )}
                {!badge && count !== undefined && (
                    <span className={`absolute top-1/2 -translate-y-1/2 right-2 max-w-5 max-h-5 w-full h-full flex justify-center items-center dark:bg-tuna bg-linkWater50 rounded-full p-3 text-[10px] ${classes.countTransition}`}>
                        {count}
                    </span>
                )}
            </button>
        );

        return (
            switchSidebar ? (
                <CommonTooltip position='right' name={text} className={"!px-2 pb-[5px] !pt-[1px] !py-1"} parentClassName="w-full">
                    {buttonEl}
                </CommonTooltip>
            ) : buttonEl
        );
    };

    const renderSettingItem = (icon: React.ReactNode, text: string, path: string) => {
        const classes = getResponsiveClasses();

        const buttonEl = (
            <button
                className="flex items-center"
                onClick={() => handleNavigation(path)}
            >
                {icon}
                <span className={`absolute left-6 ml-2 ${classes.textTransition} whitespace-nowrap`}>
                    {text}
                </span>
            </button>
        );

        return (
            <li className="relative">
                { switchSidebar ? (
                    <CommonTooltip position='right' name={text} className={"!px-2 pb-[5px] !pt-[1px] !py-1"} parentClassName="w-full">
                        {buttonEl}
                    </CommonTooltip>
                ) : buttonEl }
            </li>
        );
    };

    useEffect(() => {
        if (globalThis.window !== undefined) {
            const isMobile = globalThis.window.matchMedia('(max-width: 639px)').matches;
            if (isMobile) {
                setIsMobile(true);
            }
        }
    }, []);

    const renderSidebarHeader = () => {
        const classes = getResponsiveClasses();
        
        if (isLoggedIn) {
            return (
                <strong className={`${classes.headerJustify} w-full mb-5 flex items-center`}>
                    {(isMobile || !switchSidebar || (!isHovered && switchSidebar)) && renderLogo()}
                    {(!switchSidebar || (isHovered && switchSidebar)) && renderCollapseButton(true, false)}
                </strong>
            );
        }

        return (
            <strong className="mb-5 flex gap-2 justify-between items-center">
                {renderLogo()}
                {switchSidebar && renderCollapseButton(true, false)}
            </strong>
        );
    };

    return (
        <aside
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            ref={sidebarRef}
            className={`
                ${toggleSidebar ? "-translate-x-full" : "translate-x-0"}
                md:translate-x-0
                ${getResponsiveClasses().sidebarWidth}
                small_sidebar dark:bg-blackRussian bg-white border-r dark:border-blackRussian2 border-linkWater50
                py-6 pt-8 flex flex-col h-[100vh]
                duration-300 ease-out
                fixed left-0 top-0 z-[101]
            `}
        >
            <div className={`${getResponsiveClasses().sidebarPadding} sidebar__head mb-2.5 flex flex-col gap-2.5`}>
                {renderSidebarHeader()}
            </div>

            <div className="flex-1 flex flex-col overflow-y-auto overflow-x-hidden px-3 md:px-5">
                <ul className="sidebar_lists flex-1">
                    {renderChatButton()}
                    {renderSidebarItem(
                        <GenerationIconImage />,
                        "Image Generation",
                        false,
                        () => handleNavigation("/image-generate"),
                        "/image-generate"
                    )}
                    {renderSidebarItem(
                        <ImageLibraryIcon />,
                        "Image Library",
                        false,
                        () => handleNavigation("/image-library"),
                        "/image-library"
                    )}
                    {renderSidebarItem(
                        <DeepSearchIcon />,
                        "Deep Research Agent",
                        false,
                        () => handleNavigation("/deep-search"),
                        "/deep-search",
                        undefined,
                        "beta"
                    )}
                    {renderSidebarItem(<RedactionIcon />, "Auto Redaction", false, () => {
                        const authStatus = checkAutoRedactionAuth();
                        
                        if (authStatus.isValid) {
                            // Valid token, navigate directly
                            handleNavigation("/redaction");
                            return;
                        }
                        
                        if (authStatus.isExpired) {
                            // Token expired, clear it
                            clearAutoRedactionAuth();
                        }
                        
                        // No valid token, show password modal
                        NiceModal.show("AutoRedactionPasswordModal");
                    }, undefined, undefined, "coming soon")}
                </ul>
                <div className="sidebar__foot">
                    <ul className={`setting_list ${getResponsiveClasses().alignItems}`}>
                        {renderSettingItem(<TokenIcon />, "Usage", "/usage")}
                        {renderSettingItem(<BookIcon />, "Resources", "/knowledge-hub")}
                        {renderSettingItem(<Setting />, "General Settings", "/settings")}
                    </ul>

                    {currentPackage === ISubscriptionType?.FREE && (
                        switchSmallSidebar ? (
                            <button
                                className={`sidebar__foot__note h-fit cursor-pointer text-white relative overflow-hidden ${getUpgradeButtonHeight()}`}
                                onClick={() => isAnyLoading ? NiceModal.show("ResponseInProgressModal") : handleSubscription("subscriptionModal")}
                            >
                                <span className="mt-1"><StarIcon /></span>
                                <div
                                    className={`absolute left-6 ml-3 dark:text-white text-gray transition-all ${getResponsiveClasses().textTransition}`}
                                >
                                    <p>Upgrade to Advanced</p>
                                    <p className="block text-[13px] whitespace-nowrap">Gain Access to More AI Power</p>
                                </div>
                            </button>
                        ) : (
                            <CommonTooltip position='right' name={"Upgrade plan"} className={"!px-2 pb-[5px] !pt-[1px] !py-1"} parentClassName="w-full">
                                <button
                                    className={`sidebar__foot__note h-fit cursor-pointer text-white relative overflow-hidden ${getUpgradeButtonHeight()}`}
                                    onClick={() => isAnyLoading ? NiceModal.show("ResponseInProgressModal") : handleSubscription("subscriptionModal")}
                                >
                                    <span className="mt-1"><StarIcon /></span>
                                    <div
                                        className={`absolute left-6 ml-3 dark:text-white text-gray transition-all ${getResponsiveClasses().textTransition}`}
                                    >
                                        <p>Upgrade to Advanced</p>
                                        <p className="block text-[13px] whitespace-nowrap">Gain Access to More AI Power</p>
                                    </div>
                                </button>
                            </CommonTooltip>
                        )
                    )}
                </div>

                <div className="flex flex-col">
                    <div className={`mt-4 block md:hidden ${switchSmallSidebar ? "mx-auto" : ""}`}>
                        {isLoggedIn && (
                            <UserDropDown
                                imgUrl={images.profileImg}
                                className=""
                                fullNameClass={`absolute !w-full left-10 ml-3 text-white dark:text-white text-gray whitespace-nowrap ${getResponsiveClasses().textTransition}`}
                            />
                        )}
                    </div>
                    <div className={`flex w-full gap-2 items-center mt-3 flex-col`}>
                        { switchSmallSidebar ? (
                            <CommonTooltip position='right' name={'Privacy protection'} className={'!px-2 pb-[5px] !pt-[1px] !py-1'} parentClassName='w-full'>
                                <button
                                    onClick={() => NiceModal.show("PrivacyProtectionModal")}
                                    className={`flex justify-center items-center dark:bg-blackRussian2 bg-linkWater50 rounded-lg cursor-pointer w-full h-[38px] shrink-0`}
                                >
                                    <VerifiedIcon width="20" height="22" />
                                </button>
                            </CommonTooltip>
                        ) : (
                            <button
                                onClick={() => NiceModal.show("PrivacyProtectionModal")}
                                className={`flex justify-center items-center dark:bg-blackRussian2 bg-linkWater50 rounded-lg cursor-pointer w-full h-[38px] shrink-0`}
                            >
                                <VerifiedIcon width="20" height="22" />
                            </button>
                        )}
                    </div>
                </div>
            </div>

        </aside>
    );
};

export default Sidebar;