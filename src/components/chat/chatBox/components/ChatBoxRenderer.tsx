import React from "react";
import { Button } from "../../../global/button/Button";
import ImageComponent from "../../../global/imageComponent/ImageComponent";
import { EChatTypes, EModels } from '../../../../enums/modals.enum';
import { ChatGPTDisplay } from '../../../../constants/chat-models-data';
import { getModelImage } from '../../../../utils/chatUtils';
import { useTheme } from '../../../../context/themeContext';

interface ChatBoxRendererProps {
  currentChat: any;
  conversationMessages: any[];
  selectedModel: any;
  fetchingData: boolean;
  generateSuperResponse: () => void;
  getSuggestedLLM: (key: string) => any;
  handleClickLLMSuggestion: (modelKey: any) => void;
  llmSuggestions: any[];
  smartModel?: string;
}

// Extract Super Response Section
const SuperResponseSection = ({ selectedModel, fetchingData, conversationMessages, generateSuperResponse }: any) => {
  const shouldShowSuperResponse = 
    selectedModel?.key === EModels.ELIJAH && 
    !fetchingData && 
    conversationMessages?.length > 2 && 
    conversationMessages[conversationMessages?.length - 1]?.role === "system" && 
    !conversationMessages[conversationMessages?.length - 1]?.isSuperResponse;

  if (!shouldShowSuperResponse) return null;

  return (
    <div className='generate_Super p-4 rounded-lg flex sm:flex-row flex-col justify-between gap-4 sm:gap-10'>
      <p className='max-w-[449px] dark:text-white'>
        Get a unified response that synthesizes the strengths of all selected models in one click.
      </p>
      <Button size='lg' className='!flex-none' onClick={generateSuperResponse}>
        Generate Super Response
      </Button>
    </div>
  );
};

const CurrentModelSection = ({ fetchingData, currentChat, getSuggestedLLM, smartModel }: any) => {
  const { isDarkMode } = useTheme();
  
  const shouldShowCurrentModel = 
    !fetchingData && 
    currentChat?.chatType === "smart-llm" && 
    currentChat?.model;

  if (!shouldShowCurrentModel) return null;

  const suggestedModel = (() => {
    if (currentChat?.chatType === EChatTypes.SMART_LLM) {
      const model = smartModel ? getSuggestedLLM(smartModel) : null;
      return model || ChatGPTDisplay;
    }
    return getSuggestedLLM(currentChat?.model) || ChatGPTDisplay;
  })();

  return (
    <div className="max-w-[400px]">
      <p className="mb-4 text-[#31B8CA]">Current model</p>
      <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-3 w-full">
        <div className="flex gap-3 items-center p-3 rounded-lg hover:opacity-85 transition-all duration-300 border border-linkWater dark:border-blackRussian3">
          <ImageComponent 
            src={getModelImage(suggestedModel, isDarkMode)} 
            height={25} 
            width={25}
            figClassName="shrink-0" 
            className="rounded-md"
            alt="chat"
          />
          <p className="fs-14">{suggestedModel?.name}</p>
        </div>
      </div>
    </div>
  );
};

// Extract LLM Suggestions Section
const LLMSuggestionsSection = ({ fetchingData, conversationMessages, llmSuggestions, getSuggestedLLM, handleClickLLMSuggestion, currentChat }: any) => {
  const { isDarkMode } = useTheme();
  
  const shouldShowSuggestions = 
    !fetchingData && 
    conversationMessages?.length > 0 && 
    llmSuggestions && 
    llmSuggestions?.length > 0;

  if (!shouldShowSuggestions) return null;

  // Filter out the current model from suggestions
  const currentModelKey = currentChat?.model;
  const filteredSuggestions = llmSuggestions.filter((suggestion: any) => {
    const suggestedModel = getSuggestedLLM(suggestion);
    return suggestedModel?.key !== currentModelKey;
  });

  // Don't show the section if there are no other models to suggest
  if (filteredSuggestions.length === 0) return null;

  return (
    <div className="max-w-[400px]">
      <p className="mb-4 text-[#31B8CA]">Boost your results with</p>
      <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-3 w-full">
        {filteredSuggestions.map((q: any) => {
          const suggestionKey = getSuggestedLLM(q)?.key ?? q;
          const suggestedModel = getSuggestedLLM(q);
          
          return (
            <button
              key={suggestionKey}
              className="flex gap-3 items-center p-3 rounded-lg hover:opacity-85 transition-all duration-300 border border-linkWater dark:border-blackRussian3 cursor-pointer"
              onClick={() => handleClickLLMSuggestion(suggestedModel?.key)}
            >
              <ImageComponent 
                src={getModelImage(suggestedModel, isDarkMode)} 
                height={25} 
                width={25}
                figClassName="shrink-0" 
                className="rounded-md"
                alt="chat"
              />
              <p className="fs-14">{suggestedModel?.name}</p>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export const ChatBoxRenderer: React.FC<ChatBoxRendererProps> = ({
  currentChat,
  conversationMessages,
  selectedModel,
  fetchingData,
  generateSuperResponse,
  getSuggestedLLM,
  handleClickLLMSuggestion,
  llmSuggestions,
  smartModel
}) => {
  return (
    <>
      <SuperResponseSection 
        selectedModel={selectedModel}
        fetchingData={fetchingData}
        conversationMessages={conversationMessages}
        generateSuperResponse={generateSuperResponse}
      />
      
      <CurrentModelSection 
        fetchingData={fetchingData}
        currentChat={currentChat}
        getSuggestedLLM={getSuggestedLLM}
        smartModel={smartModel}
      />
      
      <LLMSuggestionsSection 
        fetchingData={fetchingData}
        conversationMessages={conversationMessages}
        llmSuggestions={llmSuggestions}
        getSuggestedLLM={getSuggestedLLM}
        handleClickLLMSuggestion={handleClickLLMSuggestion}
        currentChat={currentChat}
      />
    </>
  );
};