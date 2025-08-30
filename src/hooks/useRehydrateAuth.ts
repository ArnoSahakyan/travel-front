import { useEffect } from 'react';
import { useAuthStore } from '../store';
import { fetchCurrentUser } from '../api';

export const useRehydrateAuth = (force = false) => {
  const { accessToken, login, logout } = useAuthStore();

  useEffect(() => {
    const initializeUser = async () => {
      if (accessToken) {
        try {
          const fetchedUser = await fetchCurrentUser();
          login({
            user: fetchedUser,
            token: accessToken,
            refreshToken: useAuthStore.getState().refreshToken!,
          });
        } catch (error) {
          console.error('Rehydrate Error:', error);
          logout();
        }
      }
    };

    if (force) {
      initializeUser();
    } else if (accessToken && !useAuthStore.getState().user) {
      initializeUser();
    }
  }, [accessToken, force, login, logout]);
};
