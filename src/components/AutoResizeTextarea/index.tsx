import React, { memo } from "react";
import BaseAutoResizeTextarea from "../common/BaseAutoResizeTextarea";

interface AutoResizeTextareaProps extends React.ComponentProps<typeof BaseAutoResizeTextarea> {}

/**
 * AutoResizeTextarea component for chat input with search mention feature
 * This component extends the base component with specific styling for the main chat input
 */
const AutoResizeTextarea: React.FC<AutoResizeTextareaProps> = (props) => {
  return (
    <BaseAutoResizeTextarea
      {...props}
      wrapperClassName="relative w-full flex py-2 group !border border-whiteSmoke dark:border-blackRussian3 focus-within:!border-blue-500 rounded-md"
      showWebSearchMention={false}
    />
  );
};

export default memo(AutoResizeTextarea);