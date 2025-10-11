import React, { useMemo } from "react";
import Markdown, { Components } from "react-markdown";
import remarkGfm from "remark-gfm";
import breaks from 'remark-breaks';
import rehypeRaw from "rehype-raw";
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import { useTheme } from "../../../context/themeContext";
import CodeBlock from "../CodeBlock";

import 'katex/dist/katex.min.css';

/**
 * Define markdown components with consistent styling
 */
export const getMarkdownComponents = (isDarkMode: boolean): Components => ({
  h1: ({ children }) => (
    <h1 className="text-2xl font-bold my-4 block">{children}</h1>
  ),
  h2: ({ children }) => (
    <h2 className="text-xl font-bold my-3 block">{children}</h2>
  ),
  h3: ({ children }) => (
    <h3 className="text-lg font-bold my-2 block">{children}</h3>
  ),
  h4: ({ children }) => (
    <h4 className="text-base font-bold my-2 block">{children}</h4>
  ),
  p: ({ children }) => {
    if (React.isValidElement(children) && children.props.className === "katex") {
      return(
        <span className="katex-display">{children}</span>
      );
    }
    else {
      return(
        <p className="mb-4 block">{children}</p>
      );
    }
  },
  ul: ({ children }) => (
    <ul className="list-disc list-outside ml-6 mb-4 block">{children}</ul>
  ),
  ol: ({ children }) => (
    <ol className="list-decimal list-outside ml-6 mb-4 block">{children}</ol>
  ),
  li: ({ children }) => (
    <li className="mb-1 block">{children}</li>
  ),
  strong: ({ children }) => (
    <strong className="font-bold">{children}</strong>
  ),
  blockquote: ({ children, ...props }) => (
    <blockquote className="border-l-4 border-gray-300 pl-4 my-4 italic" {...props}>
      {children}
    </blockquote>
  ),
  a: ({ node, children, ...props }) => (
    <a
      {...props}
      target="_blank"
      rel="noopener noreferrer"
      className="relative group text-blue-600 hover:underline"
    >
      {children}
    </a>
  ),
  code: ({ inline, children, className, ...props }: any) =>
    inline ? (
      <code className={`${isDarkMode ? "bg-gray-800" : "bg-gray-100"} text-white px-1 py-0.5 rounded`} {...props}>
        {children}
      </code>
    ) : (
      <CodeBlock isDarkMode={isDarkMode} className={className}>
        {children}
      </CodeBlock>
    ),
});

/**
 * Process content for rendering, handling errors and formatting
 */
export const processContent = (content: string): string => {
  if (!content) return '';

  // Handle error messages
  if (content.includes("ErrorMessage:")) {
    return content.split("ErrorMessage:")[0] +
      "\n\n" +
      `**${content.split("ErrorMessage:").pop()}**`;
  }

  // Handle email-like content with signatures
  if (content.includes("[Your") || content.includes("Subject:")) {
    const parts = content.split(/\n(?=\[)/);
    const mainContent = parts[0];
    const signature = parts.slice(1).join('\n');

    return `${mainContent}\n\n<div class="signature-block">${signature}</div>`;
  }

  const processedContent = content
    .replaceAll(String.raw`\(`, '$')
    .replaceAll(String.raw`\)`, '$')
    .replaceAll(String.raw`\[`, '$$')
    .replaceAll(String.raw`\]`, '$$');

  return processedContent
    .replaceAll(/^(#{1,6})([^#\s])/gm, '$1 $2')
    .replaceAll(/^([*-])([^\s])/gm, '$1 $2');
};

interface MarkdownRendererProps {
  content: string;
  className?: string;
  children?: React.ReactNode;
  isDarkMode?: boolean;
}

/**
 * Reusable markdown renderer component
 */
const MarkdownRenderer: React.FC<MarkdownRendererProps> = ({ 
  content,
  className = "markdown-container", 
  children,
  isDarkMode: propIsDarkMode
}) => {
  const { isDarkMode: contextIsDarkMode } = useTheme();
  const isDarkMode = propIsDarkMode === undefined ? contextIsDarkMode : propIsDarkMode;
  const markdownComponents = useMemo(() => getMarkdownComponents(isDarkMode), [isDarkMode]);
  
  return (
    <div className={className}>
      <Markdown
        rehypePlugins={[rehypeRaw, rehypeKatex]}
        remarkPlugins={[remarkGfm, breaks, remarkMath]}
        components={markdownComponents}
      >
        {processContent(content)}
      </Markdown>
      {children}
    </div>
  );
};

export default MarkdownRenderer;