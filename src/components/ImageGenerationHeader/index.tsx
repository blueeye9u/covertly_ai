import React, { useMemo, useState } from 'react';
import { IoIosArrowBack } from "react-icons/io";
import { useRouter } from 'next/router';
import { isEmpty } from 'lodash';
import Image from 'next/image';
import NiceModal from "@ebay/nice-modal-react";

import { useImageGeneration } from '../../context/imageGeneration.context';
import useLoggedInStatus from '../../hooks/useLoggedInStatus';
import { useConversation } from '../../context/conversation.context';
import { useTheme } from '../../context/themeContext';
import SelectComponent from '../global/forms/Select';
import { Chat_Model_data } from '../../constants/chat-models-data';
import UserDropDown from '../global/userDropdown/UserDropdown';
import { images } from '../../assets/images';
import CommonTooltip from '../ComonTooltip';

interface ImageGenerationHeaderProps {
    switchSidebar?: boolean;
    switchSmallSidebar?: boolean;
    toggleSidebar?: boolean;
    setToggleSidebar?: (toggleSidebar: boolean) => void;
}

const ImageGenerationHeader = ({ switchSidebar, switchSmallSidebar, toggleSidebar, setToggleSidebar }: ImageGenerationHeaderProps) => {
    const [selected] = useState<any>();
    const [isLoggedIn] = useLoggedInStatus();
    const { isDarkMode } = useTheme();
    const router = useRouter();

    const {
        currentChat,
        changeChatLoading,
    } = useConversation();
    const { imageGeneration } = useImageGeneration();

    const handleSelectChat = (val: any) => { }

    const handleRedirect = () => {
        if (imageGeneration.isImageGenerating) {
            NiceModal.show("GenerationInProgressModal");
            return;
        }
        router.back();
    };

    const headerLeftPaddingClass = useMemo(() => {
        let cls = 'pl-6 md:pl-20';
        if (switchSidebar === true) cls += ' md:pl-[368px]';
        if (switchSmallSidebar === true) cls += ' md:pl-[260px]';
        return cls;
    }, [switchSidebar, switchSmallSidebar]);

    const isImageGenerationPage = useMemo(() => {
        const path = router.pathname || "";
        return path.startsWith('/image-generate');
    }, [router.pathname]);

    return (
        <header className={`flex justify-between gap-2 h-[60px] px-6 py-4 pb-2 w-full fixed top-0 left-0 z-20 bg-light dark:bg-blackRussian4 ${headerLeftPaddingClass}`}>
            <div className='flex flex-1 items-center gap-2 justify-start'>
                <button
                className={isImageGenerationPage ? "md:hidden" : ""}
                aria-label="Open menu"
                onClick={() => setToggleSidebar?.(!toggleSidebar)}
                >
                    <Image
                        src={isDarkMode ? "/assets/images/dark-small-logo.svg" : "/assets/images/light-small-logo.svg"}
                        width={26}
                        height={26}
                        className="w-[26px] h-[26px]"
                        alt="logo"
                    />
                </button>
                {!isImageGenerationPage && (
                    <button
                        onClick={handleRedirect}
                        className={`flex gap-2 items-center dark:text-white  ${imageGeneration.isImageGenerating ? "cursor-not-allowed" : "cursor-pointer"}`}
                    >
                        <span className={`p-1 rounded-md bg-transparent hover:dark:bg-blackRussian3 hover:bg-linkWater ${isImageGenerationPage ? 'ml-6' : ''}`}>
                            <CommonTooltip position='bottom' name={"Back"} className={"mt-4 !px-2 pb-[5px] !pt-[1px] !py-1"}>
                                <IoIosArrowBack />
                            </CommonTooltip>
                        </span>
                        <span className="text-sm dark:text-white">Back</span>
                    </button>
                )}

            </div>

            <div className=" items-center gap-2 p-1 bg-white dark:bg-blackRussian2 rounded-md md:mr-0 mr-5 flex">
                {selected && (
                    <SelectComponent
                        Data={Chat_Model_data}
                        selected={selected}
                        setSelected={handleSelectChat}
                        placeholder="Select Model"
                        disabled={changeChatLoading || !isEmpty(currentChat)}
                        hideIcon={!isEmpty(currentChat)}
                        className="!py-[5px]"
                    />
                )}
                {isLoggedIn && <UserDropDown imgUrl={images.profileImg} className={"hidden md:block"} />}
            </div>

        </header>
    )
}

export default ImageGenerationHeader