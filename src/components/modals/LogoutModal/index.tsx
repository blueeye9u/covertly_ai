import NiceModal from "@ebay/nice-modal-react";
import React from "react";
import { errorHandler } from "../../../utils/errorHandler";
import { useRouter } from "next/router";
import { HttpService } from "../../../services/base.service";
import { UN_AUTHENTICATED_ROUTES } from "../../../constants/routes";
import ConfirmationModal from "../ConfirmationModal";

const LogoutModal = NiceModal.create(() => {
  const router = useRouter();

  const handleLogout = async () => {
    try {
      HttpService.clearCookie();
      const route = UN_AUTHENTICATED_ROUTES.LOGIN as string;
      router.push(route);
    } catch (error: unknown) {
      // Handle error
      errorHandler(error);
      throw error; // Re-throw to prevent modal from closing
    }
  };

  return (
    <ConfirmationModal
      id="logoutModal"
      title="Logout"
      message="Are you sure you want to logout?"
      onConfirm={handleLogout}
      loadingStateKey="logout"
      confirmButtonText="Yes, Logout"
     />
  );
});

export default LogoutModal;