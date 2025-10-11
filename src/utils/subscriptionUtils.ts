import { ISubscriptionType } from "../enums/subscription.enum";
import { IPackage } from "../interfaces/package.interface";

/**
 * Singleton class to manage subscription price IDs
 */
class SubscriptionPriceManager {
  private priceIdMap: Record<ISubscriptionType, string> = {} as Record<ISubscriptionType, string>;
  private static instance: SubscriptionPriceManager;

  private constructor() {}

  /**
   * Get the singleton instance
   */
  public static getInstance(): SubscriptionPriceManager {
    if (!SubscriptionPriceManager.instance) {
      SubscriptionPriceManager.instance = new SubscriptionPriceManager();
    }
    return SubscriptionPriceManager.instance;
  }

  /**
   * Initialize price IDs from subscription packages
   * @param packages - The subscription packages from the backend
   */
  public initializePriceIds(packages: IPackage[]): void {
    for (const pkg of packages) {
      if (pkg.type && pkg.stripePriceId) {
        this.priceIdMap[pkg.type] = pkg.stripePriceId;
      }
    }
  }

  /**
   * Get the price ID for a specific subscription type
   * @param subscriptionType - The subscription type to get the price ID for
   * @returns The price ID or empty string if not found
   */
  public getPriceId(subscriptionType: ISubscriptionType): string {
    return this.priceIdMap[subscriptionType] || '';
  }

  /**
   * Get the subscription type from a price ID
   * @param priceId - The price ID to look up
   * @returns The subscription type or FREE if not found
   */
  public getSubscriptionType(priceId: string): ISubscriptionType {
    for (const [type, id] of Object.entries(this.priceIdMap)) {
      if (id === priceId) {
        return type as ISubscriptionType;
      }
    }
    return ISubscriptionType.FREE;
  }

  /**
   * Get all price IDs
   * @returns Record mapping subscription types to price IDs
   */
  public getAllPriceIds(): Record<ISubscriptionType, string> {
    return { ...this.priceIdMap };
  }
}

export const subscriptionPriceManager = SubscriptionPriceManager.getInstance();