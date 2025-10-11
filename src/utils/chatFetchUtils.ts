import { Chat } from "../context/conversation.context";

/**
 * Common interface for chat fetching functions
 */
export interface ChatFetchParams {
  title?: string;
  model?: string;
}

/**
 * Common interface for conversation context setters
 */
export interface ConversationSetters {
  setConversationMessages: (messages: any[]) => void;
  setCurrentChat: (chat: Chat | null) => void;
  setCurrentChatId: (id: string) => void;
  setChangeChatLoading: (loading: boolean) => void;
  setChatMessages: (chats: Chat[]) => void;
  setFetchingData: (loading: boolean) => void;
  setFollowUpQuestions: (questions: string[]) => void;
  setLLMSuggestions: (suggestions: string[]) => void;
  setSelectedModel: (model: any) => void;
}

/**
 * Common function to handle chat data processing
 */
export const handleChatData = (
  payload: Chat[],
  chatId: string,
  setters: ConversationSetters,
  modelSelector: (chat: Chat) => any
) => {
  setters.setChangeChatLoading(true);
  const filteredMessages = payload.find((ele) => ele._id === chatId);

  if (filteredMessages) {
    setters.setCurrentChat(filteredMessages);
    setters.setCurrentChatId(chatId);
    setters.setConversationMessages(filteredMessages.messages);
    handleLastMessage(filteredMessages.messages, setters);
    setters.setSelectedModel(modelSelector(filteredMessages));
  }
  setters.setChangeChatLoading(false);
};

/**
 * Common function to handle last message processing
 */
export const handleLastMessage = (
  messages: any[],
  setters: ConversationSetters
) => {
  if (messages) {
    const lastMessage = messages.at(-1);
    if (lastMessage?.followUpQuestions) {
      setters.setFollowUpQuestions(lastMessage.followUpQuestions);
    }
    if (lastMessage?.llmSuggestions) {
      setters.setLLMSuggestions(lastMessage.llmSuggestions);
    }
  }
};

/**
 * Common function to get chat ID from URL
 */
export const getChatIdFromUrl = (): string | null => {
  return new URL(document.location.toString()).searchParams.get("id");
};

/**
 * Common function to determine if loader should be shown
 */
export const shouldShowLoader = (
  currentPath: string,
  previousPath: string
): boolean => {
  const isPageNavigation = previousPath !== "" && previousPath !== currentPath;
  return isPageNavigation || previousPath === "";
};
