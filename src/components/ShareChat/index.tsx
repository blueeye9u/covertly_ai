import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { getCookie } from "../../utils/getCookie";
import ChatBootLayout from "../ChatBootLayout";
import ShareChatBox from "./ShareChatBox";
import { HttpService } from "../../services/base.service";
import { useConversation } from "../../context/conversation.context";
import { useFetchSharedChat } from "../../hooks/useFetchSharedChat";
import { AUTHENTICATED_ROUTES, UN_AUTHENTICATED_ROUTES } from "../../constants/routes";
import { EGptModels } from "../../enums/gpt-models.enum";

interface ChatModuleProps { }

const ShareChatModule: React.FC<ChatModuleProps> = () => {

  // State management
  const [toggleSidebar, setToggleSidebar] = useState<boolean>(true);
  // Indicates whether the sidebar is toggled
  const [editableMessageId] = useState<string | null>(null); // ID of the editable message
  const [editedMessage, setEditedMessage] = useState<string>(""); // Edited message content
  const [userInput, setUserInput] = useState<string>(""); // UserData input for sending messages
  const [regeneratingMessageId] = useState<string | null>(null); // ID of the message being regenerated
  // Router
  const router = useRouter();

  // Conversation state management
  const {
    setConversationMessages,
    setCurrentChat,
    currentChat,
    conversationMessages,
    setCurrentChatId,
    generatingMessage,
    setSelectedModel,
    setChatMessages,
    setSelected,
  } = useConversation(); // Hooks for managing conversation state
  const { error } = useFetchSharedChat();

  useEffect(() => {
    const urlParams = new URLSearchParams(router.asPath.split('?')[1]);
    const id = urlParams.get('id');
    if (!id || error) {
      setSelected("");
      setSelectedModel("");
      setConversationMessages([]);
      setCurrentChatId("");
      setCurrentChat(null);
      setChatMessages([]);
      HttpService.setCookie("model", EGptModels.GPT_4);
      const token = getCookie("token");
      if (token) {
        router.push(AUTHENTICATED_ROUTES.CHAT);
      } else {
        router.push(UN_AUTHENTICATED_ROUTES.LOGIN as string);
      }
    }
  }, [router.asPath, error]);


  return (
    <ChatBootLayout
      toggleSidebar={toggleSidebar}
      setToggleSidebar={setToggleSidebar}
      copyFiles={() => {}}
      currentChat={currentChat}
    >
      <ShareChatBox
        currentChat={currentChat}
        userSetHandler={() => {}}
        conversationMessages={conversationMessages}
        fetchingData={generatingMessage}
        editableMessageId={editableMessageId}
        handleInputKeyDownOnEdit={() => {}}
        handleUpdateMessage={() => {}}
        handleCancel={() => {}}
        handleEdit={() => []}
        regeneratingMessageId={regeneratingMessageId}
        handleRegenerateMessage={() => {}}
        userInput={userInput}
        setUserInput={setUserInput}
        handleInputChange={() => {}}
        handleInputKeyDown={() => {}}
        handleSendMessage={() => {}}
        editedMessage={editedMessage}
        setEditedMessage={setEditedMessage}
        toggleSidebar={toggleSidebar}
        setToggleSidebar={setToggleSidebar}
        copyFiles={() => {}}
      />
    </ChatBootLayout>
  );
};

export default ShareChatModule;
