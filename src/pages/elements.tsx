import ElementsModule from "../modules/ElementsModule/ElementsModule";
import withoutAuthentication from "../components/hoc/withoutAuthentication";
import MetaTags from "../components/config/MetaTags";

const Elements = () => {
  return (
    <>
      <MetaTags title="Elements" />
      <ElementsModule />
    </>
  );
};
export default withoutAuthentication(Elements);
