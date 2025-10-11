import { useCallback, useEffect, useState } from 'react';
import { subscriptionService } from '../services/subscription.service';
import { IPackage, ISubscriptionDisplayItem, PackageLimitsMap } from '../interfaces/package.interface';
import { ISubscriptionType, subscriptionDisplayNames } from '../enums/subscription.enum';
import { errorHandler } from '../utils/errorHandler';
import { subscriptionPriceManager } from '../utils/subscriptionUtils';

/**
 * Hook to fetch and manage subscription data from the backend
 * @returns Object containing subscription data, loading state, and error
 */
const useSubscriptionData = () => {
  const [subscriptionPackages, setSubscriptionPackages] = useState<IPackage[]>([]);
  const [packageLimits, setPackageLimits] = useState<PackageLimitsMap>({} as PackageLimitsMap);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  /**
   * Fetches subscription packages from the backend
   */
  const fetchSubscriptionPackages = useCallback(async () => {
    try {
      setLoading(true);
      const response = await subscriptionService.getSubscriptionPackages();

      if (response?.payload) {
        const packages = response.payload;
        setSubscriptionPackages(packages);

        // Initialize price manager with the subscription price IDs
        subscriptionPriceManager.initializePriceIds(packages);

        // Create package limits map from the received data
        const limits: Partial<PackageLimitsMap> = {};

        for (const pkg of packages) {
          const multiplier = pkg.isYearly ? 12 : 1;
          if (pkg.type) {
            limits[pkg.type] = {
              image: pkg.imageTokens * multiplier,
              chat: pkg.chatTokens * multiplier,
              price: pkg.price
            };
          }
        }

        if (Object.keys(limits).length > 0) {
          setPackageLimits(limits as PackageLimitsMap);
        }
      }

      setError(null);
    } catch (err) {
      errorHandler(err);
      setError('Failed to fetch subscription packages');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchSubscriptionPackages();
  }, [fetchSubscriptionPackages]);

  /**
   * Transforms backend subscription data to frontend display format
   * @param selectedTabIdx - 0 for monthly, 1 for yearly
   * @returns Array of subscription display items
   */
  const getSubscriptionData = useCallback((selectedTabIdx: number): ISubscriptionDisplayItem[] => {
    // If no data available or still loading, return empty array
    if (loading || subscriptionPackages.length === 0) {
      return [];
    }

    // Helper function to determine if the package should be included based on its type
    const isPackageValid = (pkgType: string | undefined, periodType: string) => {
      if (pkgType?.includes(periodType)) {
        return true;
      } else {
        return pkgType === 'free' || pkgType === 'enterprise';
      }
    };

// Filter packages based on billing period (monthly/yearly)
    const filteredPackages = subscriptionPackages.filter(pkg => {
      if (selectedTabIdx === 1) {
        // For yearly tab, include packages with yearly in the key
        return isPackageValid(pkg.type, 'yearly');
      } else {
        // For monthly tab, include packages with monthly in the key
        return isPackageValid(pkg.type, 'monthly');
      }
    });

    // Map packages to display items
    return filteredPackages.map(pkg => ({
      isButton: pkg.type !== ISubscriptionType.ENTERPRISE,
      title: subscriptionDisplayNames[pkg.type],
      key: pkg.type,
      desc: pkg.desc,
      yearlyPrice: pkg.yearlyPrice ?? "",
      monthlyPrice: pkg.monthlyPrice ?? "",
      desc1: pkg.desc1 ?? "",
      desc2: pkg.desc2 ?? "",
      desc3: pkg.desc3 ?? "",
      desc4: pkg.desc4 ?? "",
      desc5: pkg.desc5 ?? "",
    }));
  }, [loading, subscriptionPackages]);

  return {
    subscriptionPackages,
    packageLimits,
    loading,
    error,
    getSubscriptionData,
    refreshSubscriptionData: fetchSubscriptionPackages
  };
};

export default useSubscriptionData;