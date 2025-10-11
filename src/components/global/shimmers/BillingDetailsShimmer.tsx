import React from "react";
import "react-loading-skeleton/dist/skeleton.css";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import { useTheme } from "../../../context/themeContext";

const BillingDetailsShimmer: React.FC = () => {
  const { isDarkMode } = useTheme();
  
  const skeletonTheme = {
    baseColor: isDarkMode ? "#2a2a2a" : "#ebebeb",
    highlightColor: isDarkMode ? "#3a3a3a" : "#ffffff"
  };

  return (
    <SkeletonTheme baseColor={skeletonTheme.baseColor} highlightColor={skeletonTheme.highlightColor}>
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
              {/* Plan name skeleton */}
              <Skeleton
                height={28}
                width={120}
                borderRadius="4px"
              />
              {/* Badge skeleton */}
              <Skeleton
                height={28}
                width={70}
                borderRadius="6px"
              />
            </div>
            <div className="flex items-center gap-2">
              {/* Price skeleton */}
              <Skeleton
                height={28}
                width={60}
                borderRadius="4px"
              />
              {/* Period text skeleton */}
              <Skeleton
                height={16}
                width={80}
                borderRadius="4px"
              />
            </div>
          </div>

          <div className="profile__settings__billingDetails__body">
            <div>
              <p className="text-sm text-stormGrey">
                Next billing date
              </p>
              <div className="mt-2 block">
                <Skeleton
                  height={20}
                  width={140}
                  borderRadius="4px"
                />
              </div>
            </div>
            {/* Stripe button skeleton */}
            <div className="profile__settings__billingDetails__stripe__btn">
              <Skeleton
                height={16}
                width={16}
                borderRadius="4px"
                style={{ marginRight: '8px' }}
              />
              <Skeleton
                height={16}
                width={120}
                borderRadius="4px"
              />
            </div>
          </div>
        </div>
      </div>
    </SkeletonTheme>
  );
};

export default BillingDetailsShimmer;