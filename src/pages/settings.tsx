import MetaTags from "../components/config/MetaTags";
import SettingsModule from "../modules/SettingsModule";
import withAuthentication from "../components/hoc/withAuthentication";

const Settings = () => {
  return (
    <>
      <MetaTags title="Settings" />
      {/* <ConversationProvider> */}
        <SettingsModule />
      {/* </ConversationProvider> */}
    </>
  );
};
export default withAuthentication(Settings);
