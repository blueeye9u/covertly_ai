import React, { createContext, useContext, ReactNode, useMemo } from "react";
import useSubscriptionData from "../hooks/useSubscriptionData";
import { IPackage, ISubscriptionDisplayItem, PackageLimitsMap } from "../interfaces/package.interface";
import { subscriptionPriceManager } from "../utils/subscriptionUtils";
import { ISubscriptionType } from "../enums/subscription.enum";

interface SubscriptionContextType {
  subscriptionPackages: IPackage[];
  packageLimits: PackageLimitsMap;
  loading: boolean;
  error: string | null;
  getSubscriptionData: (selectedTabIdx: number) => ISubscriptionDisplayItem[];
  refreshSubscriptionData: () => Promise<void>;
  getPriceId: (subscriptionType: ISubscriptionType) => string;
  getSubscriptionType: (priceId: string) => ISubscriptionType;
}

const SubscriptionContext = createContext<SubscriptionContextType | undefined>(undefined);

export const SubscriptionProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const subscriptionData = useSubscriptionData();

  // Wrap contextValue in useMemo to prevent unnecessary re-renders
  const contextValue = useMemo(() => ({
    ...subscriptionData,
    getPriceId: (subscriptionType: ISubscriptionType) =>
        subscriptionPriceManager.getPriceId(subscriptionType),
    getSubscriptionType: (priceId: string) =>
        subscriptionPriceManager.getSubscriptionType(priceId)
  }), [subscriptionData]); // Recalculate contextValue only when subscriptionData changes

  return (
      <SubscriptionContext.Provider value={contextValue}>
        {children}
      </SubscriptionContext.Provider>
  );
};

export const useSubscription = (): SubscriptionContextType => {
  const context = useContext(SubscriptionContext);
  if (context === undefined) {
    throw new Error("useSubscription must be used within a SubscriptionProvider");
  }
  return context;
};
