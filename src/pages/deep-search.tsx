import DeepSearchModule from "../components/deep-search";
import withAuthentication from "../components/hoc/withAuthentication";
import MetaTags from "../components/config/MetaTags";

const DeepSearch = () => {
  return (
    <>
      <MetaTags title="Deep Search Agent" />
      <DeepSearchModule />
    </>
  );
};

export default withAuthentication(DeepSearch);