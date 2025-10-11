import { useEffect } from "react";
import { useRouter } from "next/router";
import { ConversationMessage } from "../context/conversation.context";
import { insertNewlineAtCursor, isEnterWithoutShift, isEnterWithShift, shouldSendMessage } from "./inputUtils";

export const useRouterChatId = (
  setCurrentChatId: (id: string) => void,
  setRouterId: (id: string) => void,
  setConversationMessages: (messages: ConversationMessage[]) => void,
  setCurrentChat: (chat: any) => void
) => {
  const router = useRouter();

  useEffect(() => {
    const urlParams = new URLSearchParams(router.asPath.split('?')[1]);
    const id = urlParams.get('id');
    
    if (id) {
      setCurrentChatId(id);
      setRouterId(id);
      router.replace(router.pathname, `${router.pathname}?id=${id}`, {
        shallow: true,
      });
    } else {
      setConversationMessages([]);
      setCurrentChat(null);
      setCurrentChatId("");
      setRouterId("");
      router.replace(router.pathname, undefined, { shallow: true });
    }
  }, [router.asPath]);
};

export const useMobileSidebarDetection = (
  setSwitchSidebar: (value: boolean) => void
) => {
  useEffect(() => {
    if (globalThis.window !== undefined) {
      const isMobile = globalThis.window.matchMedia('(max-width: 639px)').matches;
      if (isMobile) {
        setSwitchSidebar(true);
      }
    }
  }, []);
};

export const createHandleInputKeyDown = (
  userInput: string,
  isFileUploading: boolean,
  handleSendMessage: () => void,
  setUserInput: (value: string) => void
) => {
  return (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (shouldSendMessage(e, userInput, isFileUploading)) {
      handleSendMessage();
      e.preventDefault();
    } else if (e.key === "Enter" && e.shiftKey) {
      e.preventDefault();
      insertNewlineAtCursor(e, userInput, setUserInput);
    }
  };
};

export const createHandleInputKeyDownOnEdit = (
  userInput: string,
  handleUpdateMessage: () => void,
  setUserInput: (value: string) => void
) => {
  return (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (isEnterWithoutShift(e) && userInput) {
      handleUpdateMessage();
      e.preventDefault();
    } else if (isEnterWithShift(e)) {
      e.preventDefault();
      insertNewlineAtCursor(e, userInput, setUserInput);
    }
  };
};

export const processStreamingResponse = async (
  response: Response,
  setFiles: (files: any[]) => void
) => {
  const reader = response.body?.getReader();
  if (!reader) return null;

  const decoder = new TextDecoder("utf-8");

  setTimeout(() => {
    setFiles([]);
  }, 6000);

  return { reader, decoder };
};

interface ChatBoxPropsConfig {
  currentChat: any;
  userSetHandler: (user: any) => void;
  conversationMessages: ConversationMessage[];
  generatingMessage: boolean;
  editableMessageId: string | null;
  handleInputKeyDownOnEdit: (e: React.KeyboardEvent<HTMLTextAreaElement>) => void;
  handleUpdateMessage: () => void;
  handleCancel: () => void;
  handleEdit: (message: any, responseId: number) => void;
  regeneratingMessageId: string | null;
  handleRegenerateMessage: (index: number) => void;
  userInput: string;
  setUserInput: (value: string) => void;
  handleInputChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  handleInputKeyDown: (e: React.KeyboardEvent<HTMLTextAreaElement>) => void;
  handleSendMessage: () => void;
  handleStopGeneration: () => void;
  editedMessage: string;
  setEditedMessage: React.Dispatch<React.SetStateAction<string>>;
  toggleSidebar: boolean;
  setToggleSidebar: (value: boolean) => void;
  copyFiles: any[];
  generateSuperResponse?: () => void;
}

export const createChatBoxProps = (config: ChatBoxPropsConfig) => {
  const {
    currentChat,
    userSetHandler,
    conversationMessages,
    generatingMessage,
    editableMessageId,
    handleInputKeyDownOnEdit,
    handleUpdateMessage,
    handleCancel,
    handleEdit,
    regeneratingMessageId,
    handleRegenerateMessage,
    userInput,
    setUserInput,
    handleInputChange,
    handleInputKeyDown,
    handleSendMessage,
    handleStopGeneration,
    editedMessage,
    setEditedMessage,
    toggleSidebar,
    setToggleSidebar,
    copyFiles,
    generateSuperResponse,
  } = config;

  const baseProps = {
    currentChat,
    userSetHandler,
    conversationMessages,
    fetchingData: generatingMessage,
    editableMessageId,
    handleInputKeyDownOnEdit,
    handleUpdateMessage,
    handleCancel,
    handleEdit,
    regeneratingMessageId,
    handleRegenerateMessage,
    userInput,
    setUserInput,
    handleInputChange,
    handleInputKeyDown,
    handleSendMessage,
    handleStopGeneration,
    editedMessage,
    setEditedMessage,
    toggleSidebar,
    setToggleSidebar,
    copyFiles,
  };

  if (generateSuperResponse) {
    return { ...baseProps, generateSuperResponse };
  }

  return baseProps;
};
