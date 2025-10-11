
export enum ISubscriptionType {
  STARTER_MONTHLY = "starter_monthly",
  STARTER_YEARLY = "starter_yearly",
  PRO_MONTHLY = "pro_monthly",
  PRO_YEARLY = "pro_yearly",
  UNLIMITED_YEARLY = "unlimited_yearly",
  UNLIMITED_MONTHLY = "unlimited_monthly",
  FREE = "free",
  ENTERPRISE = "enterprise",
}

/**
 * DEPRECATED: This constant is kept for backward compatibility
 * Use subscriptionPriceManager.getPriceId() from subscription context instead
 */
export const ESubscriptionPrice = {} as const;

export const subscriptionDisplayNames: Record<ISubscriptionType, string> = {
  [ISubscriptionType.STARTER_MONTHLY]: "Starter",
  [ISubscriptionType.STARTER_YEARLY]: "Starter",
  [ISubscriptionType.PRO_MONTHLY]: "Pro",
  [ISubscriptionType.PRO_YEARLY]: "Pro",
  [ISubscriptionType.UNLIMITED_MONTHLY]: "Unlimited",
  [ISubscriptionType.UNLIMITED_YEARLY]: "Unlimited",
  [ISubscriptionType.FREE]: "Free",
  [ISubscriptionType.ENTERPRISE]: "Enterprise",
};

export const SubscriptionBuyMore :any= {
  basic_low_buymore: {
    topUpChatTokensCredits: 100000,
    topUpImagePromptsCredits: 20,
    price: 5
  },
  basic_high_buymore: {
    topUpChatTokensCredits: 250000,
    topUpImagePromptsCredits: 50,
    price: 15
  },
  advanced_low_buymore: {
    topUpChatTokensCredits: 500000,
    topUpImagePromptsCredits: 100,
    price: 25
  },
};
