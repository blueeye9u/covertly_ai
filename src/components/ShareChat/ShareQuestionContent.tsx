import React, { useEffect } from "react";
import Markdown, { Components } from "react-markdown";
import remarkGfm from "remark-gfm";
import { v4 as uuidv4 } from "uuid";
import useSubscriptionPackage from "../../hooks/useSubscriptionPackage";
import ImageComponent from "../global/imageComponent/ImageComponent";
import { images } from "../../assets/images";
import useLoggedInUser from "../../hooks/useLoggedInUser";

interface File {
  name: string;
}

interface Message {
  _id: string;
  content: string;
}

interface ShareQuestionContentProps {
  message: Message;
  index: number;
  isLoading: boolean;
  userSetHandler: (user: any) => void;
  currentChatWithFile: { files?: File[] } | null;
  copyFiles: File[];
}

const markdownComponents: Components = {
  a: ({ node, ...props }) => (
    <a {...props} target="_blank" rel="noopener noreferrer">
      🔗
    </a>
  ),
};

const shouldDisplayCopyFiles = (index: number, copyFiles: File[]): boolean => {
  return index === 0 && copyFiles.length > 0;
};

const shouldDisplayCurrentChatFiles = (
  index: number,
  currentChatWithFile: { files?: File[] } | null
): boolean => {
  return index === 0 && !!currentChatWithFile?.files?.length;
};

const getFilesToDisplay = (
  index: number,
  copyFiles: File[],
  currentChatWithFile: { files?: File[] } | null
): File[] => {
  if (shouldDisplayCopyFiles(index, copyFiles)) {
    return copyFiles;
  }

  if (shouldDisplayCurrentChatFiles(index, currentChatWithFile)) {
    return currentChatWithFile?.files ?? [];
  }

  return [];
};

const FileDisplay: React.FC<{ files: File[] }> = ({ files }) => {
  return (
    <>
      {files.map((item) => (
        <div
          key={uuidv4()}
          className="w-full bg-whiteSmoke dark:bg-blackRussian3 py-3 px-4 rounded-md flex gap-3 items-start group"
        >
          <ImageComponent src="/assets/images/pdf.svg" width={20} height={20} alt={`pdf-image-${uuidv4()}`}/>
          <div className="grow flex flex-col">
            <div className="flex justify-between gap-2 mb-1">
              <p className="text-sm dark:text-white truncate leading-tight w-36">
                {decodeURIComponent(item?.name ?? "")}
              </p>
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

const ShareQuestionContent: React.FC<ShareQuestionContentProps> = ({
  message,
  index,
  isLoading,
  userSetHandler,
  currentChatWithFile,
  copyFiles,
}) => {
  const { User } = useSubscriptionPackage();
  const filesToDisplay = getFilesToDisplay(index, copyFiles, currentChatWithFile);
  const [,,selectedImage] = useLoggedInUser();

  useEffect(() => {
    userSetHandler(User);
  }, [User, userSetHandler]);

  return (
    <div key={message._id} id={message._id} className="chatBoot__sender chatBoot__message">
      <div className="flex gap-3 items-center">
        <ImageComponent
          src={selectedImage || images.avatar}
          fill="fill"
          figClassName="shrink-0 w-8 h-8"
          className="rounded-full object-cover"
          alt="avatar-image"
        />
        <p className="text-gradient !mb-0 text-sm font-semibold">Anonymous</p>
      </div>

      <div className="grow">
        <div className="markdown-container whitespace-pre-wrap">
          <Markdown
            className="whitespace-pre-wrap"
            remarkPlugins={[remarkGfm]}
            components={markdownComponents}
          >
            {message.content}
          </Markdown>
          {isLoading && filesToDisplay.length > 0 && (
            <FileDisplay files={filesToDisplay} />
          )}
        </div>
      </div>
    </div>
  );
};

export default ShareQuestionContent;