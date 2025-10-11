import React, {useEffect, useRef, useState} from "react";
import {useRouter} from 'next/router';
import {useConversation} from "../../context/conversation.context";
import useLoggedInUser from "../../hooks/useLoggedInUser";
import {DownloadIcon, IconInfo} from "../../svgs/svg";
import {Button} from "../global/button/Button";
import {BiMenuAltLeft} from "react-icons/bi";
import AnswerAnswerContent from "./ShareAnswerContent";
import ShareQuestionContent from "./ShareQuestionContent";
import {EShareability} from "../../interfaces/chat";
import {handlePdf} from '../../utils/handlePdf';
import {ChatBoxProps} from "../../interfaces/chatbox-props.interface";

export default function ShareChatBox({
                                         userSetHandler,
                                         conversationMessages,
                                         fetchingData,
                                         editableMessageId,
                                         handleInputKeyDownOnEdit,
                                         handleUpdateMessage,
                                         handleCancel,
                                         handleEdit,
                                         regeneratingMessageId,
                                         handleRegenerateMessage,
                                         userInput,
                                         handleSendMessage,
                                         editedMessage,
                                         setEditedMessage,
                                         setToggleSidebar,
                                         currentChat,
                                         toggleSidebar,
                                         copyFiles
                                     }: Readonly<ChatBoxProps>): JSX.Element {
    const {
        selected,
        generatingMessage,
    } = useConversation();

    const chatContainerRef: any = useRef(null);
    const [isAutoScroll, setIsAutoScroll] = useState(true);
    const [isLoading]: any = useLoggedInUser();
    const [currentChatWithFile, setCurrentChatWithFile] = useState<{ files: File[] } | null>(null)

    const router = useRouter();
    const [toggle] = useState(false);
    const [isSend, setIsSend] = useState(false);

    const isChatDownloadable = currentChat && currentChat?.shareability === EShareability.VIEW_AND_DOWNLOAD;

    const handleScroll = () => {
        if (chatContainerRef.current) {
            const {scrollTop, scrollHeight, clientHeight} =
                chatContainerRef.current;
            let height = scrollHeight - scrollTop - 30;
            const isAtBottom: boolean = height > clientHeight;
            setIsAutoScroll(isAtBottom);
        }
    };
    useEffect(() => {
        const chatBox = chatContainerRef.current;
        if (chatBox && !fetchingData && isAutoScroll) {
            chatBox.scrollTo({
                top: chatBox.scrollHeight + 1000,
                behavior: "smooth",
            });
        }
    }, [conversationMessages, fetchingData]);
    useEffect(() => {
        const chatContainer = chatContainerRef.current;

        if (chatContainer) {
            chatContainer.addEventListener("scroll", handleScroll);
        }
        return () => {
            if (chatContainer) {
                chatContainer.removeEventListener("scroll", handleScroll);
            }
        };
    }, [chatContainerRef, conversationMessages]);

    useEffect(() => {
        if (chatContainerRef.current && isAutoScroll) {
            chatContainerRef.current.scrollTop =
                chatContainerRef.current.scrollHeight + 1000;
        }
    }, [conversationMessages, isAutoScroll]);

    useEffect(() => {
        if (chatContainerRef.current) {
            chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
        }
    }, [generatingMessage]);

    const {selectedTabIdx} = useConversation();

    useEffect(() => {
        if (currentChat?.files?.[0]?.file) {
            setCurrentChatWithFile(currentChat);
        }

        const {id} = router.query;
        return () => {
            if (!id) {
                setCurrentChatWithFile(null);
            }
        };
    }, [currentChat, router.asPath]);

    const textareaRef = useRef(null);
    useEffect(() => {
        if (selected && textareaRef.current) {
            //@ts-ignore
            textareaRef.current.focus();
        }
    }, [selected]);

    useEffect(() => {
        if (userInput.startsWith("@google_search ")) {
            handleSendMessage();
        }
    }, [toggle]);

    useEffect(() => {
        if (isSend) {
            handleSendMessage()
            setIsSend(false); // Reset isSend after sending the message
        }

    }, [isSend]);

    return (
        <div className={"chatBoot"}>
            <div className="chatBoot__head flex items-center py-6 justify-center">
                <button
                    className={`chatBoot__head__burger_menu`}
                    onClick={() => setToggleSidebar(!toggleSidebar)}
                >
                    <BiMenuAltLeft/>
                </button>
                <div className="flex gap-1 items-center justify-center w-full"><span
                    className="text-dark-50"><IconInfo/></span> <p className="text-center text-dark-50 text-xs">This is
                    a copy of a conversation between Covertly & Anonymous</p></div>
                {
                    isChatDownloadable && (
                        <div className="flex justify-between items-center">
                            <Button size='lg' className='!px-3 sm:!px-5 lg:!px-[1.75rem] flex-none max-w-0'
                                    onClick={() => handlePdf(conversationMessages, currentChat?.title, currentChat?.files ?? [])}>
                                <DownloadIcon/> <span className='hidden lg:block'>Download as .pdf</span>
                            </Button>
                        </div>
                    )
                }
            </div>
            <div className={"chatBoot__body flex flex-col pb-16"}>
                <div
                    id="chatBoot__messages__list"
                    className="chatBoot__messages__list themeScrollbar h-0 flex-auto !mx-auto max-w-[1150px]"
                    ref={chatContainerRef}
                >
                    <div
                        id="chatBoxContainer"
                        className="relative chatBootQuestion__container flex grow flex-col gap-5"
                    >
                        {conversationMessages ?
                            conversationMessages?.map((message: any, index: any) =>
                                message?.role === "user" ? (
                                    <React.Fragment key={message._id}>
                                        <ShareQuestionContent
                                            message={message}
                                            userSetHandler={userSetHandler}
                                            index={index}
                                            isLoading={isLoading}
                                            currentChatWithFile={currentChatWithFile}
                                            copyFiles={copyFiles}
                                        />
                                    </React.Fragment>
                                ) : (
                                    <React.Fragment key={message._id}>
                                        <AnswerAnswerContent
                                            message={message}
                                            selectedTabIdx={selectedTabIdx}
                                        />
                                    </React.Fragment>
                                )
                            ) : "No messages found"}
                    </div>
                </div>


            </div>


        </div>
    );
}