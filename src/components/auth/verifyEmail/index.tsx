import React, { useMemo, useState } from "react";
import { useRouter } from "next/router";
import validator from 'validator';
import { useDebouncedClick } from "../../../hooks/useDebouncedClick";
import OtpVerification from "../common/OtpVerification";
import {handleAuthentication} from "../../../utils/authUtils";

/**
 * VerifyEmailModules component handles the verification of email
 * using OTP (One-Time Password) and manages the verification flow
 * @returns {JSX.Element} The JSX element representing the VerifyEmailModules component
 */
const VerifyEmailModules = (): JSX.Element => {
  const router = useRouter();
  const { query } = router;
  
  // For loading state management
  const [, loadingStates] = useDebouncedClick();
  const [loading, setLoading] = useState(false);

  // Parse and validate email from query parameter
  const email = useMemo(() => {
    const rawOtpToken = query.otp_token;
    
    if (typeof rawOtpToken !== 'string' || !validator.isEmail(rawOtpToken)) {
      return null;
    }
    
    return rawOtpToken;
  }, [query.otp_token]);

  /**
   * Handle successful email verification
   * Navigates through a series of screens with delays before finally redirecting to login
   */
  const handleVerificationSuccess = async (response: any, otp: string) => {
    if (response?.payload?.token) {
      setLoading(true);
      
      try {
        // Step 1: Navigate to account-initializing
        await router.push("account-initializing");
        await new Promise((resolve) => setTimeout(resolve, 6000)); // 6s delay

        // Step 2: Navigate to account-encrypting
        await router.push("account-encrypting");
        await new Promise((resolve) => setTimeout(resolve, 6000)); // 6s delay

        // Step 3: Navigate to account-verified
        await router.push("account-verified");
        await new Promise((resolve) => setTimeout(resolve, 5000)); // 5s delay

        // Step 4: Navigate to Chat if success
        // Use shared authentication handling
        const success = await handleAuthentication(response, {
          router,
          onSuccess: () => {}
        });

        if (!success) {
          return;
        }

      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <OtpVerification
      email={email}
      isVerifyEmail={true}
      onVerificationSuccess={handleVerificationSuccess}
      externalLoading={loadingStates["loading"] || loading}
      buttonText="Verify"
    />
  );
};

export default VerifyEmailModules;