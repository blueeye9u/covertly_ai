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

const DeleteAllChatModal = NiceModal.create(
  ({ setDeleteChatLoading, setConversationMessages, isDeepSearch = false }: any) => {
    const router = useRouter();

    const { 
      setCurrentChat, 
      setCurrentChatId, 
      setRouterId, 
      setSelected, 
      setSelectedModel, 
      setSearchChat, 
      setChatMessages 
    } = useConversation();

    const handleDelete = async () => {
      setDeleteChatLoading(true);
      try {
        // Send request to delete chats based on context using specific methods
        if (isDeepSearch) {
          // Delete only deep search chats
          await chatService.deleteDeepSearchChatAll();
        } else {
          // Delete only normal chats (excluding deep search)
          await chatService.deleteNormalChatAll();
        }

        // Clear conversation context
        setConversationMessages([]);
        setCurrentChat(null);
        setCurrentChatId("");
        setRouterId("");
        setSearchChat("");
        setChatMessages(null);
        setSelected("");
        setSelectedModel("");
        HttpService.setCookie("model", EGptModels.GPT_4);

        // Refresh the page to ensure no related data is left
        router.replace(router.pathname, undefined, { shallow: true });

        toast.success(isDeepSearch ? "All deep search conversations deleted successfully" : "All chat conversations deleted successfully");

        setDeleteChatLoading(false);
      } catch (error: unknown) {
        // Handle error
        setDeleteChatLoading(false);
        errorHandler(error);
        toast.error(isDeepSearch 
          ? "Failed to delete deep search conversations. Please try again." 
          : "Failed to delete chat conversations. Please try again."
        );
        throw error; // Re-throw to prevent modal from closing
      }
    };

    return (
      <ConfirmationModal
        id="deleteAllChatModal"
        title={isDeepSearch ? "Delete All Deep Search Conversations" : "Delete All Chat Conversations"}
        message={isDeepSearch 
          ? "Are you sure you want to delete all deep search conversations? This will not affect your regular chats."
          : "Are you sure you want to delete all chat conversations?"
        }
        onConfirm={handleDelete}
        loadingStateKey="deleteAllChats"
      />
    );
  }
);

export default DeleteAllChatModal;