// Importing base class
import { IResponse } from "../interfaces/response";
import { HttpService } from "./base.service";
import { IPackage } from "../interfaces/package.interface";

class SubscriptionService extends HttpService {
  private readonly prefix: string = "subscription";

  createCheckoutSession = (data: {
    subscription: string;
  }): Promise<IResponse<{ sessionUrl: string }>> =>
    this.post(`${this.prefix}/checkout-session`, data);

  buyMoreSession = (data: {
    subscription: string;
  }): Promise<IResponse<{ sessionUrl: string }>> =>
    this.post(`${this.prefix}/buymore-session`, data);

  cancelSubscriptionHandler = (): Promise<IResponse> =>
    this.get(`${this.prefix}`);

  createCustomerPortalSession = (): Promise<
    IResponse<{ sessionUrl: string }>
  > => this.get(`${this.prefix}/portal`);
  
  /**
   * Fetches all subscription packages from the backend
   * @returns Promise with subscription packages data
   */
  getSubscriptionPackages = (): Promise<IResponse<IPackage[]>> =>
    this.get(`${this.prefix}/packages`);
}

export const subscriptionService = new SubscriptionService();
