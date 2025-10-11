import { toast } from "react-hot-toast";
import { NextRouter } from "next/router";
import { HttpService } from "../services/base.service";
import { EGptModels } from "../enums/gpt-models.enum";
import { getRandomName } from "./getRandomName";
import { AUTHENTICATED_ROUTES } from "../constants/routes";
import { IUser } from '../interfaces/user';

/**
 * Authentication response with token and user data
 */
export interface AuthResponse {
  payload?: {
    token?: {
      token?: string;
    };
    user?: {
      _id?: string;
      role?: string;
      isActive?: boolean;
      avatar?: string;
      email?: string;
      uniqueId?: string;
      stripePriceId?: string;
    };
    nextStep?: string;
    isFirstTimeUser?: boolean;
  };
}

/**
 * Options for authentication handling
 */
interface AuthOptions {
  router: NextRouter;
  redirectTo?: string;
  onSuccess?: (response: AuthResponse) => void;
  clearCredentials?: boolean;
}

/**
 * Sets authentication cookies based on response data
 */
export const setAuthCookies = (response: AuthResponse): boolean => {
  // Extract user details and token from response
  const token = response?.payload?.token?.token ?? "";
  const userId = response?.payload?.user?._id ?? "";
  const role = response?.payload?.user?.role ?? "";
  const isActive = response?.payload?.user?.isActive;
  const avatar = response?.payload?.user?.avatar ?? "";
  const email = response?.payload?.user?.email ?? "";
  const uniqueId = response?.payload?.user?.uniqueId ?? "";
  const stripePriceId = response?.payload?.user?.stripePriceId ?? "";

  // Check user role and activation status
  if (!role || role !== "USER" || isActive === false) {
    toast.error("Unauthorized access!");
    return false;
  }

  // Generate a mock name for the user
  const mockName = getRandomName();

  // Set token and cookies
  HttpService.setToken(token);
  HttpService.setCookie("token", token);
  HttpService.setCookie("userId", userId);
  HttpService.setCookie("avatar", avatar);
  HttpService.setCookie("fullName", mockName?.trim()?.split(" ")?.join("_"));
  HttpService.setCookie("email", email);
  HttpService.setCookie("stripePriceId", stripePriceId);
  HttpService.setCookie("model", EGptModels.GPT_4);
  HttpService.setCookie("uniqueId", uniqueId);

  return true;
};

/**
 * Handles authentication process with response data
 */
export const handleAuthentication = async (
  response: AuthResponse,
  options: AuthOptions
): Promise<boolean> => {
  const { router, redirectTo = AUTHENTICATED_ROUTES.CHAT, onSuccess, clearCredentials } = options;

  // Clear any existing credentials if requested
  if (clearCredentials) {
    // Add any cleanup logic here if needed
  }

  // Set cookies and check if successful
  const success = setAuthCookies(response);
  if (!success) {
    return false;
  }

  // Execute success callback if provided
  if (onSuccess) {
    onSuccess(response);
  }

  // Handle first-time user flow if indicated
  const isFirstTimeUser = response?.payload?.isFirstTimeUser;
  if (isFirstTimeUser) {
    await router.push("account-initializing");
    await new Promise((resolve) => setTimeout(resolve, 6000));
    await router.push("account-encrypting");
    await new Promise((resolve) => setTimeout(resolve, 6000));
    await router.push("account-verified");
    await new Promise((resolve) => setTimeout(resolve, 5000));
  }

  // Redirect to specified route
  await router.push(redirectTo);
  return true;
};

export const isAnonymousUser = (user: IUser): boolean => {
  return user.email.includes("@covertly.ai");
}