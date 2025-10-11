import NiceModal from "@ebay/nice-modal-react";
import React from "react";
import ConfirmationModal from "../ConfirmationModal";

interface DocumentDeleteModalProps {
  onConfirm?: () => Promise<void> | void;
}

const DocumentDeleteModal = NiceModal.create(({ onConfirm }: DocumentDeleteModalProps = {}) => {
  const handleConfirm = async () => {
    if (onConfirm) {
      await onConfirm();
    }
  };

  return (
    <ConfirmationModal
      id="DocumentDeleteModal"
      title="Delete Document"
      message="Are you sure you want to delete this Document?"
      onConfirm={handleConfirm}
      loadingStateKey="deleteDocument"
    />
  );
});

export default DocumentDeleteModal;