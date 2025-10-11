import { useEffect, useRef } from "react";
import { useRouter } from "next/router";
import { chatService } from "../services/chat.service";
import { Chat, useConversation } from "../context/conversation.context";
import { EChatType } from "../enums/gpt-models.enum";
import { DeepResearchAgent } from "../constants/chat-models-data";
import { filterDeepSearchChats } from '../utils/chatFilters';
import { 
  handleChatData, 
  getChatIdFromUrl, 
  shouldShowLoader,
  ConversationSetters 
} from '../utils/chatFetchUtils';

export const useFetchDeepSearchChats = () => {
  const router = useRouter();
  const previousPathRef = useRef<string>("");
  
  const {
    setConversationMessages,
    setCurrentChat,
    setCurrentChatId,
    deleteChatLoading,
    setChangeChatLoading,
    chatMessages,
    setChatMessages,
    setFetchingData,
    setFollowUpQuestions,
    setLLMSuggestions,
    setSelectedModel,
  } = useConversation();

  const conversationSetters: ConversationSetters = {
    setConversationMessages,
    setCurrentChat,
    setCurrentChatId,
    setChangeChatLoading,
    setChatMessages,
    setFetchingData,
    setFollowUpQuestions,
    setLLMSuggestions,
    setSelectedModel,
  };

  const fetchDeepSearchData = async (data: { title?: string } | undefined = undefined, showLoader: boolean = true) => {
    if (showLoader) {
      setFetchingData(true);
    }
    try {
      const title = data?.title ?? "";
      // Fetch only deep research chats
      const res = await chatService.getChat(title, "", EChatType.DEEP_RESEARCH);
      const payload: Chat[] = res.payload ?? [];
      
      // Additional filter to ensure only deep research chats
      const deepSearchPayload = filterDeepSearchChats(payload);
      
      const chatId = getChatIdFromUrl();

      if (chatId && deepSearchPayload) {
        handleChatData(deepSearchPayload, chatId, conversationSetters, () => DeepResearchAgent);
      }

      setChatMessages(deepSearchPayload);
      return deepSearchPayload;
    } catch (error) {
      console.error("Failed to fetch deep search chat data:", error);
    } finally {
      if (showLoader) {
        setFetchingData(false);
      }
    }
  };


  useEffect(() => {
    const currentPath = router.pathname;
    const showLoader = shouldShowLoader(currentPath, previousPathRef.current);
    
    fetchDeepSearchData({}, showLoader);
    
    previousPathRef.current = currentPath;
  }, [router.pathname, deleteChatLoading]);

  return { fetchDeepSearchData, chatMessages };
};