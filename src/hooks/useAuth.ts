import { useMutation } from '@tanstack/react-query';
import { signIn, signUp } from '../api';
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
