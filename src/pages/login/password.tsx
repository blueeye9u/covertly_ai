import withoutAuthentication from "../../components/hoc/withoutAuthentication";
import AuthLayout from "../../components/global/authLayout";
import LoginPasswordModule from "../../components/auth/login/LoginPasswordModule";
import MetaTags from "../../components/config/MetaTags";

const LoginPassword = () => {
  return (
    <>
      <MetaTags title="Login" />
      <AuthLayout
        signupText="Don't have an account yet?"
        linkText="Sign up now"
        linkUrl="/signup"
      >
        <LoginPasswordModule />
      </AuthLayout>
    </>
  );
};
export default withoutAuthentication(LoginPassword);
