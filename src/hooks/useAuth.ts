import { useMutation, useQueryClient } from '@tanstack/react-query';
import { signIn, signUp, logoutUser } from '../api';
import { useAuthStore } from '../store';

export const useSignIn = () => {
  const login = useAuthStore((state) => state.login);

  return useMutation({
    mutationFn: signIn,
    onSuccess: (data) => {
      login({
        user: data.user,
        token: data.token,
        refreshToken: data.refreshToken,
      });
    },
  });
};

export const useSignUp = () => {
  return useMutation({
    mutationFn: signUp,
  });
};

export const useLogout = () => {
  const logout = useAuthStore((state) => state.logout);
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: logoutUser,
    onSuccess: () => {
      logout();
      queryClient.clear(); // clear any cached queries
    },
  });
};
