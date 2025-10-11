import Image from "next/image";
import { useState } from "react";
import { UploadedFile } from "../../../../context/conversation.context";
import UploadProgressSpinner from '../../../UploadProgressSpinner/UploadProgressSpinner';
import ConversationImageModal from './ConversationImageModal';

interface ConversationFilesProps {
  currentChat: {
    files: Array<UploadedFile>;
  };
  conversationId: string;
  isFileUploading: boolean;
}

export default function ConversationFiles({ currentChat, conversationId, isFileUploading }: Readonly<ConversationFilesProps>) {
  const files = currentChat?.files?.filter((f: any) => f?.conversation_id === conversationId);
  const [selectedImage, setSelectedImage] = useState<{ url: string; name: string } | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleImageClick = (url: string, name: string) => {
    setSelectedImage({ url, name });
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedImage(null);
  };

  if (files && files?.length > 0) {
    return (
      <>
        <div className="grid max-w-[600px] grid-cols-4 sm:grid-cols-5 gap-2">
          {files.map((item: UploadedFile, i: any) => {
            const lower = (str?: string) => (str || "").toLowerCase();
            const hasExt = (str: string, exts: string[]) => exts.some((e) => lower(str).endsWith(e));
            const isImage =
              lower((item as any)?.type)?.startsWith("image/") ||
              hasExt(item?.originalName || "", [".png", ".jpg", ".jpeg", ".webp", ".gif"]) ||
              hasExt(item?.name || "", [".png", ".jpg", ".jpeg", ".webp", ".gif"]) ||
              hasExt(item?.url || "", [".png", ".jpg", ".jpeg", ".webp", ".gif"]);
            const isPdf =
              lower((item as any)?.type) === "application/pdf" ||
              hasExt(item?.originalName || "", [".pdf"]) ||
              hasExt(item?.name || "", [".pdf"]) ||
              hasExt(item?.url || "", [".pdf"]);
            const isAudio =
              lower((item as any)?.type)?.startsWith("audio/") ||
              hasExt(item?.originalName || "", [".mp3", ".wav"]) ||
              hasExt(item?.name || "", [".mp3", ".wav"]) ||
              hasExt(item?.url || "", [".mp3", ".wav"]);

            let fileType: string;
            if (isImage) {
              fileType = "Image";
            } else if (isPdf) {
              fileType = "PDF";
            } else if (isAudio) {
              fileType = "Audio";
            } else {
              fileType = "File";
            }

            return (
              <div
                key={(item as any)._id ?? item.id}
                className={`group relative overflow-hidden rounded-md border border-linkWater/40 bg-whiteSmoke p-1.5 dark:border-blackRussian3 dark:bg-blackRussian2 shadow-sm transition-all duration-200 hover:shadow-md ${(() => {
                  if (isFileUploading && !item.url) {
                    return "animate-pulse";
                  }
                  return "";
                })()}`}
              >
                <div className="relative w-full pt-[100%] rounded-md bg-linkWater/20 dark:bg-blackRussian4">
                  {isFileUploading && !item.url && (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <UploadProgressSpinner size="w-6 h-6" color="text-blue-500" isUploading={isFileUploading} />
                    </div>
                  )}

                  {(() => {
                    if (!isFileUploading || item.url) {
                      if (fileType === "Image" && item.url) {
                        return (
                          <button
                            onClick={() => handleImageClick(item.url, item.originalName ?? item.name)}
                            className="absolute inset-0 block w-full h-full"
                          >
                            <Image
                              src={item.url}
                              alt={item.originalName ?? item.name}
                              fill
                              sizes="64px"
                              className="object-cover rounded-md cursor-pointer hover:opacity-80 transition-opacity duration-200"
                            />
                          </button>
                        );
                      }
                      return (
                        <div className="absolute inset-0 flex items-center justify-center">
                          <figure className="shrink-0">
                            {fileType === "Audio" && (
                              <Image src={"assets/images/audio-color.svg"} alt="audio" width={24} height={24} />
                            )}
                            {fileType === "PDF" && (
                              <Image src={"assets/images/pdf-color.svg"} alt="pdf" width={24} height={24} />
                            )}
                            {fileType !== "Audio" && fileType !== "PDF" && (
                              <Image src={"assets/images/image-color.svg"} alt="file" width={24} height={24} />
                            )}
                          </figure>
                        </div>
                      );
                    }
                    return null;
                  })()}
                </div>
                <p className="mt-1 text-[10px] leading-tight line-clamp-1 truncate text-ellipsis dark:text-white">
                  {item.originalName ?? item.name}
                </p>
              </div>
            );
          })}
        </div>

        {/* Custom Image Modal */}
        {selectedImage && (
          <ConversationImageModal
            isOpen={isModalOpen}
            onClose={handleCloseModal}
            imageUrl={selectedImage.url}
            imageName={selectedImage.name}
          />
        )}
      </>
    );
  } else {
    return null;
  }
};
