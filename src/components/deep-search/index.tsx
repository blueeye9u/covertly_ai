import React, { useEffect, useState } from "react";
import NiceModal from "@ebay/nice-modal-react";
import { useRouter } from "next/router";

import { IChatMessage } from "../../interfaces/chat-message";
import ChatBox from "../chat/chatBox";
import ChatBootLayout from "../ChatBootLayout";
import {
  ConversationMessage,
  useConversation,
  Chat
} from "../../context/conversation.context";
import { EModels } from "../../enums/modals.enum";
import { EChatType } from "../../enums/gpt-models.enum";
import useSubscriptionPackage from "../../hooks/useSubscriptionPackage";
import { getConversationStreamService } from '../../services/conversation-stream.service';
import { useFetchDeepSearchChats } from "../../hooks/useFetchDeepSearchChats";
import { conversationService } from "../../services/conversation.service";
import { updateChatList, createTempId } from "../../utils/commonUtils";
import { 
  useRouterChatId, 
  useMobileSidebarDetection, 
  createHandleInputKeyDown, 
  createHandleInputKeyDownOnEdit, 
  createChatBoxProps 
} from "../../utils/chatSharedUtils";

interface DeepSearchModuleProps {}
const conversationStreamService = getConversationStreamService();


const DeepSearchModule: React.FC<DeepSearchModuleProps> = () => {
  const [toggleSidebar, setToggleSidebar] = useState<boolean>(true);
  const [switchSidebar, setSwitchSidebar] = useState<boolean>(true);
  const [switchSmallSidebar, setSwitchSmallSidebar] = useState<boolean>(true);
  const [editableMessageId, setEditableMessageId] = useState<string | null>(null);
  const [editedMessage, setEditedMessage] = useState<string>("");
  const [copyFiles] = useState([]);
  const [regeneratingMessageId] = useState<string | null>(null);
  const [chatStreamId, setChatStreamId] = useState<string>("");
  const { validateChatSubscription }: any = useSubscriptionPackage();
  const router = useRouter();
  const {
    setConversationMessages,
    setCurrentChat,
    currentChat,
    conversationMessages,
    setCurrentChatId,
    setGeneratingMessage,
    generatingMessage,
    setRouterId,
    selectedModel,
    setChatMessages,
    chatMessages,
    userInput,
    setUserInput,
    setSelected,
    setSelectedModel
  } = useConversation();
  useFetchDeepSearchChats();

  useEffect(() => {
    setSelected("");
    setSelectedModel("");
  }, []);

  useRouterChatId(setCurrentChatId, setRouterId, setConversationMessages, setCurrentChat);

  useMobileSidebarDetection(setSwitchSidebar);

  // Listen for streaming events during deep research
  useEffect(() => {
    if (!chatStreamId) return;
  
    const targetIndex = conversationMessages.length - 1;
  
    conversationStreamService.subscribeToChatStream(chatStreamId, (data) => {
      if (data?.chatEvent || data?.searchProgress) {
        setConversationMessages((prev) => {
          const updated = [...prev];
          if (updated[targetIndex]) {
            updated[targetIndex] = {
              ...updated[targetIndex],
              chatEvent: data?.chatEvent ?? updated[targetIndex].chatEvent,
              searchStatus: data?.searchProgress?.status ?? updated[targetIndex].searchStatus,
              searchProgress: data?.searchProgress ? {
                currentStep: data.searchProgress.currentStep,
                totalSteps: data.searchProgress.totalSteps,
                currentStepNumber: data.searchProgress.currentStepNumber,
                estimatedTimeRemaining: data.searchProgress.estimatedTimeRemaining,
                sourcesFound: data.searchProgress.sourcesFound,
                pagesAnalyzed: data.searchProgress.pagesAnalyzed,
              } : updated[targetIndex].searchProgress,
            };
          }
          return updated;
        });
      }

      if (data?.chat?._id) {
        const chat = data.chat;
        setCurrentChat({ ...chat });
        setCurrentChatId(chat._id);
        setRouterId(chat._id);
        if (conversationMessages.length === 0) {
          setChatMessages([chat, ...(chatMessages as Chat[])]);
        }
      }
  
      if (data?.finalizedData) {
        const { question, response, chat } = data.finalizedData;
  
        setCurrentChat({ ...chat });
        setCurrentChatId(chat._id);
        setRouterId(chat._id);
        router.replace(`${router.pathname}?id=${chat._id}`, undefined, {
          shallow: true,
        });
  
        setConversationMessages((prev) => {
          const updated = [...prev];
          const userIdx = targetIndex - 1;
          if (updated[userIdx]) updated[userIdx] = question;
          if (updated[targetIndex]) updated[targetIndex] = response;
          return updated;
        });
        
        setChatMessages(updateChatList(chatMessages ?? [], chat));
        conversationStreamService.unsubscribeFromChatStream(chatStreamId);
        setChatStreamId("");
        setGeneratingMessage(false);
      }
    });
  
    return () => {
      conversationStreamService.unsubscribeFromChatStream(chatStreamId);
    };
  }, [chatStreamId]);

  // Handler for stopping generation
  const handleStopGeneration = () => {
    if (chatStreamId) {
      const stopGeneration = async () => {
        try {
          await conversationStreamService.stopChatStream(chatStreamId);
          setGeneratingMessage(false);
          setChatStreamId("");
          
          // Update the last message to show it was stopped
          setConversationMessages((prev) => {
            const updated = [...prev];
            const lastIndex = updated.length - 1;
            if (updated[lastIndex]?.isLoading) {
              updated[lastIndex] = {
                _id: updated[lastIndex]._id,
                content: "Deep research was stopped by user.",
                isLoading: false,
                chatEvent: 'Deep research stopped'
              };
            }
            return updated;
          });
        } catch (error) {
          console.error('Failed to stop deep research:', error);
        }
      };
      
      stopGeneration();
    }
  };

  // Handler for Deep Research messages
  const handleDeepResearchMessage = async () => {
    try {
      if (!userInput.trim()) return;

      setGeneratingMessage(true);
      
      // Generate unique stream ID for this conversation
      const streamId = createTempId();
      setChatStreamId(streamId);

      const tempId = createTempId();
      // Create user message
      const userMessage: ConversationMessage = {
        _id: tempId,
        content: userInput,
        role: "user",
        model: EModels.DEEP_SEARCH,
        chatType: EChatType.DEEP_RESEARCH,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

      // Create initial loading message
      const loadingMessage: ConversationMessage = {
        _id: `loading-${tempId}`,
        content: "",
        role: "system",
        model: EModels.DEEP_SEARCH,
        chatType: EChatType.DEEP_RESEARCH,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        isLoading: true,
        searchStatus: 'planning',
        chatEvent: 'Starting deep research...',
        searchProgress: {
          currentStep: 'Initializing deep research process...',
        },
      };

      // Update conversation messages
      setConversationMessages(prevMessages => [...prevMessages, userMessage, loadingMessage]);
      setUserInput("");

      // Call deep research API with streaming support
      // The response will come through WebSocket events, not direct response
      await conversationService.createDeepResearchConversation({
        content: userInput,
        chat: currentChat?._id || null,
        model: EModels.DEEP_SEARCH,
        chatType: EChatType.DEEP_RESEARCH,
        chatStreamId: streamId,
      });
    } catch (error) {
      console.error('Deep research failed:', error);
      
      // Replace loading message with error
      const errorMessage: ConversationMessage = {
        _id: createTempId(),
        content: "I apologize, but I encountered an error during the deep research process. Please try again.",
        role: "system",
        model: EModels.DEEP_SEARCH,
        chatType: EChatType.DEEP_RESEARCH,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        error: (error as Error).message,
        searchStatus: 'error',
      };

      setConversationMessages(prevMessages => 
        prevMessages.map(msg => msg.isLoading ? errorMessage : msg)
      );
      
      // Clear stream ID on error
      setChatStreamId("");
    } finally {
      setGeneratingMessage(false);
    }
  };

  // Add missing handler functions from chat module
  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (e.target.value && selectedModel && !validateChatSubscription(selectedModel?.key)) {
      return NiceModal.show("subscriptionModal");
    }
    setUserInput(e.target.value);
  };

  const userSetHandler = (user: any) => {}

  const handleSendMessage = () => {
    if (userInput.trim() === "" || generatingMessage) {
      return;
    }
    handleDeepResearchMessage();
  };

  const handleUpdateMessage = () => {
    console.log("Message update not supported for deep research");
  };

  const handleInputKeyDown = createHandleInputKeyDown(
    userInput, 
    false,
    handleSendMessage, 
    setUserInput
  );

  const handleInputKeyDownOnEdit = createHandleInputKeyDownOnEdit(
    userInput, 
    handleUpdateMessage, 
    setUserInput
  );

  const handleEdit = (message: IChatMessage, responseId: number) => {
    if (!validateChatSubscription(selectedModel?.key)) {
      return NiceModal.show("subscriptionModal");
    }
    setEditableMessageId(message._id!);
    setEditedMessage(message.content!);
  };

  const handleCancel = () => {
    setEditableMessageId(null);
    setEditedMessage("");
  };

  const handleRegenerateMessage = (index: number) => {
    // Deep research doesn't support regeneration yet
    console.log("Regeneration not supported for deep research");
  };

  return (
    <ChatBootLayout
      toggleSidebar={toggleSidebar}
      setToggleSidebar={setToggleSidebar}
      switchSidebar={switchSidebar}
      setSwitchSidebar={setSwitchSidebar}
      switchSmallSidebar={switchSmallSidebar}
      setSwitchSmallSidebar={setSwitchSmallSidebar}
      copyFiles={copyFiles}
      currentChat={currentChat}
    >
      <ChatBox
        {...createChatBoxProps({
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
        })}
      />
    </ChatBootLayout>
  );
};

export default DeepSearchModule;