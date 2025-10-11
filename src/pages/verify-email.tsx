import withoutAuthentication from "../components/hoc/withoutAuthentication";
import AuthLayout from "../components/global/authLayout";
import VerifyEmailModules from "../components/auth/verifyEmail";
import MetaTags from "../components/config/MetaTags";

const OtpVerification = () => {
  return (
    <>
      <MetaTags title="OTP Verification" />
      <AuthLayout>
        <VerifyEmailModules />
      </AuthLayout>
    </>
  );
};
export default withoutAuthentication(OtpVerification);
