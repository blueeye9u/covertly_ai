import withoutAuthentication from "../components/hoc/withoutAuthentication"
import AuthLayout from "../components/global/authLayout"
import OtpVerificationModules from "../components/auth/otpVerification"
import MetaTags from "../components/config/MetaTags"

const OtpVerification = () => {
  return (
    <>
      <MetaTags title="OTP Verification" />
        <AuthLayout>
          <OtpVerificationModules />
        </AuthLayout>
    </>
  );
};
export default withoutAuthentication(OtpVerification);
