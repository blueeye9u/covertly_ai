import React, { useState } from "react";
import NiceModal, { useModal } from "@ebay/nice-modal-react";
import { useRouter } from "next/router";
import BasicModal from "../../global/basicmodal/BasicModal";
import { Button } from "../../global/button/Button";
import { useDebouncedClick } from "../../../hooks/useDebouncedClick";
import { authService } from "../../../services/auth.service";
import { setAutoRedactionAuth } from "../../../utils/autoRedactionAuth";

const AutoRedactionPasswordModal = NiceModal.create(() => {
  const modal = useModal();
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  
  const [handleClick, loadingStates] = useDebouncedClick();

  const handleSubmit = () => {
    handleClick(async () => {
      try {
        setError("");
        const response = await authService.verifyAutoRedactionPassword(password);
        
        if (response.payload.success) {
          // Store auth token in session for redaction access
          setAutoRedactionAuth();
          modal.remove();
          router.push("/redaction");
        } else {
          setError("Invalid password");
        }
      } catch (error) {
        console.error("Password verification failed:", error);
        setError("Something went wrong. Please try again.");
      }
    }, "verifyPassword");
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSubmit();
    }
  };

  return (
    <BasicModal show={modal.visible} hide={modal.hide}>
      <div className="flex w-full flex-col items-center rounded-lg bg-whiteSmoke dark:bg-blackRussian2 p-8 pt-10 sm:w-[400px]">
        <h2 className="fs-24 mb-4 font-medium">Auto Redaction Access</h2>
        <p className="mb-6 text-sm text-aluminium text-center">
          This feature requires special access. Please enter the password to continue.
        </p>
        
        <div className="w-full mb-6">
          <input
            type="password"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onKeyPress={handleKeyPress}
            className="w-full p-3 rounded-lg border dark:border-blackRussian3 border-linkWater50 dark:bg-blackRussian bg-white dark:text-white text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
            autoFocus
          />
          {error && (
            <p className="mt-2 text-sm text-red-500">{error}</p>
          )}
        </div>

        <div className="flex w-full gap-4">
          <Button
            size="md"
            variant="outline"
            onClick={() => modal.remove()}
            className="!text-black dark:!text-white"
          >
            Cancel
          </Button>
          <Button
            size="md"
            variant="outline"
            isLoading={loadingStates["verifyPassword"]}
            disabled={loadingStates["verifyPassword"] || !password.trim()}
            className="border-0 bg-blue-500 text-white hover:bg-blue-600"
            onClick={handleSubmit}
          >
            Access
          </Button>
        </div>
      </div>
    </BasicModal>
  );
});

export default AutoRedactionPasswordModal;