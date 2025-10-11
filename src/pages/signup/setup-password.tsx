import withoutAuthentication from "../../components/hoc/withoutAuthentication";
import AuthLayout from "../../components/global/authLayout";
import MetaTags from "../../components/config/MetaTags";
import SetupPasswordModule from "../../components/auth/signup/SetupPassword";

const SetupPassword = () => {
  return (
    <>
      <MetaTags title="Sign Up" />

      <AuthLayout
        signupText="Already have an account yet? "
        linkText="Login"
        linkUrl="/login"
      >
        <SetupPasswordModule />
      </AuthLayout>
    </>
  );
};
export default withoutAuthentication(SetupPassword);
