import { useEffect } from 'react';
import { useAuthStore } from '../store';
import { fetchCurrentUser } from '../api';

const useRehydrateAuth = () => {
  const { accessToken, isAuthenticated, login, logout } = useAuthStore();

  useEffect(() => {
    const initializeUser = async () => {
      if (accessToken && !isAuthenticated) {
        try {
          const user = await fetchCurrentUser();
          login({
            user,
            token: accessToken,
            refreshToken: useAuthStore.getState().refreshToken!,
          });
        } catch (error) {
          console.error('Fetching User Data Error:', error);
          logout();
        }
      }
    };

    initializeUser();
  }, [accessToken, isAuthenticated, login, logout]);
};

export default useRehydrateAuth;
