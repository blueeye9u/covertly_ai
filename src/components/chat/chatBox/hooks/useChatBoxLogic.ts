import { useState, useEffect, useMemo, useCallback } from "react";
import { useRouter } from "next/router";
import { toast } from "react-hot-toast";
import { useConversation } from "../../../../context/conversation.context";
import { Chat_Model_data, ChatGPTDisplay } from "../../../../constants/chat-models-data";
import { EGptModels } from "../../../../enums/gpt-models.enum";
import { EChatTypes, EModels } from "../../../../enums/modals.enum";
import { SuggestionData } from "../../../../constants/suggestion-data";
import { HttpService } from "../../../../services/base.service";
import { promptEnhancerService } from "../../../../services/prompt-enhancer.service";

export const useChatBoxLogic = (props: any) => {
  const { setUserInput, userInput, handleSendMessage, conversationMessages } = props;
  const router = useRouter();
  
  const {
    changeChatLoading,
    startChatLoading,
    selected,
    setSelected,
    generatingMessage,
    selectedModel,
    setSelectedTabIdx,
    deleteChatLoading,
    selectedModelLoading,
    generatingPDFChats,
    followUpQuestions,
    llmSuggestions,
    setSmartModel,
    isLiveSearch,
    setIsLiveSearch,
    setSelectedModel,
    setConversationMessages,
    setCurrentChat,
    setCurrentChatId,
    setRouterId
  } = useConversation();

  // State management
  const [hasQueryParam, setHasQueryParam] = useState(false);
  const [hasNoChatId, setHasNoChatId] = useState(false);
  const [isSend, setIsSend] = useState(false);
  const [uploadedFile] = useState<File | null>(null);
  const [previewURL, setPreviewURL] = useState<string | null>(null);
  const [dragging, setDragging] = useState(false);
  const [randomSuggestions, setRandomSuggestions]: any[] = useState([]);
  const [windowHeight, setWindowHeight] = useState(globalThis.window === undefined ? 0 : globalThis.window.innerHeight);
  const [currentModel, setCurrentModel] = useState<any>({});
  const [improving, setImproving] = useState<boolean>(false);
  const [wasPromptImproved, setWasPromptImproved] = useState<boolean>(false);
  const [lastImprovedPrompt, setLastImprovedPrompt] = useState<string>("");
  const [translating, setTranslating] = useState<boolean>(false);
  const [sourcesVisibility, setSourcesVisibility] = useState<{[key: string]: boolean}>({});

  // Computed values
  const isAnyLoading = deleteChatLoading || props.fetchingData || selectedModelLoading || generatingMessage || changeChatLoading || startChatLoading || generatingPDFChats;
  
  const isDeepSearch = useMemo(() => {
    return router.pathname === '/deep-search';
  }, [router.pathname]);

  // Event handlers
  const handleSelectChat = useCallback((val: any) => {
    const textarea = document.getElementById("auto-resize-textarea");
    if (textarea) {
      //@ts-ignore
      textarea.focus();
    }
    setSmartModel("");
    setSelected(val);
    setSelectedModel(val);
    setSelectedTabIdx(0);
    setIsLiveSearch(false);
    HttpService.setCookie("model", val?.key ?? EGptModels.GPT_4);
  }, [setSmartModel, setSelected, setSelectedModel, setSelectedTabIdx, setIsLiveSearch]);

  const mainScreenHandler = useCallback(() => {
    setUserInput("");
    setSelected("");
    setSelectedModel("");
    // Hard reset chat view state so Back always works even if URL doesn't change
    setConversationMessages([]);
    setCurrentChat(null);
    setCurrentChatId("");
    setRouterId("");
    
    if (isDeepSearch) {
      router.replace('/deep-search', undefined as any, { shallow: true });
    } else {
      HttpService.setCookie("model", EGptModels.GPT_4);
      router.replace('/chat', undefined as any, { shallow: true });
    }
  }, [setUserInput, setSelected, setSelectedModel, setConversationMessages, setCurrentChat, setCurrentChatId, setRouterId, isDeepSearch, router, generatingMessage]);

  const handleQuestionClick = useCallback((question: string) => {
    setUserInput(question);
    setIsSend(true);
  }, [setUserInput]);

  const getSuggestedLLM = useCallback((key: string) => {
    if (key === EModels.GPT_3) {
      return Chat_Model_data.find((item) => item.key === EChatTypes.SMART_LLM);
    }
    return Chat_Model_data.find((item) => item.key === key);
  }, []);

  const handleClickLLMSuggestion = useCallback((modelKey: any) => {
    if (modelKey) {
      setSmartModel(modelKey);
      handleSendMessage();
    }
    setUserInput(conversationMessages?.length > 0 ? conversationMessages[conversationMessages?.length - 2]?.content : "");
    setIsSend(true);
  }, [setSmartModel, handleSendMessage, setUserInput, conversationMessages]);

  const handleToggleSources = useCallback((messageId: string, show: boolean) => {
    setSourcesVisibility(prev => ({
      ...prev,
      [messageId]: show
    }));
  }, []);

  useEffect(() => {
    if (!isDeepSearch || conversationMessages.length === 0) return;
    
    const deepSearchMessageIds = conversationMessages
      .filter((msg: any) => msg.model === EModels.DEEP_SEARCH)
      .map((msg: any) => msg._id);
    
    if (deepSearchMessageIds.length === 0) return;
    
    setSourcesVisibility(prev => {
      const newVisibility = deepSearchMessageIds.reduce((acc: {[key: string]: boolean}, messageId: string) => {
        if (prev[messageId] === undefined) {
          acc[messageId] = true;
        }
        return acc;
      }, {});
      
      return Object.keys(newVisibility).length > 0 ? { ...prev, ...newVisibility } : prev;
    });
  }, [isDeepSearch, conversationMessages]);

  const handleImprovePrompt = useCallback(async () => {
    try {
      if (!userInput.trim()) {
        toast.error("Please enter some text to improve");
        return;
      }

      if (wasPromptImproved && userInput === lastImprovedPrompt) {
        toast.error("This prompt has already been improved. Please modify the prompt to improve it again.");
        return;
      }

      setImproving(true);
      const res = await promptEnhancerService.improvePrompt({ prompt: userInput });
      if (res?.payload?.improvedPrompt) {
        setUserInput(res.payload.improvedPrompt);
        setWasPromptImproved(true);
        setLastImprovedPrompt(res.payload.improvedPrompt);
        toast.success("Prompt improved successfully!");
      } else {
        toast.error("Failed to improve prompt");
      }
    } catch (error) {
      console.error("Error improving prompt:", error);
      toast.error("Failed to improve prompt. Please try again.");
    } finally {
      setImproving(false);
    }
  }, [userInput, setUserInput, wasPromptImproved, lastImprovedPrompt]);

  useEffect(() => {
    if (wasPromptImproved && userInput !== lastImprovedPrompt) {
      setWasPromptImproved(false);
    }
  }, [userInput, wasPromptImproved, lastImprovedPrompt]);

  const getRandomSuggestions = useCallback((data: any, count: any) => {
    if (!data) return [];
    const shuffled = [...data].sort(() => Math.random() - 0.5);
    return shuffled.slice(0, count);
  }, []);

  // Effects
  useEffect(() => {
    if (globalThis.window !== undefined) {
      const idParam = new URL(globalThis.window.location.toString()).searchParams.get('id');
      setHasQueryParam(!!idParam);
    }
  }, []);

  useEffect(() => {
    const urlParams = new URLSearchParams(router.asPath.split('?')[1]);
    const id = urlParams.get('id');
    if (!id && selected) {
      setHasNoChatId(true);
      setRandomSuggestions(getRandomSuggestions(SuggestionData[selectedModel.key as keyof typeof SuggestionData], 3));
    }

    return () => {
      setHasNoChatId(false);
      setRandomSuggestions([]);
    };
  }, [router.asPath, selected, selectedModel.key, getRandomSuggestions]);

  useEffect(() => {
    if (isSend) {
      handleSendMessage();
      setIsSend(false);
    }
  }, [isSend, handleSendMessage]);

  useEffect(() => {
    if (selected?.name) {
      setCurrentModel(selected);
    } else {
      setCurrentModel(ChatGPTDisplay);
    }
  }, [selected]);

  useEffect(() => {
    const handleResize = () => {
      setWindowHeight(window.innerHeight);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return {
    // State
    hasQueryParam,
    hasNoChatId,
    uploadedFile,
    previewURL,
    setPreviewURL,
    dragging,
    setDragging,
    randomSuggestions,
    windowHeight,
    currentModel,
    improving,
    wasPromptImproved,
    translating,
    setTranslating,
    sourcesVisibility,
    
    // Computed
    isAnyLoading,
    isDeepSearch,
    
    // Handlers
    handleSelectChat,
    mainScreenHandler,
    handleQuestionClick,
    getSuggestedLLM,
    handleClickLLMSuggestion,
    handleToggleSources,
    handleImprovePrompt,
    
    // Context values
    followUpQuestions,
    llmSuggestions,
    isLiveSearch,
    setIsLiveSearch,
    selected
  };
};