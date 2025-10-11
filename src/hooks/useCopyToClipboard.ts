import { useState } from "react";
import { marked } from "marked";
import { decodeHtmlEntities, sanitizeHtmlTags } from "../utils/markdownUtils";

// Custom hook for handling copy to clipboard functionality

export const useCopyToClipboard = () => {
  const [copySuccess, setCopySuccess] = useState(false);

  const handleCopy = async (content: string) => {
    let processedContent = content;
    
    // Handle error messages
    if (processedContent.includes("ErrorMessage:")) {
      processedContent = processedContent.split("ErrorMessage:").pop() || processedContent;
    }
    
    // Clean the content
    processedContent = decodeHtmlEntities(sanitizeHtmlTags(processedContent));
    
    try {
      // Convert markdown to HTML
      const htmlContent = await marked(processedContent);
      const parsed = new DOMParser().parseFromString(htmlContent, "text/html");
      const plainText = parsed.body.textContent || "";
      
      // Create HTML string with styling
      const htmlString = `
        <html>
        <head>
          <meta charset="utf-8">
          <style>
            body { font-family: Calibri, sans-serif; font-size: 12pt; }
            p { margin: 0; padding: 5px 0; }
          </style>
        </head>
        <body>
          <div>${htmlContent}</div>
        </body>
        </html>`;

      // Create blobs for both HTML and plain text
      const blobHtml = new Blob([htmlString], { type: "text/html" });
      const blobPlain = new Blob([plainText], { type: "text/plain" });

      // Create clipboard item
      const clipboardItem = new ClipboardItem({
        "text/html": blobHtml,
        "text/plain": blobPlain
      });

      // Write to clipboard
      await navigator.clipboard.write([clipboardItem]);
      setCopySuccess(true);
      setTimeout(() => setCopySuccess(false), 2000);
    } catch (err) {
      console.error("Copy failed", err);
    }
  };

  return {
    copySuccess,
    handleCopy
  };
};
