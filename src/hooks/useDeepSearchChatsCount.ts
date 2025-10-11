import { useEffect, useState } from "react";
import { chatService } from "../services/chat.service";
import { useConversation } from "../context/conversation.context";
import { filterDeepSearchChats, filterNormalChats } from '../utils/chatFilters';

export const useDeepSearchChatsCount = () => {
  const [deepSearchChatsCount, setDeepSearchChatsCount] = useState<number>(0);
  const [normalChatsCount, setNormalChatsCount] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);
  
  const {
    deleteChatLoading,
    generatingMessage,
    changeChatLoading,
    startChatLoading,
  } = useConversation();

  const fetchChatsCount = async () => {
    setLoading(true);
    try {
      // Fetch all chats without chatType filter
      const res = await chatService.getChat("", "");
      const allChats = res.payload ?? [];
      
      // Filter deep search and normal chats using utility functions
      const deepSearchChats = filterDeepSearchChats(allChats);
      const normalChats = filterNormalChats(allChats);
      
      setDeepSearchChatsCount(deepSearchChats.length);
      setNormalChatsCount(normalChats.length);
    } catch (error) {
      console.error("Failed to fetch chats count:", error);
      setDeepSearchChatsCount(0);
      setNormalChatsCount(0);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchChatsCount();
  }, []);

  // Refresh count when chat operations complete
  useEffect(() => {
    if (!deleteChatLoading && !generatingMessage && !changeChatLoading && !startChatLoading) {
      const timer = setTimeout(fetchChatsCount, 500);
      return () => clearTimeout(timer);
    }
  }, [deleteChatLoading, generatingMessage, changeChatLoading, startChatLoading]);

  return { 
    deepSearchChatsCount,
    normalChatsCount,
    fetchChatsCount, 
    loading 
  };
};