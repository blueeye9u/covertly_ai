import React, { useMemo, useRef, useState, useEffect, useLayoutEffect } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import NiceModal from "@ebay/nice-modal-react";
import { useSearchParams } from "next/navigation";

import { useConversation } from "../../context/conversation.context";
import ChatTimer from "../ChatTimer";
import { EChatType } from "../../enums/gpt-models.enum";
import { EModels } from "../../enums/modals.enum";
import { chatService } from "../../services/chat.service";
import { HttpService } from "../../services/base.service";
import ImageComponent from "../global/imageComponent/ImageComponent";
import { images } from "../../assets/images";
import { Chat_Models, Chat_Types, DeepResearchAgent } from "../../constants/chat-models-data";
import { DelIcon } from "../../svgs/svg";
import { getSuggestedLLM, getModelImage } from "../../utils/chatUtils";
import TooltipPortal from "./TooltipPortal";
import { useTheme } from "../../context/themeContext";
import CircleSpinner from "../CircleSpinner";
import CommonTooltip from "../ComonTooltip";

const CHAT_TITLE_TOOLTIP_GAP = 4;
const CHAT_TITLE_TOOLTIP_WIDTH = 250;
const CHAT_TITLE_TOOLTIP_SIDE_PADDING = 8;

function highlightText(text: string, highlight: string) {
  if (!highlight) return text;
  const escaped = highlight.replaceAll(/[.*+?^${}()|[\]\\]/g, String.raw`\$&`);
  const regex = new RegExp(`(${escaped})`, "gi");
  const visibleLength = 20;
  return text.split(regex).map((part, i) => {
    const isMatch = part.toLowerCase() === highlight.toLowerCase();
    
    if (isMatch) {
      return <span key={`${part}-${i}`} className="chat-search-highlight">{part}</span>;
    }
    
    if (i === 0) {
      if (visibleLength <= highlight.length) {
        return '';
      }
      if (part.length > (visibleLength - highlight.length)) {
        return part.slice(-(visibleLength - highlight.length));
      }
      return part;
    }
    
    return part;
  });
}

const ChatThread = (): JSX.Element => {
  const router = useRouter();
  const { isDarkMode } = useTheme();
  const {
    setConversationMessages,
    setCurrentChat,
    chatMessages,
    setDeleteChatLoading,
    setRouterId,
    setCurrentChatId,
    searchChat,
    setFiles,
    deleteChatLoading,
    fetchingData,
    selectedModelLoading,
    generatingMessage,
    changeChatLoading,
    startChatLoading,
    generatingPDFChats,
    setSelectedModel,
    setSelected
  } = useConversation();
  const searchParams = useSearchParams();
  const chatId = searchParams.get("id");

  const isAnyLoading = deleteChatLoading || fetchingData || selectedModelLoading || generatingMessage || changeChatLoading || startChatLoading || generatingPDFChats;
  const isChatGenerating = generatingMessage || generatingPDFChats;

  // Determine if we're in deep search context
  const isDeepSearch = useMemo(() => {
    return router.pathname === '/deep-search';
  }, [router.pathname]);

  const onChangeChatThread = async (chatData: any) => {

    if (isChatGenerating) {
      NiceModal.show("ResponseInProgressModal");
      return;
    }

    try {
      const { _id } = chatData;
      const res = await chatService.getChat();
      const payload: any = res.payload ?? null;
      let chat: any = payload?.find((ele: any) => ele._id === _id);

      if (chat) HttpService.setCookie("model", chat?.model);
      
      let selectedModelData;
      if(isDeepSearch) {
        selectedModelData = DeepResearchAgent;
      } else {
        selectedModelData = getSuggestedLLM(chat?.model);
      }
      
      // Set both selectedModel and selected to ensure UI consistency
      setSelectedModel(selectedModelData);
      setSelected(selectedModelData);
      
      let filteredMessages: any = payload?.find((ele: any) => ele._id === _id);
      setFiles([])

      setCurrentChat(filteredMessages);
      setRouterId(_id as string);
      setCurrentChatId(_id as string);
      setConversationMessages(filteredMessages?.messages);
      if (chat?.chatType && chat?.chatType == EChatType.PDF_CHAT) {
        router.replace(router.pathname, `${router.pathname}?id=${_id}&type=${EChatType.PDF_CHAT}`, {
          shallow: true,
        });
      } else {
        router.replace(router.pathname, `${router.pathname}?id=${_id}`, {
          shallow: true,
        });
      }
    } catch (error) {
      console.error("Failed to change chat thread:", error);
    }
    // }
  };

  const handleDelModal = (modalName: string, _id: string) => {
    NiceModal.show(modalName, {
      chatId: _id,
      setDeleteChatLoading,
      setConversationMessages,
      isDeepSearch
    });
  };

  const handleDelAllModal = (modalName: string) => {
    if (isAnyLoading) {
      NiceModal.show("ResponseInProgressModal")
    }
    else {
      NiceModal.show(modalName, {
        setDeleteChatLoading,
        setConversationMessages,
        isDeepSearch // Pass context information
      });
    }
  };

  // Utility function to highlight search term in text

  // Helper function to get chat model image
  const getChatModelImage = (chat: any) => {
    if (chat.chatType === EChatType.CHAT) {
      return Chat_Models.map((item, key) => {
        if (chat.model !== item.key) return null;
        return (
          <Image
            key={item.key}
            alt="chat model"
            src={getModelImage(item, isDarkMode)}
            width={20}
            height={20}
            className="rounded-sm"
            onClick={() => onChangeChatThread(chat)}
          />
        );
      });
    }
    
    if (chat.chatType === EChatType.DEEP_RESEARCH) {
      const obj = Chat_Models.find((el) => el.key == EModels.GPT_4);
      return (
        <Image
          key="deep-research-gpt4o"
          alt="chat-model-deep-research"
          src={getModelImage(obj, isDarkMode)}
          width={20}
          height={20}
          className="rounded-sm"
          onClick={() => onChangeChatThread(chat)}
        />
      );
    }
    
    return Chat_Types.map((item, key) => {
      if (chat.chatType !== item.key) return null;
      return (
        <Image
          key={item.key}
          alt={`chat-model-${item.key}`}
          src={getModelImage(item, isDarkMode)}
          width={20}
          height={20}
          className="rounded-sm"
          onClick={() => onChangeChatThread(chat)}
        />
      );
    });
  };

  // Helper function to create mouse enter handler
  const createMouseEnterHandler = (chatIdStr: string, chatTitle: string) => () => {
    const btnRef = titleButtonRefs.current[chatIdStr];
    if (!btnRef) return;
    
    const rect = btnRef.getBoundingClientRect();
    setTooltip({
      visible: true,
      text: chatTitle ?? "New chat",
      style: { position: 'absolute', top: `${rect.bottom}px`, left: `${rect.left}px`, zIndex: 9999, pointerEvents: 'none' },
      key: chatIdStr + '-pending',
      anchorRect: rect,
      flip: false,
    });
  };

  // Helper function to handle mouse leave
  const handleMouseLeave = () => {
    setTooltip(t => ({ ...t, visible: false }));
  };

  function renderChatListItem(chat: any) {
    const chatIdStr = chat._id;
    const chatModelImage = getChatModelImage(chat);
    const handleMouseEnter = createMouseEnterHandler(chatIdStr, chat.title);

    return (
      <li
        key={chat._id}
        className={`${chatId == chat._id ? "dark:bg-vulcan bg-ghost" : ""} group/chat-item`}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <button type={"button"} className={`rt-titlePlusIconPlusDropdown flex grow justify-between group/tooltip relative`}
        >
          <div className="rt-titlePlusIcon flex items-center gap-3">
            {chatModelImage}
            <button
              className="sidebar__chatThread__title"
              onClick={() => onChangeChatThread(chat)}
              ref={el => (titleButtonRefs.current[chatIdStr] = el)}
            >
              {highlightText(chat.title ?? "New chat", searchChat)}
            </button>
          </div>
        </button>
        <div className="flex gap-1 items-center shrink-0 relative opacity-0 group-hover/chat-item:opacity-100 transition-opacity duration-200">
          <span className={`shrink-0 rt-tooltip group/tooltip relative`}>
            <ChatTimer createdAt={chat.createdAt} id={chat._id} />
          </span>
          <CommonTooltip position='top' name="Delete chat" className={"!px-2 pb-[5px] !pt-[1px] !py-1"}>
            <button
              className={`shrink-0 text-danger ${isAnyLoading ? 'pointer-events-none opacity-50' : 'pointer-events-auto opacity-100'}`}
              onClick={() => handleDelModal("deleteModal", chat._id)}
            >
              <DelIcon />
            </button>
          </CommonTooltip>
        </div>
      </li>
    );
  }

  const [tooltip, setTooltip] = useState<{
    visible: boolean;
    text: string;
    style: React.CSSProperties;
    key: string | null;
    anchorRect?: DOMRect | null;
    flip?: boolean;
  }>({ visible: false, text: '', style: {}, key: null, anchorRect: null, flip: false });
  const portalTooltipRef = useRef<HTMLDivElement | null>(null);

  const titleButtonRefs = useRef<{ [key: string]: HTMLButtonElement | null }>({});

  // Helper function to calculate tooltip position
  const calculateTooltipPosition = (anchorRect: DOMRect, tooltipEl: HTMLDivElement) => {
    let top = anchorRect.bottom + CHAT_TITLE_TOOLTIP_GAP;
    let left = anchorRect.left + anchorRect.width / 2 - CHAT_TITLE_TOOLTIP_WIDTH / 2;
    let flip = false;

    const shouldFlip = top + tooltipEl.offsetHeight > window.innerHeight && 
                      anchorRect.top - CHAT_TITLE_TOOLTIP_GAP - tooltipEl.offsetHeight > 0;
    
    if (shouldFlip) {
      top = anchorRect.top - tooltipEl.offsetHeight - CHAT_TITLE_TOOLTIP_GAP;
      flip = true;
    }

    left = Math.max(
      CHAT_TITLE_TOOLTIP_SIDE_PADDING,
      Math.min(left, window.innerWidth - CHAT_TITLE_TOOLTIP_WIDTH - CHAT_TITLE_TOOLTIP_SIDE_PADDING)
    );

    return { top, left, flip };
  };

  // Helper function to update tooltip style
  const updateTooltipStyle = (top: number, left: number, flip: boolean, key: string) => {
    setTooltip(t => ({
      ...t,
      style: {
        ...t.style,
        top: `${top}px`,
        left: `${left}px`,
        width: `${CHAT_TITLE_TOOLTIP_WIDTH}px`,
        zIndex: 9999,
        pointerEvents: 'none'
      },
      flip,
      key: key + (flip ? '-top' : '-bottom')
    }));
  };

  useLayoutEffect(() => {
    const shouldUpdate = tooltip.visible && tooltip.anchorRect && portalTooltipRef.current;
    if (!shouldUpdate) return;

    const tooltipEl = portalTooltipRef.current;
    if(tooltip.anchorRect && tooltipEl) {
      const { top, left, flip } = calculateTooltipPosition(tooltip.anchorRect, tooltipEl);

      const hasChanged = top !== tooltip.style.top || left !== tooltip.style.left || flip !== tooltip.flip;
      if (hasChanged) {
        updateTooltipStyle(top, left, flip, tooltip.key || '');
      }
    }
  }, [tooltip.visible, tooltip.anchorRect, tooltip.text]);

  // Helper function to get search match rank
  const getMatchRank = (title: string, search: string) => {
    if (!title) return Infinity;
    const words = title.toLowerCase().split(/\s+/);
    
    // Check for words starting with search term
    for (let i = 0; i < words.length; i++) {
      if (words[i].startsWith(search)) return i;
    }
    
    // Check for words containing search term
    for (let i = 0; i < words.length; i++) {
      if (words[i].includes(search)) return words.length + i;
    }
    
    return Infinity;
  };

  // Helper function to sort chats by search relevance
  const sortChatsBySearch = (chats: any[], searchTerm: string) => {
    const search = searchTerm.trim().toLowerCase();
    return chats.sort((a, b) => {
      const rankA = getMatchRank(a.title ?? "", search);
      const rankB = getMatchRank(b.title ?? "", search);
      return rankA - rankB;
    });
  };

  // Helper function to render chat list
  const renderChatList = () => {
    const hasSearch = searchChat && searchChat.trim() !== "";
    
    if (hasSearch) {
      const chatList = Array.isArray(chatMessages) ? [...chatMessages] : [];
      const sortedChats = sortChatsBySearch(chatList, searchChat);
      return sortedChats.map((chat: any) => renderChatListItem(chat));
    }
    
    return chatMessages?.map((chat: any) => renderChatListItem(chat));
  };

  const sidebarBodyRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const sidebarBody = document.querySelector('.sidebar__body');
    if (sidebarBody) {
      sidebarBodyRef.current = sidebarBody as HTMLDivElement;
    }
  }, []);

  const renderChatContent = () => {
    if (fetchingData) {
      return (
        <div className="flex h-full flex-col items-center justify-center px-12 py-5">
          <CircleSpinner size="h-8 w-8" color="text-gray-400" />
          <p className="text-center leading-tight text-dark-50 mt-4">
            Loading your chats...
          </p>
        </div>
      );
    }

    if (chatMessages?.length === 0) {
      return (
        <div className="flex h-full flex-col items-center justify-center px-12 py-5">
          <ImageComponent
            src={images.noChat}
            width={72}
            height={72}
            figClassName="mb-4"
            alt="no-chat-image"
          />
          {searchChat ? (
            <p className="text-center leading-tight text-dark-50">
              No search results found.
            </p>
          ) : (
            <p className="text-center leading-tight text-dark-50">
              Start a conversation to see your chats here.{" "}
            </p>
          )}
        </div>
      );
    }

    return (
      <>
        <div className="px-5 flex gap-2 justify-between items-center mb-2">
          <span className="text-sm text-aluminium">
            Your conversations
          </span>
          <button
            className={`px-3 py-1 bg-whitesmoke dark:bg-capeCod rounded-xl dark:text-white text-black text-sm border border-danger ${isAnyLoading ? 'pointer-events-none opacity-50' : 'pointer-events-auto opacity-100'}`}
            onClick={() => {
              handleDelAllModal("deleteAllChatModal");
            }}
            disabled={isAnyLoading}
          >
            Delete all
          </button>
        </div>
        <ul>
          {renderChatList()}
        </ul>
      </>
    );
  };

  return (
    <>
      {renderChatContent()}
      {tooltip.visible && tooltip.anchorRect && (
        <TooltipPortal style={tooltip.style} key={tooltip.key}>
          <div
            ref={portalTooltipRef}
            className={`tooltip chat-title-tooltip border border-solid border-aluminium text-white dark:bg-blackRussian2 bg-blackRussian2 ml-2 px-4 text-sm`}
            style={{ width: '220px' }}
          >
            <div className="tooltip-2-line-ellipsis">
              {tooltip.text}
            </div>
          </div>
        </TooltipPortal>
      )}
    </>
  );
};

export default ChatThread;
