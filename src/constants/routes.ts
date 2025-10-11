/**
 * Defines the type for the route that updates the password.
 * @param {string} otp - The one-time password (OTP) used for password update.
 * @returns {string} The URL route for updating the password.
 */
type UpdatePasswordRoute = (otp: string, email: string) => string;

/**
 * Defines the type for the route that verifies the email.
 * @param {string} email - The email address to be verified.
 * @returns {string} The URL route for verifying the email.
 */
type VERIFY_EMAIL = (email: string) => string;

/**
 * Object containing routes accessible to unauthenticated users.
 * Each route can be either a string representing the URL path or a function generating the URL with parameters.
 */
export const UN_AUTHENTICATED_ROUTES: {
  [key: string]: string | UpdatePasswordRoute | VERIFY_EMAIL;
} = {
  HOME: "/", // Home page route
  LOGIN: "/login", // Login page route
  LOGIN_PASSWORD: (email: string) => `/login/password?otp_token=${email}`, // Route for login with password
  SIGNUP: "/signup", // Signup page route
  SIGNUP_PASSWORD: (email: string) => `/signup/password?otp_token=${email}`, // Route for signup with password
  SETUP_PASSWORD: (email: string) => `/signup/setup-password?otp_token=${email}`, // Route for signup with password
  FORGOT_PASSWORD: "/forgot-password", // Forgot password page route
  RESET_PASSWORD: (otp: string, email: string) => `/reset-password?otp=${otp}&email=${email}`, // Route for updating password
  VERIFY_EMAIL: (email: string) => `/verify-email?otp_token=${email}`, // Route for email verification
  VERIFY_OTP: (email: string) => `/otp-verify?email=${email}`, // Route for OTP verification
  LINK_ACCOUNT: "/link-account", // Route for OTP verification
};

export const AUTHENTICATED_ROUTES: {
  [key: string]: string;
} = {
  CHAT: "/chat",
  PREFERENCES: "/preferences",
  SETTINGS: "/settings",
  IMAGE_GENERATION: "/image-generate",
  IMAGE_LIBRARY: "/image-library",
};
