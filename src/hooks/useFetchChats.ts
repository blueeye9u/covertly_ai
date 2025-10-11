import { useEffect, useRef } from "react";
import { useRouter } from "next/router";
import { chatService } from "../services/chat.service";
import { Chat, useConversation } from "../context/conversation.context";
import { getSuggestedLLM } from "../utils/chatUtils";
import { filterNormalChats } from "../utils/chatFilters";
import { 
  handleChatData, 
  getChatIdFromUrl, 
  shouldShowLoader,
  ConversationSetters 
} from '../utils/chatFetchUtils';


export const useFetchChats = () => {
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

  const fetchData = async (data: { title?: string; model?: string } | undefined = undefined, showLoader: boolean = true) => {
    if (showLoader) {
      setFetchingData(true);
    }
    try {
      const title = data?.title ?? "";
      const model = data?.model ?? "";
      const res = await chatService.getChat(title, model);
      const payload: Chat[] = res.payload ?? [];

      const filteredPayload = filterNormalChats(payload);
      
      const chatId = getChatIdFromUrl();

      if (chatId && filteredPayload) {
        handleChatData(filteredPayload, chatId, conversationSetters, (chat) => getSuggestedLLM(chat.model!));
      }

      setChatMessages(filteredPayload);
      return filteredPayload;
    } catch (error) {
      console.error("Failed to fetch chat data:", error);
    } finally {
      if (showLoader) {
        setFetchingData(false);
      }
    }
  };


  useEffect(() => {
    const currentPath = router.pathname;
    const showLoader = shouldShowLoader(currentPath, previousPathRef.current);
    
    fetchData({}, showLoader);
    
    previousPathRef.current = currentPath;
  }, [router.pathname, deleteChatLoading]);

  return { fetchData, chatMessages };
};