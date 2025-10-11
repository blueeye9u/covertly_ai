import React, { useEffect, useState } from "react";
import OtpInput from "react-otp-input";
import { toast } from "react-hot-toast";
import validator from 'validator';
import { authService } from "../../../services/auth.service";
import { errorHandler } from "../../../utils/errorHandler";
import { Button } from "../../global/button/Button";

interface OtpVerificationProps {
  /**
   * Email address to which OTP was sent
   */
  email: string | null;
  
  /**
   * Flag indicating if this is for email verification
   */
  isVerifyEmail: boolean;
  
  /**
   * Handler for successful verification
   */
  onVerificationSuccess: (response: any, otp: string) => void;
  
  /**
   * Optional loading state override
   */
  externalLoading?: boolean;
  
  /**
   * Optional title text
   */
  title?: string;
  
  /**
   * Optional button text
   */
  buttonText?: string;
}

/**
 * Shared OTP verification component
 * Used for both OTP verification and email verification
 */
export const OtpVerification = ({
  email,
  isVerifyEmail,
  onVerificationSuccess,
  externalLoading,
  title = "OTP Verification",
  buttonText = "Verify"
}: OtpVerificationProps): JSX.Element => {
  const [otp, setOtp] = useState<string>("");
  const [timeLeft, setTimeLeft] = useState(60);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (): Promise<void> => {
    if (otp.length < 4) return; // Ensure OTP is complete
    setLoading(true);
    
    try {
      if (typeof email !== 'string' || !validator.isEmail(email)) {
        toast.error("Valid email is required");
        setLoading(false);
        return;
      }

      const response = await authService.verifyEmail2FA({ 
        otp, 
        isVerifyEmail,
        email 
      });
      
      onVerificationSuccess(response, otp);
    } catch (error: unknown) {
      errorHandler(error);
    } finally {
      setLoading(false);
    }
  };

  const resendOTP = async (): Promise<void> => {
    try {
      if (!email) {
        toast.error("Email is required");
        return;
      }

      const response = await authService.resendOTPHandler({ email });
      setTimeLeft(60);
      toast.success(response?.message);
    } catch (error: unknown) {
      errorHandler(error);
    }
  };

  const handleChange = (value: string) => {
    if (/^\d*$/.test(value)) {
      setOtp(value);
    }
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    const pastedData = e.clipboardData.getData("text").slice(0, 4);
    if (/^\d*$/.test(pastedData)) {
      setOtp(pastedData);
    }
  };

  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setInterval(() => setTimeLeft((t) => t - 1), 1000);
      return () => clearInterval(timer);
    }
  }, [timeLeft]);

  const isButtonDisabled =
      externalLoading === undefined
          ? loading ?? otp.length < 4
          : externalLoading || otp.length < 4;

  const isButtonLoading = externalLoading ?? loading;

  return (
    <>
      <div className="mb-10">
        <legend className="fs-32 mb-2 text-center font-semibold dark:text-white">
          {title}
        </legend>
        <p className="text-center text-sm dark:text-white">
          We have sent a 4-character code to{" "}
          <span className="text-primary-100">{email ?? ""}</span>. Please enter it soon, as it expires shortly.
        </p>
        <p className="text-center text-sm dark:text-white">
          Please check your spam for this email.
        </p>
      </div>
      <div className="form-group otpinput-box mb-8">
        <OtpInput
          value={otp}
          onChange={handleChange}
          numInputs={4}
          renderInput={(props) => (
            <input {...props} onPaste={handlePaste} />
          )}
          renderSeparator={<span>-</span>}
        />
      </div>
      <div className="form-group mb-8">
        <Button
          size="lg"
          disabled={isButtonDisabled}
          isLoading={isButtonLoading}
          onClick={handleSubmit}
          color="primary"
          className="w-full"
        >
          {buttonText}
        </Button>
      </div>
      <div className="flex items-center justify-center gap-1">
        {timeLeft === 0 ? (
          <button
            onClick={() => !loading && timeLeft === 0 && resendOTP()}
            disabled={loading ?? timeLeft > 0}
            type="button"
            className="btn btn-md btn-primary !flex-none"
          >
            Resend OTP
          </button>
        ) : (
          <span className="text-base text-primary-100">{timeLeft}s</span>
        )}
      </div>
    </>
  );
};

export default OtpVerification;