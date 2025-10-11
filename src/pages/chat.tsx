import ChatModule from "../components/chat";
import withAuthentication from "../components/hoc/withAuthentication";
import MetaTags from "../components/config/MetaTags";

const Chat = () => {
  return (
    <>
    <MetaTags title="Chat" />
    <ChatModule />
    </>
  );
};

export default withAuthentication(Chat);
