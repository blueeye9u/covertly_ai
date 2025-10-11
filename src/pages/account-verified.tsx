import React from "react";
import MetaTags from "../components/config/MetaTags";
import withoutAuthentication from "../components/hoc/withoutAuthentication";
import AccountVerifiedModule from "../modules/AccountVerified";



const AccountVerified = () => {

  return (
    <>
      <MetaTags title="Account Verified" />
      <AccountVerifiedModule/>
    </>
  );
};
export default withoutAuthentication(AccountVerified);
