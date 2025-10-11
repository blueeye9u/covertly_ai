/**
 * Custom hook to determine the logged-in status of the user.
 * It returns an array containing three elements:
 * - user: The user object containing user information
 * - isLoading: A boolean indicating whether the hook is still loading or not
 * - selectedImage: The user's avatar URL with a valid SAS token
 */
import { useUser } from '../context/user.context';

const useLoggedInUser = (): [any, boolean, string, boolean, () => Promise<void>] => {
  const { user, isLoading, selectedImage, isAnonymous, refreshProfile } = useUser();

  return [user, isLoading, selectedImage, isAnonymous, refreshProfile];
};

export default useLoggedInUser;
