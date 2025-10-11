import React from "react";
import NiceModal, { useModal } from "@ebay/nice-modal-react";
import BasicModal from "../../global/basicmodal/BasicModal";
import { Button } from "../../global/button/Button";
import { useDebouncedClick } from "../../../hooks/useDebouncedClick";

interface ConfirmationModalProps {
  /**
   * Title text to display in the modal header
   */
  title: string;
  
  /**
   * Message text to display in the modal body
   */
  message: string;
  
  /**
   * Text to display on the confirm button
   * @default "Delete"
   */
  confirmButtonText?: string;
  
  /**
   * Text to display on the cancel button
   * @default "Cancel"
   */
  cancelButtonText?: string;
  
  /**
   * Function to call when confirm button is clicked
   */
  onConfirm: () => Promise<void> | void;
  
  /**
   * Key for identifying loading state in debounced click hook
   * @default "confirmAction"
   */
  loadingStateKey?: string;
  
  /**
   * CSS class to apply to the confirm button
   * @default "border-0 bg-danger"
   */
  confirmButtonClassName?: string;
}

/**
 * A reusable confirmation modal component that provides a consistent UI for
 * confirmation dialogs across the application.
 */
const ConfirmationModal = NiceModal.create(({
  title,
  message,
  confirmButtonText = "Delete",
  cancelButtonText = "Cancel",
  onConfirm,
  loadingStateKey = "confirmAction",
  confirmButtonClassName = "border-0 bg-danger",
}: ConfirmationModalProps) => {
  const modal = useModal();
  
  // Custom hook for handling debounced click events
  const [handleClick, loadingStates] = useDebouncedClick();
  
  const handleConfirm = () => {
    handleClick(async () => {
      try {
        await onConfirm();
        modal.remove();
      } catch (error) {
        // Error is handled by the onConfirm function
        // We just need to keep the modal open
        console.error("Error during confirmation:", error);
      }
    }, loadingStateKey);
  };
  
  return (
    <BasicModal show={modal.visible} hide={modal.hide}>
      <div className="flex w-full flex-col items-center rounded-lg bg-whiteSmoke dark:bg-blackRussian2 p-8 pt-10 sm:w-[400px]">
        <h2 className="fs-24 mb-4 font-medium">{title}</h2>
        <p className="mb-8 text-sm text-aluminium">
          {message}
        </p>
        <div className="flex w-full gap-4">
          <Button
            size="md"
            variant="outline"
            onClick={() => {
              modal.remove();
            }}
            className="!text-black dark:!text-white"
          >
            {cancelButtonText}
          </Button>
          <Button
            size="md"
            variant="outline"
            isLoading={loadingStates[loadingStateKey]}
            disabled={loadingStates[loadingStateKey]}
            className={confirmButtonClassName}
            onClick={handleConfirm}
          >
            {confirmButtonText}
          </Button>
        </div>
      </div>
    </BasicModal>
  );
});

export default ConfirmationModal;