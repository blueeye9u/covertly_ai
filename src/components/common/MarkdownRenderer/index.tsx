import React, { useMemo } from "react";
import Markdown, { Components } from "react-markdown";
import remarkGfm from "remark-gfm";
import breaks from "remark-breaks";
import rehypeRaw from "rehype-raw";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import { useTheme } from "../../../context/themeContext";
import CodeBlock from "../CodeBlock";
import "katex/dist/katex.min.css";


export const getMarkdownComponents = (isDarkMode: boolean): Components => ({
  h1: ({ children }) => (
    <h1
      className={`text-3xl font-bold mt-6 mb-4 border-b pb-2 ${
        isDarkMode ? "border-gray-700" : "border-gray-200"
      }`}
    >
      {children}
    </h1>
  ),
  h2: ({ children }) => (
    <h2 className="text-2xl font-semibold mt-5 mb-3">{children}</h2>
  ),
  h3: ({ children }) => (
    <h3 className="text-xl font-semibold mt-4 mb-2">{children}</h3>
  ),
  h4: ({ children }) => (
    <h4 className="text-lg font-semibold mt-3 mb-2">{children}</h4>
  ),
  p: ({ children }) => (
    <p className="text-base leading-relaxed mb-4 whitespace-pre-wrap break-words">
      {children}
    </p>
  ),
  ul: ({ children }) => (
    <ul className="list-disc list-outside ml-6 mb-4 space-y-1">{children}</ul>
  ),
  ol: ({ children }) => (
    <ol className="list-decimal list-outside ml-6 mb-4 space-y-1">
      {children}
    </ol>
  ),
  li: ({ children }) => (
    <li className="leading-relaxed pl-1 break-words">{children}</li>
  ),
  strong: ({ children }) => (
    <strong className="font-semibold">{children}</strong>
  ),
  em: ({ children }) => <em className="italic">{children}</em>,
  hr: () => (
    <hr className="my-6 border-t border-gray-300 dark:border-gray-700" />
  ),
  blockquote: ({ children }) => (
    <blockquote
      className={`border-l-4 pl-4 italic my-4 ${
        isDarkMode ? "border-gray-600 text-gray-300" : "border-gray-300 text-gray-700"
      }`}
    >
      {children}
    </blockquote>
  ),
  a: ({ href, children }) => (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`underline underline-offset-4 hover:opacity-80 ${
        isDarkMode ? "text-blue-400" : "text-blue-600"
      }`}
    >
      {children}
    </a>
  ),
  img: ({ src, alt }) => (
    <img
      src={src || ""}
      alt={alt || ""}
      className="max-w-full rounded-xl my-3 shadow-sm"
      loading="lazy"
    />
  ),
  table: ({ children }) => (
    <div className="overflow-x-auto my-4">
      <table
        className={`w-full text-left border-collapse ${
          isDarkMode ? "border-gray-700" : "border-gray-300"
        }`}
      >
        {children}
      </table>
    </div>
  ),
  th: ({ children }) => (
    <th
      className={`px-3 py-2 font-semibold border-b ${
        isDarkMode ? "border-gray-700 bg-gray-800" : "border-gray-300 bg-gray-100"
      }`}
    >
      {children}
    </th>
  ),
  td: ({ children }) => (
    <td
      className={`px-3 py-2 border-b ${
        isDarkMode ? "border-gray-700" : "border-gray-300"
      }`}
    >
      {children}
    </td>
  ),
  code: ({ inline, className, children, ...props }: any) =>
    inline ? (
      <code
        className={`rounded-md px-1.5 py-0.5 font-mono text-sm ${
          isDarkMode
            ? "bg-gray-800 text-gray-100"
            : "bg-gray-100 text-gray-800"
        }`}
        {...props}
      >
        {children}
      </code>
    ) : (
      <CodeBlock isDarkMode={isDarkMode} className={className}>
        {children}
      </CodeBlock>
    ),
});


// Pre-processing helper (handles edge cases)
export const processContent = (content: string): string => {
  if (!content) return "";

  // Handle malformed headers/lists
  let processed = content
    .replaceAll(/^(#{1,6})([^#\s])/gm, "$1 $2")
    .replaceAll(/^([*-])([^\s])/gm, "$1 $2");

  // Convert inline LaTeX syntax
  processed = processed
    .replaceAll(String.raw`\(`, "$")
    .replaceAll(String.raw`\)`, "$")
    .replaceAll(String.raw`\[`, "$$")
    .replaceAll(String.raw`\]`, "$$");

  return processed.trim();
};


//Main Markdown Renderer

interface MarkdownRendererProps {
  content: string;
  className?: string;
  isDarkMode?: boolean;
  children?: React.ReactNode;
}

const MarkdownRenderer: React.FC<MarkdownRendererProps> = ({
  content,
  className = "prose max-w-none",
  isDarkMode: propIsDarkMode,
  children,
}) => {
  const { isDarkMode: contextIsDarkMode } = useTheme();
  const isDarkMode = propIsDarkMode ?? contextIsDarkMode;
  const markdownComponents = useMemo(
    () => getMarkdownComponents(isDarkMode),
    [isDarkMode]
  );

  return (
    <div
      className={`${className} ${
        isDarkMode
          ? "prose-invert text-gray-100"
          : "text-gray-800"
      } leading-relaxed`}
    >
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
