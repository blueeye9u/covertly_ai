import withoutAuthentication from "../components/hoc/withoutAuthentication";
import AuthLayout from "../components/global/authLayout";
import LinkAccountModules from "../components/auth/linkAccount";
import MetaTags from "../components/config/MetaTags";

const LinkAccount = () => {
  return (
    <>
      <MetaTags title="Link Accounts" />
        <AuthLayout>
          <LinkAccountModules />
        </AuthLayout>
    </>
  );
};
export default withoutAuthentication(LinkAccount);


