import React, { useMemo, useState } from "react";
import { AiOutlineCheck } from "react-icons/ai";
import { CopyIcon } from "../../svgs/svg";

interface CodeBlockProps {
  isDarkMode: boolean;
  className?: string;
  children: React.ReactNode;
}

const CodeBlock: React.FC<CodeBlockProps> = ({ isDarkMode, className, children }) => {
  const [copied, setCopied] = useState(false);

  const codeText = useMemo(() => {
    if (Array.isArray(children)) {
      return children.join("");
    }
    return String(children ?? "");
  }, [children]);

  const handleCopy = async () => {
    try {
      const normalized = codeText.replace(/\n$/, "");
      await navigator.clipboard.writeText(normalized);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
    }
  };

  return (
    <pre className={`${isDarkMode ? "bg-gray-800" : "bg-gray-100"} text-white p-4 rounded my-4 relative whitespace-pre-wrap break-words overflow-visible pr-12 w-full`}>
      <div className="absolute top-2 right-2 group/tooltip">
        <button
          type="button"
          className="chatBoot__edit"
          onClick={handleCopy}
          aria-label="Copy code"
        >
          {copied ? <AiOutlineCheck /> : <CopyIcon />}
        </button>
        <em className="tooltip-top tooltip invisible not-italic !w-[60px] group-hover/tooltip:visible">
          {"Copy"}
        </em>
      </div>
      <code className={className}>{children}</code>
    </pre>
  );
};

export default CodeBlock;


