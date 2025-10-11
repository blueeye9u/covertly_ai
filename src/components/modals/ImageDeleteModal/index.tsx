import React from "react";
import NiceModal from "@ebay/nice-modal-react";
import ConfirmationModal from "../ConfirmationModal";

interface ImageDeleteModalProps {
  onConfirm: () => void;
  selectedCount?: number;
  isAll?: boolean;
}

const ImageDeleteModal = NiceModal.create(({ onConfirm, selectedCount, isAll }: ImageDeleteModalProps) => {
  let confirmationMessage;
  let title;
  
  if (isAll) {
    title = "Delete All Images";
    confirmationMessage = "Are you sure you want to delete all images? This action cannot be undone.";
  } else {
    title = "Delete Selected Images";
    const imageLabel = selectedCount === 1 ? 'image' : 'images';
    confirmationMessage = `Are you sure you want to delete ${selectedCount} selected ${imageLabel}? This action cannot be undone.`;
  }

  return (
    <ConfirmationModal
      id="imageDeleteModal"
      title={title}
      message={confirmationMessage}
      onConfirm={async () => onConfirm()}
      loadingStateKey="deleteImages"
    />
  );
});

export default ImageDeleteModal;