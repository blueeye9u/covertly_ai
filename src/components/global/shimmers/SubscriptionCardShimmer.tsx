import React, { useMemo } from "react";
import "react-loading-skeleton/dist/skeleton.css";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import { useTheme } from "../../../context/themeContext";

interface SubscriptionCardShimmerProps {
  count?: number;
  showMobile?: boolean;
}

const SkeletonCard: React.FC = () => (
  <div className="pricing_card">
    <div className="flex flex-col">
      {/* Title */}
      <div className="mb-1">
        <Skeleton
          height={24}
          width="70%"
          borderRadius="4px"
        />
      </div>
      
      {/* Description */}
      <div className="mb-2 h-11">
        <Skeleton
          height={16}
          width="100%"
          borderRadius="4px"
          style={{ marginBottom: '4px' }}
        />
        <Skeleton
          height={16}
          width="80%"
          borderRadius="4px"
        />
      </div>
      
      {/* Price */}
      <div className="mb-2 min-h-[59.51px] flex items-end">
        <Skeleton
          height={48}
          width="60%"
          borderRadius="4px"
        />
      </div>

      {/* Button */}
      <div className="mb-6">
        <Skeleton
          height={40}
          width="100%"
          borderRadius="6px"
        />
      </div>
    </div>
    
    {/* Features list */}
    <div className="flex flex-col space-y-3 flex-1 border-t border-linkWater50 dark:border-tuna pt-6">
      {[1, 2, 3, 4, 5].map((item) => (
        <div key={item} className="flex items-start gap-2">
          <div className="w-full">
            <Skeleton
              height={16}
              width={`100%`}
              borderRadius="4px"
            />
          </div>
        </div>
      ))}
    </div>
  </div>
);

const SubscriptionCardShimmer: React.FC<SubscriptionCardShimmerProps> = ({ 
  count = 5, 
  showMobile = false 
}) => {
  const { isDarkMode } = useTheme();
  
  const skeletonTheme = {
    baseColor: isDarkMode ? "#2a2a2a" : "#ebebeb",
    highlightColor: isDarkMode ? "#3a3a3a" : "#ffffff"
  };

  const skeletonKeys = useMemo(() => [...new Array(count).keys()], [count]);

  return (
    <SkeletonTheme baseColor={skeletonTheme.baseColor} highlightColor={skeletonTheme.highlightColor}>
      {/* Desktop/Tablet View */}
      {!showMobile && (
        <div className="sm:grid hidden gap-5 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-5">
          {skeletonKeys.map((key) => (
            <SkeletonCard key={key} />
          ))}
        </div>
      )}

      {/* Mobile View */}
      {showMobile && (
        <div className="flex sm:hidden gap-4 overflow-x-hidden">
          {skeletonKeys.map((key) => (
            <div key={key} className="h-[430px] px-1 flex-shrink-0 w-[85%]">
              <SkeletonCard />
            </div>
          ))}
        </div>
      )}
    </SkeletonTheme>
  );
};

export default SubscriptionCardShimmer;