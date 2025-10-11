import React, { useState, memo, useMemo } from "react";
import { TfiReload } from "react-icons/tfi";
import { PiBrain } from "react-icons/pi";
import { useConversation } from "../../../../context/conversation.context";
import ThreeDotsLoader from "../../../ThreeDots";
import Sources from "./sources";
import { useTheme } from "../../../../context/themeContext";
import ImageComponent from "../../../global/imageComponent/ImageComponent"
import { CovertlyIcon, CovertlyLightIcon } from "../../../../svgs/svg";
import { FiSidebar } from "react-icons/fi";
import { getSuggestedLLM, getModelImage } from '../../../../utils/chatUtils';
import { SearchProgressIndicator } from "../../../DeepResearch";
import { EModels } from '../../../../enums/modals.enum';
import { generateResearchPdf } from "../../../../utils/handleResearchPdf";
import { conversationService } from "../../../../services/conversation.service";
import MarkdownRenderer from "../../../common/MarkdownRenderer";
import { CopyButton } from "../../../common/CopyButton";
import { CopySafeArea } from "../../../common/CopySafeArea";
import { useCopyToClipboard } from "../../../../hooks/useCopyToClipboard";
import { escapeHtml } from "../../../../utils/markdownUtils";

interface AnswerContentProps {
  message: any;
  index: number;
  lastIndex: number;
  fetchingData: boolean;
  handleRegenerateMessage: (index: number) => void;
  regeneratingMessageId: string | null;
  selectedTabIdx: number;
  userInput: string;
  canRegenerate: boolean;
  onToggleSources?: (messageId: string, show: boolean) => void;
}

// Helper functions to reduce cognitive complexity
function parseTagContent(base: string): { thinking: string; answer: string } | null {
  const tagRegex = /<(think|reasoning)>([\s\S]*?)<\/(think|reasoning)>/i;
  const tagMatch = tagRegex.exec(base);
  if (!tagMatch) return null;

  const full = tagMatch[0];
  const inner = tagMatch[2] || "";
  return {
    thinking: inner.trim(),
    answer: base.replace(full, "").trim(),
  };
}

function parseMarkerContent(base: string): { thinking: string; answer: string } | null {
  const markerRegex = /(^|\n)\s*(Final\s+Answer|Answer|Solution|Response)\s*:\s*/i;
  const markerIdx = base.search(markerRegex);
  if (markerIdx === -1) return null;

  const match = markerRegex.exec(base.slice(markerIdx));
  const splitIdx = match ? markerIdx + match[0].length : markerIdx;
  return {
    thinking: base.slice(0, markerIdx).trim(),
    answer: base.slice(splitIdx).trim(),
  };
}

function findPhraseSplit(base: string): { thinking: string; answer: string } | null {
  const lower = base.toLowerCase();
  const phrases = [
    "\n\nyes, ", "\n\nno, ", "\n\nsure, ", "\n\ncertainly, ", "\n\nhere is", "\n\nhere are",
    "\n\nthe answer", "\n\nin summary", "\n\nsummary:", "\n\nconclusion:", "\n\ntherefore,",
    "\n\noverall,", "\n\ni can ", "\n\nso, ", "\n\nwell, ", "\n\nbasically, ", "\n\nput simply, ",
    "\n\nto answer your question, ", "\n\nto put it simply, ", "\n\nlet me explain, ",
    "\n\nlet me break this down, ", "\n\nnow, ", "\n\nfirst, ", "\n\nsecond, ", "\n\nthird, ",
    "\n\nfinally, ", "\n\nin conclusion, ", "\n\nto summarize, ", "\n\nwhat i know is",
    "\n\nfrom what i understand", "\n\nbased on my knowledge", "\n\naccording to my understanding",
  ];

  let best = -1;
  for (const phrase of phrases) {
    const idx = lower.indexOf(phrase);
    if (idx !== -1 && (best === -1 || idx < best)) {
      best = idx;
    }
  }

  if (best === -1) return null;

  return {
    thinking: base.slice(0, best).trim(),
    answer: base.slice(best).trim(),
  };
}

function findPatternSplit(base: string): { thinking: string; answer: string } | null {
  const answerPatterns = [
    /(a laptop is|a laptop|the laptop|it is|it's|this is|these are|here's|here are)/i,
    /(so,|well,|basically,|put simply,|to put it simply|let me explain|let me break this down)/i
  ];

  for (let i = 0; i < base.length; i++) {
    const currentText = base.slice(i).toLowerCase();

    for (const pattern of answerPatterns) {
      const match = pattern.exec(currentText);
      if (match && i > 50) {
        return {
          thinking: base.slice(0, i).trim(),
          answer: base.slice(i).trim(),
        };
      }
    }
  }

  return null;
}

function findSentenceSplit(base: string): { thinking: string; answer: string } | null {
  const sentences = base.split(/[.!?]+/);
  if (sentences.length <= 2) return null;

  for (let i = 1; i < sentences.length; i++) {
    const sentence = sentences[i].trim().toLowerCase();
    const sentenceRegex = /^(a |an |the |it |this |these |here |so |well |basically |put simply)/;
    if (sentenceRegex.exec(sentence)) {
      const thinkingEnd = sentences.slice(0, i).join('. ').trim();
      const answerStart = sentences.slice(i).join('. ').trim();
      if (thinkingEnd.length > 20 && answerStart.length > 10) {
        return {
          thinking: thinkingEnd,
          answer: answerStart,
        };
      }
    }
  }

  return null;
}

function splitDeepSeekContent(input: string): { thinking: string; answer: string } {
  if (!input) return { thinking: "", answer: "" };

  const base = input.includes("ErrorMessage:") ? input.split("ErrorMessage:")[0] : input;

  // Try different parsing methods in order of preference
  const tagResult = parseTagContent(base);
  if (tagResult) return tagResult;

  const markerResult = parseMarkerContent(base);
  if (markerResult) return markerResult;

  const phraseResult = findPhraseSplit(base);
  if (phraseResult) return phraseResult;

  const patternResult = findPatternSplit(base);
  if (patternResult) return patternResult;

  const sentenceResult = findSentenceSplit(base);
  if (sentenceResult) return sentenceResult;

  return { thinking: "", answer: base.trim() };
}


// Memoized ModelImage component
const ModelImage = memo(({ modelKey }: { modelKey: string }) => {
  const suggestedLLM = getSuggestedLLM(modelKey);
  const { isDarkMode } = useTheme();

  return (
    <ImageComponent
      src={getModelImage(suggestedLLM, isDarkMode)}
      height={18}
      width={18}
      figClassName="shrink-0"
      className="rounded-md"
      alt="chat"
    />
  );
});

ModelImage.displayName = "ModelImage";

const AnswerContent: React.FC<AnswerContentProps> = ({
  message,
  index,
  lastIndex,
  fetchingData,
  handleRegenerateMessage,
  regeneratingMessageId,
  selectedTabIdx,
  userInput,
  canRegenerate,
  onToggleSources,
}) => {
  const { generatingMessage, generatingPDFChats, conversationMessages } = useConversation();
  const [showSources, setShowSources] = useState(true);
  const { isDarkMode } = useTheme();
  const { copySuccess, handleCopy } = useCopyToClipboard();

  // Memoize the formatted content
  const formattedContent = useMemo(() => {
    if (message.content.includes("ErrorMessage:")) {
      const parts = message.content.split("ErrorMessage:");
      const mainContent = parts[0] || "";
      const errorMessage = parts.pop() || "";
      // Safely escape the error message to prevent XSS
      const escapedError = escapeHtml(errorMessage);
      return mainContent + "<br/><br/>" + `<b>${escapedError}</b>`;
    }
    return message.content;
  }, [message.content]);

  const isDeepSeekMessage = useMemo(() => message.model === EModels.DEEPSEEK, [message]);
  const deepSeekSections = useMemo(() => splitDeepSeekContent(formattedContent), [formattedContent]);


  const handleDownloadChainPdf = async () => {
    try {
      // Fetch chain of thought report data using conversation service
      const response = await conversationService.getChainOfThoughtReportData(message._id);

      if (response.statusCode !== 200) {
        throw new Error(response.message || 'Failed to fetch chain of thought report data');
      }

      const reportData = response.payload;

      // Generate PDF using frontend utils
      await generateResearchPdf(reportData);
    } catch (error) {
      console.error('Failed to generate chain of thought PDF:', error);
      // Fallback: try opening existing PDF URL if available
      if (message.pdfUrl) {
        window.open(message.pdfUrl, '_blank');
      } else {
        alert('Failed to generate chain of thought PDF. Please try again.');
      }
    }
  };

  // Memoize the model name
  const modelName = useMemo(() => {
    if (message?.smartSubModel) {
      return getSuggestedLLM(message.smartSubModel)?.name;
    }
    return "";
  }, [message?.smartSubModel]);

  const isDeepSearchMessage = useMemo(() => message.model === EModels.DEEP_SEARCH
    , [message]);

  const isDeepSearchCompleted = useMemo(() => {
    return isDeepSearchMessage &&
      !message.isLoading &&
      (message.searchStatus === 'completed' || message.searchStatus === undefined) &&
      message.content &&
      message.content.trim().length > 0 &&
      !message.chatEvent;
  }, [isDeepSearchMessage, message.isLoading, message.searchStatus, message.content, message.chatEvent]);

  const isWebSearch = useMemo(() => {
    const hasCitations = (message?.citations?.results?.length ?? 0) > 0;
    const webEvent = message?.chatEvent === "Searching the web...";
    return hasCitations || webEvent;
  }, [message?.citations, message?.chatEvent]);

  const showDirectApi = useMemo(() => {
    if (isWebSearch) return false;
    return !generatingMessage && !message?.isLoading;
  }, [isWebSearch, generatingMessage, message?.isLoading]);

  const handleToggleSources = () => {
    const newShowSources = !showSources;
    setShowSources(newShowSources);
    onToggleSources?.(message._id, newShowSources);
  };

  function renderDeepSearchComponents() {
    if (message.isLoading) {
      return (
        <SearchProgressIndicator
          status={message.searchStatus || 'planning'}
          progress={message.searchProgress}
        />
      );
    }
    return renderMarkdownContent(false);
  }

  function renderMarkdownContent(showThreeDotsLoader: boolean = true) {
    return (
      <>
        <MarkdownRenderer 
          content={formattedContent} 
          isDarkMode={isDarkMode} 
        />
        {showThreeDotsLoader && index === lastIndex && (generatingMessage || generatingPDFChats) && <ThreeDotsLoader />}
      </>
    );
  }

  function renderDeepSeekSeparated() {
    const { thinking, answer } = deepSeekSections;
    if (!thinking) return renderMarkdownContent();
    return (
      <div className="flex flex-col gap-4">
        <div className="rounded-lg border border-linkWater dark:border-blackRussian3 p-3 bg-linkWater/50 dark:bg-blackRussian2">
          <div className="flex items-center gap-2 mb-2 text-xs uppercase tracking-wide opacity-80">
            <PiBrain />
            <span>Thinking</span>
          </div>
          <MarkdownRenderer 
            content={thinking} 
            isDarkMode={isDarkMode} 
          />
        </div>
        <div className="rounded-lg border border-linkWater dark:border-blackRussian3 p-3">
          <div className="flex items-center gap-2 mb-2 text-xs uppercase tracking-wide opacity-80">
            <span>Answer</span>
          </div>
          <MarkdownRenderer 
            content={answer} 
            isDarkMode={isDarkMode} 
          />
          {index === lastIndex && (generatingMessage || generatingPDFChats) && <ThreeDotsLoader />}
        </div>
      </div>
    );
  }

  return (
    <div
      key={message._id}
      id={message._id}
      className={`chatBoot__aiBoot chatBoot__message ${message.citations?.images?.length ? '' : 'max-w-[1150px]'}`}
    >
      <div className="flex gap-3 items-center">
        {isDarkMode ? <CovertlyIcon /> : <CovertlyLightIcon />}
        <p className="text-gradient !mb-0 text-sm font-semibold">Covertly AI</p>

        {message?.isSuperResponse && (
          <div
            className="px-2 py-1.5 rounded-full border dark:border-blackRussian3 border-linkWater dark:text-aluminium text-xs">
            Super Response
          </div>
        )}

        {message.chatEvent && (
          <div
            className="px-2 py-1.5 rounded-full border dark:border-blackRussian3 border-linkWater dark:text-aluminium text-xs">
            {conversationMessages.at(-1)?.chatEvent}
          </div>
        )}
        {(isWebSearch || showDirectApi) && (
          <div
            className="flex gap-3 items-center p-2 rounded-lg hover:opacity-85 transition-all duration-300 border border-linkWater dark:border-blackRussian3">
            <p className="fs-14">{isWebSearch ? "Web Search" : "Direct API"}</p>
          </div>
        )}
      </div>
      <div className="w-full grow" id="copy-safe">
        <CopySafeArea />
        {!isDeepSearchMessage && (
          <Sources message={message} />
        )}
        <div id="markdown-container">
          {(() => {
            if (isDeepSearchMessage) {
              return renderDeepSearchComponents();
            }
            return isDeepSeekMessage ? renderDeepSeekSeparated() : renderMarkdownContent();
          })()}
          {message._id !== regeneratingMessageId && !fetchingData ? (
            <div className="mt-4 flex justify-between">
              <div className="flex items-center gap-2.5">
                <CopyButton 
                  onCopy={() => handleCopy(message.content)}
                  copySuccess={copySuccess}
                />
                {isDeepSearchMessage && (
                  <button
                    type="button"
                    className="chatBoot__edit group/tooltip relative"
                    onClick={handleToggleSources}
                  >
                    <FiSidebar />
                    <span className="tooltip-left tooltip invisible not-italic !w-[120px] group-hover/tooltip:visible">
                      {showSources ? "Hide Sources" : "Show Sources"}
                    </span>
                  </button>
                )}
                {index === lastIndex && canRegenerate && (
                  <button
                    className="chatBoot__edit group/tooltip relative"
                    onClick={() => handleRegenerateMessage(index)}
                    disabled={!!regeneratingMessageId || !!fetchingData}
                    type="button"
                  >
                    <TfiReload />
                    <span className="tooltip-left !w-[110px] tooltip invisible not-italic group-hover/tooltip:visible">
                      {"Regenerate"}
                    </span>
                  </button>
                )}
                {message?.smartSubModel && (
                  <div className="flex gap-2 items-center p-3 py-2 rounded-lg bg-linkWater dark:bg-blackRussian2">
                    <ModelImage modelKey={message.smartSubModel} />
                    <p className="text-xs dark:text-greyChateau">
                      {modelName}
                    </p>
                  </div>
                )}
              </div>
              {isDeepSearchCompleted && (
                <div className="flex justify-end mt-3">
                  <button
                    type="button"
                    className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-medium transition-colors duration-200"
                    onClick={handleDownloadChainPdf}
                  >
                    <PiBrain className="text-lg" />
                    Download Chain-of-Thought PDF
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="mt-4 flex items-center gap-2.5" />
          )}
        </div>
      </div>
    </div>
  );
};

AnswerContent.displayName = "AnswerContent";

export default memo(AnswerContent);
