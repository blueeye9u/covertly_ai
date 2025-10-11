import React, { useState, useEffect, useRef, useCallback } from "react";
import toast from "react-hot-toast";
import NiceModal from "@ebay/nice-modal-react";
import { chatService } from '../../../services/chat.service';
import { userService } from '../../../services/user.service';
import useLoggedInUser from '../../../hooks/useLoggedInUser';
import {imageGenerationService} from "../../../services/image-generate";
import { useDeepSearchChatsCount } from '../../../hooks/useDeepSearchChatsCount';
import { useImageGeneration } from '../../../context/imageGeneration.context';

const PurgingSettings = () => {
  const [ user,,,, refreshProfile]: any = useLoggedInUser();
  const [chatDeletionDays, setChatDeletionDays] = useState(1);
  const [pendingChatDeletionDays, setPendingChatDeletionDays] = useState(1);
  const [isSaving, setIsSaving] = useState(false);
  const lastSavedDays = useRef(1);
  const { normalChatsCount, fetchChatsCount } = useDeepSearchChatsCount();
  const { imageGenerationLibrary, setImageGenerationLibrary } = useImageGeneration();
  const [isDeletingImages, setIsDeletingImages] = useState(false);
  const [isDeletingChats, setIsDeletingChats] = useState(false);

  // Helper: total images count
  const totalImages = imageGenerationLibrary?.paginationInfo?.totalRecords || 0;

  // Refresh image count after deletion
  const refreshImages = useCallback(async () => {
    try {
      const res = await imageGenerationService.getAllGeneratedImages({ page: 1, limit: 1 });
      setImageGenerationLibrary((prev) => ({
        ...prev,
        paginationInfo: {
          ...prev.paginationInfo,
          totalRecords: res?.payload?.paginationInfo?.totalRecords || 0,
        },
      }));
    } catch {}
  }, [setImageGenerationLibrary]);

  useEffect(() => {
    if (user) {
      const days = user.chatDeletionDays || 1;
      setChatDeletionDays(days);
      setPendingChatDeletionDays(days);
      lastSavedDays.current = days;
    }
  }, [user]);

  // Load image count on component mount
  useEffect(() => {
    refreshImages();
  }, [refreshImages]);

  const handleAllChatDeletion = async () => {
    setIsDeletingChats(true);
    try {
      await chatService.deleteChatAll();
      toast.success('All chats deleted successfully');
      await fetchChatsCount();
    } catch (err) {
      console.error('Chat deletion failed:', err);
      toast.error('Failed to delete chats');
    } finally {
      setIsDeletingChats(false);
    }
  };

  const handleDeleteAllImages = () => {
    console.log(totalImages)
    NiceModal.show('imageDeleteModal', {
      onConfirm: async () => {
        setIsDeletingImages(true);
        try {
          await imageGenerationService.deleteAllImages();
          toast.success('All images deleted successfully');
          await refreshImages();
        } catch (error) {
          console.error('Failed to delete all images:', error);
          toast.error('Failed to delete images');
        } finally {
          setIsDeletingImages(false);
        }
      },
      isAll: true,
    });
  };

  const saveChatDeletionDays = async () => {
    if (isSaving || pendingChatDeletionDays === chatDeletionDays) return;

    setIsSaving(true);
    try {
      await userService.updateChatDeletionSettings({
        chatDeletionDays: pendingChatDeletionDays
      });
      setChatDeletionDays(pendingChatDeletionDays);
      lastSavedDays.current = pendingChatDeletionDays;
      await refreshProfile();
      toast.success('Chat deletion settings updated successfully');
    } catch (error) {
      console.error('Failed to update chat deletion days:', error);
      toast.error('Failed to update chat deletion settings');
    } finally {
      setIsSaving(false);
    }
  };

  const handleSliderChange = (days: number) => {
    setPendingChatDeletionDays(days);
  };

  const handleDaysChange = (days: number) => {
    setPendingChatDeletionDays(days);
  };
  return (
    <div className="w-full">
      <div className="mb-6">
        <h2 className="text-xl font-medium mb-1">Image Purging Settings</h2>
        <p className="text-aluminium text-sm mb-6">Generated images will be removed after 1 week automatically.</p>
      </div>
      <div
        className="bg-[#D0312D1F] p-6 rounded-lg mb-10 flex md:flex-row flex-col items-start md:items-center gap-4 md:gap-10 xl:gap-20 justify-center">
        <div>
          <h3 className="font-semibold">All Images Deletion</h3>
          <p className="text-sm text-aluminium">
            If you want to instantly delete all your generated images, click the button to remove them immediately.
            This ensures your generated images are erased instantly.
          </p>
        </div>
        <button
          onClick={handleDeleteAllImages}
          disabled={isDeletingImages || totalImages === 0}
          className={`px-8 py-[14px] rounded shrink-0 text-white transition-all duration-200 border ${
            isDeletingImages || totalImages === 0
              ? 'bg-gray-500 text-gray-300 cursor-not-allowed opacity-75 border-gray-400 shadow-sm'
              : 'bg-red-500 hover:bg-red-600 cursor-pointer border-red-600 shadow-md hover:shadow-lg'
          }`}
        >
          Delete All Generated Images
        </button>
      </div>
      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-1">Chat Deletion Settings</h2>
        <p className="text-aluminium text-sm mb-8">Update your chat deletion settings, ensuring privacy and control over
          your data.</p>

        <div className="bg-gray-50 dark:bg-vulcan p-6 rounded-lg mb-6">
          <div className="mb-4">
            <h3 className="font-semibold text-lg">Auto Chat Deletion</h3>
            <p className="text-sm text-aluminium">
              Chats will be automatically deleted after the specified number of days (1-7 days)
            </p>
          </div>

          <div className="mt-4">
            <label className="block text-sm font-medium mb-3">
              Delete chats after: {pendingChatDeletionDays} day{pendingChatDeletionDays === 1 ? '' : 's'}
            </label>
            <div className="flex items-end sm:items-center space-x-4 space-y-2 sm:space-y-0 flex-col sm:flex-row">
              <input
                type="range"
                min="1"
                max="7"
                value={pendingChatDeletionDays}
                onChange={(e) => handleSliderChange(Number.parseInt(e.target.value))}
                disabled={isSaving}
                className="w-full sm:flex-1 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700 slider"
                style={{
                  background: `linear-gradient(to right, #3b82f6 0%, #3b82f6 ${((pendingChatDeletionDays - 1) / 6) * 100}%, #e5e7eb ${((pendingChatDeletionDays - 1) / 6) * 100}%, #e5e7eb 100%)`
                }}
              />
              <div className="w-full sm:w-fit flex justify-between sm:justify-start text-xs text-gray-500">
                {[1, 2, 3, 4, 5, 6, 7].map((day) => (
                  <button
                    key={day}
                    onClick={() => handleDaysChange(day)}
                    disabled={isSaving}
                    className={`w-6 h-6 rounded-full text-xs font-medium ${
                      pendingChatDeletionDays === day
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-200 dark:bg-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-500'
                    } ${isSaving ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
                  >
                    {day}
                  </button>
                ))}
              </div>
              <button
                onClick={saveChatDeletionDays}
                disabled={isSaving || pendingChatDeletionDays === chatDeletionDays}
                className={`px-4 py-2 ml-4 rounded text-sm font-medium transition-all duration-200 min-w-24 border ${
                  isSaving || pendingChatDeletionDays === chatDeletionDays
                    ? 'bg-gray-300 dark:bg-gray-600 text-gray-500 dark:text-gray-400 cursor-not-allowed border-gray-400 dark:border-gray-500'
                    : 'bg-blue-600 hover:bg-blue-700 text-white cursor-pointer shadow-sm hover:shadow-md border-blue-600 hover:border-blue-700'
                }`}
              >
                {isSaving ? 'Saving...' : 'Save'}
              </button>
            </div>
          </div>
        </div>
      </div>
      <div
        className="bg-[#D0312D1F] p-6 rounded-lg mb-10 flex md:flex-row flex-col items-start md:items-center gap-4 md:gap-10 xl:gap-20 justify-center">
        <div>
          <h3 className="font-semibold">All Chat Deletion</h3>
          <p className="text-sm text-aluminium">
            If you want to instantly delete all your chats, click the button to remove them immediately. This ensures
            your conversations are erased instantly.
          </p>
        </div>
        <button
          onClick={() => {
            NiceModal.show('AllChatsDeletionModal', {
              onConfirm: handleAllChatDeletion,
            });
          }}
          disabled={isDeletingChats || normalChatsCount === 0}
          className={`px-8 py-[14px] rounded shrink-0 text-white transition-all duration-200 border ${
            isDeletingChats || normalChatsCount === 0
              ? 'bg-gray-500 text-gray-300 cursor-not-allowed opacity-75 border-gray-400 shadow-sm'
              : 'bg-red-500 hover:bg-red-600 cursor-pointer border-red-600 shadow-md hover:shadow-lg'
          }`}
        >
          Delete Chats
        </button>
      </div>
    </div>
  );
};

export default PurgingSettings;