import React from "react";
import MetaTags from "../components/config/MetaTags";
import InitializingAnonymous from "../modules/InitializingAnonymous";
import withoutAuthentication from "../components/hoc/withoutAuthentication";


const AccountInitializing = () => {

  return (
    <>
      <MetaTags title="Account Initializing" />
      <InitializingAnonymous/>

    </>
  );
};
export default withoutAuthentication(AccountInitializing);
