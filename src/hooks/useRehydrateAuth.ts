import { useEffect } from 'react';
import { useAuthStore } from '../store';
import { fetchCurrentUser } from '../api';

export const useRehydrateAuth = () => {
  const { accessToken, user, login, logout } = useAuthStore();
  useEffect(() => {
    const initializeUser = async () => {
      if (accessToken && !user) {
        console.log('Rehydrating Auth');
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
  }, [accessToken, user, login, logout]);
};
