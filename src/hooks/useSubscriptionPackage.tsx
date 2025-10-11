import { useState, useEffect } from "react";
import { ISubscriptionType } from "../enums/subscription.enum";
import useLoggedInUser from "./useLoggedInUser";
import { EModels } from "../enums/modals.enum";
import { EImageGenerationModel } from "../enums/image-generation-models.enum";
import { useSubscription } from "../context/subscription.context";
import { PackageLimitsMap } from '../interfaces/package.interface';

const useSubscriptionPackage = () => {
  const [currentPackage, setCurrentPackage] = useState<ISubscriptionType>(ISubscriptionType.FREE);
  const [isLoading, setIsLoading] = useState(true);

  const {
    packageLimits: backendPackageLimits,
    loading: packagesLoading,
    getSubscriptionType
  } = useSubscription();
  const [packageLimits, setPackageLimits] = useState<PackageLimitsMap | null>(null);
  
  const [User, loading,,, refreshProfile]: any = useLoggedInUser();
  const [chatsGenerated, setChatsGenerated] = useState(0);
  const [imagesGenerated, setImagesGenerated] = useState(0);
  const [chatsRemaining, setChatsRemaining] = useState(0);
  const [imagesRemaining, setImagesRemaining] = useState(0);
  const [totalChats, setTotalChats] = useState(0);
  const [totalImages, setTotalImages] = useState(0);

  useEffect(() => {
    refreshProfile();
  }, []);

  const validateChatSubscription = (chatModel: any = EModels.GPT_4) => {
    if ((currentPackage === ISubscriptionType?.FREE && chatModel != EModels.GPT_4)) {
      return false
    }
    if (!chatsRemaining) {
      return false
    }
    return true
  }

  const validateImageSubscription = (imageModel: any) => {
    
    if ((currentPackage === ISubscriptionType?.FREE && imageModel!= EImageGenerationModel.STABLE_DIFFUSION)) {
      return false
    }
    if (!chatsRemaining) {
      return false
    }
    return true
  }

  // Initialize packageLimits from backend data when it's available
  useEffect(() => {
    if (!packagesLoading && backendPackageLimits && Object.keys(backendPackageLimits).length > 0) {
      setPackageLimits(backendPackageLimits);
    }
  }, [backendPackageLimits, packagesLoading]);

  useEffect(() => {
    const handleSubscriptionChange = () => {
      if (!packageLimits || !User) return;

      const stripePriceId = User?.stripePriceId;
      const updatePackage = (type: ISubscriptionType) => {
        if (!packageLimits[type]) return;

        setCurrentPackage(type);
        setChatsGenerated((packageLimits[type].chat + User.topUpChatTokensTotal) - (User.subscriptionChatTokensCredits + User.topUpChatTokensCredits));
        setImagesGenerated((packageLimits[type].image + User.topUpImagePromptsTotal) - (User.subscriptionImagePromptsCredits + User.topUpImagePromptsCredits));
        setTotalChats(packageLimits[type].chat + User.topUpChatTokensTotal);
        setTotalImages(packageLimits[type].image + User.topUpImagePromptsTotal);
        setChatsRemaining(User.subscriptionChatTokensCredits + User.topUpChatTokensCredits);
        setImagesRemaining(User.subscriptionImagePromptsCredits + User.topUpImagePromptsCredits);
      };

      if (stripePriceId) {
        // Get subscription type from price ID using the context
        const subscriptionType = getSubscriptionType(stripePriceId);
        if (subscriptionType && packageLimits[subscriptionType]) {
          updatePackage(subscriptionType);
        }
      } else {
        setCurrentPackage(ISubscriptionType.FREE);

        if (packageLimits[ISubscriptionType.FREE]) {
          setChatsRemaining(User.trialChatPromptsCredits);
          setChatsGenerated(packageLimits[ISubscriptionType.FREE].chat - User.trialChatPromptsCredits);
          setTotalChats(packageLimits[ISubscriptionType.FREE].chat);

          setImagesRemaining(User.trialImagePromptsCredits);
          setImagesGenerated(packageLimits[ISubscriptionType.FREE].image - User.trialImagePromptsCredits);
          setTotalImages(packageLimits[ISubscriptionType.FREE].image);

          if (User.topUpChatTokensCredits) {
            setChatsRemaining(User.topUpChatTokensCredits);
            setChatsGenerated(User.topUpChatTokensTotal - User.topUpChatTokensCredits);
            setTotalChats(User.topUpChatTokensTotal);
          }
          if (User.topUpImagePromptsCredits) {
            setImagesRemaining(User.topUpImagePromptsCredits);
            setImagesGenerated(User.topUpImagePromptsTotal - User.topUpImagePromptsCredits);
            setTotalChats(User.topUpImagePromptsTotal);
          }
        }
      }

      setTimeout(() => {
        setIsLoading(false);
      }, 1000);
    };

    if (!loading && packageLimits && Object.keys(packageLimits).length > 0) {
      handleSubscriptionChange();
    }
  }, [User, loading, packageLimits, getSubscriptionType]);

  return { currentPackage, isLoading, User, loading, chatsGenerated, imagesGenerated, chatsRemaining, imagesRemaining, totalImages, totalChats, validateChatSubscription, validateImageSubscription };
};

export default useSubscriptionPackage;
