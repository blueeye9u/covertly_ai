import { ConversationMessage, Chat } from "../context/conversation.context";

/**
 * @param chats Current list of chats
 * @param newChat New or updated chat to add to the list
 * @returns Updated chat list with the newChat at index 0
 */
export const updateChatList = (chats: Chat[], newChat: Chat): Chat[] => {
  const existing = Array.isArray(chats) ? chats : [];
  const withoutDup = existing.filter(c => c._id !== newChat._id);
  return [newChat, ...withoutDup];
};

export const createTempId = (): string => {
  return Date.now().toString();
};

export const createRandomId = (): string => {
  return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
};

export const getFormattedDate = (): string => {
  return new Date().toLocaleString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric',
    timeZoneName: 'short'
  });
};

export const prepareConversationMessages = (
  conversationMessages: ConversationMessage[],
  userMessage: ConversationMessage, 
  updatedData: ConversationMessage
): ConversationMessage[] => {
  return [...conversationMessages, userMessage, updatedData];
};

export const unsubscribeFromStream = (
  chatStreamId: string | null,
  unsubscribeFn: (id: string) => void
): void => {
  if (chatStreamId) {
    unsubscribeFn(chatStreamId);
  }
};
