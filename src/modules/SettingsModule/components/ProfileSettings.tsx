import React, { ChangeEvent, useRef, useState } from "react";
import NiceModal from "@ebay/nice-modal-react";
import ImageComponent from "../../../components/global/imageComponent/ImageComponent";
import { images } from "../../../assets/images";
import { Button } from "../../../components/global/button/Button";
import Input from "../../../components/global/forms/Input";
import { InfoIcon, StripeIcon, DeleteIcon, WordsGeneratedIcon } from "../../../svgs/svg";
import { getCookie } from "../../../utils/getCookie";
import { toast } from "react-hot-toast";
import { IUploadDocument } from "../../../validations/uploadDocumentValidation";
import { HttpService } from "../../../services/base.service";
import { AUTHENTICATED_ROUTES } from "../../../constants/routes";
import { useRouter } from "next/router";
import { useDebouncedClick } from "../../../hooks/useDebouncedClick";
import { userService } from "../../../services/user.service";
import { errorHandler } from "../../../utils/errorHandler";
import { subscriptionService } from "../../../services/subscription.service";
import { ISubscriptionType } from "../../../enums/subscription.enum";
import formatDate from "../../../utils/formatDateHandler";
import useSubscriptionPackage from "../../../hooks/useSubscriptionPackage";
import { capitalizeTextHandler } from "../../../utils/capitalizeTextHandler";
import { useTheme } from "../../../context/themeContext";
import { useSubscription } from '../../../context/subscription.context';
import useLoggedInUser from '../../../hooks/useLoggedInUser';
import BillingDetailsShimmer from "../../../components/global/shimmers/BillingDetailsShimmer";
import { getRefinedFigure } from "../../../utils/getRefinedFigure";
import ThemeToggle from "../../../components/ThemeToggle";

const ProfileSettings = () => {
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [handleClick, loadingStates] = useDebouncedClick();
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { currentPackage, User, isLoading, loading, chatsRemaining, totalChats, imagesRemaining, totalImages } = useSubscriptionPackage();
  const { isDarkMode } = useTheme();
  const { packageLimits } = useSubscription();
  const [,,, isAnonymous, refreshProfile] = useLoggedInUser();

  const generateRandomFilename = (originalName: string) => {
    const timestamp = Date.now();
    const array = new Uint8Array(8);
    crypto.getRandomValues(array);
    const randomString = Array.from(array).map(b => b.toString(16).padStart(2, "0")).join("");
    return `${timestamp}-${randomString}`;
  };

  const validateImageFile = (file: File) => {
    if (!file.type.startsWith("image/")) {
      toast.error("File type not supported. Please select an image file.");
      return false;
    }

    const fileType = file.type.split("image/").pop() as string;
    const acceptedFormats = [".jpeg", ".jpg", ".png"];
    const maxFileSize = 5;

    if (!fileType || !acceptedFormats.includes(`.${fileType}`)) {
      toast.error("File type not supported");
      return false;
    }

    if (file.size > maxFileSize * 1024 * 1024) {
      toast.error(`File size exceeds ${maxFileSize} MB`);
      return false;
    }

    return true;
  };

  const fileUpload = async (values: IUploadDocument) => {
    handleClick(async () => {
      try {
        const response = await userService.updateProfileImageHandler(values);
        const avatar = response.payload.user.avatar as string;
        HttpService.setCookie("avatar", avatar);
        toast.success(response?.message);
        void refreshProfile();
        router.push(AUTHENTICATED_ROUTES.SETTINGS);
      } catch (error: unknown) {
        errorHandler(error);
      }
    }, "fileLoading");
  };

  const handleImageChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (!validateImageFile(file)) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      const fileType = file.type.split("image/").pop() as string;
      const fileName = generateRandomFilename(file.name);
      const image = reader.result as string;
      const base64Data = image.split(";base64,").pop() as string;
      
      fileUpload({
        base64Data: base64Data,
        fileName: fileName,
        fileType,
      });
      setPreviewImage(image);
    };
    reader.readAsDataURL(file);
  };

  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  const goToBillingPortal = async () => {
    try {
      const response = await subscriptionService.createCustomerPortalSession();
      const sessionUrl = response?.payload?.sessionUrl || "#";
      globalThis.window.location.href = sessionUrl;
    } catch (error: unknown) {
      errorHandler(error);
    }
  };

  const goToTokenUsagePortal = () => {
    router.push("/usage");
  };


  const getSubscriptionLabel = () => {
    const packageName = capitalizeTextHandler(currentPackage.split('_')[0]);
    return packageName === "Premium" ? "Unlimited Membership" : packageName;
  };

  const getSubscriptionPeriod = () => {
    const monthlyTypes = [
      ISubscriptionType.STARTER_MONTHLY,
      ISubscriptionType.PRO_MONTHLY,
      ISubscriptionType.UNLIMITED_MONTHLY
    ];
    const yearlyTypes = [
      ISubscriptionType.STARTER_YEARLY,
      ISubscriptionType.PRO_YEARLY,
      ISubscriptionType.UNLIMITED_YEARLY
    ];

    if (monthlyTypes.includes(currentPackage)) return "Monthly";
    if (yearlyTypes.includes(currentPackage)) return "Yearly";
    return "";
  };

  const getPricingText = () => {
    const monthlyTypes = [
      ISubscriptionType.STARTER_MONTHLY,
      ISubscriptionType.UNLIMITED_MONTHLY
    ];
    const yearlyTypes = [
      ISubscriptionType.STARTER_YEARLY,
      ISubscriptionType.UNLIMITED_YEARLY
    ];

    if (monthlyTypes.includes(currentPackage)) return "/ per month";
    if (yearlyTypes.includes(currentPackage)) return "/ per year";
    return "";
  };

  const getProfileImageSrc = () => {
    if (previewImage) return previewImage;
    return User?.avatar || (isDarkMode ? images.avatar : images.lightAvatar);
  };

  const getEmailValue = () => {
    const email = getCookie("email");
    const formattedEmail = email?.split("_").join(" ") || null;
    return isAnonymous ? formattedEmail?.split('@')[0] : formattedEmail;
  };

  const shouldShowBillingDetails = () => {
    return !isLoading && currentPackage !== ISubscriptionType.FREE;
  };

  const shouldShowBillingShimmer = () => {
    return isLoading && currentPackage !== ISubscriptionType.FREE;
  };

  return (
    <div className="profile__settings">
      <div className="mb-8">
        <h5 className="fs-20 font-medium">Profile Settings</h5>
        <p className="text-sm text-aluminium">
          Click and Upload Photo below to update your profile picture.
        </p>
      </div>
      <div className="profile__settings__profile">
        {loading ? (
          <ImageComponent
            src={images.avatar}
            priority
            fill={"fill"}
            figClassName="w-[120px] h-[120px] rounded-full"
            className="rounded-full object-cover"
          />
        ) : (
          <div>
            <ImageComponent
              src={getProfileImageSrc()}
              priority
              fill={"fill"}
              figClassName="w-[120px] h-[120px] rounded-full"
              className="rounded-full object-cover"
            />
          </div>
        )}
        <div>
          <input
            type="file"
            accept="image/*"
            ref={fileInputRef}
            onChange={handleImageChange}
            style={{ display: "none" }} // Hide the input element
          />
          <Button
            size="md"
            className="mb-2.5"
            onClick={handleButtonClick}
            disabled={loadingStates["fileLoading"]}
            isLoading={loadingStates["fileLoading"]}
          >
            Upload Photo
          </Button>
          <div className="text-sm text-aluminium">
            You can upload JPG or PNG image file
            <p className="dark:text-white">File size max 5MB</p>
          </div>
        </div>
      </div>
      <div className="mb-10 grid gap-5 ">
        <div className="form-group relative">
          <Input
            placeholder={"Email"}
            label={isAnonymous ? "Account key" : "Email"}
            type={isAnonymous ? "password" : "email"}
            name={"email"}
            disabled={true}
            value={getEmailValue()}
          />
          {
            !isAnonymous &&
            <span className="rt-tooltip group/tooltip absolute right-3 top-1/2 -translate-y-1/2">
              <InfoIcon />
              <em className="tooltip-info tooltip invisible not-italic group-hover/tooltip:visible">
                {"The email associated with your account cannot be modified."}
              </em>
            </span>}
        </div>
        <div className="flex items-start">
          <ThemeToggle />
        </div>
      </div>

      <div className="profile__settings__billingDetails mb-4">
        <div className="mb-4">
          <h5 className="fs-20 font-medium">Token Usage</h5>
          <p className="text-sm text-aluminium">
            Monitor your token usage and remaining credits.
          </p>
        </div>

        <div className="rounded-lg bg-whiteSmoke dark:bg-blackRussian2 p-4">
          <div className="profile__settings__billingDetails__head">
            <div className="flex items-center gap-3">
              <h6 className="fs-24">Remaining Words</h6>
            </div>
            <div className="flex items-center gap-2">
              <h6 className="fs-24">
                {getRefinedFigure(chatsRemaining || 0)}
              </h6>
              <span className="text-sm text-greyChateau">tokens left</span>
            </div>
          </div>

          <div className="profile__settings__billingDetails__body">
            <p className="text-sm text-stormGrey">
              Total tokens available
              <div className="mt-2 block text-black dark:text-white">
                {getRefinedFigure(totalChats || 0)} tokens
              </div>
            </p>
            <button
              className="profile__settings__billingDetails__stripe__btn"
              onClick={goToTokenUsagePortal}
            >
              <WordsGeneratedIcon />
              <span className="text-sm text-white">Go to the word usage portal</span>
            </button>
          </div>
        </div>
      </div>

      <div className="profile__settings__billingDetails mb-4">
        <div className="rounded-lg bg-whiteSmoke dark:bg-blackRussian2 p-4">
          <div className="profile__settings__billingDetails__head">
            <div className="flex items-center gap-3">
              <h6 className="fs-24">Remaining Images</h6>
            </div>
            <div className="flex items-center gap-2">
              <h6 className="fs-24">{getRefinedFigure(imagesRemaining || 0)}</h6>
              <span className="text-sm text-greyChateau">images left</span>
            </div>
          </div>

          <div className="profile__settings__billingDetails__body">
            <p className="text-sm text-stormGrey">
              Total images available
              <div className="mt-2 block text-black dark:text-white">
                {getRefinedFigure(totalImages || 0)} images
              </div>
            </p>
            <button
              className="profile__settings__billingDetails__stripe__btn"
              onClick={goToTokenUsagePortal}
            >
              <WordsGeneratedIcon />
              <span className="text-sm text-white">Go to the image usage portal</span>
            </button>
          </div>
        </div>
      </div>

      {shouldShowBillingShimmer() ? (
        <BillingDetailsShimmer />
      ) : (
        shouldShowBillingDetails() && (
          <div className="profile__settings__billingDetails">
            <div className="mb-4">
              <h5 className="fs-20 font-medium">Billing Details</h5>
              <p className="text-sm text-aluminium">
                Manage all your billing details in below.
              </p>
            </div>

            <div className="rounded-lg bg-whiteSmoke dark:bg-blackRussian2 p-4">
              <div className="profile__settings__billingDetails__head">
                <div className="flex items-center gap-3">
                  <h6 className="fs-24 capitalize">{getSubscriptionLabel()}</h6>
                  <span className="rounded-md bg-vulcan px-3 py-[6px] text-xs text-white">
                    {getSubscriptionPeriod()}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <h6 className="fs-24">
                    {`$${packageLimits?.[currentPackage]?.price ?? "Price not available"}`}
                  </h6>
                  <span className="text-sm text-greyChateau">{getPricingText()}</span>

                </div>
              </div>

              <div className="profile__settings__billingDetails__body">
                <p className="text-sm text-stormGrey">
                  Next billing date
                  <div className="mt-2 block text-black dark:text-white">
                    {formatDate(User?.subscriptionEndDate)}
                  </div>
                </p>
                <button
                  className="profile__settings__billingDetails__stripe__btn"
                  onClick={goToBillingPortal}
                >
                  <StripeIcon />
                  <span className="text-sm text-white">Go to billing portal</span>
                </button>
              </div>
            </div>
          </div>
        )
      )}

      <div className="profile__settings__billingDetails mt-4">
        <div className="rounded-lg border border-red-500/20 bg-[#D0312D1F] p-4">
          <div className="profile__settings__billingDetails__head">
            <div className="flex items-center gap-3">
              <h6 className="fs-24">Account Deletion</h6>
              <span className="rounded-md bg-red-500 px-3 py-[6px] text-xs text-white">
                Permanent
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Button
                size="md"
                color="danger"
                className="!px-7 !py-2.5 flex items-center gap-2 rounded-md bg-gradient-to-r from-red-500 to-red-600 text-white shadow-md transition hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-red-400"
                onClick={() => NiceModal.show("deleteAccountModal")}
              >
                <span className="text-base"><DeleteIcon /></span>
                <span>Delete Account</span>
              </Button>
            </div>
          </div>

          <div className="profile__settings__billingDetails__body">
            <p className="text-sm text-stormGrey">
              Warning
              <div className="mt-2 block text-black dark:text-white">
                This action will permanently remove your account and all associated data including chats, images, and settings.
              </div>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileSettings;
