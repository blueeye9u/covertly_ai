import React from "react";
import {CovertlyIcon, CovertlyLightIcon } from "../../svgs/svg";
import { useTheme } from "../../context/themeContext";
import MarkdownRenderer from "../common/MarkdownRenderer";
import ImageComponent from "../global/imageComponent/ImageComponent";
import { getModelImage } from "../../utils/chatUtils";
import { Chat_Models_Display_data } from "../../constants/chat-models-data";
interface AnswerAnswerContentProps {
  message: any;
  selectedTabIdx: number;
}

const AnswerAnswerContent: React.FC<AnswerAnswerContentProps> = ({
  message,
  selectedTabIdx,
}) => {
  const { isDarkMode } = useTheme();
  const modelDisplayData = Chat_Models_Display_data.find((model: any) => model.key === message?.model);
  
  return (
    <div
      key={message._id}
      id={message._id}
      className="chatBoot__aiBoot chatBoot__message"
    >
      <div className="flex gap-3 items-center">
        {isDarkMode ? <CovertlyIcon /> : <CovertlyLightIcon />}
        <p className="text-gradient !mb-0 text-sm font-semibold">Covertly AI</p>

        {message?.isSuperResponse ? (
          <div
            className="px-2 py-1.5 rounded-full border dark:border-blackRussian3 border-linkWater dark:text-aluminium text-xs">
            Super Response
          </div>
        ) : (
          <span
          className="flex items-center gap-2 px-2 py-1.5 rounded-full border dark:border-blackRussian3 border-linkWater dark:text-aluminium text-xs"
        >
          <ImageComponent
            src={getModelImage(modelDisplayData, isDarkMode)}
            height={18}
            width={18}
            figClassName="shrink-0"
            className="rounded-md"
            alt="chat"
          />

          <span className="hidden sm:inline truncate max-w-[100px] md:max-w-[140px]">
            {message.model}
          </span>
        </span>
        )}

        
      </div>

      

      <div className="w-full grow">
        <MarkdownRenderer content={message.content} />
      </div>
    </div>
  );
};

export default AnswerAnswerContent;