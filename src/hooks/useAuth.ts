import { useMutation } from '@tanstack/react-query';
import { requestPasswordReset, resetPassword, signIn, signUp } from '../api';
import { useAuthStore } from '../store';
import { useToast } from './useToast.ts';
import { ForgotPasswordFormData, ROUTES } from '../shared';
import { AxiosError } from 'axios';
import { useNavigate } from 'react-router-dom';

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

export const useRequestPasswordReset = () => {
  const { showSuccess, showError } = useToast();

  return useMutation({
    mutationFn: (data: ForgotPasswordFormData) => requestPasswordReset(data),

    onSuccess: () => {
      showSuccess('Reset link sent! Please check your inbox.');
    },

    onError: (error: Error) => {
      const message = error instanceof AxiosError ? error.response?.data?.message : error.message;
      showError(message || 'Failed to send reset link. Please try again.');
    },
  });
};

export const useResetPassword = () => {
  const { showSuccess, showError } = useToast();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: resetPassword,

    onSuccess: () => {
      showSuccess('Password successfully reset! You can now sign in.');
      navigate(ROUTES.AUTH + ROUTES.SIGNIN);
    },

    onError: (error: Error) => {
      const message = error instanceof AxiosError ? error.response?.data?.message : error.message;
      showError(message || 'Failed to reset password.');
    },
  });
};
