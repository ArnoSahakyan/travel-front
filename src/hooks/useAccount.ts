import { useMutation } from '@tanstack/react-query';
import { updatePersonalInfo, changePassword } from '../api';
import { useToast } from './useToast';
import { useAuthStore } from '../store';
import { AxiosError } from 'axios';

export const useAccount = () => {
  const { showSuccess, showError } = useToast();
  const { login } = useAuthStore();

  const personalInfoMutation = useMutation({
    mutationFn: updatePersonalInfo,
    onSuccess: (response) => {
      showSuccess('Personal information updated successfully');

      login({
        user: response.data.user,
        token: useAuthStore.getState().accessToken,
        refreshToken: useAuthStore.getState().refreshToken,
      });
    },

    onError: (error: Error) => {
      const message = error instanceof AxiosError ? error.response?.data?.message : error.message;
      showError(message || 'Failed to update personal info');
    },
  });

  const passwordMutation = useMutation({
    mutationFn: changePassword,
    onSuccess: () => {
      showSuccess('Password changed successfully');
    },
    onError: (error: Error) => {
      const message = error instanceof AxiosError ? error.response?.data?.message : error.message;
      showError(message || 'Failed to change password');
    },
  });

  return {
    updatePersonalInfo: personalInfoMutation.mutate,
    updatePersonalInfoStatus: personalInfoMutation.status,
    changePassword: passwordMutation.mutate,
    changePasswordStatus: passwordMutation.status,
  };
};
