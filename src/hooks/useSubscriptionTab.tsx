import { useState, useEffect } from 'react';
import useSubscriptionPackage from './useSubscriptionPackage';
import { ISubscriptionType } from '../enums/subscription.enum';

/**
 * Custom hook to manage subscription tab selection based on user's current subscription
 * Returns selectedTabIdx and setSelectedTabIdx for use with PricePlanSwitcher
 */
const useSubscriptionTab = () => {
  const { currentPackage } = useSubscriptionPackage();
  
  // Helper function to check if subscription is yearly
  const isYearlySubscription = (packageType: ISubscriptionType) => {
    return packageType === ISubscriptionType.STARTER_YEARLY ||
           packageType === ISubscriptionType.PRO_YEARLY ||
           packageType === ISubscriptionType.UNLIMITED_YEARLY;
  };

  // Set default tab based on user's current subscription
  const [selectedTabIdx, setSelectedTabIdx] = useState(() => {
    return isYearlySubscription(currentPackage) ? 1 : 0;
  });

  // Update tab when currentPackage changes
  useEffect(() => {
    setSelectedTabIdx(isYearlySubscription(currentPackage) ? 1 : 0);
  }, [currentPackage]);

  return { selectedTabIdx, setSelectedTabIdx };
};

export default useSubscriptionTab;