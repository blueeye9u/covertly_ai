import React, { useEffect, useMemo, useState, useCallback } from "react";
import { useRouter } from "next/router";
import NiceModal from "@ebay/nice-modal-react";
import ChatThread from "../chatThread";
import { Chat, useConversation } from "../../context/conversation.context";
import { HttpService } from "../../services/base.service";
import { chatService } from "../../services/chat.service";
import { EChatType, EGptModels } from "../../enums/gpt-models.enum"
import { filterDeepSearchChats, filterNormalChats } from '../../utils/chatFilters';
import { useSearchWithAbort } from "../../hooks/useSearchWithAbort";
import SidebarHeader from "../common/SidebarHeader";

interface IProps {
  switchSidebar: any;
  setSwitchSmallSidebar: (v: any) => void;
  switchSmallSidebar: any;
}

const ChatSidebar = ({
    switchSidebar,
    setSwitchSmallSidebar,
    switchSmallSidebar
}: IProps) => {
    const router = useRouter();
    const {
        setConversationMessages,
        setCurrentChat,
        setChatMessages,
        setSearchChat,
        searchChat,
        changeChatLoading,
        setStartChatLoading,
        startChatLoading,
        setSelectedTabIdx,
        setRouterId,
        setSelected,
        setSelectedModel,
        setFiles,
        deleteChatLoading,
        fetchingData,
        selectedModelLoading,
        generatingMessage,
        generatingPDFChats,
        resetUserInput,
        currentChat,
        conversationMessages
    } = useConversation();
    const [disableButton, setDisableButton] = useState(false);
    const isAnyLoading = deleteChatLoading || fetchingData || selectedModelLoading || generatingMessage || changeChatLoading || startChatLoading || generatingPDFChats;

    const isInNewChatState = useMemo(() => {
        return !currentChat && conversationMessages.length === 0;
    }, [currentChat, conversationMessages]);

    useEffect(() => {
        if (isAnyLoading || isInNewChatState) {
            setDisableButton(true);
        } else {
            setDisableButton(false);
        }
    }, [isAnyLoading, isInNewChatState]);

    const isDeepSearch = useMemo(() => {
        return router.pathname === '/deep-search';
    }, [router.pathname]);

    useEffect(() => {
        setSearchChat('');
    }, [router.pathname, setSearchChat]);

    const resetChatState = () => {
        setSelected("");
        setSelectedModel("");
        router.replace(router.pathname, undefined, { shallow: true });
        setTimeout(() => {
            setStartChatLoading(true);
            setConversationMessages([]);
            setCurrentChat(null);
            setRouterId("");
            setSelected(null);
            setFiles([]);
        }, 10);

        setTimeout(() => {
            setStartChatLoading(false);
            HttpService.setCookie("model", EGptModels.GPT_4);
            setSelectedTabIdx(0);
        }, 2000);
    };

    const onInitiateChat = async () => {
        resetUserInput();
        localStorage.setItem('translate_lang_new', 'English');

        if (isDeepSearch) {
            const asPath = router.asPath;
            const queryParams = new URLSearchParams(asPath.split('?')[1]);
            const id = queryParams.get('id');
            if (!id) {
                setSelected("");
                setSelectedModel("");
                return;
            }

            resetChatState();
        } else {
            resetChatState();
            // Always show the model selection popup for new chat
            NiceModal.show("llmSelectModal");
        }
    };

    // Search function
    const performSearch = useCallback(async (searchQuery: string, signal?: AbortSignal) => {
        const trimmedQuery = searchQuery.trim();
        const chatType = isDeepSearch ? EChatType.DEEP_RESEARCH : '';
        const res = await chatService.getChat(trimmedQuery, '', chatType, signal);

        if (signal?.aborted) return;

        const allChats: Chat[] = res.payload ?? [];
        const filteredChats = isDeepSearch ? filterDeepSearchChats(allChats) : filterNormalChats(allChats);
        setChatMessages(filteredChats);
    }, [isDeepSearch, setChatMessages]);

    // Use the common search hook
    const {
        searchQuery,
        isSearching,
        onChange,
        onKeyDown,
        onSearchIconClick,
        cleanup
    } = useSearchWithAbort(performSearch, { maxLength: 30 });

    // Sync with context search state
    useEffect(() => {
        setSearchChat(searchQuery);
    }, [searchQuery, setSearchChat]);

    // Cleanup function
    useEffect(() => {
        return cleanup;
    }, [cleanup]);

    return (
        <aside className={`sidebar ${switchSmallSidebar ? "sidebar__close" : "sidebar__open"}`}>
            <SidebarHeader
                title={isDeepSearch ? 'Deep Research Agent' : 'Chat'}
                buttonText={isDeepSearch ? 'Start New Deep Chat' : 'Start New Chat'}
                buttonDisabled={disableButton}
                onButtonClick={onInitiateChat}
                searchPlaceholder="Search"
                searchValue={searchChat}
                searchOnChange={onChange}
                searchOnKeyDown={onKeyDown}
                searchOnSearchIconClick={onSearchIconClick}
                searchClassName="dark:!bg-blackRussian2 !bg-whiteSmoke dark:!text-white !text-gray"
                searchIconClassName="dark:!text-white !text-gray"
                isSearchLoading={isSearching}
                switchSidebar={switchSidebar}
                setSwitchSmallSidebar={setSwitchSmallSidebar}
            />
            <div className="sidebar__body themeScrollbarOverflow sidebar__chatThread grow overflow-x-hidden">
                <ChatThread />
            </div>

        </aside>
    );
};

export default ChatSidebar;
