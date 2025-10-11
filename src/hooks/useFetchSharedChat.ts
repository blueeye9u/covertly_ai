import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/router";
import { toast } from "react-hot-toast";
import { chatService } from "../services/chat.service";
import { useConversation } from "../context/conversation.context";

// export type ChatMessagesType = Chat | null | any
export const useFetchSharedChat = (): { fetchData: () => Promise<any>, chatMessages: any, error: string } => {
  const router = useRouter();
  const previousPathRef = useRef<string>("");
  const isFetchingRef = useRef<boolean>(false);
  const hasShownErrorRef = useRef<boolean>(false);
  
  const {
    setConversationMessages,
    setCurrentChat,
    setCurrentChatId,
    chatMessages,
    setChatMessages,
    setFetchingData,
  } = useConversation();

  const [error, setError] = useState<string>("");

  const fetchData = async (showLoader: boolean = true) => {
    setError("");
    if (isFetchingRef.current) {
      return;
    }
    isFetchingRef.current = true;
    if (showLoader) {
      setFetchingData(true);
    }
    try {
       let params = new URL(document.location.toString()).searchParams;
       let chatId = params.get("id");
       if (!chatId) {
            return;
       }
      const res = await chatService.getSharedChatById(chatId || "");
      let payload: any = res.payload ?? null;
      if (!payload) {
        throw new Error("SHARED_CHAT_NOT_AVAILABLE");
      }
      if (chatId && payload) {
        setCurrentChat(payload);
        setCurrentChatId(chatId);
        setConversationMessages(payload?.messages);
      }
      setChatMessages(payload);
      return payload;
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error);
      setError(message);
      if (!hasShownErrorRef.current) {
        toast.error("This shared chat is no longer available or has expired");
        hasShownErrorRef.current = true;
      }
    } finally {
      if (showLoader) {
        setFetchingData(false);
      }
      isFetchingRef.current = false;
    }
  };

  useEffect(() => {
    const currentPath = router.pathname;
    const isPageNavigation = previousPathRef.current !== "" && previousPathRef.current !== currentPath;
    
    const showLoader = isPageNavigation || previousPathRef.current === "";
    
    fetchData(showLoader);
    
    previousPathRef.current = currentPath;
  }, [router.pathname]);

  useEffect(() => {
    const params = new URL(document.location.toString()).searchParams;
    const chatId = params.get("id");
    if (chatId) {
      hasShownErrorRef.current = false;
    }
  }, [router.query.id]);

  return { fetchData, chatMessages, error };
};
