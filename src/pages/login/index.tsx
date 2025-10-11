import LoginModule from "../../components/auth/login/LoginModule";
import withoutAuthentication from "../../components/hoc/withoutAuthentication";
import AuthLayout from "../../components/global/authLayout";
import MetaTags from "../../components/config/MetaTags";

const Login = () => {
  return (
    <>
      <MetaTags title="Login" />
      <AuthLayout
        signupText="Don't have an account yet?"
        linkText="Sign up now"
        linkUrl="/signup"
      >
        <LoginModule />
      </AuthLayout>
    </>
  );
};
export default withoutAuthentication(Login);
