import MetaTags from "../components/config/MetaTags";
import withAuthentication from "../components/hoc/withAuthentication";
import withAutoRedactionAuth from "../components/hoc/withAutoRedactionAuth";
import dynamic from 'next/dynamic';

const RedactionViewer = dynamic(() => import('../components/RedactionView'), {
  ssr: false, // disables SSR for this component
});

const Redaction = () => {
  return (
    <>
      <MetaTags title="Redaction" />
      <RedactionViewer />
    </>
  );
};
export default withAuthentication(withAutoRedactionAuth(Redaction));
