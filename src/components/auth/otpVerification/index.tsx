import React, { useMemo } from "react";
import { useRouter } from "next/router";
import validator from 'validator';
import NiceModal from "@ebay/nice-modal-react";
import OtpVerification from "../common/OtpVerification";

/**
 * OTP Verification module for standard two-factor authentication
 */
const OtpVerificationModules = (): JSX.Element => {
  const { query } = useRouter();

  // Parse and validate email from query parameter
  const email = useMemo(() => {
    const rawEmail = query.email;
    if (typeof rawEmail !== 'string' || !validator.isEmail(rawEmail)) {
      return null;
    }
    return rawEmail;
  }, [query.email]);
  // Handle successful verification
  const handleVerificationSuccess = (response: any, otp: string) => {
    console.log("otpVerified", response);
    NiceModal.show("otpVerified", { otp, email });
  };

  return (
    <OtpVerification
      email={email}
      isVerifyEmail={false}
      onVerificationSuccess={handleVerificationSuccess}
    />
  );
};

export default OtpVerificationModules;