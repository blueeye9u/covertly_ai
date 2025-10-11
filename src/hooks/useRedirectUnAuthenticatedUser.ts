/**
 * Redirects unauthenticated users away from authenticated routes.
 * If an unauthenticated user tries to access an authenticated route,
 * they will be redirected to the login page.
 */
import { useEffect } from "react";
import { useRouter } from "next/router";
import { getCookie } from "../utils/getCookie";
import {
  AUTHENTICATED_ROUTES,
  UN_AUTHENTICATED_ROUTES,
} from "../constants/routes";

const useRedirectUnAuthenticatedUser = (): void => {
  const router = useRouter();

  useEffect(() => {
    // Check if the user is unauthenticated
    if (!getCookie("token")) {
      const routes = Object.values(AUTHENTICATED_ROUTES);

      // Check if the current route is an authenticated route
      if (routes.includes(router.pathname)) {
        const routeKey = Object.keys(AUTHENTICATED_ROUTES).find(
          (key) => AUTHENTICATED_ROUTES[key] === router.pathname
        );

        if (routeKey) {
          // If the user is unauthenticated and tries to access an authenticated route,
          // redirect the user to the login page
          let route = UN_AUTHENTICATED_ROUTES.LOGIN as string;
          router.push(route);
        }
      }
    }
  }, [router]);
};

export default useRedirectUnAuthenticatedUser;
