import React from "react";
import { RxCross2 } from "react-icons/rx";
import { ImSpinner9 } from "react-icons/im";
import { GoGlobe } from "react-icons/go";
import Image from "next/image";
import AutoResizeTextarea from "../../../AutoResizeTextarea";
import { ChatSendIcon, PlusIcon } from "../../../../svgs/svg";
import CommonTooltip from "../../../ComonTooltip";
import TranslateComponent from "../../../TranslateDropdown";
import { MAX_INPUT_LENGTH } from "../../../../constants/input-limits";
import { EModels } from "../../../../enums/modals.enum";
import { MAX_UPLOAD_FILES } from "../../../../utils/fileUploadUtils";
import { Chat_Models_Display_data } from "../../../../constants/chat-models-data";
import NiceModal from '@ebay/nice-modal-react';

interface ChatBoxContentProps {
  currentModel: any;
  handleUploadModal: (modalName: string) => void;
  userInput: string;
  setUserInput: (value: string) => void;
  handleInputChange?: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
  handleInputKeyDown?: (event: React.KeyboardEvent<HTMLTextAreaElement>) => void;
  handleCheckLimit: () => boolean;
  trialTokenLimit: boolean;
  handleSendMessage: () => void;
  handleStopGeneration?: () => void;
  fetchingData: boolean;
  changeChatLoading: boolean;
  startChatLoading: boolean;
  isFileUploading: boolean;
  uploadedFile: File | null;
  previewURL: string | null;
  setPreviewURL: (url: string | null) => void;
  isDeepSearch: boolean;
  improving: boolean;
  translating: boolean;
  setTranslating: (value: boolean) => void;
  isLiveSearch: boolean;
  setIsLiveSearch: (value: boolean) => void;
  selected: any;
  handleImprovePrompt: () => void;
  onUndoImprove?: () => void;
  onRedoImprove?: () => void;
  canUndoImprove?: boolean;
  canRedoImprove?: boolean;
  redoImproving?: boolean;
  isAnyLoading: boolean;
  wasPromptImproved: boolean;
  files: any[];
  isGenerating?: boolean;
  conversationMessages?: any[];
  onModelSelect?: (model: any) => void;
  highlightSelected?: any;
  setHighlightSelected?: (model: any) => void;
  setSelected?: (model: any) => void;
}

const StopIcon = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="6" y="6" width="8" height="8" rx="1" fill="currentColor"/>
  </svg>
);

const FilePreview = ({ uploadedFile, previewURL, setPreviewURL }: any) => {
  const shouldShowPreview = (previewURL && uploadedFile?.type.startsWith("image/")) || 
                           (previewURL && uploadedFile?.type === "application/pdf");

  if (!shouldShowPreview) return null;

  return (
    <div className="p-3">
      {previewURL && uploadedFile?.type.startsWith("image/") && (
        <figure className="w-[60px] h-[60px] relative">
          <Image layout="fill" src={previewURL} alt="Image preview" className="rounded-md"/>
          <button
            onClick={() => setPreviewURL(null)}
            className="absolute cursor-pointer text-xs -top-2 -right-2 w-5 h-5 rounded-full bg-whiteSmoke dark:bg-blackRussian3 flex justify-center items-center"
          >
            <RxCross2/>
          </button>
        </figure>
      )}
      
      {previewURL && uploadedFile?.type === "application/pdf" && (
        <div className="pdf-preview">
          <figure className="w-[60px] h-[60px] relative">
            <Image layout="fill" src={previewURL} alt="PDF preview" className="rounded-md"/>
            <button
              onClick={() => setPreviewURL(null)}
              className="absolute cursor-pointer text-xs -top-2 -right-2 w-5 h-5 rounded-full bg-whiteSmoke dark:bg-blackRussian3 flex justify-center items-center"
            >
              <RxCross2/>
            </button>
          </figure>
          <p>{uploadedFile.name}</p>
        </div>
      )}
    </div>
  );
};

const ImprovePromptButton = ({ userInput, isAnyLoading, improving, handleImprovePrompt, wasPromptImproved, redoImproving = false }: any) => {
  if (improving) {
    return <ImSpinner9 className="animate-spin text-lg" />;
  }

  const isDisabled = !userInput.trim() || isAnyLoading || wasPromptImproved || redoImproving;

  return (
    <button
      className={`flex items-center justify-center gap-2 bg-whiteSmoke hover:bg-linkWater dark:bg-blackRussian3 dark:hover:bg-blackRussian4 rounded-full p-2 sm:rounded-md sm:px-4 sm:py-2 transition-colors dark:text-white text-black text-sm duration-300 whitespace-nowrap ${
        isDisabled ? 'disabled:opacity-25 cursor-not-allowed' : ' cursor-pointer'
      }`}
      disabled={isDisabled}
      onClick={handleImprovePrompt}
    >
      <svg
        width="20"
        height="20"
        viewBox="0 0 20 20"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M6.69449 3.0482C6.98277 2.31726 8.01723 2.31727 8.30551 3.0482L9.19886 5.31332C9.28687 5.53648 9.46352 5.71313 9.68668 5.80114L11.9518 6.69449C12.6827 6.98277 12.6827 8.01723 11.9518 8.30551L9.68668 9.19886C9.46352 9.28687 9.28687 9.46352 9.19886 9.68668L8.30551 11.9518C8.01723 12.6827 6.98277 12.6827 6.69449 11.9518L5.80114 9.68668C5.71313 9.46352 5.53648 9.28687 5.31332 9.19886L3.0482 8.30551C2.31726 8.01723 2.31727 6.98277 3.0482 6.69449L5.31332 5.80114C5.53648 5.71313 5.71313 5.53648 5.80114 5.31332L6.69449 3.0482Z"
          stroke="currentColor"
          strokeWidth="1.25"
        />
        <path
          d="M13.7401 11.1231C13.8926 10.7363 14.4401 10.7363 14.5926 11.1231L15.2598 12.8147C15.3064 12.9328 15.3998 13.0263 15.5179 13.0729L17.2096 13.7401C17.5964 13.8926 17.5964 14.4401 17.2096 14.5926L15.5179 15.2598C15.3998 15.3064 15.3064 15.3998 15.2598 15.5179L14.5926 17.2096C14.4401 17.5964 13.8926 17.5964 13.7401 17.2096L13.0729 15.5179C13.0263 15.3998 12.9328 15.3064 12.8147 15.2598L11.1231 14.5926C10.7363 14.4401 10.7363 13.8926 11.1231 13.7401L12.8147 13.0729C12.9328 13.0263 13.0263 12.9328 13.0729 12.8147L13.7401 11.1231Z"
          stroke="currentColor"
          strokeWidth="1.25"
        />
      </svg>
      <span className="hidden lg:inline">{wasPromptImproved ? 'Improved Prompt' : 'Improve Prompt'}</span>
    </button>
  );
};

const UndoRedoButtons = ({ onUndoImprove, onRedoImprove, canUndoImprove, canRedoImprove, isAnyLoading, redoImproving, improving }: any) => {
  const undoDisabled = !canUndoImprove || isAnyLoading || improving || redoImproving;
  const redoDisabled = !canRedoImprove || isAnyLoading || improving || redoImproving;
  return (
    <div className="flex items-center gap-2">
      <button
        className={`flex items-center justify-center gap-2 bg-whiteSmoke hover:bg-linkWater dark:bg-blackRussian3 dark:hover:bg-blackRussian4 rounded-full p-2 sm:rounded-md sm:px-4 sm:py-2 transition-colors dark:text-white text-black text-sm duration-300 whitespace-nowrap ${
          undoDisabled ? 'disabled:opacity-25 cursor-not-allowed pointer-events-none' : ' cursor-pointer'
        }`}
        aria-disabled={undoDisabled}
        disabled={undoDisabled}
        onClick={onUndoImprove}
      >
        <span className="hidden lg:inline">Undo</span>
      </button>
      <button
        className={`flex items-center justify-center gap-2 bg-whiteSmoke hover:bg-linkWater dark:bg-blackRussian3 dark:hover:bg-blackRussian4 rounded-full p-2 sm:rounded-md sm:px-4 sm:py-2 transition-colors dark:text-white text-black text-sm duration-300 whitespace-nowrap ${
          redoDisabled ? 'disabled:opacity-25 cursor-not-allowed pointer-events-none' : ' cursor-pointer'
        }`}
        aria-disabled={redoDisabled}
        disabled={redoDisabled}
        onClick={onRedoImprove}
      >
        {redoImproving ? <ImSpinner9 className="animate-spin text-lg" /> : <span className="hidden lg:inline">Redo</span>}
      </button>
    </div>
  );
};

const LiveSearchButton = ({ userInput, isAnyLoading, isLiveSearch, setIsLiveSearch, selected, isDeepSearch }: any) => {

  const shouldShowLiveSearch = !selected || ![EModels.ELIJAH].includes(selected?.key);
  if (!shouldShowLiveSearch || isDeepSearch) return null;

  return (
    <button
      className={`flex items-center justify-center gap-2 bg-whiteSmoke hover:bg-linkWater dark:bg-blackRussian3 dark:hover:bg-blackRussian4 rounded-full p-2 sm:rounded-md sm:px-4 sm:py-2 transition-colors dark:text-white text-black text-sm duration-300 whitespace-nowrap ${
        !userInput.trim() || isAnyLoading ? 'disabled:opacity-25 cursor-not-allowed' : ' cursor-pointer'
      } ${isLiveSearch ? 'btn-primary' : 'bg-whiteSmoke dark:bg-blackRussian3'}`}
      disabled={!userInput.trim() || isAnyLoading}
      onClick={() => setIsLiveSearch(!isLiveSearch)}
    >
      <GoGlobe className="w-5 h-5" />
      <span className="truncate hidden lg:inline">{isLiveSearch ? 'Live Search On' : 'Live Search'}</span>
    </button>
  );
};

export const ModelSelectionButton = ({ selected, isAnyLoading, highlightSelected, setHighlightSelected, placement = 'top', onSelect }: any) => {
  const [isOpen, setIsOpen] = React.useState(false);
  const dropdownRef = React.useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleModelSelect = (model: any) => {
    if (!selected && setHighlightSelected) {
      setHighlightSelected(model);
    }
    if (typeof onSelect === 'function') {
      onSelect(model);
    }
    setIsOpen(false);
  };

  const buttonContent = (
    <>
      <span className="truncate">{selected?.name || highlightSelected?.name || 'Select Model'}</span>
      <svg 
        className={`w-4 h-4 sm:w-5 sm:h-5 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
        fill="none" 
        stroke="currentColor" 
        viewBox="0 0 24 24"
      >
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
      </svg>
    </>
  );

  if (selected) {
    return (
      <CommonTooltip position="top" name="To change LLM, please start a new chat">
        <button
          className="flex items-center gap-1 sm:gap-2 bg-whiteSmoke hover:bg-linkWater dark:bg-blackRussian3 dark:hover:bg-blackRussian4 rounded-md px-2 sm:px-4 py-1 sm:py-2 text-xs sm:text-sm transition-colors dark:text-white text-black duration-300 cursor-not-allowed opacity-75 border border-[#32a9d8]"
          disabled={true}
        >
          {buttonContent}
        </button>
      </CommonTooltip>
    );
  }

  const dropdownPositionClass = placement === 'bottom' ? 'top-full mt-2' : 'bottom-full mb-2';

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        className={`flex items-center gap-1 sm:gap-2 bg-whiteSmoke hover:bg-linkWater dark:bg-blackRussian3 dark:hover:bg-blackRussian4 rounded-md border border-[#32a9d8] px-4 py-2 text-xs sm:text-sm transition-colors dark:text-white text-black duration-300 ${
          isAnyLoading ? 'cursor-not-allowed opacity-50' : 'cursor-pointer'
        }`}
        onClick={() => !isAnyLoading && setIsOpen(!isOpen)}
        disabled={isAnyLoading}
      >
        {buttonContent}
      </button>

      {isOpen && (
        <div className={`absolute ${dropdownPositionClass} left-0 bg-white dark:bg-blackRussian2 border border-linkWater dark:border-blackRussian3 rounded-lg shadow-lg py-2 z-50 min-w-[200px]`}>
          {Chat_Models_Display_data.map((model) => (
            <button
              key={model.key}
              className={`w-full text-left px-4 py-2 hover:bg-linkWater dark:hover:bg-blackRussian3 transition-colors text-sm ${
                highlightSelected?.key === model.key 
                  ? 'text-white font-medium'
                  : 'text-black dark:text-white'
              }`}
              onClick={() => handleModelSelect(model)}
            >
              {model.name}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};


const InputArea = ({ 
  currentModel, 
  handleUploadModal, 
  userInput, 
  setUserInput,
  handleInputChange, 
  handleInputKeyDown, 
  handleCheckLimit, 
  trialTokenLimit, 
  isAnyLoading, 
  handleSendMessage,
  handleStopGeneration,
  fetchingData, 
  changeChatLoading, 
  startChatLoading, 
  isFileUploading,
  isDeepSearch,
  improving,
  translating,
  setTranslating,
  isLiveSearch,
  setIsLiveSearch,
  selected,
  handleImprovePrompt,
  onUndoImprove,
  onRedoImprove,
  canUndoImprove,
  canRedoImprove,
  redoImproving,
  wasPromptImproved,
  files,
  isGenerating,
  conversationMessages,
  onModelSelect,
  highlightSelected,
  setHighlightSelected,
  setSelected
}: any) => {
  const handleKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === 'Enter' && userInput.length > MAX_INPUT_LENGTH) {
      event.preventDefault(); 
      return;
    }
    
    if (handleInputKeyDown) {
      if(!selected && highlightSelected)
        setSelected(highlightSelected);
      handleInputKeyDown(event);
    }
  };

  return (
    <div
      className="relative flex !flex-col chatBoot__container__textarea xl:flex-row w-full md:max-w-[660px] lg:max-w-[700px] xl:max-w-[1150px] gap-5 items-start justify-between"
    >
      {!isDeepSearch && (
        <div className="plusButton relative z-10">
          {currentModel?.supports?.length > 0 && (
            <CommonTooltip position="top" name={"File Upload"}>
              <button
                onClick={() => handleUploadModal("UploadFilesModal")}
                aria-label="Attach"
                disabled={isFileUploading || (files.length >= MAX_UPLOAD_FILES)}
                className="disabled:cursor-not-allowed disabled:opacity-25"
              >
                <PlusIcon/>
              </button>
            </CommonTooltip>
          )}
        </div>
      )}

      <div className="relative w-full">
        <AutoResizeTextarea
          placeholder="Ask me anything"
          value={userInput}
          onChange={handleInputChange ?? (() => {})}
          onKeyDown={handleKeyDown}
          disabled={handleCheckLimit() || trialTokenLimit || isAnyLoading}
          isAnyLoading={isAnyLoading}
          spaceAdd={currentModel?.supports?.length > 0}
          minHeight="32px"
          maxLength={MAX_INPUT_LENGTH}
        />
        <div
          className={`absolute bottom-1 right-2 text-xs ${
            userInput.length >= MAX_INPUT_LENGTH ? 'text-red-500' : 'text-gray-500 dark:text-gray-400'
          }`}
        >
          {userInput.length}/{MAX_INPUT_LENGTH}
        </div>
      </div>

      {isGenerating ? (
        <button
          type="button"
          onClick={() => {
            NiceModal.show('StopChatModal', {
              onConfirm: handleStopGeneration,
            });
          }}
          className="chatBoot__foot__senderButton !bottom-[15px] bg-whiteSmoke hover:bg-linkWater dark:bg-blackRussian3 dark:hover:bg-blackRussian4 rounded-full p-1.5 transition-colors dark:text-white text-black text-sm duration-300"
        >
          <StopIcon/>
        </button>
      ) : (
        <button
          disabled={
            handleCheckLimit() ||
            fetchingData ||
            !userInput.trim() ||
            changeChatLoading ||
            startChatLoading ||
            isFileUploading ||
            userInput.length > MAX_INPUT_LENGTH
          }
          type="button"
          onClick={handleSendMessage}
          className="disabled:cursor-not-allowed disabled:opacity-25 chatBoot__foot__senderButton"
        >
          <ChatSendIcon/>
        </button>
      )}
      <div className="flex flex-nowrap w-full items-center justify-end gap-2 px-12 pb-3 h-fit">
        {translating ? (
          <ImSpinner9 className="animate-spin text-lg"/>
        ) : (
          <TranslateComponent
            userInput={userInput}
            setUserInput={setUserInput}
            isAnyLoading={isAnyLoading}
            setTranslating={setTranslating}
          />
        )}

        <ImprovePromptButton
          userInput={userInput}
          isAnyLoading={isAnyLoading}
          improving={improving}
          handleImprovePrompt={handleImprovePrompt}
          wasPromptImproved={wasPromptImproved}
          redoImproving={redoImproving}
        />

        <UndoRedoButtons
          onUndoImprove={onUndoImprove}
          onRedoImprove={onRedoImprove}
          canUndoImprove={canUndoImprove}
          canRedoImprove={canRedoImprove}
          isAnyLoading={isAnyLoading}
          redoImproving={redoImproving}
          improving={improving}
        />

        <LiveSearchButton
          userInput={userInput}
          isAnyLoading={isAnyLoading}
          isLiveSearch={isLiveSearch}
          setIsLiveSearch={setIsLiveSearch}
          selected={selected}
          isDeepSearch={isDeepSearch}
        />

        {!isDeepSearch && (
          <div className="hidden md:block">
            <ModelSelectionButton
              selected={selected}
              isAnyLoading={isAnyLoading}
              highlightSelected={highlightSelected}
              setHighlightSelected={setHighlightSelected}
              placement="top"
              onSelect={onModelSelect}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export const ChatBoxContent: React.FC<ChatBoxContentProps> = ({
  currentModel,
  handleUploadModal,
  userInput,
  setUserInput,
  handleInputChange,
  handleInputKeyDown,
  handleCheckLimit,
  trialTokenLimit,
  handleSendMessage,
  handleStopGeneration,
  fetchingData,
  changeChatLoading,
  startChatLoading,
  isFileUploading,
  uploadedFile,
  previewURL,
  setPreviewURL,
  isDeepSearch,
  improving,
  translating,
  setTranslating,
  isLiveSearch,
  setIsLiveSearch,
  selected,
  handleImprovePrompt,
  onUndoImprove,
  onRedoImprove,
  canUndoImprove,
  canRedoImprove,
  redoImproving,
  isAnyLoading,
  wasPromptImproved,
  files,
  isGenerating,
  conversationMessages,
  onModelSelect,
  highlightSelected,
  setHighlightSelected,
  setSelected
}) => {
  return (
    <>
      {
        !isDeepSearch && <FilePreview
          uploadedFile={uploadedFile}
          previewURL={previewURL}
          setPreviewURL={setPreviewURL}
        />
      }

      <InputArea
        currentModel={currentModel}
        handleUploadModal={handleUploadModal}
        userInput={userInput}
        setUserInput={setUserInput}
        handleInputChange={handleInputChange}
        handleInputKeyDown={handleInputKeyDown}
        handleCheckLimit={handleCheckLimit}
        trialTokenLimit={trialTokenLimit}
        isAnyLoading={isAnyLoading}
        handleSendMessage={handleSendMessage}
        handleStopGeneration={handleStopGeneration}
        fetchingData={fetchingData}
        changeChatLoading={changeChatLoading}
        startChatLoading={startChatLoading}
        isFileUploading={isFileUploading}
        isDeepSearch={isDeepSearch}
        improving={improving}
        translating={translating}
        setTranslating={setTranslating}
        isLiveSearch={isLiveSearch}
        setIsLiveSearch={setIsLiveSearch}
        selected={selected}
        handleImprovePrompt={handleImprovePrompt}
        onUndoImprove={onUndoImprove}
        onRedoImprove={onRedoImprove}
        canUndoImprove={canUndoImprove}
        canRedoImprove={canRedoImprove}
        redoImproving={redoImproving}
        wasPromptImproved={wasPromptImproved}
        files={files}
        isGenerating={isGenerating}
        conversationMessages={conversationMessages}
        onModelSelect={onModelSelect}
        highlightSelected={highlightSelected}
        setHighlightSelected={setHighlightSelected}
        setSelected={setSelected}
      />
    </>
  );
};