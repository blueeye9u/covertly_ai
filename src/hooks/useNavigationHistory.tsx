import { useRouter } from "next/router";
import { useEffect, useRef } from "react";

const useNavigationHistory = () => {
  const router = useRouter();
  const previousUrlRef: any = useRef(null);

  useEffect(() => {
    const handleRouteChange = () => {
      previousUrlRef.current = router.asPath;
    };

    router.events.on("routeChangeStart", handleRouteChange);

    return () => {
      router.events.off("routeChangeStart", handleRouteChange);
    };
  }, [router]);

  const getPreviousUrl = () => previousUrlRef.current;

  return { getPreviousUrl };
};

export default useNavigationHistory;
