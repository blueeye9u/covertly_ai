import React, { useEffect, useState } from "react";
import { FiEdit } from "react-icons/fi";
import { useRouter } from "next/router";
import { isEmpty } from "lodash";
import NiceModal from "@ebay/nice-modal-react";
import { toast } from "react-hot-toast";

import SelectComponent from "../global/forms/Select";
import UserDropDown from "../global/userDropdown/UserDropdown";
import useLoggedInStatus from "../../hooks/useLoggedInStatus";
import { images } from "../../assets/images";
import { useConversation } from "../../context/conversation.context";
import { EChatTypes, EModels } from "../../enums/modals.enum";
import {
  Chat_Model_data,
  Chat_Types,
  Chat_Models,
} from "../../constants/chat-models-data";
import { Button } from "../global/button/Button";
import { handlePdf } from "../../utils/handlePdf";
import { generateResearchPdf } from "../../utils/handleResearchPdf";
import ChatMultiSelect from "../chat/ChatMultiSelect/ChatMultiSelect";
import { chatService } from "../../services/chat.service";
import { conversationService } from "../../services/conversation.service";
import { DownloadIcon, ShareIcon } from "../../svgs/svg";
import { ModelSelectionButton } from "../chat/chatBox/components/ChatBoxContent";
import Image from "next/image";
import { useTheme } from "../../context/themeContext";

const Header = ({
  toggleSidebar,
  setToggleSidebar,
  className,
  handlePdfDownload,
  highlightSelected,
  setHighlightSelected,
}: any) => {
  const [sel, setSel] = useState<any>();
  const [chatId, setChatId] = useState("");
  const [isLoggedIn] = useLoggedInStatus();
  const router = useRouter();
  const { isDarkMode } = useTheme();
  const {
    currentChat,
    conversationMessages,
    changeChatLoading,
    setCurrentChat,
    setCurrentChatId,
    setConversationMessages,
    deleteChatLoading,
    selectedModelLoading,
    generatingMessage,
    startChatLoading,
    generatingPDFChats,
    selected,
    resetUserInput,
  } = useConversation();

  const isAnyLoading =
    deleteChatLoading ||
    selectedModelLoading ||
    generatingMessage ||
    changeChatLoading ||
    startChatLoading ||
    generatingPDFChats;

  useEffect(() => {
    const urlParams = new URLSearchParams(router.asPath.split("?")[1]);
    const id = urlParams.get("id");
    setChatId(id ?? "");
  }, [router]);

  useEffect(() => {
    if (!isEmpty(currentChat)) {
      const chatModel = currentChat.model;
      const chatType = currentChat?.chatType;
      if (chatType === EChatTypes.Chat) {
        const obj = Chat_Models.find((el) => el.key == chatModel);
        setSel(obj);
      } else if (chatType === EChatTypes.DEEP_RESEARCH) {
        const obj = Chat_Models.find((el) => el.key == EModels.GPT_4);
        setSel(obj);
      } else {
        const obj = Chat_Types.find((el) => el.key == chatType);
        setSel(obj);
      }
    }
    return () => {
      setSel(null);
    };
  }, [currentChat]);

  const onInitiateChat = () => {
    resetUserInput();
    setConversationMessages([]);
    setCurrentChat(null);
    setCurrentChatId("");
    router.replace(router.pathname, undefined, { shallow: true });
  };

  const handleSelectChat = (val: any) => {};

  const handleDownloadPdf = async () => {
    try {
      const isDeepResearch = currentChat?.chatType === EChatTypes.DEEP_RESEARCH;

      if (isDeepResearch) {
        const lastAiMessage = conversationMessages.findLast(
          (msg: any) =>
            msg.role === "system" && msg.model === EModels.DEEP_SEARCH
        );

        if (lastAiMessage) {
          const response = await conversationService.getResearchReportData(
            lastAiMessage._id
          );

          if (response.statusCode !== 200) {
            throw new Error(
              response.message || "Failed to fetch research report data"
            );
          }

          const reportData = response.payload;
          await generateResearchPdf(reportData);
          toast.success("PDF downloaded successfully");
        } else {
          throw new Error("No data found to download");
        }
      } else {
        const chat = await chatService.getChatById(chatId);
        const payload: any = chat.payload ?? null;
        if (payload) {
          handlePdf(
            payload.messages,
            payload?.title ?? currentChat?.title,
            payload?.files ?? []
          );
          toast.success("PDF downloaded successfully");
        }
      }
    } catch (error) {
      console.error("Failed to download PDF:", error);
      toast.error("Failed to download PDF");
    }
  };

  const hasHistory = (conversationMessages?.length ?? 0) > 0;

  return (
    <header
      className={`chatBoot__head flex h-[96px] items-center py-6 lg:pl-20 ${className}`}
    >
      <div className="flex flex-1 items-center gap-2 justify-start md:justify-end">
        <button
          className="md:hidden"
          aria-label="Open menu"
          onClick={() => setToggleSidebar(!toggleSidebar)}
        >
          <Image
            src={
              isDarkMode
                ? "/assets/images/dark-small-logo.svg"
                : "/assets/images/light-small-logo.svg"
            }
            alt="logo"
            width={26}
            height={26}
            className="h-[26px] w-[26px]"
          />
        </button>

        {selected?.key == EModels.ELIJAH && (
          <div className="w-full">
            <ChatMultiSelect optionsClass="flex flex-nowrap gap-2 w-full justify-start overflow-x-auto overflow-y-hidden scrollbar-hide" />
          </div>
        )}
        <div className="block md:hidden">
          <ModelSelectionButton
            selected={selected}
            isAnyLoading={isAnyLoading}
            highlightSelected={highlightSelected}
            setHighlightSelected={setHighlightSelected}
            placement="bottom"
          />
        </div>

        <div className="flex items-center gap-2">
          {chatId && hasHistory && (
            <div className="flex items-center gap-2">
              <Button
                disabled={isAnyLoading}
                size="md"
                className="!px-3 !text-sm"
                onClick={handleDownloadPdf}
              >
                <DownloadIcon />{" "}
                <span className="hidden lg:block">Download as .pdf</span>
              </Button>
              <button
                disabled={isAnyLoading}
                onClick={() => {
                  NiceModal.show("ShareModal");
                }}
                className={`btn fs-14 bg-whiteSmoke !py-2  px-3 outline-none duration-300 dark:bg-vulcan dark:text-white ${
                  isAnyLoading
                    ? "opacity-50 hover:opacity-50"
                    : "opacity-100 hover:opacity-70"
                }`}
              >
                <ShareIcon /> <span className="hidden lg:block">Share</span>
              </button>
            </div>
          )}
          <div className=" mr-5 hidden items-center gap-2 rounded-md bg-whiteSmoke p-1 dark:bg-blackRussian2 md:mr-0 md:flex">
            {sel && (conversationMessages?.length ?? 0) > 0 && (
              <SelectComponent
                Data={Chat_Model_data}
                selected={sel}
                setSelected={handleSelectChat}
                placeholder="Select Model"
                disabled={changeChatLoading || !isEmpty(currentChat)}
                hideIcon={!isEmpty(currentChat)}
                className="!py-[5px]"
              />
            )}
            {isLoggedIn && (
              <UserDropDown
                imgUrl={images.profileImg}
                className={"hidden md:block"}
              />
            )}
          </div>
        </div>
      </div>
      {hasHistory && (
        <button
          onClick={onInitiateChat}
          className="ml-4 block cursor-pointer text-2xl duration-300 hover:opacity-50 dark:text-white md:ml-0 md:hidden"
        >
          <FiEdit />
        </button>
      )}
    </header>
  );
};

export default Header;
