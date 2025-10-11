import React, { useEffect } from "react";

// Component that provides safe copy functionality with proper HTML formatting

export const CopySafeArea: React.FC = () => {
  useEffect(() => {
    const handleCopy = (e: ClipboardEvent) => {
      const selection = globalThis.window.getSelection();
      if (!selection || selection.isCollapsed) return;

      const range = selection.getRangeAt(0);
      const cloned = range.cloneContents();

      const wrapper = document.createElement("div");
      wrapper.appendChild(cloned);

      // Apply light styles to all elements
      for (const el of wrapper.querySelectorAll("*")) {
        (el as HTMLElement).style.backgroundColor = "#ffffff";
      }

      const htmlString = `
        <html>
          <head>
            <meta charset="utf-8">
            <style>
              body {
                font-family: Calibri, sans-serif;
                font-size: 12pt;
                background: #fff;
              }
              a { text-decoration: underline; }
              code, pre { background: #f4f4f4; font-family: Consolas, monospace; }
            </style>
          </head>
          <body>
            ${wrapper.innerHTML}
          </body>
        </html>
      `;

      const plainText = wrapper.textContent || "";

      e.preventDefault();
      e.clipboardData?.setData("text/html", htmlString);
      e.clipboardData?.setData("text/plain", plainText);
    };

    document.addEventListener("copy", handleCopy);
    return () => document.removeEventListener("copy", handleCopy);
  }, []);

  return null;
};
