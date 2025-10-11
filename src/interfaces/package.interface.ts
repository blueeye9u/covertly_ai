import { ISubscriptionType } from "../enums/subscription.enum";

/**
 * Package interface representing a subscription package from the backend
 */
export interface IPackage {
  type: ISubscriptionType;
  title: string;
  desc: string;
  price: number;
  yearlyPrice: string;
  monthlyPrice: string;
  stripePriceId: string;
  chatTokens: number;
  imageTokens: number;
  isYearly: boolean;
  desc1?: string;
  desc2?: string;
  desc3?: string;
  desc4?: string;
  desc5?: string;
}

/**
 * Frontend representation of a subscription package for display
 */
export interface ISubscriptionDisplayItem {
  isButton: boolean;
  title: string;
  key: ISubscriptionType;
  desc: string;
  yearlyPrice: string;
  monthlyPrice: string;
  desc1?: string;
  desc2?: string;
  desc3?: string;
  desc4?: string;
  desc5?: string;
}

/**
 * Package limits for subscription types
 */
export interface IPackageLimits {
  image: number;
  chat: number;
  price: number;
}

/**
 * Mapping of subscription types to package limits
 */
export type PackageLimitsMap = Record<ISubscriptionType, IPackageLimits>;
