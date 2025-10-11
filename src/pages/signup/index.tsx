import withoutAuthentication from "../../components/hoc/withoutAuthentication";
import AuthLayout from "../../components/global/authLayout";
import LoginModule from "../../components/auth/login/LoginModule";
import MetaTags from "../../components/config/MetaTags";

const SignUp = () => {
  return (
    <>
      <MetaTags title="OTP Varification" />

      <AuthLayout
        signupText="Don't have an account yet?"
        linkText="Sign up now"
        linkUrl="/signup"
      >
        <LoginModule signUp={true}/>
      </AuthLayout>
    </>
  );
};
export default withoutAuthentication(SignUp);
