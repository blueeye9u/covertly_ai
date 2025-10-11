import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { toast } from "react-hot-toast";
import BasicModal from "../../global/basicmodal/BasicModal";
import NiceModal, { useModal } from "@ebay/nice-modal-react";
import { Select } from "../../Select";
import { chatService } from "../../../services/chat.service";
import { EShareability } from "../../../interfaces/chat";
import { ErrorIcon, LoadingSmallIcon, CopyIcon } from "../../../svgs/svg";

const options = [
  { id: 1, name: "View only", value: EShareability.VIEW },
  { id: 2, name: "View and Download", value: EShareability.VIEW_AND_DOWNLOAD },
];

const ShareModal = NiceModal.create(() => {
  const router = useRouter();
  const modal = useModal();
  const [selectedOption, setSelectedOption] = useState(options[0]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [shareLink, setShareLink] = useState("");

  useEffect(() => {
    if (modal.visible) {
      const urlParams = new URLSearchParams(router.asPath.split('?')[1]);
      const id = urlParams.get('id');
      if (id) {
        handleShare(id);
      }
    } else {
      setShareLink("");
      setError("");
      setLoading(false);
      setSelectedOption(options[0]);
    }
  }, [modal.visible, selectedOption]);

  const handleShare = async (chatId: string) => {
    try {
      setError("");
      setLoading(true);
      const res = await chatService.shareChat({
        chat: chatId,
        shareability: selectedOption.value as EShareability,
      });
      setShareLink(res?.payload?.shareLink);
      setLoading(false);
    } catch (error) {
      console.error("Error sharing chat:", error);
      setError("Failed to generate share link. Please try again.");
      setLoading(false);
    }
  };

  const handleCopyToClipboard = async () => {
    navigator.clipboard
      .writeText(shareLink)
      .then(() => {
        toast.success("Link copied to clipboard!");
      })
      .catch(() => {
        toast.error("Failed to copy the link");
      });
  };

  return (
    <BasicModal show={modal.visible} hide={modal.hide}>
      <div className="flex w-full flex-col rounded-lg bg-whiteSmoke !px-6 !py-4 dark:bg-blackRussian2 sm:w-[31.25rem]">
        <h6 className="mb-4 border-b border-linkWater pb-4 text-start dark:border-vulcan">
          Share this chat
        </h6>
        <div className="mb-6 flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
          <p className="text-start dark:text-white">Select Access Type</p>
          <Select
            options={options}
            selectedOption={selectedOption}
            onChange={(newValue) => setSelectedOption(newValue)}
          />
        </div>
        {selectedOption.value && !loading && !error ? (
          <div className="flex items-center justify-between gap-8 rounded-md bg-linkWater p-4 dark:bg-vulcan">
            <p className="w-[150px] truncate dark:text-ghost sm:w-[360px]">
              {shareLink}
            </p>
            <button
                onClick={handleCopyToClipboard}
                className="shrink-0 cursor-pointer dark:text-white"
            >
              <CopyIcon />
            </button>
          </div>
        ) : (
          <div className="flex items-center justify-center h[56px]">
            {loading && (
              <LoadingSmallIcon />
            )}
            {error && (
              <div className="mt-2 flex items-center gap-2">
                <span>
                  <ErrorIcon />
                </span>
                <p className="text-start text-sm text-red-500">{error}</p>
              </div>
            )}
          </div>
        )}
      </div>
    </BasicModal>
  );
});

export default ShareModal;
