import React from "react";
import { AiOutlineCheck } from "react-icons/ai";
import { CopyIcon } from "../../svgs/svg";

interface CopyButtonProps {
  onCopy: () => void;
  copySuccess: boolean;
  disabled?: boolean;
  className?: string;
  tooltipText?: string;
}

// Reusable copy button component
export const CopyButton: React.FC<CopyButtonProps> = ({
  onCopy,
  copySuccess,
  disabled = false,
  className = "chatBoot__edit group/tooltip relative",
  tooltipText = "Copy"
}) => {
  return (
    <button
      type="button"
      className={className}
      onClick={onCopy}
      disabled={disabled || copySuccess}
    >
      {copySuccess ? <AiOutlineCheck /> : <CopyIcon />}
      <em className="tooltip-left tooltip invisible not-italic !w-[60px] group-hover/tooltip:visible">
        {tooltipText}
      </em>
    </button>
  );
};
