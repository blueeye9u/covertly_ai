import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { toast } from "react-hot-toast";
import { IChatMessage } from "../../interfaces/chat-message";
import { convertStringToObject, parseStreamData } from "../../utils/convertStrinToObject";
import ChatBox from "./chatBox";
import { getCookie } from "../../utils/getCookie";
import ChatBootLayout from "../ChatBootLayout";
import {
  ConversationMessage,
  useConversation,
  Chat, UploadedFile,
} from "../../context/conversation.context";
import { gptDisplayNames } from "../SelectChatVersion";
import NiceModal from "@ebay/nice-modal-react";
import { EModels } from "../../enums/modals.enum";
import { EChatType, EGptModels } from "../../enums/gpt-models.enum";
import useSubscriptionPackage from "../../hooks/useSubscriptionPackage";
import { getConversationStreamService } from '../../services/conversation-stream.service';
import { useFetchChats } from "../../hooks/useFetchChats";
import { Elijah, Elijah_Model_Selection_Data } from "../../constants/chat-models-data";
import { ISubscriptionType } from "../../enums/subscription.enum";
import { chatService } from "../../services/chat.service";
import { updateChatList, createTempId, createRandomId, getFormattedDate, prepareConversationMessages, unsubscribeFromStream } from "../../utils/commonUtils";
import { 
  useRouterChatId, 
  useMobileSidebarDetection, 
  createHandleInputKeyDown, 
  createHandleInputKeyDownOnEdit, 
  createChatBoxProps,
  processStreamingResponse 
} from "../../utils/chatSharedUtils";

interface ChatModuleProps {}
const conversationStreamService = getConversationStreamService();
interface Payload {
  chat: string | null;
  conversation: string;
  content: string;
  model: string;
  chatStreamId: string;
  chatType?: string;
  isLiveSearch?: boolean;
  title?: string; // optional: pass when first message edit should update chat title
}


/**
 * Extracts error content from various potential locations in the response
 * @param element The element to check for errors
 * @returns Object containing error content and source if found
 */
const extractErrorContent = (element: any): { errorContent: string | null, errorSource: string | null } => {
  // Check for error in response content
  if (element?.data?.response?.content?.includes("ErrorMessage:")) {
    const content = element.data.response.content.split("ErrorMessage:").pop();
    return { errorContent: content, errorSource: 'response' };
  }
  
  // Check for error in nested error object
  if (element?.data?.error?.error?.message) {
    const content = element.data.error.error.message.split("ErrorMessage:").pop();
    return { errorContent: content, errorSource: 'errorNested' };
  }
  
  // Check for error in data.error
  if (element?.data?.error) {
    const errorText = element.data.error;
    const content = typeof errorText === 'string' && errorText.includes("ErrorMessage:") 
      ? errorText.split("ErrorMessage:").pop() 
      : errorText;
    return { errorContent: content, errorSource: 'errorDirect' };
  }
  
  // No error found
  return { errorContent: null, errorSource: null };
};

/**
 * Processes errors in API responses and formats them appropriately
 * Handles different types of errors and updates state accordingly
 */
const processErrorInResponse = (
  element: any, 
  messageStr: string, 
  chatStreamId: string | null,
  setTrialTokenLimit: (value: boolean) => void,
  unsubscribeFromChatStream: (id: string) => void
): string => {
  // Handle insufficient quota error specially
  if (element?.data?.error?.type === "insufficient_quota") {
    const quotaErrorMessage = "<strong>You exceeded your current quota, please check your plan and billing details. For more information on this error, read the docs: https://platform.openai.com/docs/guides/error-codes/api-errors.</strong>";
    
    unsubscribeFromStream(chatStreamId, unsubscribeFromChatStream);
    return messageStr + quotaErrorMessage;
  }
  
  // Extract error content using the shared extraction logic
  const { errorContent, errorSource } = extractErrorContent(element);
  
  if (errorContent) {
    // Set trial token limit for error cases
    setTrialTokenLimit(true);

    let errorMessage;

    if (errorSource === 'response') {
      errorMessage = element?.data?.response?.content;
    } else if (errorSource === 'errorNested') {
      errorMessage = element?.data?.error?.error?.message;
    } else {
      errorMessage = element?.data?.error;
    }
    
    // Add error message to the current message string
    messageStr += errorMessage;
    
    // Unsubscribe from chat stream for error cases
    unsubscribeFromStream(chatStreamId, unsubscribeFromChatStream);
    
    return messageStr;
  }
  
  // Handle regular data if no error detected and no question field
  if (!element?.data?.question && element?.data) {
    messageStr += element.data;
  }
  
  return messageStr;
};

/**
 * Updates conversation messages with streaming response
 */
const updateMessagesWithStreamingResponse = (
  prevMessages: ConversationMessage[], 
  messageStr: string, 
  tempId: string,
  lastMessageIndex: number
): ConversationMessage[] => {
  const updatedMessages = [...prevMessages];
  
  if (updatedMessages.length <= 1) {
    // Not enough messages in the array, ensure we have at least 2
    if (updatedMessages.length === 0) {
      // This shouldn't happen but handle it anyway
      return updatedMessages;
    }
    
    // Only user message exists, add system message
    updatedMessages[1] = {
      ...updatedMessages[1],
      role: "system",
      content: messageStr,
      createdAt: new Date().toISOString(),
      _id: `loading-${tempId}`,
    };
  } else {
    // Update the last message (system response)
    updatedMessages[lastMessageIndex] = {
      citations: updatedMessages[lastMessageIndex]?.citations,
      role: "system",
      content: messageStr,
      createdAt: new Date().toISOString(),
      _id: `loading-${tempId}`,
    };
  }
  
  return updatedMessages;
};

/**
 * Common function to handle API responses for both chat types
 */
const processApiResponse = async (
  response: Response,
  tempId: string,
  setConversationMessages: React.Dispatch<React.SetStateAction<ConversationMessage[]>>,
  chatStreamId: string | null,
  setTrialTokenLimit: (value: boolean) => void,
  unsubscribeFromChatStream: (id: string) => void
): Promise<void> => {
  const reader = response.body?.getReader();
  if (!reader) return;
  
  const decoder = new TextDecoder("utf-8");
  let messageStr = "";
  
  while (true) {
    const { value, done } = await reader.read();
    if (done) break;
    
    const decodedChunk = decoder.decode(value, { stream: true });
    const messages = convertStringToObject(decodedChunk.toString());
    
    for (const element of messages) {
      messageStr = processErrorInResponse(
        element, 
        messageStr, 
        chatStreamId,
        setTrialTokenLimit,
        unsubscribeFromChatStream
      );
    }
    
    setConversationMessages((prevMessages: ConversationMessage[]) => {
      const lastMessageIndex = prevMessages.length - 1;
      return updateMessagesWithStreamingResponse(prevMessages, messageStr, tempId, lastMessageIndex);
    });
  }
};

/**
 * Updates conversation messages for Elijah model responses
 */
const updateElijahMessages = (
  prevMessages: ConversationMessage[], 
  response: any
): ConversationMessage[] => {
  const updatedMessages = [...prevMessages];
  if(response?.isSuperResponse) {
    updatedMessages[updatedMessages.length - 1] = response;
  } else {
    const systemMessageIndex = updatedMessages.findIndex(
      (message) => message._id.includes(response?.model)
    );
    updatedMessages[systemMessageIndex] = response;
  }
  return updatedMessages;
};

/**
 * Updates conversation messages for regular model responses
 */
const updateRegularMessages = (
  prevMessages: ConversationMessage[], 
  question: any, 
  response: any
): ConversationMessage[] => {
  const updatedMessages = [...prevMessages];
  const systemMessageIndex = updatedMessages.length - 1;
  const userMessageIndex = updatedMessages.length - 2;
  updatedMessages[userMessageIndex] = question;
  updatedMessages[systemMessageIndex] = response;
  return updatedMessages;
};

/**
 * Updates messages with model-specific data
 */
const updateMessageWithModelData = (
  updatedMessages: ConversationMessage[], 
  model: string, 
  _id: string, 
  message: string
): void => {
  const index = updatedMessages.findIndex((msg) => msg._id == _id);
  if (index != -1) {
    updatedMessages[index] = {
      ...updatedMessages[index],
      content: message,
    };
  }
};

const ChatModule: React.FC<ChatModuleProps> = () => {
  const [toggleSidebar, setToggleSidebar] = useState<boolean>(true);
  const [switchSidebar, setSwitchSidebar] = useState<boolean>(true);
  const [switchSmallSidebar, setSwitchSmallSidebar] = useState<boolean>(false);
  const [editableMessageId, setEditableMessageId] = useState<string | null>(null);
  const [editableMessageResponseIndex, setEditableMessageResponseIndex] = useState<number>(0);

  useEffect(() => {
    const flag = localStorage.getItem("SHOW_SUBSCRIPTION_SUCCESS_TOAST");
   
    if (flag === "success") {
      localStorage.removeItem("SHOW_SUBSCRIPTION_SUCCESS_TOAST");
      
      setTimeout(() => {
        toast.success("Thank you for upgrading");
      }, 1000);
    } 
  }, []);
  const [editedMessage, setEditedMessage] = useState<string>("");
  const [copyFiles] = useState([]);
  const [regeneratingMessageId, setRegeneratingMessageId] = useState<string | null>(null);
  const [indexedChatStreamId, setIndexedChatStreamId] = useState<string | null>(null);
  const [messageIndex, setMessageIndex] = useState<number | null>(null);
  const [chatStreamId, setChatStreamId] = useState<string | null>(null);
  const [abortController, setAbortController] = useState<AbortController | null>(null);
  const { validateChatSubscription, chatsRemaining, currentPackage, User }: any = useSubscriptionPackage();
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
    routerId,
    selectedModel,
    setSelectedModel,
    setTrialTokenLimit,
    files,
    setFiles,
    setChatMessages,
    setFollowUpQuestions,
    smartModel,
    selected,
    setSelected,
    setLLMSuggestions,
    chatMessages,
    elijahModels,
    setElijahModels,
    isFileUploading,
    isLiveSearch,
    setIsLiveSearch,
    userInput,
    setUserInput
  } = useConversation();
  useFetchChats();

  useEffect(() => {
    setSelected("");
    setSelectedModel("");
    setFiles([]);
  }, []);

  useEffect(() => {
    if (selectedModel.key === EModels.ELIJAH && currentChat?.elijahModels && currentChat?.elijahModels.length > 0) {
      if (typeof currentChat?.elijahModels[0] === 'string') {
        const selectedModels = currentChat?.elijahModels.map((modelKey: string) => {
          return Elijah_Model_Selection_Data.find((model: any) => model.key === modelKey);
        }).filter(Boolean);
        setElijahModels(selectedModels.map(model => model?.key).filter(Boolean) as string[]);
      } else {
        setElijahModels(currentChat?.elijahModels);
      }
      setElijahModels(elijahModels);
    } else {
      setElijahModels([]);
    }
  }, [currentChat])

  useRouterChatId(setCurrentChatId, setRouterId, setConversationMessages, setCurrentChat);


  useMobileSidebarDetection(setSwitchSidebar);

  useEffect(() => {
    if (!chatStreamId) return;
  
    const targetIndex = conversationMessages.length - 1;
  
    conversationStreamService.subscribeToChatStream(chatStreamId, (data) => {
      if (data?.citations || data?.chatEvent) {
        setConversationMessages((prev) => {
          const updated = [...prev];
          if (updated[targetIndex]) {
            updated[targetIndex] = {
              ...updated[targetIndex],
              citations: data?.citations ?? updated[targetIndex].citations,
              chatEvent: data?.chatEvent ?? updated[targetIndex].chatEvent,
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
  
        if (response?.followUpQuestions) {
          setFollowUpQuestions(response.followUpQuestions);
        }
        if (response?.llmSuggestions) {
          setLLMSuggestions(response.llmSuggestions);
        }
  
        setCurrentChat({ ...chat });
        setCurrentChatId(chat._id);
        setRouterId(chat._id);
        router.replace(`${router.pathname}?id=${chat._id}`, undefined, {
          shallow: true,
        });
  
        if (selectedModel.key === Elijah.key) {
          setConversationMessages(prevMessages => updateElijahMessages(prevMessages, response));
        } else {
          setConversationMessages(prevMessages => updateRegularMessages(prevMessages, question, response));
        }
        // Use the extracted helper function to update chat messages
        setChatMessages(updateChatList(chatMessages ?? [], chat));
        unsubscribeFromStream(chatStreamId, conversationStreamService.unsubscribeFromChatStream);
      }
    });
  
    return () => {
      unsubscribeFromStream(chatStreamId, conversationStreamService.unsubscribeFromChatStream);
    };
  }, [chatStreamId]);

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (e.target.value && selectedModel && !validateChatSubscription(selectedModel?.key)) {
      return NiceModal.show("subscriptionModal");
    }
    setUserInput(e.target.value);
  };

  const userSetHandler = (user: any) => {}

  const handleSendMessage = () => {
    if (userInput.trim() === "" || generatingMessage || isFileUploading) {
      return;
    }

    const queryString = globalThis.window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const type = urlParams.get('type');

    sendMessageBasedOnType(type, selected?.key).then(() => {
      if (generatingMessage) { setGeneratingMessage(false) };
    });
  };

  const handleUpdateMessage = () => {
    if (!validateChatSubscription(selectedModel?.key)) {
      return NiceModal.show("subscriptionModal");
    }
    if (!editableMessageId) return;
    setGeneratingMessage(true);
    prepareMessageState();
    const payload = buildPayload();
    sendMessage(payload)
      .then(handleApiResponse)
      .catch(handleError)
      .finally(resetMessageState);
  };

  const handleInputKeyDown = createHandleInputKeyDown(
    userInput, 
    isFileUploading, 
    handleSendMessage, 
    setUserInput
  );

  const handleInputKeyDownOnEdit = createHandleInputKeyDownOnEdit(
    userInput, 
    handleUpdateMessage, 
    setUserInput
  );

  const handleStopGeneration = () => {
    if (!generatingMessage) return;
    
    const stopGeneration = async () => {
      try {
        // Abort ongoing HTTP request if exists
        if (abortController) {
          abortController.abort();
          setAbortController(null);
        }
        
        // Stop the WebSocket stream if active
        if (chatStreamId) {
          await conversationStreamService.stopChatStream(chatStreamId);
          await conversationStreamService.unsubscribeFromChatStream(chatStreamId);
          setChatStreamId(null);
        }
        
        // Update messages to show generation was stopped
        setConversationMessages((prev) => {
          const updated = [...prev];
          
          // For Elijah models, we need to handle multiple system messages
          if (selectedModel.key === Elijah.key) {
            // Find all system messages that are currently being generated (have loading IDs)
            for (const [index, message] of updated.entries()) {
              if (message.role === 'system' && message._id.includes('loading-') && !message.isSuperResponse) {
                updated[index] = {
                  ...message,
                  content: message.content || 'Generation stopped by user.',
                };
              }
            }
          } else {
            // For regular models, update the last system message while preserving all properties
            const lastMessageIndex = updated.length - 1;
            if (updated[lastMessageIndex] && updated[lastMessageIndex].role === 'system') {
              updated[lastMessageIndex] = {
                ...updated[lastMessageIndex],
                content: updated[lastMessageIndex].content || 'Generation stopped by user.',
              };
            }
          }
          
          return updated;
        });
        
        // Reset states
        setGeneratingMessage(false);
      } catch (error) {
        console.error('Error stopping generation:', error);
        setGeneratingMessage(false);
      }
    };
    
    stopGeneration();
  };

  /**
   * Creates message objects for sending to the API
   */
  const createMessageObjects = (content: string): { userMessage: ConversationMessage; updatedData: ConversationMessage } => {
    const tempId = createTempId();
    
    return {
      userMessage: {
        role: "user",
        content,
        createdAt: new Date().toISOString(),
        _id: tempId,
      },
      updatedData: {
        role: "system",
        content: "",
        createdAt: new Date().toISOString(),
        _id: `loading-${tempId}`,
      }
    };
  };

  /**
   * Prepares the API request for sending a message
   */
  const prepareApiRequest = (
    content: string, 
    model: string, 
    chatType?: string, 
    randomId?: string, 
    fileUrls?: string[]
  ): RequestInit => {
    const token = getCookie("token");
    
    const requestBody: any = {
      content,
      chat: currentChat?._id ?? routerId ?? null,
      model,
      userLocalData: { date: getFormattedDate() },
      chatStreamId: randomId,
      isLiveSearch: isLiveSearch,
    };
    
    if (chatType) {
      requestBody.chatType = chatType;
    }
    
    if (fileUrls && fileUrls.length > 0) {
      requestBody.files = fileUrls;
    }
    
    return {
      method: "post",
      headers: {
        Accept: "application/json, text/plain, */*",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(requestBody),
    };
  };

  /**
   * Determines the chat model to use based on the chat type (smart or regular)
   * @param isSmartLLM Whether this is a SmartLLM chat
   * @returns The chat model to use
   */
  const determineChatModel = (isSmartLLM: boolean): string => {
    if (isSmartLLM) {
      // For SmartLLM, use the smart model or default to GPT-4
      const chatModelKey = smartModel;
      if (chatModelKey.includes("gpt") || !chatModelKey) {
        return gptDisplayNames[EGptModels.GPT_4];
      }
      return smartModel;
    } else {
      // For regular chat, use the selected model or default
      const model: any = getCookie("model");
      const chatModelKey = selectedModel?.key ?? EModels.GPT_4;
      
      if (chatModelKey == EModels.GPT_3 || chatModelKey == EModels.GPT_4) {
        return gptDisplayNames[EGptModels.GPT_4];
      } else if (selectedModel?.key) {
        return selectedModel?.key;
      }
      return gptDisplayNames[model] || model;
    }
  };

  /**
   * Unified function to send a message to the chat API
   * @param isSmartLLM Whether this is a SmartLLM request
   */
  const sendChatMessage = async (isSmartLLM: boolean): Promise<void> => {
    try {
      // Reset chat stream ID
      setChatStreamId(null);
      
      // Validate subscription
      if (!validateChatSubscription(selectedModel?.key)) {
        return NiceModal.show("subscriptionModal");
      }
      
      // Set generating message state
      setGeneratingMessage(true);
      
      // Create AbortController for this request
      const controller = new AbortController();
      setAbortController(controller);
      
      // Extract web search text
      const webSearchRegex = /@google_search\s*/;
      const webSearchMatch = webSearchRegex.exec(userInput);
      const webSearchText = webSearchMatch?.[0] ?? '';
      const contentToSend = userInput;
      setUserInput(webSearchText);
      
      // Create message objects
      const { userMessage, updatedData } = createMessageObjects(contentToSend);
      setConversationMessages(prevMessages => 
        prepareConversationMessages(prevMessages, userMessage, updatedData)
      );

      setCurrentChat((prev) => {
        if (!prev) return prev;
        const currentFiles = Array.isArray(prev.files) ? prev.files : [];
        if (currentFiles.length === 0) return prev;
        const updatedFiles = currentFiles.map((f) =>
            f && f.processed === false && !f.conversation_id
                ? { ...f, conversation_id: userMessage._id }
                : f
        );
        return { ...prev, files: updatedFiles };
      });
      
      // Determine chat model based on chat type
      const chatModel = determineChatModel(isSmartLLM);
      
      // Generate random ID and set chat stream ID
      const randomId = createRandomId();
      setChatStreamId(randomId);
      
      // Prepare API request
      const apiUrl = `${process.env.NEXT_PUBLIC_API_URL}/conversations`;
      const fileUrls = isSmartLLM ? undefined : files.map((file: UploadedFile) => file.url);
      
      const requestOptions = prepareApiRequest(
        contentToSend, 
        chatModel, 
        isSmartLLM ? EChatType.SMART_LLM : undefined, 
        randomId, 
        fileUrls
      );
      
      // Send request and process response
      const response = await fetch(apiUrl, {
        ...requestOptions,
        signal: controller.signal
      });
      
      // Clear files if using regular chat
      if (!isSmartLLM) {
        setFiles([]);
      }
      
      // Process the API response
      await processApiResponse(
        response, 
        userMessage._id, 
        setConversationMessages,
        randomId,
        setTrialTokenLimit,
        conversationStreamService.unsubscribeFromChatStream
      );
      
      // Clear AbortController after successful completion
      setAbortController(null);
      
    } catch (error) {
      // @ts-ignore
      if (error.name === 'AbortError') {
        console.log('Request was aborted');
        // The handleStopGeneration already handles the UI updates
      } else {
        console.error("Failed to send the message:", error);
      }
      unsubscribeFromStream(chatStreamId, conversationStreamService.unsubscribeFromChatStream);
      setAbortController(null);
    } finally {
      setTimeout(() => {
        setIsLiveSearch(false);
        setGeneratingMessage(false);
      }, 1000);
    }
  };

  // Handler for SmartLLM messages
  const handleSmartLLMSendMessage = async () => {
    await sendChatMessage(true);
  };

  // Handler for regular chat messages
  const handleChatSendMessage = async () => {
    await sendChatMessage(false);
  };

  // Select which message handler to use based on type
  const sendMessageBasedOnType = async (type: string | null, selectedKey: string | null) => {
    if (selectedKey == EChatType.SMART_LLM) {
      await handleSmartLLMSendMessage();
    } else if (selectedModel.key === Elijah.key) {
      await handleElijahSendMessage();
    } else {
      await handleChatSendMessage();
    }
  };

  const handleEdit = (message: IChatMessage, responseId: number) => {
    if (!validateChatSubscription(selectedModel?.key)) {
      return NiceModal.show("subscriptionModal");
    }
    setEditableMessageId(message._id!);
    setEditedMessage(message.content!);
    setEditableMessageResponseIndex(responseId);
  };

  const handleCancel = () => {
    setEditableMessageId(null);
    setEditedMessage("");
    setEditableMessageResponseIndex(0);
  };

  const handleElijahSendMessage = async () => {
    try {
      if (!validateChatSubscription(selectedModel?.key)) {
        return NiceModal.show("subscriptionModal");
      }
      const inputText = userInput.trim();
      setUserInput('');
      setChatStreamId(null);
      setGeneratingMessage(true);

      // Create AbortController for this request
      const controller = new AbortController();
      setAbortController(controller);

      const token = getCookie("token");
      const tempId = Date.now().toString();
      let modelRelativeData: { model: string; _id: string, message: string }[] = [];

      const userMessage = {
        role: "user",
        content: inputText,
        createdAt: new Date().toISOString(),
        _id: tempId,
      };

      const updatedDataArray = elijahModels.map((model: any) => {
        const _id = `loading-${tempId}-${model.key}`;
        modelRelativeData.push({ model: model.key, _id, message: "" });
        return {
          role: "system",
          content: "",
          createdAt: new Date().toISOString(),
          _id,
          model: model.key,
        };
      });

      setConversationMessages(prevConversationMessages => ([
        ...prevConversationMessages,
        userMessage,
        ...updatedDataArray,
      ]));

      const randomId = createRandomId();
      setChatStreamId(randomId);

      const models = elijahModels?.map((model: any) => model.key) ?? [];

      const apiUrl = `${process.env.NEXT_PUBLIC_API_URL}/conversations/elijah`;
      const response: any = await fetch(apiUrl, {
        method: "post",
        headers: {
          Accept: "application/json, text/plain, */*",
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        signal: controller.signal,
        body: JSON.stringify({
          content: inputText,
          chat: currentChat?._id ?? routerId ?? null,
          models,
          userLocalData: {
            date: getFormattedDate(),
          },
          chatStreamId: randomId,
        }),
      });

      const streamData = await processStreamingResponse(response, setFiles);
      if (!streamData) return;
      
      const { reader, decoder } = streamData;

      while (true) {
        const { value, done } = await reader.read();
        if (done) {
          break;
        }

        const decodedChunk = decoder.decode(value, { stream: true });
        const messages = parseStreamData(decodedChunk.toString());
        for (const element of messages) {
          const modelKey = element?.model;
          const content = element?.data;
          console.log('modelKey', modelKey, content)
          if (content && modelKey) {
            console.log("modelRelativeData",modelRelativeData, modelKey, content)
            modelRelativeData = modelRelativeData.map(m => m.model == modelKey ? { ...m, message: m.message + (typeof content === "string" ? content : JSON.stringify(content)) } : m);
          }
        }

        setConversationMessages((prevMessages: ConversationMessage[]) => {
          const updatedMessages = [
            ...conversationMessages,
            userMessage,
            ...updatedDataArray,
          ];

          for (const { model, _id, message } of modelRelativeData) {
            updateMessageWithModelData(updatedMessages, model, _id, message);
          }
          return updatedMessages;
        });
      }
    } catch (error) {
      // @ts-ignore
      if (error.name === 'AbortError') {
        console.log('Elijah request was aborted');
      } else {
        console.error("Error in handleElijahSendMessage:", error);
      }
      unsubscribeFromStream(chatStreamId, conversationStreamService.unsubscribeFromChatStream);
      setAbortController(null);
    } finally {
      setTimeout(() => {
        setGeneratingMessage(false);
      }, 1000);
    }
  };

  const generateSuperResponse = () => {
    const generate = async () => {
      try {
        setUserInput('');
        setChatStreamId(null);
        if (!chatsRemaining || (currentPackage === ISubscriptionType?.FREE && !User.topUpChatTokensCredits)) {
          return NiceModal.show("subscriptionModal");
        }
        setGeneratingMessage(true);

        // Create AbortController for this request
        const controller = new AbortController();
        setAbortController(controller);

        const token = getCookie("token");
        const tempId = Date.now().toString();
        let messageStr = "";
        const updatedData = {
          role: "system",
          content: messageStr,
          createdAt: new Date().toISOString(),
          isSuperResponse: true,
          _id: `loading-${tempId}`,
        };

        setConversationMessages([
          ...conversationMessages,
          updatedData,
        ]);

        const randomId = createRandomId();
        setChatStreamId(randomId);

        const apiUrl = `${process.env.NEXT_PUBLIC_API_URL}/conversations/super-response`;
        const response: any = await fetch(apiUrl, {
          method: "post",
          headers: {
            Accept: "application/json, text/plain, */*",
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          signal: controller.signal,
          body: JSON.stringify({
            chat: currentChat?._id ?? routerId ?? null,
            userLocalData: {
              date: getFormattedDate(),
            },
            chatStreamId: randomId,
          }),
        });

        const streamData = await processStreamingResponse(response, setFiles);
        if (!streamData) return;
        
        const { reader, decoder } = streamData;

        while (true) {
          const { value, done } = await reader.read();
          if (done) {
            break;
          }

          const decodedChunk = decoder.decode(value, { stream: true });
          const messages = convertStringToObject(decodedChunk.toString());

          for (const element of messages) {
              messageStr += element.data;
          }

          setConversationMessages((prevMessages: ConversationMessage[]) => {
            const updatedMessages = [...prevMessages];
            const lastMessageIndex = updatedMessages.length - 1;

            updatedMessages[lastMessageIndex] = {
              citations: updatedMessages[lastMessageIndex]?.citations,
              role: "system",
              content: messageStr,
              createdAt: new Date().toISOString(),
              isSuperResponse: true,
              _id: `loading-${tempId}`,
            };

            return updatedMessages;
          });
        }
      } catch (error) {
        // @ts-ignore
        if (error.name === 'AbortError') {
          console.log('Super response request was aborted');
        } else {
          console.error("Failed to send the message:", error);
        }
        unsubscribeFromStream(chatStreamId, conversationStreamService.unsubscribeFromChatStream);
        setAbortController(null);
      } finally {
        setTimeout(() => {
          setGeneratingMessage(false);
        }, 1000);
      }
    };
    
    generate();
  }


  const handleRegenerateMessage = (index: number) => {
    if (!validateChatSubscription(selectedModel?.key)) {
      return NiceModal.show("subscriptionModal");
    }
    setMessageIndex(index);
    setIndexedChatStreamId(null);
    const message = conversationMessages[index - 1];
    setRegeneratingMessageId(message?._id);
    setGeneratingMessage(true);
    
    const regenerate = async () => {
      try {
        await regenerateMessage(index, message);
      } catch (error) {
        // @ts-ignore
        if (error.name === 'AbortError') {
          console.log('Regenerate request was aborted');
        } else {
          console.error("Failed to send the message:", error);
        }
        setRegeneratingMessageId(null);
        unsubscribeFromStream(chatStreamId, conversationStreamService.unsubscribeFromChatStream);
        setAbortController(null);
      } finally {
        setTimeout(() => {
          setGeneratingMessage(false);
        }, 2000);
        setRegeneratingMessageId(null);
      }
    };
    
    regenerate();
  };

  /**
   * Regenerates a message with updated content
   * @param index The index of the message to regenerate
   * @param message The message to regenerate
   */
  const regenerateMessage = async (index: number, message: ConversationMessage) => {
    let messageStr = "";
    const model: any = getCookie("model");
    const apiUrl = `${process.env.NEXT_PUBLIC_API_URL}/conversations/regenerate`;
    
    // Generate unique ID for streaming
    const randomId = createRandomId();
    setIndexedChatStreamId(randomId);
    
    // Create AbortController for this request
    const controller = new AbortController();
    setAbortController(controller);
    
    // Build the payload
    const payload: any = {
      chat: currentChat?._id ?? routerId ?? null,
      conversation: message._id,
      model: gptDisplayNames[model] || model,
      chatStreamId: randomId,
    };
    
    // Add chat type if needed
    const queryString = globalThis.window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const type = urlParams.get('type');
    if (type && type == EChatType.PDF_CHAT) {
      payload.chatType = EChatType.PDF_CHAT;
    }

    // Prepare request options
    const token = getCookie("token");
    const requestOptions = {
      method: "post",
      headers: {
        Accept: "application/json, text/plain, */*",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(payload),
    };

    // Send request and process response
    const response: any = await fetch(apiUrl, {
      ...requestOptions,
      signal: controller.signal
    });
    await processResponse(response, index, messageStr);
  };

  /**
   * Processes a streaming response and updates the conversation with the results
   * @param response The response to process
   * @param index The index of the message to update
   * @param messageStr The current message string
   */
  const processResponse = async (response: any, index: number, messageStr: string) => {
    // Get reader from response body
    const reader = response.body.getReader();
    const decoder = new TextDecoder("utf-8");
    
    try {
      // Process chunks until done
      while (true) {
        const { value, done } = await reader.read();
        if (done) break;
        
        // Decode the chunk and convert to object
        const decodedChunk = decoder.decode(value, { stream: true });
        const messages = convertStringToObject(decodedChunk.toString());

        // Process each message element
        for (const element of messages) {
          messageStr = processMessage(element, messageStr);
        }
        
        // Update the conversation with the current message state
        updateConversationMessages(index, messageStr);
      }
    } catch (error) {
      console.error("Error processing response stream:", error);
      
      // Update with error message
      messageStr += "<strong>Error: Failed to process response.</strong>";
      updateConversationMessages(index, messageStr);
    }
  };

  /**
   * Processes a message element and extracts any error information
   * @param element The message element to process
   * @param messageStr The current message string
   * @returns The updated message string
   */
  const processMessage = (element: any, messageStr: string): string => {
    // Extract error content if present
    const { errorContent, errorSource } = extractErrorContent(element);
    
    if (errorContent) {
      // Format the error message differently based on source and current message content
      const formattedMessage = formatErrorMessage(errorContent, messageStr, errorSource);
      
      // Unsubscribe from chat stream for error cases
      unsubscribeFromStream(chatStreamId, conversationStreamService.unsubscribeFromChatStream);
      
      return formattedMessage;
    } 
    
    // If no error but we have data, append it
    if (!element?.data?.response && element?.data) {
      return messageStr + element.data;
    }
    
    // No changes to message string
    return messageStr;
  };

  // extractErrorContent function is now defined at the top level

  /**
   * Formats an error message based on the error source and existing message
   * @param errorContent The error content to format
   * @param messageStr The current message string
   * @param errorSource The source of the error
   * @returns The formatted error message
   */
  const formatErrorMessage = (errorContent: string, messageStr: string, errorSource: string | null): string => {
    const formattedError = `<strong>Message:${errorContent}</strong>`;
    
    // Add separator and formatted error if we have existing content
    if ((errorSource === 'response' || errorSource === 'errorDirect') && messageStr.length > 0) {
      return messageStr + "...." + `<br /><br />${formattedError}`;
    } 
    
    // For nested errors or empty messageStr with direct errors
    return formattedError;
  };

  const updateConversationMessages = (index: number, messageStr: string) => {
    setConversationMessages((prevMessages: ConversationMessage[]) => {
      const updatedMessages = [...prevMessages];
      if (updatedMessages[index]) {
        updatedMessages[index].content = messageStr;
        updatedMessages[index].chatEvent = "";
      }
      return updatedMessages;
    });
  };

  const prepareMessageState = () => {
    const index = editableMessageResponseIndex + 1;
    setMessageIndex(index);
    setIndexedChatStreamId(null);
    setRegeneratingMessageId(editableMessageId);

    setConversationMessages(prevMessages => {
      const updatedMessages = [...prevMessages];
      updatedMessages[index - 1].content = editedMessage;
      return updatedMessages;
    });

    // If the first user message is edited, update chat title on server and local state
    if (editableMessageResponseIndex === 0) {
      const newTitle = editedMessage?.trim() ?? "";
      const chatIdToMatch = currentChat?._id ?? routerId ?? "";

      if (chatIdToMatch) {
        chatService.updateChatById(chatIdToMatch, { chat: chatIdToMatch, title: newTitle })
          .catch(error => {
            console.error("Failed to update chat title:", error);
          });
      }

      if (currentChat) {
        setCurrentChat({ ...currentChat, title: newTitle });
      }
      if (chatMessages) {
        const updatedChats = chatMessages.map((c: Chat) =>
          c._id === chatIdToMatch ? ({ ...c, title: newTitle } as Chat) : c
        );
        setChatMessages(updatedChats);
      }
    }
  };

  const buildPayload = (): Payload => {
    const model = getCookie("model") ?? "defaultModel";
    const randomId = createRandomId();
    setIndexedChatStreamId(randomId);

    const queryString = globalThis.window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const type = urlParams.get("type");

    const payload: Payload = {
      chat: currentChat?._id ?? routerId ?? null,
      conversation: editableMessageId ?? "",
      content: editedMessage,
      model: gptDisplayNames[model] || model,
      chatStreamId: randomId,
      isLiveSearch: isLiveSearch,
      ...(type === EChatType.PDF_CHAT && { chatType: EChatType.PDF_CHAT }),
    };

    // If editing the first user message, include the updated title for server-side persistence
    if (editableMessageResponseIndex === 0) {
      payload.title = editedMessage?.trim() ?? "";
    }

    return payload;
  };

  const sendMessage = async (payload: Payload) => {
    const apiUrl = `${process.env.NEXT_PUBLIC_API_URL}/conversations`;
    const token = getCookie("token") ?? "";
    return fetch(apiUrl, {
      method: "put",
      headers: {
        Accept: "application/json, text/plain, */*",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(payload),
    });
  };

  const handleApiResponse = async (response: Response) => {
    setEditableMessageId(null);
    if (!response.body) {
      throw new Error("Response body is null");
    }

    const reader = response.body.getReader();
    const decoder = new TextDecoder("utf-8");
    let messageStr = "";

    while (true) {
      const { value, done } = await reader.read();
      if (done) break;

      messageStr += decodeAndHandleChunk(decoder, value);
      updateConversationMessage(messageStr);
    }
  };

  const decodeAndHandleChunk = (decoder: TextDecoder, value: Uint8Array) => {
    const decodedChunk = decoder.decode(value, { stream: true });
    const messages = convertStringToObject(decodedChunk);
    return messages.map(parseMessage).join("");
  };

  const parseMessage = (element: Record<string, any>): string => {
    const { errorContent } = extractErrorContent(element);

    if (errorContent) {
      unsubscribeChatStream();
      return formatErrorMessage(errorContent, '', null);
    }

    return element?.data?.response ? "" : element.data;
  };


  const unsubscribeChatStream = () => {
    unsubscribeFromStream(chatStreamId, conversationStreamService.unsubscribeFromChatStream);
  };

  const updateConversationMessage = (messageStr: string) => {
    setConversationMessages(prevMessages => {
      const updatedMessages = [...prevMessages];
      updatedMessages[editableMessageResponseIndex + 1].content = messageStr;
      updatedMessages[editableMessageResponseIndex + 1].chatEvent = "";
      return updatedMessages;
    });
  };

  const handleError = (error: unknown) => {
    console.error("Failed to send the message:", error);
    unsubscribeChatStream();
    setRegeneratingMessageId(null);
  };

  const resetMessageState = () => {
    setEditableMessageId(null);
    setRegeneratingMessageId(null);
    setEditableMessageResponseIndex(0);
    setTimeout(() => setGeneratingMessage(false), 2000);
  };

  useEffect(() => {
    if (indexedChatStreamId && messageIndex) {
      conversationStreamService.subscribeToChatStream(indexedChatStreamId, (data) => {
        if (data?.citations) {
          setConversationMessages((prevMessages: ConversationMessage[]) => {
            const updatedMessages = [...prevMessages];
            updatedMessages[messageIndex].citations = data?.citations;
            return updatedMessages;
          });
        }

        if (data?.chatEvent) {
          setConversationMessages((prevMessages: ConversationMessage[]) => {
            const updatedMessages = [...prevMessages];
            updatedMessages[messageIndex].chatEvent = data?.chatEvent;
            return updatedMessages;
          });
        }

        if (data?.finalizedData) {
          const responseContent = data.finalizedData.response;

          setConversationMessages((prevMessages: ConversationMessage[]) => {
            const updatedMessages = [...prevMessages];
            updatedMessages[messageIndex].content = responseContent.content;
            return updatedMessages;
          });
          setRegeneratingMessageId(null);
        }
      });
    }
  }, [indexedChatStreamId])

  return (
    <ChatBootLayout
      toggleSidebar={toggleSidebar}
      setToggleSidebar={setToggleSidebar}
      setSwitchSidebar={setSwitchSidebar}
      switchSidebar={switchSidebar}
      setSwitchSmallSidebar={setSwitchSmallSidebar}
      switchSmallSidebar={switchSmallSidebar}
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
          generateSuperResponse,
        })}
      />
    </ChatBootLayout>
  );
};

export default ChatModule;