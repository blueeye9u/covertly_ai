import AccountVerified from "./accountVerified";
import EmailSend from "./emailSend";
import Login from "./login/Login";
import SignUp from "./signup/SignUp";
import NiceModal from "@ebay/nice-modal-react";
import UpdatePassword from "./updatepassword/UpdatePassword";
import SubscriptionModal from "./SubscriptionModal";
import DeleteModal from "./DeleteModal";
import DeleteAllChatModal from "./DeleteAllChatModal";
import LogoutModal from "./LogoutModal";
import OtpVerified from "./otpVerified";
import DocumentDeleteModal from "./DocumentDeleteModal";
import UploadDocumentModal from "./UploadDocumentModal/UploadDocumentModal";
import DocumentUploadingModal from "./DocumentUploadingModal/DocumentUploadingModal";
import SuccessfullyUploadedModal from "./SuccessfullyUploadedModal/SuccessfullyUploadedModal";
import BuyTokenModal from "./BuyTokenModal";
import SessionExpired from "./sessionExpired";
import SecureSignupModal from "./SecureSignupModal";
import SecureLoginModal from "./SecureLoginModal/SecureLoginModal";
import ShareModal from "./ShareModal/ShareModal";
import ResponseInProgressModal from "./ResponseInProgressModal";
import GeneratedImageModal from "./GeneratedImageModal/GeneratedImageModal";
import ExpandImageViewModal from "./ExpandImageViewModal/ExpandImageViewModal";
import ExpandSourcesViewModal from "./ExpandSourcesViewModal/ExpandSourcesViewModal";
import CovertlyAiModal from "./CovertlyAiModal/CovertlyAiModal";
import PrivacyProtectionModal from "./PrivacyProtectionModal/PrivacyProtectionModal";
import UploadFilesModal from "./UploadFilesModal/UploadFilesModal";
import AllChatsDeletionModal from "./AllchatsDeletionModal/AllchatsDeletionModal";
import LlmSelectModal from "../chat/chatBox/components/llm-select";
import ImageDeleteModal from "./ImageDeleteModal";
import GenerationInProgressModal from "./GenerationInProgressModal";
import AutoRedactionPasswordModal from "./AutoRedactionPasswordModal";
import DeleteAccountModal from "./DeleteAccountModal";
import ImageModelSelectModal from "./ImageModelSelectModal";
import StopChatModal from './StopChatModal';

const modalList = [
  { name: "login", source: Login },
  { name: "signUp", source: SignUp },
  { name: "emailSend", source: EmailSend },
  { name: "updatePassword", source: UpdatePassword },
  { name: "accountVerified", source: AccountVerified },
  { name: "otpVerified", source: OtpVerified },
  { name: "subscriptionModal", source: SubscriptionModal },
  { name: "deleteModal", source: DeleteModal },
  { name: "deleteAllChatModal", source: DeleteAllChatModal },
  { name: "logoutModal", source: LogoutModal },
  { name: "DocumentDeleteModal", source: DocumentDeleteModal},
  { name: "UploadDocumentModal", source: UploadDocumentModal},
  { name: "DocumentUploadingModal", source: DocumentUploadingModal},
  { name: "SuccessfullyUploadedModal", source: SuccessfullyUploadedModal},
  { name: "tokenModal", source: BuyTokenModal},
  { name: "sessionExpired", source: SessionExpired },
  { name: "SecureSignupModal", source: SecureSignupModal },
  { name: "SecureLoginModal", source: SecureLoginModal },
  { name: "ShareModal", source: ShareModal },
  { name: "ResponseInProgressModal", source: ResponseInProgressModal },
  { name: "GenerationInProgressModal", source: GenerationInProgressModal },
  { name: "GeneratedImageModal", source: GeneratedImageModal },
  { name: "ExpandImageViewModal", source: ExpandImageViewModal },
  { name: "ExpandSourcesViewModal", source: ExpandSourcesViewModal },
  { name: "CovertlyAiModal", source: CovertlyAiModal },
  { name: "PrivacyProtectionModal", source: PrivacyProtectionModal },
  { name: "UploadFilesModal", source: UploadFilesModal },
  { name: "AllChatsDeletionModal", source: AllChatsDeletionModal },
  { name: "StopChatModal", source: StopChatModal },
  { name: "llmSelectModal", source: LlmSelectModal },
  { name: "imageDeleteModal", source: ImageDeleteModal },
  { name: "AutoRedactionPasswordModal", source: AutoRedactionPasswordModal },
  { name: "deleteAccountModal", source: DeleteAccountModal }
  ,{ name: "imageModelSelectModal", source: ImageModelSelectModal }
];

for (const modal of modalList) {
  NiceModal.register(modal.name, modal.source);
}
