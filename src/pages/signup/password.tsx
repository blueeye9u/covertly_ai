import SignupModule from "../../components/auth/signup/SignUpModule";
import withoutAuthentication from "../../components/hoc/withoutAuthentication";
import AuthLayout from "../../components/global/authLayout";
import MetaTags from "../../components/config/MetaTags";

const SignupPassword = () => {
  return (
    <>
      <MetaTags title="Sign Up" />

      <AuthLayout
        signupText="Already have an account yet? "
        linkText="Login"
        linkUrl="/login"
      >
        <SignupModule />
      </AuthLayout>
    </>
  );
};
export default withoutAuthentication(SignupPassword);
