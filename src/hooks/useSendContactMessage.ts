import { AxiosError } from 'axios';
import { ContactFormData } from '../shared';
import { sendContactMessage } from '../api';
import { useMutation } from '@tanstack/react-query';
import { useToast } from './useToast.ts';

export const useSendContactMessage = () => {
  const { showSuccess, showError } = useToast();

  return useMutation({
    mutationFn: (data: ContactFormData) => sendContactMessage(data),

    onSuccess: () => {
      showSuccess('Message sent! We’ll get back to you soon.');
    },

    onError: (error: Error) => {
      const message = error instanceof AxiosError ? error.response?.data?.message : error.message;
      showError(message || 'Failed to send message. Please try again.');
    },
  });
};
