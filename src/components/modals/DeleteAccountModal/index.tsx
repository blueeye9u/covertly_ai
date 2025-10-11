import React from "react";
import NiceModal from "@ebay/nice-modal-react";
import { userService } from "../../../services/user.service";
import { errorHandler } from "../../../utils/errorHandler";
import ConfirmationModal from "../ConfirmationModal";
import { HttpService } from "../../../services/base.service";
import { useRouter } from "next/router";
import { UN_AUTHENTICATED_ROUTES } from "../../../constants/routes";

const DeleteAccountModal = NiceModal.create(() => {
  const router = useRouter();

  const handleDelete = async () => {
    try {
      await userService.deleteAccountHandler();
      HttpService.clearCookie();
      localStorage.clear();
      const route = UN_AUTHENTICATED_ROUTES.LOGIN as string;
      router.push(route);
    } catch (error: unknown) {
      errorHandler(error);
      throw error;
    }
  };

  return (
    <ConfirmationModal
      id="deleteAccountModal"
      title="Delete Account"
      message="Are you sure you want to permanently delete your account? This action cannot be undone."
      onConfirm={handleDelete}
      loadingStateKey="deleteAccount"
      confirmButtonText="Yes, delete my account"
      confirmButtonClassName="border-0 bg-danger"
    />
  );
});

export default DeleteAccountModal;
