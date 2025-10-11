import NiceModal from "@ebay/nice-modal-react";
import React from "react";
import ConfirmationModal from "../ConfirmationModal";

interface AllChatsDeletionModalProps {
  onConfirm?: () => Promise<void> | void;
}

const AllChatsDeletionModal = NiceModal.create(({ onConfirm }: AllChatsDeletionModalProps = {}) => {
  const handleConfirm = async () => {
    if (onConfirm) {
      await onConfirm();
    }
  };

  return (
    <ConfirmationModal
      id="AllChatsDeletionModal"
      title="Confirm Deletion"
      message="Are you sure you want to delete all your chats? This action is irreversible, and your conversations will be permanently removed."
      onConfirm={handleConfirm}
      loadingStateKey="deleteAllChats"
    />
  );
});

export default AllChatsDeletionModal;