import { createContext, useContext, useState, ReactNode, useCallback, useMemo } from "react";
import useLoggedInUser from "../hooks/useLoggedInUser";

export interface Citations {
  query: string;
  responseTime: number;
  images: { url: string }[];
  results: {
    title: string;
    url: string;
    content: string;
    score: number;
    publishedDate: string;
    favicon: string;
  }[];
  answer: any;
};

/**
 * Represents a conversation message.
 * @typedef {object} ConversationMessage
 * @property {string} [role] - The role of the message.
 * @property {string} [content] - The content of the message.
 * @property {string} [creator] - The creator of the message.
 * @property {string} [createdAt] - The creation date of the message.
 * @property {string} _id - The unique identifier of the message.
 */
export interface ConversationMessage {
  showResources?: boolean;
  chatEvent?: string;
  citations?: Citations;
  role?: string;
  content?: string;
  creator?: string;
  createdAt?: string;
  isSuperResponse?: boolean;
  _id: string;
  // Deep Research properties
  chatType?: string;
  isLoading?: boolean;
  searchStatus?: 'idle' | 'planning' | 'researching' | 'analyzing' | 'generating' | 'completed' | 'error';
  searchProgress?: {
    currentStep?: string;
    totalSteps?: number;
    currentStepNumber?: number;
    estimatedTimeRemaining?: string;
    sourcesFound?: number;
    pagesAnalyzed?: number;
  };
  metadata?: {
    chainOfThought?: any;
    totalSources?: number;
    processingTime?: number;
    creditsUsed?: number;
    pdfUrl?: string;
  };
  error?: string;
  chat?: string;
  user?: string;
  model?: string;
  updatedAt?: string;
}

/**
 * Represents a chat.
 * @typedef {object} Chat
 * @property {string} _id - The unique identifier of the chat.
 * @property {ConversationMessage[]} messages - The messages associated with the chat.
 * @property {string} creator - The creator of the chat.
 * @property {string} [model] - The model associated with the chat.
 * @property {string} title - The title of the chat.
 * @property {string} role - The role of the chat.
 */
export interface Chat {
  createdAt: any;
  _id: string;
  messages: ConversationMessage[];
  creator: string;
  model?: string;
  title: string;
  role: string;
  date: any;
  chatType?: string;
  elijahModels?: string[];
  files?: UploadedFile[];
}

export interface UploadedFile {
  _id?: string;
  id: string;
  name: string;
  size: number;
  url: string;
  // Optional properties returned by backend for uploaded files
  originalName?: string;
  type?: string;
  conversation_id?: string;
  processed?: boolean;
  readable?: boolean;
  createdAt?: string;
  updatedAt?: string;
}

/**
 * Represents the context type for conversation-related data.
 * @interface ConversationContextType
 */
interface ConversationContextType {
  conversationMessages: ConversationMessage[];
  setConversationMessages: React.Dispatch<
    React.SetStateAction<ConversationMessage[]>
  >;
  elijahModels: string[];
  setElijahModels: React.Dispatch<React.SetStateAction<string[]>>;
  followUpQuestions: string[];
  setFollowUpQuestions: React.Dispatch<React.SetStateAction<string[]>>;
  llmSuggestions: string[];
  setLLMSuggestions: React.Dispatch<React.SetStateAction<string[]>>;
  smartModel: string;
  setSmartModel: React.Dispatch<React.SetStateAction<string>>;
  currentChat: Chat | null;
  setCurrentChat: React.Dispatch<React.SetStateAction<Chat | null>>;
  fetchingData: boolean;
  setFetchingData: (status: boolean) => void;
  deleteChatLoading: boolean;
  setDeleteChatLoading: (status: boolean) => void;
  selectedModelLoading: boolean;
  setSelectedModelLoading: (status: boolean) => void;
  generatingMessage: boolean;
  setGeneratingMessage: (status: boolean) => void;
  setChatMessages: (chat: Chat[] | null) => void;
  chatMessages: Chat[] | null;
  setSearchChat: (value: string) => void;
  searchChat: string;
  setCurrentChatId: (value: string) => void;
  currentChatId: string;
  setSelectedModel: (value: any) => void;
  selectedModel: any;
  setRouterId: (value: string) => void;
  routerId: string;
  setChangeChatLoading: (status: boolean) => void;
  changeChatLoading: boolean;

  setStartChatLoading: (status: boolean) => void;
  startChatLoading: boolean;
  setTrialTokenLimit: (status: boolean) => void;
  trialTokenLimit: boolean;
  setSelectedTabIdx: (status: number) => void;
  selectedTabIdx: number;
  handleCheckLimit: () => boolean;
  selected: any;
  setSelected: any;

  setFiles: (value: any) => void;
  files: any;

  generatingPDFChats: boolean;
  setGeneratingPDFChats: (status: boolean) => void;

  isFileUploading: boolean;
  setIsFileUploading: (value: any) => void;

  isLiveSearch: boolean;
  setIsLiveSearch: (value: boolean) => void;

  userInput: string;
  setUserInput: (value: string) => void;
  resetUserInput: () => void;
}

/**
 * Context for managing conversation-related data.
 * @type {React.Context<ConversationContextType | undefined>}
 */
const ConversationContext = createContext<ConversationContextType | undefined>(
  undefined
);

/**
 * Custom hook to access conversation context.
 * @returns {ConversationContextType} The conversation context.
 */
export const useConversation = (): ConversationContextType => {
  const context = useContext(ConversationContext);
  if (!context) {
    throw new Error(
      "useConversation must be used within a ConversationProvider"
    );
  }
  return context;
};

/**
 * Provider component for managing conversation-related data.
 * @param {object} props - Component properties.
 * @param {React.ReactNode} props.children - The children elements.
 * @returns {JSX.Element} The conversation provider component.
 */
export const ConversationProvider = ({ children }: { children: ReactNode }) => {
  const [elijahModels, setElijahModels] = useState<string[]>([]);
  const [conversationMessages, setConversationMessages] = useState<ConversationMessage[]>([]);
  const [followUpQuestions, setFollowUpQuestions] = useState<string[]>([]);
  const [smartModel, setSmartModel] = useState<string>("");
  const [llmSuggestions, setLLMSuggestions] = useState<string[]>([]);
  const [currentChat, setCurrentChat] = useState<Chat | null>(null);
  const [fetchingData, setFetchingData] = useState<boolean>(false);
  const [deleteChatLoading, setDeleteChatLoading] = useState<boolean>(false);
  const [changeChatLoading, setChangeChatLoading] = useState<boolean>(false);
  const [startChatLoading, setStartChatLoading] = useState<boolean>(false);
  const [selectedTabIdx, setSelectedTabIdx] = useState(0);
  const [trialTokenLimit, setTrialTokenLimit] = useState(false);
  const [selected, setSelected] = useState<any>();

  const [searchChat, setSearchChat] = useState<string>("");
  const [currentChatId, setCurrentChatId] = useState<string>("");
  const [selectedModel, setSelectedModel] = useState<any>("");
  const [selectedModelLoading, setSelectedModelLoading] = useState<boolean>(false);
  const [generatingMessage, setGeneratingMessage] = useState<boolean>(false);
  const [generatingPDFChats, setGeneratingPDFChats] = useState<boolean>(false);
  const [chatMessages, setChatMessages] = useState<Chat[] | null>(null);
  const [routerId, setRouterId] = useState("");
  const [User]: any = useLoggedInUser();
  const [files, setFiles] = useState<any[]>([]);
  const [isFileUploading, setIsFileUploading] = useState<boolean>(false);
  const [isLiveSearch, setIsLiveSearch] = useState<boolean>(false);
  
  const [userInput, setUserInput] = useState<string>("");
  
  const handleCheckLimit = useCallback(() => {
    return false;
  }, [User]);

  const resetUserInput = useCallback(() => {
    setUserInput("");
  }, []);

  const value: ConversationContextType = useMemo(() => ({
    elijahModels,
    setElijahModels,
    conversationMessages,
    setConversationMessages,
    followUpQuestions,
    setFollowUpQuestions,
    smartModel,
    setSmartModel,
    llmSuggestions,
    setLLMSuggestions,
    currentChat,
    setCurrentChat,
    fetchingData,
    setFetchingData,
    setChatMessages,
    chatMessages,
    setSearchChat,
    searchChat,
    setCurrentChatId,
    currentChatId,
    setSelectedModel,
    selectedModel,
    setSelectedModelLoading,
    selectedModelLoading,
    setGeneratingMessage,
    generatingMessage,
    deleteChatLoading,
    setDeleteChatLoading,
    setChangeChatLoading,
    changeChatLoading,
    setRouterId,
    routerId,
    setStartChatLoading,
    startChatLoading,
    selectedTabIdx,
    setSelectedTabIdx,
    handleCheckLimit,
    setTrialTokenLimit,
    trialTokenLimit,
    selected,
    setSelected,
    files,
    setFiles,
    generatingPDFChats,
    setGeneratingPDFChats,
    isFileUploading,
    setIsFileUploading,
    isLiveSearch,
    setIsLiveSearch,
    userInput,
    setUserInput,
    resetUserInput
  }), [
    elijahModels,
    setElijahModels,
    conversationMessages,
    followUpQuestions,
    smartModel,
    llmSuggestions,
    currentChat,
    fetchingData,
    chatMessages,
    searchChat,
    currentChatId,
    selectedModel,
    selectedModelLoading,
    generatingMessage,
    deleteChatLoading,
    changeChatLoading,
    routerId,
    startChatLoading,
    selectedTabIdx,
    trialTokenLimit,
    selected,
    files,
    generatingPDFChats,
    isFileUploading,
    setIsFileUploading,
    isLiveSearch,
    setIsLiveSearch,
    userInput,
    resetUserInput
  ]);

  return (
    <ConversationContext.Provider value={value}>
      {children}
    </ConversationContext.Provider>
  );
};
