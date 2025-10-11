import MetaTags from "../components/config/MetaTags";
import withAuthentication from "../components/hoc/withAuthentication";
import UploadDocumentModule from "../modules/UploadDocumentModule";

const UploadDocument = () => {
  return (
    <>
      <MetaTags title="upload-document" />
        <UploadDocumentModule />
    </>
  );
};
export default withAuthentication(UploadDocument);
