import React, { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { Button } from "../../global/button/Button";
import { Tick } from "../../../svgs/svg";
import useLoggedInUser from "../../../hooks/useLoggedInUser";
import { useDebouncedClick } from "../../../hooks/useDebouncedClick";
import { subscriptionService } from "../../../services/subscription.service";
import { ISubscriptionType } from "../../../enums/subscription.enum";
import { errorHandler } from "../../../utils/errorHandler";
import { toast } from "react-hot-toast";
import Link from "next/link";
import { useRouter } from "next/router";
import useLoggedInStatus from "../../../hooks/useLoggedInStatus";
import { useSubscription } from "../../../context/subscription.context";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { ISubscriptionDisplayItem } from '../../../interfaces/package.interface';
import SubscriptionCardShimmer from "../../global/shimmers/SubscriptionCardShimmer";

interface SubscriptionCardProps {
  selectedTabIdx: number;
}

interface SubscriptionItemProps {
  item: ISubscriptionDisplayItem;
  selectedTabIdx: number;
  loadingStates: Record<string, boolean>;
  isHiddenOnMobile: boolean;
  isSelected: boolean;
  goToBillingPortal: (subscription: string) => void;
  handlePackageButtonProps: (title: string) => {
    text: string;
    className: string;
    variant: "solid" | "outline";
  };
  renderPriceDetails: (item: any) => React.ReactNode;
  renderFeatureList: (item: any) => React.ReactNode[];
  onClick: () => void;
}

/**
 * Renders a subscription card with pricing and feature information
 */
const SubscriptionItem: React.FC<SubscriptionItemProps> = ({
  item,
  selectedTabIdx,
  loadingStates,
  isHiddenOnMobile,
  isSelected,
  goToBillingPortal,
  handlePackageButtonProps,
  renderPriceDetails,
  renderFeatureList,
  onClick
}) => {
  return (
    <div
      className={`pricing_card
      ${isHiddenOnMobile ? "first:hidden sm:first:block last:hidden sm:last:block" : ""}
      ${isSelected ? "pricing_card--selected" : ""}
      ${isSelected ? "" : "no-hover-effects"}
      transition-all duration-300
      flex flex-col
      cursor-pointer
    `}
      onClick={onClick}
    >
      <div className="flex flex-col">
        {/* ✅ Allow wrapping instead of forcing truncate */}
        <h4 className="fs-20 mb-1 text-left break-words w-full">
          {item.title}
        </h4>

        <p className="mb-2 text-left text-[#393c45] dark:text-greyChateau grow text-sm line-clamp-2 sm:h-11">
          {item.desc}
        </p>

        <h5 className="fs-40 mb-2 text-left font-bold grow min-h-[59.51px]">
          {selectedTabIdx === 1 ? item.yearlyPrice : item.monthlyPrice}
          {renderPriceDetails(item)}
        </h5>

        {item.isButton ? (
          <Button
            variant={handlePackageButtonProps(item.key).variant}
            size="md"
            disabled={loadingStates["submitSubscriptionLoading"]}
            onClick={(e: React.MouseEvent) => {
              e.stopPropagation();
              goToBillingPortal(item.key.toLowerCase());
            }}
            className={`w-full ${handlePackageButtonProps(item.key).className}`}
          >
            {handlePackageButtonProps(item.key).text}
          </Button>
        ) : (
          <Link
            href={`mailto:'sales@covertly.ai`}
            className="flex flex-col flex-grow no-underline"
          >
            <Button
              size="md"
              disabled={loadingStates["submitSubscriptionLoading"]}
              className="w-full"
            >
              Contact Us
            </Button>
          </Link>
        )}
      </div>

      <ul className="flex flex-col space-y-3 flex-1 border-t border-linkWater50 dark:border-tuna pt-6 mt-6">
        {renderFeatureList(item)}
      </ul>
    </div>
  );
};

const SubscriptionCard: React.FC<SubscriptionCardProps> = ({
  selectedTabIdx,
}) => {
  // Add CSS to disable hover effects for non-selected items and style pagination
  React.useEffect(() => {
    const style = document.createElement('style');
    style.textContent = `
      .pricing_card.no-hover-effects:hover {
        transform: none !important;
        box-shadow: none !important;
        border-color: inherit !important;
      }
      .subscription-swiper .swiper-pagination-bullet {
        width: 12px !important;
        height: 12px !important;
        background: #d1d5db !important;
        opacity: 1 !important;
        margin: 0 6px !important;
      }
      .subscription-swiper .swiper-pagination-bullet-active {
        background: #30C5D2 !important;
        transform: scale(1.2) !important;
      }
      .subscription-swiper .swiper-pagination {
        position: relative !important;
        margin-top: 20px !important;
        bottom: auto !important;
      }
    `;
    document.head.appendChild(style);

    return () => {
      style.remove();
    };
  }, []);

  const swiperSettings = {
    modules: [Pagination],
    spaceBetween: 12,
    slidesPerView: 'auto' as const,
    navigation: false,
    pagination: {
      clickable: true,
      bulletSize: 12,
      bulletActiveClass: 'swiper-pagination-bullet-active'
    },
    onSwiper: (swiper: any) => {
      setSwiperInstance(swiper);
    },
    onSlideChange: (swiper: any) => {
      setActiveSlideIndex(swiper.activeIndex);
    },
    onInit: (swiper: any) => {
      setActiveSlideIndex(swiper.activeIndex);
    }
  };





  const [User, isLoading]: any = useLoggedInUser();
  const [handleClick, loadingStates] = useDebouncedClick();
  const [currentPackage, setCurrentPackage] = useState<string>("free");
  const [isLoggedIn] = useLoggedInStatus();
  const router = useRouter();
  const { getSubscriptionData, loading: subscriptionDataLoading } = useSubscription();
  const subscriptionData = getSubscriptionData(selectedTabIdx);

  const middleIndex = subscriptionData && subscriptionData.length > 0
    ? Math.floor(subscriptionData.length / 2)
    : 0;

  const [activeSlideIndex, setActiveSlideIndex] = useState<number>(0);
  const [swiperInstance, setSwiperInstance] = useState<any>(null);

  const handleSlideClick = (index: number) => {
    setActiveSlideIndex(index);
    if (swiperInstance) {
      swiperInstance.slideTo(index);
    }
  };

  const cancelSubscription = async () => {
    try {
      const response = await subscriptionService.cancelSubscriptionHandler();
      toast.success(response?.message);
    } catch (error: unknown) {
      errorHandler(error);
    }
  };

  const upgradeSubscriptionHandler = async (subscription: string) => {
    try {
      const response = await subscriptionService.createCheckoutSession({
        subscription: subscription,
      });
      const sessionUrl = response?.payload?.sessionUrl;
      if (sessionUrl) {
        try {
          localStorage.setItem("SHOW_SUBSCRIPTION_SUCCESS_TOAST", "success");
        } catch (e) {
          console.warn("Failed to save subscription success toast preference:", e);
        }
        globalThis.window.location.href = sessionUrl;
      }
    } catch (error: unknown) {
      errorHandler(error);
    }
  };

  const handleSubscriptionAction = async (subscription: string) => {
    if (subscription === ISubscriptionType.FREE) {
      await cancelSubscription();
      return;
    }
    await upgradeSubscriptionHandler(subscription);
  };

  const goToBillingPortal = async (subscription: string) => {
    if (!isLoggedIn) {
      router.push("/signup");
      return;
    }

    if (currentPackage === subscription) {
      return;
    }

    handleClick(() => handleSubscriptionAction(subscription), "submitSubscriptionLoading");
  };

  const { getSubscriptionType } = useSubscription();

  const getPackageFromPriceId = (stripePriceId: string) => {
    return getSubscriptionType(stripePriceId);
  };

  useEffect(() => {
    if (User?.stripePriceId) {
      setCurrentPackage(getPackageFromPriceId(User.stripePriceId));
    }
  }, [isLoading, User?.stripePriceId]);

  useEffect(() => {
    setActiveSlideIndex(middleIndex);
    if (swiperInstance?.slides?.length && swiperInstance.slides.length - 1 >= middleIndex) {
      swiperInstance.slideTo(middleIndex);
    }
  }, [getSubscriptionData, swiperInstance]);

  const isPremiumPackage = () => {
    return currentPackage === ISubscriptionType.UNLIMITED_MONTHLY ||
      currentPackage === ISubscriptionType.UNLIMITED_YEARLY;
  };

  const isAdvancedPackage = () => {
    return currentPackage === ISubscriptionType.PRO_MONTHLY ||
      currentPackage === ISubscriptionType.PRO_YEARLY;
  };

  const isBasicPackage = () => {
    return currentPackage === ISubscriptionType.STARTER_MONTHLY ||
      currentPackage === ISubscriptionType.STARTER_YEARLY;
  };

  const isDowngradeTarget = (titleLower: string) => {
    const downgradeTargets = {
      premium: [
        ISubscriptionType.STARTER_MONTHLY,
        ISubscriptionType.STARTER_YEARLY,
        ISubscriptionType.PRO_MONTHLY,
        ISubscriptionType.PRO_YEARLY,
        ISubscriptionType.FREE,
      ],
      advanced: [
        ISubscriptionType.STARTER_MONTHLY,
        ISubscriptionType.STARTER_YEARLY,
        ISubscriptionType.FREE,
      ],
      basic: [
        ISubscriptionType.FREE,
      ]
    };

    if (isPremiumPackage()) {
      return downgradeTargets.premium.map(s => s.toLowerCase()).includes(titleLower);
    }
    if (isAdvancedPackage()) {
      return downgradeTargets.advanced.map(s => s.toLowerCase()).includes(titleLower);
    }
    if (isBasicPackage()) {
      return downgradeTargets.basic.map(s => s.toLowerCase()).includes(titleLower);
    }
    return false;
  };

  const isUpgradeTarget = (titleLower: string) => {
    if (isBasicPackage()) {
      return [
        ISubscriptionType.PRO_MONTHLY,
        ISubscriptionType.PRO_YEARLY,
        ISubscriptionType.UNLIMITED_MONTHLY,
        ISubscriptionType.UNLIMITED_YEARLY
      ].map(s => s.toLowerCase()).includes(titleLower);
    }
    if (isAdvancedPackage()) {
      return [
        ISubscriptionType.UNLIMITED_MONTHLY,
        ISubscriptionType.UNLIMITED_YEARLY
      ].map(s => s.toLowerCase()).includes(titleLower);
    }
    if (currentPackage === ISubscriptionType.FREE) {
      return true;
    }
    return false;
  };

  const handlePackageButtonProps = (
    title: string
  ): {
    text: string;
    className: string;
    variant: "solid" | "outline";
  } => {
    const titleLower = title.toLowerCase().replaceAll(/\s+/g, '_');

    if (currentPackage === titleLower) {
      return {
        text: isLoggedIn ? "Current" : "Sign up for free",
        className: isLoggedIn ? "current-button cursor-default !text-black dark:!text-white" : "",
        variant: isLoggedIn ? "outline" : "solid",
      };
    }

    if (isDowngradeTarget(titleLower)) {
      return {
        text: "Downgrade",
        className: "downgrade-button",
        variant: "solid",
      };
    }

    if (isUpgradeTarget(titleLower)) {
      return {
        text: "Upgrade",
        className: "upgrade-button",
        variant: "solid",
      };
    }

    return { text: "Upgrade", className: "select-button", variant: "solid" };
  };

  const renderPriceDetails = (item: any) => {
    if (!item.yearlyPrice && !item.monthlyPrice) return null;

    return (
      <span className="fs-18 !font-light text-[#393c45] dark:text-greyChateau">
        / per {selectedTabIdx === 1 ? "year" : "month"}
      </span>
    );
  };

  const renderFeatureList = (item: {
    desc1?: string;
    desc2?: string;
    desc3?: string;
    desc4?: string;
    desc5?: string;
  }) => {
    const descriptions = [
      item.desc1,
      item.desc2,
      item.desc3,
      item.desc4,
      item.desc5,
    ].filter((desc): desc is string => !!desc);

    return descriptions.map((desc) => (
      <li key={uuidv4()} className="flex items-start gap-2">
        <span className="shrink-0 text-[#27AE60]">
          <Tick />
        </span>
        <p className="text-left text-sm leading-tight dark:text-white">
          {desc}
        </p>
      </li>
    ));
  };

  if (subscriptionDataLoading) {
    return (
      <>
        <SubscriptionCardShimmer count={5} />
        <SubscriptionCardShimmer count={3} showMobile />
      </>
    );
  }

  return (
    <div className="block w-full xl:w-fit mx-auto">
      <Swiper {...swiperSettings} className="subscription-swiper !box-border !px-4 !overflow-visible">
        {subscriptionData?.map((item, index) => (
          <SwiperSlide key={item.title} className="!w-[250px]">
            <SubscriptionItem
              item={item}
              selectedTabIdx={selectedTabIdx}
              loadingStates={loadingStates}
              isHiddenOnMobile={false}
              isSelected={index === activeSlideIndex}
              onClick={() => handleSlideClick(index)}
              goToBillingPortal={goToBillingPortal}
              handlePackageButtonProps={handlePackageButtonProps}
              renderPriceDetails={renderPriceDetails}
              renderFeatureList={renderFeatureList}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default SubscriptionCard;