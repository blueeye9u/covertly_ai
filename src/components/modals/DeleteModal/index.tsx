import NiceModal from "@ebay/nice-modal-react";
import React from "react";
import toast from "react-hot-toast";
import { chatService } from "../../../services/chat.service";
import { errorHandler } from "../../../utils/errorHandler";
import { useConversation } from "../../../context/conversation.context";
import { useRouter } from "next/router";
import { HttpService } from "../../../services/base.service";
import { EGptModels } from "../../../enums/gpt-models.enum";
import ConfirmationModal from "../ConfirmationModal";

const DeleteModal = NiceModal.create(
  ({ chatId, setDeleteChatLoading, setConversationMessages, isDeepSearch = false }: any) => {
    const router = useRouter();
    const { 
      setCurrentChat, 
      setCurrentChatId, 
      setRouterId, 
      setSelectedModel, 
      setSelected, 
      setSearchChat, 
      setChatMessages 
    } = useConversation();

    const handleDelete = async () => {
      setDeleteChatLoading(true);
      try {
        // Send request to delete chat
        await chatService.deleteChatById(chatId);

        // Clear conversation context
        setConversationMessages([]);
        setCurrentChat(null);
        setCurrentChatId("");
        setRouterId("");
        setSelectedModel(null);
        setSearchChat("");
        setChatMessages(null);
        setSelected("");
        setSelectedModel("");
        HttpService.setCookie("model", EGptModels.GPT_4);

        // Refresh the page to ensure no related data is left
        router.replace(router.pathname, undefined, { shallow: true });

        toast.success("Chat conversation deleted successfully");

        setDeleteChatLoading(false);
      } catch (error: unknown) {
        // Handle error
        setDeleteChatLoading(false);
        errorHandler(error);
        toast.error("Failed to delete chat conversation. Please try again.");
        throw error; // Re-throw to prevent modal from closing
      }
    };

    return (
      <ConfirmationModal
        id="deleteModal"
        title={isDeepSearch ? "Delete Deep Search Conversation" : "Delete Chat Conversation"}
        message={isDeepSearch
          ? "Are you sure you want to delete this deep search conversation? This will not affect your regular chats."
          : "Are you sure you want to delete this chat conversation?"}
        onConfirm={handleDelete}
        loadingStateKey="deleteChat"
      />
    );
  }
);

export default DeleteModal;