import React, { useState, useEffect } from 'react';
import Sidebar from '../Sidebar';
import RightSidebar from '../RightSidebar';
import { EChatType } from '../../enums/gpt-models.enum';
import DocumentSidebar from '../DocumentViewSidebar';
import { useRouter } from 'next/router';
import ChatSidebar from '../ChatSidebar/ChatSidebar';

interface IProps {
  children: any;
  toggleSidebar?: any;
  setToggleSidebar?: any;
  copyFiles?: any;
  currentChat?: any;
  switchSidebar?: any;
  setSwitchSidebar?: any;
  setSwitchSmallSidebar?: any;
  switchSmallSidebar?: any;
}

const ChatBootLayout = ({
  children,
  toggleSidebar,
  setToggleSidebar,
  copyFiles,
  currentChat,
  switchSidebar,
  setSwitchSidebar,
  setSwitchSmallSidebar,
  switchSmallSidebar,
}: IProps) => {
  const [rightSidebar, setRightSidebar] = useState<boolean>(true);

  const queryString =
    globalThis.window !== undefined && globalThis.window
      ? globalThis.window.location.search
      : ""; // Gets the part after the '?' in the URL
  const urlParams = new URLSearchParams(queryString);
  const router = useRouter();

  // Access specific parameters
  const type = urlParams?.get("type");

  // Automatically manage sidebars based on viewport width on chat/deep-search routes; update on resize
  useEffect(() => {
    if (globalThis.window === undefined) return;

    const applyResponsiveSidebarState = () => {
      if (router.pathname === "/chat" || router.pathname === "/deep-search") {
        if (setSwitchSmallSidebar) {
          const isMobile = globalThis.window.innerWidth < 767;
          setSwitchSmallSidebar(isMobile);
        }
      }
    };

    // Apply immediately on mount and route change
    applyResponsiveSidebarState();

    // Listen for viewport changes
    globalThis.window.addEventListener("resize", applyResponsiveSidebarState);
    return () => {
      globalThis.window.removeEventListener("resize", applyResponsiveSidebarState);
    };
  }, [router.pathname, setSwitchSidebar, setSwitchSmallSidebar]);
  return (
    <main
      id={"main"}
      className={`main chatBootmain pl-0 md:pl-20 ${
        switchSidebar ? "md:pl-[368px]" : ""
      } ${switchSmallSidebar ? "md:pl-[260px]" : ""} duration-500`}
    >
      {router.pathname == "/share" ? (
        <DocumentSidebar
          toggleSidebar={toggleSidebar}
          setToggleSidebar={setToggleSidebar}
        />
      ) : (
        <>
          <Sidebar
            toggleSidebar={toggleSidebar}
            setToggleSidebar={setToggleSidebar}
            setSwitchSidebar={setSwitchSidebar}
            switchSidebar={switchSidebar}
            setSwitchSmallSidebar={setSwitchSmallSidebar}
            switchSmallSidebar={switchSmallSidebar}
          />
          <ChatSidebar
            switchSidebar={switchSidebar}
            setSwitchSmallSidebar={setSwitchSmallSidebar}
            switchSmallSidebar={switchSmallSidebar}
          />
        </>
      )}
      {!toggleSidebar && (
        <button
          type="button"
          aria-label="Close sidebar"
          onClick={() => {
            setToggleSidebar(true);
            setSwitchSidebar(false);
            if (setSwitchSmallSidebar) {
              setSwitchSmallSidebar(true);
            }
          }}
          className="fixed inset-0 z-10 bg-black/50 md:hidden"
        />
      )}
      {type && type == EChatType.PDF_CHAT && (
        <RightSidebar
          rightSidebar={rightSidebar}
          setRightSidebar={setRightSidebar}
          copyFiles={copyFiles}
          currentChat={currentChat}
        />
      )}

      {children}
    </main>
  );
};

export default ChatBootLayout;
