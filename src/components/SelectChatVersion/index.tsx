import React, { useEffect } from "react";
import { useRouter } from "next/router";
import { useSearchParams } from "next/navigation";
import NiceModal from "@ebay/nice-modal-react";
import { Chat, useConversation } from "../../context/conversation.context";
import { EGptModels } from "../../enums/gpt-models.enum";
import { HttpService } from "../../services/base.service";
import { chatService } from "../../services/chat.service";
import useSubscriptionPackage from "../../hooks/useSubscriptionPackage";
import { ISubscriptionType } from "../../enums/subscription.enum";
import { EModels } from "../../enums/modals.enum";
import { ChatGPT_3_5, ChatGPT_4o } from "../../constants/chat-models-data";
import { StarIcon } from "../../svgs/svg";

const tabs = [
  { name: EGptModels.GPT_4, key: EModels.GPT_4, icon: <StarIcon />, current: false },
];

export const gptDisplayNames: any = {
  [EGptModels.GPT_4]: "GPT-4o",
};

const SelectChatVersion = ({ IsCrown }: any) => {
  const router = useRouter();
  const {
    setConversationMessages,
    setCurrentChat,
    setCurrentChatId,
    setSelectedModelLoading,
    setSelectedModel,
    selectedModelLoading,
    generatingMessage,
    setRouterId,
    routerId,
    startChatLoading,
    changeChatLoading,
    selectedTabIdx,
    setSelectedTabIdx,
    setSelected,
  } = useConversation();
  const searchParams = useSearchParams();
  const chatId = searchParams.get("id");
  const { currentPackage }: any = useSubscriptionPackage();

  useEffect(() => {
    if (chatId) setRouterId(chatId);
  }, [chatId, setRouterId]);

  useEffect(() => {
    const fetchAllChats = async () => {
      if (routerId) {
        await handleChatFetchWithRouterId();
      } else {
        await handleChatFetchWithoutRouterId();
      }
    };

    const handleChatFetchWithRouterId = async () => {
      const res = await chatService.getChat();
      const payload = Array.isArray(res.payload) ? (res.payload as Chat[]) : null;
      const chat: Chat | null = payload?.find((ele) => ele._id === routerId) ?? null;
      if (chat?.model) {
        HttpService.setCookie("model", chat.model);
        setSelectedTabIdx(
          chat?.model === EGptModels.GPT_4 ? 0 : (1 as number)
        );
      } else {
        setSelectedTabIdx(0);
        HttpService.setCookie("model", EGptModels.GPT_4);
      }
    };

    const handleChatFetchWithoutRouterId = async () => {
      if (selectedTabIdx === 0) {
        HttpService.setCookie("model", EGptModels.GPT_4);
      }
    };
    fetchAllChats();
  }, [routerId, chatId, selectedTabIdx, setSelectedTabIdx]);

  const onChangeTab = (model: string, i: number) => {
    if (shouldShowSubscriptionModal(model)) {
      NiceModal.show("subscriptionModal");
      return;
    }
    if (generatingMessage) return;
    if (selectedModelLoading) return;
    setSelectedModelLoading(true);
    setConversationMessages([]);
    setSelectedTabIdx(i);
    HttpService.setCookie("model", model);
    setCurrentChat(null);
    setCurrentChatId("");
    if (model == EModels.GPT_3) {
      setSelected(ChatGPT_3_5);
      setSelectedModel(ChatGPT_3_5);
    }
    else if (model == EModels.GPT_4) {
      setSelected(ChatGPT_4o);
      setSelectedModel(ChatGPT_4o);
    }

    router.replace(router.pathname, undefined, { shallow: true });
    setRouterId("");
    setTimeout(() => {
      setSelectedModelLoading(false);
    }, 1000);
  };

  const shouldShowSubscriptionModal = (model: string) => {
    return (model !== EModels.GPT_3 && model !== EModels.GPT_4) && currentPackage == ISubscriptionType.FREE;
  };

  return (
    <ul className="chatVersion" aria-label="Tabs">
      {tabs.map((tab, i) => (
        <li key={tab.name}>
          <button
            disabled={
              generatingMessage ||
              selectedModelLoading ||
              startChatLoading ||
              changeChatLoading
            }
            onClick={() => onChangeTab(tab.key, i)}
            className={`${i === selectedTabIdx ? "btn-active" : ""}`}
          >
            <span className={`hidden lg:block`}>
              {gptDisplayNames[tab.name]}
            </span>
            <span>{tab.icon}</span>
          </button>
        </li>
      ))}
    </ul>
  );
};

export default SelectChatVersion;
