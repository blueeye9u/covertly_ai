import React, { useEffect, useMemo, useRef } from "react";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { v4 as uuidv4 } from "uuid";
import { useConversation } from '../../../../context/conversation.context';
import { Button } from "../../../global/button/Button";
import { EditIcon } from "../../../../svgs/svg";
import { getCookie } from "../../../../utils/getCookie";
import { getFullName, getRandomName } from "../../../../utils/getRandomName";
import useSubscriptionPackage from "../../../../hooks/useSubscriptionPackage";
import ImageComponent from "../../../global/imageComponent/ImageComponent";
import { images } from "../../../../assets/images";
import AutoResizeTextarea from "../../../AutoResizeTextarea";
import useLoggedInUser from "../../../../hooks/useLoggedInUser";
import { EModels } from '../../../../enums/modals.enum';
import { MAX_INPUT_LENGTH } from "../../../../constants/input-limits";

// Extracted components
const MarkdownLink = ({ node, ...props }: any) => (
  <a {...props} target="_blank" rel="noopener noreferrer" aria-label="Open external link" />
);

interface FileDisplayProps {
  files: any[];
}

export const FileDisplay: React.FC<FileDisplayProps> = ({ files }) => {
  return (
    <>
      {files.map((item: any) => (
        <div key={uuidv4()} className='w-full bg-whiteSmoke dark:bg-blackRussian3 py-3 px-4 rounded-md flex gap-3 items-start group'>
          <ImageComponent src={"/assets/images/pdf.svg"} width={20} height={20} figClassName="shrink-0" alt={`pdf-image-${uuidv4()}`} />
          <div className='grow flex flex-col'>
            <div className='flex justify-between gap-2 mb-1'>
              <p className='text-sm dark:text-white leading-tight w-full'>{decodeURIComponent(item?.name ?? "")}</p>
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

interface EditControlsProps {
  onCancel: () => void;
  onUpdate: () => void;
  regeneratingMessageId: string | null;
  editedMessage: string;
}

export const EditControls: React.FC<EditControlsProps> = ({
  onCancel,
  onUpdate,
  regeneratingMessageId,
  editedMessage,
}) => {
  return (
    <div className="flex items-center gap-5">
      <button
        className="chatBoot__sender__cancel"
        type="button"
        onClick={onCancel}
      >
        Cancel
      </button>
      <Button
        className="btn btn-primary"
        size="sm"
        type="button"
        disabled={Boolean(regeneratingMessageId) || editedMessage.trim().length === 0}
        onClick={onUpdate}
      >
        Update
      </Button>
    </div>
  );
};

interface ViewControlsProps {
  onEdit: () => void;
  editableMessageId: string | null;
  regeneratingMessageId: string | null;
  fetchingData: boolean;
  isLastIndex: boolean;
}

export const ViewControls: React.FC<ViewControlsProps> = ({
  onEdit,
  editableMessageId,
  regeneratingMessageId,
  fetchingData,
  isLastIndex,
}) => {
  if (!isLastIndex) return null;
  const isDisabled = Boolean(editableMessageId ?? regeneratingMessageId ?? fetchingData);
  return (
    <button
      className="chatBoot__edit rt-tooltip group/tooltip relative shrink-0"
      type="button"
      disabled={isDisabled}
      onClick={onEdit}
    >
      <EditIcon />
      <em className="tooltip-left tooltip invisible !w-[110px] not-italic group-hover/tooltip:visible">
        {"Edit message"}
      </em>
    </button>
  );
};

interface MessageHeaderProps {
  isLoading: boolean;
}

export const MessageHeader: React.FC<MessageHeaderProps> = ({ isLoading }) => {
  const [user,,selectedImage] = useLoggedInUser();
  const displayName = getFullName(user?.fullName ?? getCookie("fullName") ?? "") || getRandomName();

  return (
    <div className="flex gap-3 items-center">
      <ImageComponent
        src={selectedImage || images.avatar}
        fill={"fill"}
        figClassName="shrink-0 w-8 h-8"
        className="rounded-full object-cover"
      />
      <p className="text-gradient !mb-0 text-sm font-semibold">{displayName}</p>
    </div>
  );
};

interface MessageContentProps {
  isEditing: boolean;
  editedMessage: string;
  setEditedMessage: (message: string) => void;
  handleInputKeyDownOnEdit: (e: React.KeyboardEvent<HTMLTextAreaElement>) => void;
  message: any;
  isLoading: boolean;
  filesToDisplay: any[];
}

export const MessageContent: React.FC<MessageContentProps> = ({
  isEditing,
  editedMessage,
  setEditedMessage,
  handleInputKeyDownOnEdit,
  message,
  isLoading,
  filesToDisplay,
}) => {
  if (isEditing) {
    return (
      <div className="relative w-full">
        <AutoResizeTextarea
          value={editedMessage}
          onChange={(e) => setEditedMessage(e.target.value)}
          onKeyDown={handleInputKeyDownOnEdit}
          minHeight="32px"
          maxLength={MAX_INPUT_LENGTH}
        />
        <div className="absolute bottom-1 right-2 text-xs text-gray-500 dark:text-gray-400">
          {editedMessage.length}/{MAX_INPUT_LENGTH}
        </div>
      </div>
    );
  }

  return (
    <div className="markdown-container whitespace-pre-wrap space-y-2">
      <Markdown
        className={"whitespace-pre-wrap"}
        remarkPlugins={[remarkGfm]}
        components={{
          a: MarkdownLink,
        }}
      >
        {message.content}
      </Markdown>
      {isLoading && filesToDisplay.length > 0 && (
        <FileDisplay files={filesToDisplay} />
      )}
    </div>
  );
};

interface MessageControlsProps {
  isEditing: boolean;
  handleCancel: () => void;
  handleUpdateMessage: () => void;
  regeneratingMessageId: string | null;
  editedMessage: string;
  handleEdit: () => void;
  editableMessageId: string | null;
  fetchingData: boolean;
  isLastIndex: boolean;
}

export const MessageControls: React.FC<MessageControlsProps> = ({
  isEditing,
  handleCancel,
  handleUpdateMessage,
  regeneratingMessageId,
  editedMessage,
  handleEdit,
  editableMessageId,
  fetchingData,
  isLastIndex,
}) => {
  return (
    <div className="b mt-4 flex items-center justify-start space-x-2">
      {isEditing ? (
        <EditControls
          onCancel={handleCancel}
          onUpdate={handleUpdateMessage}
          regeneratingMessageId={regeneratingMessageId}
          editedMessage={editedMessage}
        />
      ) : (
        <ViewControls
          onEdit={handleEdit}
          editableMessageId={editableMessageId}
          regeneratingMessageId={regeneratingMessageId}
          fetchingData={fetchingData}
          isLastIndex={isLastIndex}
        />
      )}
    </div>
  );
};

function getFilesToDisplay(index: number, copyFiles: any[], currentChatWithFile: any) {
  if (index !== 0) return [];

  if (copyFiles?.length > 0) return copyFiles;
  if (currentChatWithFile?.files?.length > 0) return currentChatWithFile.files;

  return [];
}

interface QuestionContentProps {
  message: any;
  index: number;
  editableMessageId: string | null;
  editedMessage: string;
  setEditedMessage: (message: string) => void;
  handleInputKeyDownOnEdit: (e: React.KeyboardEvent<HTMLTextAreaElement>) => void;
  handleCancel: () => void;
  regeneratingMessageId: string | null;
  handleUpdateMessage: () => void;
  handleEdit: (message: any, index: number) => void;
  fetchingData: boolean;
  isLoading: boolean;
  userSetHandler: (user: any) => void;
  currentChatWithFile: any;
  copyFiles: any[];
  lastIndex: number;
}

const QuestionContent: React.FC<QuestionContentProps> = ({
  message,
  index,
  editableMessageId,
  editedMessage,
  setEditedMessage,
  handleInputKeyDownOnEdit,
  handleCancel,
  regeneratingMessageId,
  handleUpdateMessage,
  handleEdit,
  fetchingData,
  isLoading,
  userSetHandler,
  currentChatWithFile,
  copyFiles,
  lastIndex,
}) => {
  const { User }: any = useSubscriptionPackage();
  const { selected } = useConversation();
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    userSetHandler(User);
  }, [User]);

  useEffect(() => {
    if (selected && textareaRef.current) {
      textareaRef.current.focus();
    }
  }, [selected]);

  const filesToDisplay = getFilesToDisplay(index, copyFiles, currentChatWithFile);
  const isEditing = editableMessageId === message._id;
  const isLastIndex = lastIndex === index;
  
  const files = currentChatWithFile?.filter((f: any) => (f?.conversation_id === message._id || f?.conversation_id.includes("temp_")));

  const isDeepSearchMessage = useMemo(() => message.model === EModels.DEEP_SEARCH
    , [message]);

  return (
    <div
      key={message._id}
      id={message._id}
      className="chatBoot__sender chatBoot__message max-w-[1150px]"
    >
      <MessageHeader isLoading={isLoading} />
      <MessageContent
        isEditing={isEditing}
        editedMessage={editedMessage}
        setEditedMessage={setEditedMessage}
        handleInputKeyDownOnEdit={handleInputKeyDownOnEdit}
        message={message}
        isLoading={isLoading}
        filesToDisplay={filesToDisplay}
      />
      {
        files?.length === 0 && !isDeepSearchMessage && (
          <MessageControls
        isEditing={isEditing}
        handleCancel={handleCancel}
        handleUpdateMessage={handleUpdateMessage}
        regeneratingMessageId={regeneratingMessageId}
        editedMessage={editedMessage}
        handleEdit={() => handleEdit(message, index)}
        editableMessageId={editableMessageId}
        fetchingData={fetchingData}
        isLastIndex={isLastIndex}
      />
        )
      }
      
    </div>
  );
};

export default QuestionContent;