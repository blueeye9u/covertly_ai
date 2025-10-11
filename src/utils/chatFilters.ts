import { EChatType } from '../enums/gpt-models.enum';
import { EModels } from '../enums/modals.enum';
import { Chat } from '../context/conversation.context';

/**
 * Utility functions for filtering chats based on type (deep search vs normal)
 */

/**
 * Checks if a chat is a deep search chat
 * @param chat - The chat object to check
 * @returns boolean - true if it's a deep search chat
 */
export const isDeepSearchChat = (chat: Chat): boolean => {
  return chat.chatType === EChatType.DEEP_RESEARCH || chat.model === EModels.DEEP_SEARCH;
};

const hasMessages = (chat: Chat): boolean => {
  const length = Array.isArray(chat?.messages) ? chat.messages.length : 0;
  return length > 0;
};

/**
 * Checks if a chat is a normal (non-deep search) chat
 * @param chat - The chat object to check
 * @returns boolean - true if it's a normal chat
 */
export const isNormalChat = (chat: Chat): boolean => {
  return !isDeepSearchChat(chat);
};

/**
 * Filters an array of chats to return only deep search chats
 * @param chats - Array of chats to filter
 * @returns Array of deep search chats
 */
export const filterDeepSearchChats = (chats: Chat[]): Chat[] => {
  return chats.filter((c) => isDeepSearchChat(c) && hasMessages(c));
};

/**
 * Filters an array of chats to return only normal (non-deep search) chats
 * @param chats - Array of chats to filter
 * @returns Array of normal chats
 */
export const filterNormalChats = (chats: Chat[]): Chat[] => {
  return chats.filter((c) => isNormalChat(c) && hasMessages(c));
};

/**
 * Separates chats into deep search and normal chat arrays
 * @param chats - Array of chats to separate
 * @returns Object with deepSearchChats and normalChats arrays
 */
export const separateChats = (chats: Chat[]): { deepSearchChats: Chat[]; normalChats: Chat[] } => {
  return {
    deepSearchChats: filterDeepSearchChats(chats),
    normalChats: filterNormalChats(chats)
  };
};