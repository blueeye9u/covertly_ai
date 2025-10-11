import React from "react";
import { useConversation } from "../../../../context/conversation.context";
import ThreeDotsLoader from "../../../ThreeDots";
import { useTheme } from "../../../../context/themeContext";
import MarkdownRenderer from "../../../common/MarkdownRenderer";
import { CopyButton } from "../../../common/CopyButton";
import { useCopyToClipboard } from "../../../../hooks/useCopyToClipboard";

interface AnswerContentProps {
  message: any;
  index: number;
  fetchingData: boolean;
  lastIndex: any;
}


const ElijahAnswer: React.FC<AnswerContentProps> = ({
  message,
  index,
  fetchingData,
  lastIndex,
}) => {
  const { generatingMessage, generatingPDFChats } = useConversation();
  const { isDarkMode } = useTheme();
  const { copySuccess, handleCopy } = useCopyToClipboard();

  const formattedContent = message.content.includes("ErrorMessage:")
    ? message.content.split("ErrorMessage:")[0] +
    "<br/><br/>" +
    `<b>${message.content.split("ErrorMessage:").pop()}</b>`
    : message.content;

  return (
    <div
      key={message._id}
      id={message._id}
      className="chatBoot__aiBoot chatBoot__message"
    >
      <div className="w-full grow">
        <div id="markdown-container">
          <MarkdownRenderer 
            content={formattedContent} 
            isDarkMode={isDarkMode} 
          />
          {((generatingMessage || generatingPDFChats) && index === lastIndex) && <ThreeDotsLoader />}
          {fetchingData ? (
              <div className="mt-4 flex items-center gap-2.5"></div>
          ) : (
              <div className="mt-4 flex items-center gap-2.5">
                <CopyButton 
                  onCopy={() => handleCopy(message.content)}
                  copySuccess={copySuccess}
                />
              </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ElijahAnswer;
