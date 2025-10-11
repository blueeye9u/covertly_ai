import React from "react";
import MetaTags from "../components/config/MetaTags";
import withoutAuthentication from "../components/hoc/withoutAuthentication";
import AccountEncryptingModule from "../modules/AccountEncryptingModule";

const AccountEncrypting = () => {
  return (
    <>
      <MetaTags title="Account Encrypting" />
      <AccountEncryptingModule/>
    </>
  );
};
export default withoutAuthentication(AccountEncrypting);
