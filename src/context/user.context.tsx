import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
  useCallback,
  useMemo
} from 'react';
import { getCookie } from '../utils/getCookie';
import { userService } from '../services/user.service';
import { isAnonymousUser } from '../utils/authUtils';

interface UserContextType {
  user: any;
  isLoading: boolean;
  selectedImage: string;
  isAnonymous: boolean;
  refreshProfile: () => Promise<void>;
  setUser: (newUser: any) => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState<string>("");

  const refreshProfile = useCallback(async () => {
    if (getCookie("token")) {
      try {
        const response = await userService.getProfileHandler();
        setUser(response.payload.user);
        setSelectedImage(response.payload.user.avatar ?? "");
      } catch (error: unknown) {
        console.error("Error refreshing profile:", error);
      }
    }
    setIsLoading(false);
  }, []);

  useEffect(() => {
    refreshProfile();

    // Set up periodic refresh every 45 minutes (before the 1-hour SAS token expires)
    const refreshInterval = setInterval(refreshProfile, 45 * 60 * 1000);

    return () => clearInterval(refreshInterval);
  }, [refreshProfile]);

  const isAnonymous = useMemo(() => {
    return user && isAnonymousUser(user);
  }, [user]);

  const contextValue = useMemo(() => ({
    user,
    isLoading,
    selectedImage,
    isAnonymous,
    refreshProfile,
    setUser,
  }), [user, isLoading, selectedImage, isAnonymous, refreshProfile, setUser]);

  return (
    <UserContext.Provider value={contextValue}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = (): UserContextType => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};