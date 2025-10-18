import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { IoIosArrowBack } from "react-icons/io";
import { toast } from "react-hot-toast";
import Image from "next/image";
import NiceModal from "@ebay/nice-modal-react";

import { useConversation } from "../../../context/conversation.context";
import ImageComponent from "../../global/imageComponent/ImageComponent";
import QuestionContent from "./components/question";
import AnswerContent from "./components/answer";
import ConversationFiles from "./components/conversation-files";
import SourcesSidebar from "./components/sources-sidebar";
import { getCookie } from "../../../utils/getCookie";
import CommonTooltip from "../../ComonTooltip";
import Header from "../../header";
import { getFullName } from "../../../utils/getRandomName";
import { Chat_Models_Display_data, ChatGPTDisplay } from "../../../constants/chat-models-data";
import { EModels } from "../../../enums/modals.enum";
import ChatModel from "../../ChatModel";
import { useUploadFiles } from '../../../hooks/useUploadFiles';
import UploadProgressSpinner from '../../UploadProgressSpinner/UploadProgressSpinner';
import { ChatBoxProps } from "../../../interfaces/chatbox-props.interface";
import ElijahView from "./ElijahView/ElijahView";
import { images } from "../../../assets/images";
import { ChatMessageIcon, RightArrow, DocumentFilledIcon } from "../../../svgs/svg";
import { ChatBoxRenderer } from "./components/ChatBoxRenderer";
import { ChatBoxContent } from "./components/ChatBoxContent";
import { useChatBoxLogic } from "./hooks/useChatBoxLogic";
import { validateAndProcessFiles } from "../../../utils/fileUploadUtils";
import { getModelImage } from "../../../utils/chatUtils";
import { useTheme } from "../../../context/themeContext";
import Slider from "react-slick";

const canRegenerateHandler = (message: any) => {
    if (message?.isSuperResponse) return false;
    return true;
}

const renderUserMessage = (message: any, index: number, props: any) => {
    const { userSetHandler, editableMessageId, editedMessage, setEditedMessage, handleInputKeyDownOnEdit,
        handleCancel, regeneratingMessageId, handleUpdateMessage, handleEdit, fetchingData,
        isLoading, currentChat, copyFiles, conversationMessages, isFileUploading, questionRefs } = props;

    return (
        <React.Fragment key={message._id}>
            <div
                ref={(el) => {
                    if (el) {
                        questionRefs.current[message._id] = el;
                    }
                }}
            >
                <QuestionContent
                    message={message}
                    userSetHandler={userSetHandler}
                    index={index}
                    editableMessageId={editableMessageId}
                    editedMessage={editedMessage}
                    setEditedMessage={setEditedMessage}
                    handleInputKeyDownOnEdit={handleInputKeyDownOnEdit}
                    handleCancel={handleCancel}
                    regeneratingMessageId={regeneratingMessageId}
                    handleUpdateMessage={handleUpdateMessage}
                    handleEdit={handleEdit}
                    fetchingData={fetchingData}
                    isLoading={isLoading}
                    currentChatWithFile={currentChat?.files}
                    copyFiles={copyFiles}
                    lastIndex={conversationMessages?.length - 2}
                />
                <ConversationFiles currentChat={currentChat} conversationId={message._id} isFileUploading={isFileUploading} />
            </div>
        </React.Fragment>
    );
};

const renderSystemMessage = (message: any, index: number, props: any) => {
    const { fetchingData, handleRegenerateMessage, regeneratingMessageId, selectedTabIdx,
        conversationMessages, userInput, isDeepSearch, handleToggleSources,
        sourcesVisibility, answerHeights, lastResponseMinHeightStyle, answerRefs } = props;

    // Check if sidebar should be shown based on model and visibility settings
    const shouldShowSidebar = (message.model !== EModels.DEEP_SEARCH ||
        (sourcesVisibility[message._id] === undefined ? true : sourcesVisibility[message._id]));

    // Determine if there's actual content in the sidebar (images or sources)
    const hasSidebarContent = message.citations?.images?.length > 0 ||
        message.citations?.results?.length > 0 ||
        message.chatEvent === "Searching the web...";

    // Use full width when no sidebar content, otherwise use constrained width
    const contentWidthClass = shouldShowSidebar && hasSidebarContent
        ? "flex-1 md:max-w-[660px] lg:max-w-[700px] xl:max-w-[100%]"
        : "flex-1";

    return (
        <div key={message._id}
            className={`flex xl:flex-row flex-col w-full gap-5 xl:gap-10 items-start justify-between transition-all duration-300 max-w-[1150px]`}
            style={index === conversationMessages.length - 1 ? lastResponseMinHeightStyle : undefined}
        >
            <div className={`${contentWidthClass} transition-all duration-300`}
                ref={(el) => {
                    if (el) {
                        answerRefs.current[message._id] = el;
                    }
                }}
            >
                <AnswerContent
                    message={message}
                    index={index}
                    fetchingData={fetchingData}
                    handleRegenerateMessage={handleRegenerateMessage}
                    regeneratingMessageId={regeneratingMessageId}
                    selectedTabIdx={selectedTabIdx}
                    lastIndex={conversationMessages?.length - 1}
                    userInput={userInput}
                    canRegenerate={isDeepSearch ? false : canRegenerateHandler(message)}
                    onToggleSources={handleToggleSources}
                />
            </div>
            {shouldShowSidebar && (
                <SourcesSidebar
                    message={message}
                    answerHeight={answerHeights[message._id]}
                />
            )}
        </div>
    );
};

const renderMessages = (messages: any[], props: any) => {
    const { currentChat, conversationMessages, fetchingData, generateSuperResponse } = props;
    const elements: any = [];
    let elijahCollection: any = [];

    for (const [index, message] of messages.entries()) {
        if (message?.role == "user") {
            elements.push(renderUserMessage(message, index, props));
        }

        if (currentChat?.model == "elijah" && message?.role == "system" && !message?.isSuperResponse) {
            if (messages[index + 1] && messages[index + 1].role == "system" && !messages[index + 1].isSuperResponse) {
                elijahCollection.push(message);
            } else {
                elijahCollection.push(message);
                elements.push(
                    <ElijahView
                        key={`elijah-${message._id}`}
                        lastIndex={conversationMessages?.length - 1}
                        conversationMessages={elijahCollection}
                        index={index}
                        fetchingData={fetchingData}
                        generateSuperResponse={generateSuperResponse}
                    />
                );
                elijahCollection = [];
            }
        }

        if ((currentChat?.model != "elijah" && message?.role == "system") || message?.isSuperResponse) {
            elements.push(renderSystemMessage(message, index, props));
        }
    }

    return elements;
};

const useDragAndDropHandlers = (
    dragging: boolean,
    setDragging: (dragging: boolean) => void,
    componentRef: React.RefObject<HTMLDivElement>,
    selectedModel: any,
    setIsFileUploading: (loading: boolean) => void,
    handleUploadChange: any,
    toast: any
) => {
    const handleDragOver = useCallback((e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();

        if (e.dataTransfer.types.includes('Files') && !dragging) {
            setDragging(true);
        }
    }, [dragging]);

    const handleDragLeave = useCallback((e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        const relatedTarget = e.relatedTarget as Node;
        if (!componentRef.current?.contains(relatedTarget)) {
            setDragging(false);
        }
    }, [dragging]);

    const handleDrop = useCallback(async (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        setDragging(false);

        if (["dolphin", "smart-llm", "elijah"].includes(selectedModel?.key)) {
            return toast.error('This model does not support file uploads.');
        }

        setIsFileUploading(true);

        if (!e.dataTransfer.types.includes('Files')) {
            setIsFileUploading(false);
            return;
        }

        const droppedFiles = Array.from(e.dataTransfer.files);

        // Use utility function to validate and process files
        const result = validateAndProcessFiles(droppedFiles);

        if (!result) {
            setIsFileUploading(false);
            return;
        }

        const { processedFiles, tabIndex } = result;

        await handleUploadChange(processedFiles, tabIndex);
        setIsFileUploading(false);
    }, [selectedModel, dragging]);

    return { handleDragOver, handleDragLeave, handleDrop };
};

const renderFilePreview = (files: any[], isFileUploading: boolean, currentChatId: any, handleDeleteFile: any, generatingMessage: boolean) => {
    if (files.length === 0) return null;

    return (
        <div className="p-5 grid grid-cols-3 max-w-[600px] gap-3">
            {files.map((item: any, i: any) => {
                // Robust file type detection: prefer MIME type, then original name, then URL/name
                const lower = (str?: string) => (str || "").toLowerCase();
                const hasExt = (str: string, exts: string[]) => exts.some((e) => lower(str).endsWith(e));
                const isImage =
                    lower(item?.type)?.startsWith("image/") ||
                    hasExt(item?.originalName || "", [".png", ".jpg", ".jpeg", ".webp", ".gif"]) ||
                    hasExt(item?.name || "", [".png", ".jpg", ".jpeg", ".webp", ".gif"]) ||
                    hasExt(item?.url || "", [".png", ".jpg", ".jpeg", ".webp", ".gif"]);
                const isPdf =
                    lower(item?.type) === "application/pdf" ||
                    hasExt(item?.originalName || "", [".pdf"]) ||
                    hasExt(item?.name || "", [".pdf"]) ||
                    hasExt(item?.url || "", [".pdf"]);
                const isAudio =
                    lower(item?.type)?.startsWith("audio/") ||
                    hasExt(item?.originalName || "", [".mp3", ".wav"]) ||
                    hasExt(item?.name || "", [".mp3", ".wav"]) ||
                    hasExt(item?.url || "", [".mp3", ".wav"]);

                let fileType = "File";
                if (isImage) {
                    fileType = "Image";
                } else if (isPdf) {
                    fileType = "PDF";
                } else if (isAudio) {
                    fileType = "Audio";
                }

                return (
                    <div key={item.id}
                        className={`p-4 relative bg-whiteSmoke dark:bg-blackRussian4 rounded-md flex flex-row gap-3 ${isFileUploading && !item.url ? "animate-pulse" : ""}`}>
                        {(!isFileUploading || item.url) && (
                            <div
                                className="absolute -top-1.5 -right-1.5 bg-stormGrey dark:bg-blackRussian3 rounded-full p-1 leading-[0.5]">
                                <button
                                    disabled={generatingMessage}
                                    onClick={() => handleDeleteFile(currentChatId, i)}
                                >
                                    <AiOutlineClose className="stroke-2 text-xs text-white" />
                                </button>
                            </div>
                        )}

                        <div className="flex items-center shrink-0">
                            {(() => {
                                let preview: JSX.Element;
                                if (isFileUploading && !item.url) {
                                    preview = <UploadProgressSpinner size="w-5 h-5" color="text-blue-500" isUploading={isFileUploading} />;
                                } else if (fileType === "Image" && item.url) {
                                    preview = (
                                        <figure className="shrink-0 w-[40px] h-[40px] relative">
                                            <Image src={item.url} alt={item?.originalName ?? item?.name} fill sizes="40px" className="rounded-md object-cover" />
                                        </figure>
                                    );
                                } else {
                                    preview = (
                                        <figure className="shrink-0">
                                            {fileType === "Audio" && <Image src={"assets/images/audio-color.svg"} alt="audio" width={20} height={20} />}
                                            {fileType === "PDF" && <Image src={"assets/images/pdf-color.svg"} alt="pdf" width={20} height={20} />}
                                            {fileType !== "Audio" && fileType !== "PDF" && <Image src={"assets/images/image-color.svg"} alt="file" width={20} height={20} />}
                                        </figure>
                                    );
                                }
                                return preview;
                            })()}
                        </div>

                        <p className="text-sm leading-tight break-words truncate grow">{item?.originalName ?? item?.name}</p>
                    </div>
                );
            })}
        </div>
    );
};

const WelcomeScreen = ({ fullName }: { fullName: string }) => (
    <div className="chatBoot__welcomeScreen flex flex-col justify-center items-center">
        <div className="flex items-center gap-2 max-w-full">
            <h2 className="text-gradient font-bold leading-tight truncate">
                Hi, {getFullName(fullName)}
            </h2>
            <ImageComponent src={images.handEmoji} height={56} width={56} figClassName="shrink-0" />
        </div>
        <h2 className="leading-tight dark:text-white text-center">Welcome to Covertly.ai</h2>
        <p className="text-base text-aluminium text-center max-w-[500px]">
            Your privacy is our priority. Enjoy the world&apos;s only
            anonymous AI chat experience, where all your data is anonymized
            and then deleted.
        </p>
    </div>
);

const ModelSelectionGrid = ({ handleSelectChat, selected, highlightSelected, setHighlightSelected }: { handleSelectChat: (item: any) => void, selected: any, highlightSelected?: any, setHighlightSelected?: (model: any) => void }) => {
    const { isDarkMode } = useTheme();

    const items = Chat_Models_Display_data;

    const firstRowMedium = items.slice(0, 3);
    const secondRowMedium = items.slice(3, 6);
    const thirdRowMedium = items.slice(6, 9);

    const firstRow = items.slice(0, 6);
    const secondRow = items.slice(6);

    const handleModelSelect = (item: any) => {
        if (!selected && setHighlightSelected) {
            setHighlightSelected(item);
        }
        
        handleSelectChat(item);
    };

    const renderButton = (item: { img: string; name: string; key: string }) => {
        const isHighlighted = highlightSelected?.key === item.key;
        return (
            <button
                key={item.key}
                className={`flex gap-3 items-center justify-center p-3 rounded-lg hover:opacity-85 transition-all duration-300 border cursor-pointer min-w-[140px] sm:min-w-[150px] ${isHighlighted
                        ? 'border-scooter bg-scooter/10 dark:bg-scooter/10'
                        : 'border-linkWater dark:border-blackRussian3'
                    }`}
                onClick={() => handleModelSelect(item)}
            >
                <ImageComponent
                    src={getModelImage(item, isDarkMode)}
                    height={25}
                    width={25}
                    figClassName="shrink-0"
                    className="rounded-md"
                    alt="chat"
                />
                <p className={`fs-14 text-center ${isHighlighted ? 'text-white font-medium' : ''}`}>{item.name}</p>
            </button>
        );
    };

    return (
        <div className="md:max-w-[660px] lg:max-w-[700px] xl:max-w-[1000px] w-full mx-auto">
            <div className="hidden lg:block 2xl:hidden">
                <div className="w-full flex justify-center gap-2.5 sm:gap-3 md:gap-4 flex-wrap">
                    {firstRowMedium.map(renderButton)}
                </div>
                <div className="w-full flex justify-center gap-2.5 sm:gap-3 md:gap-4 mt-3 flex-wrap">
                    {secondRowMedium.map(renderButton)}
                </div>
                <div className="w-full flex justify-center gap-2.5 sm:gap-3 md:gap-4 mt-3 flex-wrap">
                    {thirdRowMedium.map(renderButton)}
                </div>
            </div>

            <div className="lg:hidden 2xl:block">
                <div className="w-full flex justify-center gap-2.5 sm:gap-3 md:gap-4 flex-wrap">
                    {firstRow.map(renderButton)}
                </div>
                <div className="w-full flex justify-center gap-2.5 sm:gap-3 md:gap-4 mt-3 flex-wrap">
                    {secondRow.map(renderButton)}
                </div>
            </div>
        </div>
    );
};

const MobilePrevArrow = (props: any) => {
    const { onClick, currentSlide } = props;
    if (currentSlide === 0) return null;

    return (
        <button
            type="button"
            aria-label="Previous"
            className="absolute top-1/2 -translate-y-1/2 left-2 z-10 bg-black/40 hover:bg-black/60 text-white rounded-full w-8 h-8 flex items-center justify-center"
            onClick={onClick}
        >
            <span><RightArrow /></span>
        </button>
    );
};

const MobileNextArrow = (props: any) => {
    const { onClick, currentSlide, slideCount, } = props;
    if (currentSlide >= slideCount - 1) return null;

    return (
        <button
            type="button"
            aria-label="Next"
            className="absolute top-1/2 -translate-y-1/2 right-2 z-10 bg-black/40 hover:bg-black/60 text-white rounded-full w-8 h-8 flex items-center justify-center"
            onClick={onClick}
        >
            <span className="rotate-180"><RightArrow /></span>
        </button>
    );
};

const FollowUpQuestions = ({ questions, handleQuestionClick }: { questions: any[], handleQuestionClick: (q: string) => void }) => (
    <div>
        <p className="mb-4 text-[#31B8CA]">You may also want to ask</p>
        <div className="TopSearch">
            <div className="relative sm:hidden w-full overflow-hidden">
                <Slider
                    className="w-full -mx-1"
                    arrows={true}
                    dots={false}
                    infinite={false}
                    speed={300}
                    slidesToShow={1}
                    slidesToScroll={1}
                    swipeToSlide
                    adaptiveHeight
                    nextArrow={<MobileNextArrow />}
                    prevArrow={<MobilePrevArrow />}
                >
                    {questions?.map((q) => (
                        <div key={q} className="w-full px-1">
                            <CommonTooltip position="top" name={"Try this prompt"} parentClassName="w-full">
                                <button
                                    className="TopSearch_inner relative group h-full w-full"
                                    onClick={() => handleQuestionClick(q)}
                                >
                                    <div>
                                        <span className="!hidden sm:!block"><ChatMessageIcon /></span>
                                        <p className="dark:text-white mt-3">{q}</p>
                                    </div>
                                    <div
                                        className="flex sm:w-full shrink-0 justify-end -ml-1 group-hover:ml-0 invisible group-hover:visible duration-300 absolute right-5 bottom-4">
                                        <span className="rotate-180"><RightArrow /></span>
                                    </div>
                                </button>
                            </CommonTooltip>
                        </div>
                    ))}
                </Slider>
            </div>

            {
                questions?.map((q) => (
                    <CommonTooltip key={q} position="top" name={"Try this prompt"} parentClassName="w-full hidden sm:block">
                        <button
                            className="TopSearch_inner relative group h-full w-full"
                            onClick={() => handleQuestionClick(q)}
                        >
                            <div className="flex items-start gap-3">
                                <span className="!hidden sm:!block"><DocumentFilledIcon /></span>
                                <p className="dark:text-white">{q}</p>
                            </div>
                            <div
                                className="flex sm:w-full shrink-0 justify-end -ml-1 group-hover:ml-0 invisible group-hover:visible duration-300 absolute right-5 bottom-4">
                                <span className="rotate-180"><RightArrow /></span>
                            </div>
                        </button>
                    </CommonTooltip>
                ))
            }
        </div>
    </div>
);

const SuggestionCards = ({ suggestions, handleQuestionClick }: { suggestions: any[], handleQuestionClick: (q: string) => void }) => (
    <div className="SuggestionSearch mt-5">
        {
            suggestions.map((item: any) => (
                <div key={item.question} className="gradient-border !flex">
                    <CommonTooltip position="top" name={"Try this prompt"}
                        parentClassName="flex flex-col grow !z-0">
                        <button
                            className="SuggestionSearch_inner grow flex"
                            onClick={() => handleQuestionClick(item.question)}
                        >
                            <span>{item.icon}</span>
                            <div className="flex flex-col grow h-full">
                                <p className="dark:text-white text-lg font-medium line-clamp-2 xl:pr-10">{item.heading}</p>
                                <span className="line-clamp-2 grow">{item.question}</span>
                            </div>
                        </button>
                    </CommonTooltip>
                </div>
            ))
        }
    </div>
);

export default function ChatBox(props: Readonly<ChatBoxProps>): JSX.Element {
    const {
        conversationMessages,
        fetchingData,
        userInput,
        setUserInput,
        handleInputChange,
        handleInputKeyDown,
        handleSendMessage,
        handleStopGeneration,
        setToggleSidebar,
        currentChat,
        toggleSidebar,
        generateSuperResponse
    } = props;

    // Use extracted hook for state and logic
    const {
        hasQueryParam,
        hasNoChatId,
        uploadedFile,
        previewURL,
        setPreviewURL,
        dragging,
        setDragging,
        randomSuggestions,
        windowHeight,
        currentModel,
        improving,
        redoImproving,
        translating,
        setTranslating,
        sourcesVisibility,
        isAnyLoading,
        isDeepSearch,
        handleSelectChat,
        mainScreenHandler,
        handleQuestionClick,
        getSuggestedLLM,
        handleClickLLMSuggestion,
        handleToggleSources,
        handleImprovePrompt,
        handleUndoImprovedPrompt,
        handleRedoImprovedPrompt,
        canUndoImprovement,
        canRedoImprovement,
        wasPromptImproved,
        followUpQuestions,
        llmSuggestions,
        isLiveSearch,
        setIsLiveSearch,
        selected,
        setSelected
    } = useChatBoxLogic({ ...props, setUserInput, userInput, handleSendMessage, conversationMessages });

    const {
        files,
        generatingMessage,
        selectedModel,
        currentChatId,
        isFileUploading,
        setIsFileUploading,
        handleCheckLimit,
        trialTokenLimit,
        changeChatLoading,
        startChatLoading,
        smartModel
    } = useConversation();

    const chatContainerRef: any = useRef(null);
    const answerRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});
    const [answerHeights, setAnswerHeights] = useState<{ [key: string]: number }>({});
    const questionRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});
    const [questionHeights, setQuestionHeights] = useState<{ [key: string]: number }>({});
    const { handleUploadChange, handleDeleteFile } = useUploadFiles();
    const componentRef = useRef<HTMLDivElement | null>(null);
    const [componentWidth, setComponentWidth] = useState<number>(0);
    const followUpQuestionsRef = useRef<HTMLDivElement | null>(null);
    const [highlightSelected, setHighlightSelected] = useState<any>(ChatGPTDisplay);
    const [mobileInputVisible, setMobileInputVisible] = useState<boolean>((props.conversationMessages?.length ?? 0) > 0);

    const { handleDragOver, handleDragLeave, handleDrop } = useDragAndDropHandlers(
        dragging,
        setDragging,
        componentRef,
        selectedModel,
        setIsFileUploading,
        handleUploadChange,
        toast
    );

    const handleUploadModal = (modalName: string) => {
        NiceModal.show(modalName);
    };

    const scrollToBottom = useCallback(() => {
        if (chatContainerRef.current) {
            const scrollContainer = chatContainerRef.current;
            scrollContainer.scrollTop = scrollContainer.scrollHeight;
        }
    }, []);

    // Extract drag event handlers to reduce cognitive complexity
    const getDragHandler = (handler: any) => isDeepSearch ? () => { } : handler;

    // Extract conditional class names
    const getHeaderClassName = () => hasQueryParam ? "" : "pb-10";
    const getBackButtonClassName = () => generatingMessage ? "cursor-not-allowed" : "cursor-pointer";

    // Extract drag start handler
    const getDragStartHandler = () => {
        if (isDeepSearch) return () => { };
        return (e: React.DragEvent) => {
            const target = e.target as HTMLElement;
            if (target.tagName !== 'INPUT' && target.tagName !== 'TEXTAREA') {
                const selection = globalThis.window.getSelection();
                if (selection && !selection.isCollapsed) {
                    e.preventDefault();
                }
            }
        };
    };

    // Extract welcome screen condition
    const shouldShowWelcomeScreen = () => !fetchingData && conversationMessages.length === 0 && !selected;

    // Extract drag overlay rendering condition
    const shouldShowDragOverlay = () => !isDeepSearch && dragging;

    // Extract deep search model selection condition
    const shouldShowModelSelection = () => !isDeepSearch;

    // Extract suggestion cards condition
    const shouldShowSuggestionCards = () => selected && !fetchingData && conversationMessages.length === 0 && hasNoChatId;

    // Scroll effects that were previously in the main component
    useEffect(() => {
        const urlParams = new URLSearchParams(globalThis.window.location.search);
        const id = urlParams.get('id');
        if (id) {
            setTimeout(scrollToBottom, 100);
        }
    }, [scrollToBottom]);

    useEffect(() => {
        if (isAnyLoading) {
            setTimeout(scrollToBottom, 100);
        }
    }, [isAnyLoading, scrollToBottom]);

    // Extract component width calculation
    const calculateComponentWidth = useCallback(() => {
        if (componentRef.current) {
            setComponentWidth(componentRef.current.offsetWidth);
        }
    }, []);

    // Extract drag prevention logic
    const preventInternalDrag = useCallback((e: DragEvent) => {
        if (!componentRef.current?.contains(e.target as Node)) return;

        const imgElements = e.dataTransfer?.getData('text/html')?.includes('<img');
        const hasTextData = e.dataTransfer?.types.includes('text/plain');

        if (imgElements || hasTextData) {
            e.preventDefault();
            e.stopPropagation();
        }
    }, []);

    // Extract global drag handlers
    const handleGlobalDragEnd = useCallback(() => {
        setDragging(false);
    }, []);

    const handleGlobalDragLeave = useCallback((e: DragEvent) => {
        const isLeavingWindow = e.clientY <= 0 || e.clientX <= 0 ||
            e.clientX >= window.innerWidth || e.clientY >= window.innerHeight;

        if (isLeavingWindow) {
            setDragging(false);
        }
    }, []);

    const handleEscapeKey = useCallback((e: KeyboardEvent) => {
        if (e.key === 'Escape' && dragging) {
            setDragging(false);
        }
    }, [dragging]);

    // Extract event listeners setup
    const setupEventListeners = useCallback(() => {
        document.addEventListener('dragstart', preventInternalDrag, true);
        document.addEventListener('dragend', handleGlobalDragEnd);
        document.addEventListener('dragleave', handleGlobalDragLeave);
        document.addEventListener('keydown', handleEscapeKey);
    }, [preventInternalDrag, handleGlobalDragEnd, handleGlobalDragLeave, handleEscapeKey]);

    const removeEventListeners = useCallback(() => {
        document.removeEventListener('dragstart', preventInternalDrag, true);
        document.removeEventListener('dragend', handleGlobalDragEnd);
        document.removeEventListener('dragleave', handleGlobalDragLeave);
        document.removeEventListener('keydown', handleEscapeKey);
    }, [preventInternalDrag, handleGlobalDragEnd, handleGlobalDragLeave, handleEscapeKey]);

    // Simplified useEffect with extracted functions
    useEffect(() => {
        const intervalId = setInterval(calculateComponentWidth, 1000);
        setupEventListeners();

        return () => {
            clearInterval(intervalId);
            removeEventListeners();
        };
    }, [calculateComponentWidth, setupEventListeners, removeEventListeners]);

    // Measure answer, question heights
    useEffect(() => {
        const answerRefsNewHeights: { [key: string]: number } = {};
        for (const [id, el] of Object.entries(answerRefs.current)) {
            if (el) {
                answerRefsNewHeights[id] = el.getBoundingClientRect().height;
            }
        }
        setAnswerHeights(answerRefsNewHeights);
        const questionRefsNewHeights: { [key: string]: number } = {};
        for (const [id, el] of Object.entries(questionRefs.current)) {
            if (el) {
                questionRefsNewHeights[id] = el.getBoundingClientRect().height;
            }
        }
        setQuestionHeights(questionRefsNewHeights);
    }, [conversationMessages, windowHeight, componentWidth, generatingMessage]);

    // Ensure mobile input shows automatically once there are messages
    useEffect(() => {
        if ((conversationMessages?.length ?? 0) > 0) {
            setMobileInputVisible(true);
        }
    }, [conversationMessages]);

    // Update highlightSelected when selected model changes (e.g., from chat history)
    useEffect(() => {
        if (selected) {
            setHighlightSelected(selected);
        }
    }, [selected]);

    // Show input by default on >= sm screens using CSS-friendly approach (no window checks in render)
    useEffect(() => {
        if (globalThis.window !== undefined) {
            const mq = globalThis.window.matchMedia('(min-width: 640px)');
            if (mq.matches) setMobileInputVisible(true);
            const handler = (e: MediaQueryListEvent) => {
                if (e.matches) setMobileInputVisible(true);
            };
            mq.addEventListener?.('change', handler);
            return () => mq.removeEventListener?.('change', handler);
        }
    }, []);

    // Ensure Start chat shows on mobile when there are zero messages
    useEffect(() => {
        if (globalThis.window !== undefined) {
            const isMobile = globalThis.matchMedia('(max-width: 639px)').matches;
            if (isMobile && (conversationMessages?.length ?? 0) === 0) {
                setMobileInputVisible(false);
            }
        }
    }, [conversationMessages]);

    // Extract height calculation constants
    const getLayoutHeights = useCallback(() => ({
        header: 96,
        inputArea: 74,
        conversationGap: 20,
        minimumResponse: 150
    }), []);

    // Extract follow-up questions height calculation
    const getFollowUpQuestionsHeight = useCallback(() => {
        if (fetchingData || !componentRef.current) return 0;
        return componentRef.current.getBoundingClientRect().height;
    }, [fetchingData]);

    // Extract last question height calculation
    const getLastQuestionHeight = useCallback(() => {
        return Object.entries(questionHeights).pop()?.[1] ?? 0;
    }, [questionHeights]);

    // Simplified min height calculation
    const lastResponseMinHeightStyle = useMemo(() => {
        const heights = getLayoutHeights();
        const lastQuestionHeight = getLastQuestionHeight();
        const followUpQuestionsHeight = getFollowUpQuestionsHeight();

        const totalUsedHeight = heights.header + heights.inputArea + heights.conversationGap +
            lastQuestionHeight + followUpQuestionsHeight;
        const remainingHeight = windowHeight - totalUsedHeight;
        const minHeight = Math.max(remainingHeight, heights.minimumResponse);

        return { minHeight: `${minHeight}px` };
    }, [getLayoutHeights, getLastQuestionHeight, getFollowUpQuestionsHeight, windowHeight]);

    return (
        <section
            ref={componentRef}
            className="chatBoot relative max-w-full"
            aria-labelledby="chat-drop-label"
            onDragOver={getDragHandler(handleDragOver)}
            onDragLeave={getDragHandler(handleDragLeave)}
            onDrop={getDragHandler(handleDrop)}
            onDragStart={getDragStartHandler()}
        >
            {
                shouldShowDragOverlay() && <div
                    className="absolute h-full w-full top-0 left-0 z-50 inset-0 bg-black bg-opacity-80 transition-opacity flex flex-col gap-2 justify-center items-center"
                >
                    <h4>Add anything</h4>
                    <p>Drop any file here to add it to the conversation</p>
                </div>
            }

            <Header className={`${getHeaderClassName()}`} toggleSidebar={toggleSidebar}
                setToggleSidebar={setToggleSidebar}
                highlightSelected={highlightSelected}
                setHighlightSelected={setHighlightSelected} />

            {!fetchingData && conversationMessages.length === 0 && <ChatModel selected={selected} />}
            <div className={"chatBoot__body flex flex-col pb-4"}>
                {shouldShowWelcomeScreen() ? (
                    <div className={`flex-1 flex flex-col items-center ${isDeepSearch? 'justify-start' : 'justify-center'}`} style={{ minHeight: 'calc(100vh - 300px)' }}>
                        {isDeepSearch ? (
                            <div className="w-full flex justify-center px-6">
                                <div className="w-full max-w-[600px] rounded-xl bg-whiteSmoke dark:bg-blackRussian3 p-4 md:p-6 backdrop-blur">
                                    <div className="flex flex-col gap-2">
                                        <h3 className="text-base md:text-lg font-semibold dark:text-white">Explore Deeper Insights with Our Advanced Research Agent</h3>
                                        <p className="text-sm md:text-base text-aluminium dark:text-gray-300">
                                            {"Dive beyond the surface with comprehensive web searches and insightful chain-of-thought analyses. Discover detailed, reliable results, complete with source citations, tailored to your inquiries, ensuring a richer understanding and informed decision-making."}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <WelcomeScreen fullName={getCookie("fullName") ?? ""} />
                        )}
                        {shouldShowModelSelection() && (
                            <div className="hidden sm:block mt-6">
                                <ModelSelectionGrid handleSelectChat={handleSelectChat} selected={selected} highlightSelected={highlightSelected} setHighlightSelected={setHighlightSelected} />
                            </div>
                        )}
                    </div>
                ) : (
                    <div
                        id="chatBoot__messages__list"
                        className="themeScrollbar h-0 flex-auto"
                        ref={chatContainerRef}
                    >
                        {!isDeepSearch && <button
                            onClick={mainScreenHandler}
                            className={`absolute top-16 xl:top-8 flex gap-2 items-center dark:text-white ${getBackButtonClassName()}`}
                        >
                            <span className='p-1 rounded-md bg-transparent hover:dark:bg-blackRussian3 hover:bg-linkWater'>
                                <CommonTooltip position='bottom' name={"Back"} className={"mt-4 !px-2 pb-[5px] !pt-[1px] !py-1"}>
                                    <IoIosArrowBack />
                                </CommonTooltip>
                            </span>
                            <span className="text-sm dark:text-white">Chats</span>
                        </button>}
                        <div
                            id="chatBoxContainer"
                            className="relative chatBootQuestion__container flex grow flex-col gap-5 w-full mb-8 max-w-[1150px] mx-auto"
                        >
                            {
                                renderMessages(conversationMessages, {
                                    ...props,
                                    currentChat,
                                    conversationMessages,
                                    fetchingData,
                                    generateSuperResponse,
                                    isDeepSearch,
                                    sourcesVisibility,
                                    answerHeights,
                                    lastResponseMinHeightStyle,
                                    answerRefs,
                                    questionRefs,
                                    isFileUploading,
                                    handleToggleSources
                                })
                            }
                            {
                                (!fetchingData && conversationMessages?.length > 0 && followUpQuestions && followUpQuestions?.length > 0) &&
                                <div ref={followUpQuestionsRef}>
                                    <FollowUpQuestions questions={followUpQuestions} handleQuestionClick={handleQuestionClick} />
                                </div>
                            }

                            <ChatBoxRenderer
                                currentChat={currentChat}
                                conversationMessages={conversationMessages}
                                selectedModel={selectedModel}
                                fetchingData={fetchingData}
                                generateSuperResponse={generateSuperResponse}
                                getSuggestedLLM={getSuggestedLLM}
                                handleClickLLMSuggestion={handleClickLLMSuggestion}
                                llmSuggestions={llmSuggestions}
                                smartModel={smartModel}
                            />
                        </div>
                    </div>
                )}
            </div>
            {
                shouldShowSuggestionCards() &&
                <SuggestionCards suggestions={randomSuggestions} handleQuestionClick={handleQuestionClick} />
            }
            <div className={`chatBoot__foot pb-2`}>
                <div className={`chatBoot__container relative mx-auto ${conversationMessages.length > 0 ? 'xl:max-w-[1150px]' : ''}`}>
                    {renderFilePreview(files, isFileUploading, currentChatId, handleDeleteFile, generatingMessage)}

                    {!mobileInputVisible && conversationMessages.length === 0 && (
                        <button
                            className="w-full btn btn-primary py-3 text-base sm:hidden"
                            onClick={() => setMobileInputVisible(true)}
                            aria-label="Start chat"
                        >
                            Start chat
                        </button>
                    )}

                    <div className={`${mobileInputVisible ? '' : 'hidden sm:block'}`}>
                        <ChatBoxContent
                            currentModel={currentModel}
                            handleUploadModal={handleUploadModal}
                            userInput={userInput}
                            setUserInput={setUserInput}
                            handleInputChange={handleInputChange}
                            handleInputKeyDown={handleInputKeyDown}
                            handleCheckLimit={handleCheckLimit}
                            trialTokenLimit={trialTokenLimit}
                            handleSendMessage={handleSendMessage}
                            handleStopGeneration={handleStopGeneration}
                            fetchingData={fetchingData}
                            changeChatLoading={changeChatLoading}
                            startChatLoading={startChatLoading}
                            isFileUploading={isFileUploading}
                            uploadedFile={uploadedFile}
                            previewURL={previewURL}
                            setPreviewURL={setPreviewURL}
                            isDeepSearch={isDeepSearch}
                            improving={improving}
                            translating={translating}
                            setTranslating={setTranslating}
                            isLiveSearch={isLiveSearch}
                            setIsLiveSearch={setIsLiveSearch}
                            selected={selected}
                            handleImprovePrompt={handleImprovePrompt}
                            onUndoImprove={handleUndoImprovedPrompt}
                            onRedoImprove={handleRedoImprovedPrompt}
                            canUndoImprove={canUndoImprovement}
                            canRedoImprove={canRedoImprovement}
                            isAnyLoading={isAnyLoading}
                            redoImproving={redoImproving}
                            wasPromptImproved={wasPromptImproved}
                            files={files}
                            isGenerating={generatingMessage}
                            conversationMessages={conversationMessages}
                            onModelSelect={handleSelectChat}
                            highlightSelected={highlightSelected}
                            setHighlightSelected={setHighlightSelected}
                            setSelected={setSelected}
                        />
                    </div>

                </div>
            </div>
            <div className="text-center">
                <p className="text-xs text-gray-500 dark:text-gray-400">
                    Covertly.ai can make mistakes. Please double-check important information.
                </p>
            </div>
        </section>
    );
}
