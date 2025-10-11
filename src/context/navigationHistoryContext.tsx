import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
  useMemo,
} from "react";
import { useRouter } from "next/router";

interface NavigationHistoryContextType {
  previousUrl: string | null;
}

const NavigationHistoryContext = createContext<
  NavigationHistoryContextType | undefined
>(undefined);

interface NavigationHistoryProviderProps {
  children: ReactNode;
}

export const NavigationHistoryProvider = ({
  children,
}: NavigationHistoryProviderProps) => {
  const [previousUrl, setPreviousUrl] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const handleRouteChangeStart = (url: string) => {
      setPreviousUrl(router.asPath);
    };

    router.events.on("routeChangeStart", handleRouteChangeStart);

    return () => {
      router.events.off("routeChangeStart", handleRouteChangeStart);
    };
  }, [router]);

  // Memoize the context value to prevent unnecessary re-renders
  const contextValue = useMemo(
    () => ({
      previousUrl,
    }),
    [previousUrl]
  );

  return (
    <NavigationHistoryContext.Provider value={contextValue}>
      {children}
    </NavigationHistoryContext.Provider>
  );
};

export const useNavigationHistoryContext = (): NavigationHistoryContextType => {
  const context = useContext(NavigationHistoryContext);
  if (context === undefined) {
    throw new Error(
      "useNavigationHistory must be used within a NavigationHistoryProvider"
    );
  }
  return context;
};