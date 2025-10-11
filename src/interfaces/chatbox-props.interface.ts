import { IChatMessage } from "./chat-message";

/**
 * Shared interface for ChatBox props used across different components
 */
export interface ChatBoxProps {
  /**
   * Array of conversation messages
   */
  conversationMessages: any[]; // Update type if possible

  /**
   * Flag indicating whether data is being fetched
   */
  fetchingData: boolean;

  /**
   * ID of the editable message
   */
  editableMessageId: any;

  /**
   * Function to handle key down event on edit
   */
  handleInputKeyDownOnEdit: (
    event: React.KeyboardEvent<HTMLTextAreaElement>
  ) => void;

  /**
   * Function to handle message update
   */
  handleUpdateMessage: () => void;

  /**
   * Function to handle message editing cancellation
   */
  handleCancel: () => void;

  /**
   * Function to set user input
   */
  setUserInput: (value: any) => void;

  /**
   * Function to handle message editing
   */
  handleEdit: (message: IChatMessage, responseId: number) => void;

  /**
   * ID of the message being regenerated
   */
  regeneratingMessageId: any;

  /**
   * Function to handle message regeneration
   */
  handleRegenerateMessage: (index: number) => void;

  /**
   * User input
   */
  userInput: string;

  /**
   * Function to handle input change
   */
  handleInputChange?: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;

  /**
   * Function to handle key down event
   */
  handleInputKeyDown?: (event: React.KeyboardEvent<HTMLTextAreaElement>) => void;

  /**
   * Function to handle sending message
   */
  handleSendMessage: () => void;

  /**
   * Function to handle stopping message generation
   */
  handleStopGeneration?: () => void;

  /**
   * Edited message content
   */
  editedMessage: string;

  /**
   * Function to set edited message content
   */
  setEditedMessage: React.Dispatch<React.SetStateAction<string>>;

  /**
   * Function to toggle sidebar
   */
  setToggleSidebar: (value: boolean) => void;

  /**
   * Function to update user related settings
   */
  userSetHandler: (value: any) => void;

  /**
   * Flag indicating whether the sidebar is toggled
   */
  toggleSidebar: boolean;

  /**
   * Current chat object
   */
  currentChat: any;
  
  /**
   * Copy files
   */
  copyFiles?: any;

  generateSuperResponse?: any;
}