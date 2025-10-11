import React from "react";
import BaseAutoResizeTextarea from "../common/BaseAutoResizeTextarea";

interface AutoResizeImageChatTextareaProps extends React.ComponentProps<typeof BaseAutoResizeTextarea> {}

/**
 * AutoResizeImageChatTextarea component for image generation input
 * This component extends the base component with specific styling for the image generation interface
 */
const AutoResizeImageChatTextarea: React.FC<AutoResizeImageChatTextareaProps> = (props) => {
  return (
    <BaseAutoResizeTextarea
      {...props}
      wrapperClassName="relative w-full overflow-hidden rounded-lg"
      showWebSearchMention={false}
    >
      <div className="absolute top-0 pb-1 pt-2 w-full bg-white dark:bg-blackRussian2 flex items-center justify-between box-border px-4">
        <span className="text-greyChateau text-sm">Prompt</span>
        {props.children}
      </div>
    </BaseAutoResizeTextarea>
  );
};

export default AutoResizeImageChatTextarea;