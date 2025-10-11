import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import NiceModal from "@ebay/nice-modal-react";
import { checkAutoRedactionAuth, clearAutoRedactionAuth } from "../../utils/autoRedactionAuth";

const withAutoRedactionAuth = (Component: any) => {
  const AutoRedactionAuth = (props: any) => {
    const router = useRouter();
    const [isAuthorized, setIsAuthorized] = useState(false);

    const validateAuth = () => {
      const authStatus = checkAutoRedactionAuth();

      if (authStatus.isValid) {
        // Valid token, user is authorized
        setIsAuthorized(true);
        return;
      }

      // Invalid or expired token
      if (authStatus.isExpired) {
        clearAutoRedactionAuth();
      }

      // Redirect to home and show password modal
      router.push('/');
      setTimeout(() => {
        NiceModal.show("AutoRedactionPasswordModal");
      }, 100);
    };

    useEffect(() => {
      validateAuth();
    }, [router]);

    // Don't render the component until authorization is checked
    if (!isAuthorized) {
      return null;
    }

    return <Component {...props} />;
  };

  // Copy getInitial props so it will run as well
  if (Component.getInitialProps) {
    AutoRedactionAuth.getInitialProps = Component.getInitialProps;
  }

  return AutoRedactionAuth;
};

export default withAutoRedactionAuth;