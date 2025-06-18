import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
  checkNewsletterStatus,
  confirmNewsletterSubscription,
  subscribeToNewsletter,
  unsubscribeNewsletter,
} from '../api';
import { useToast } from './useToast.ts';
import { AxiosError } from 'axios';
import { newsletterKeys } from '../queries';

export const useSubscribeNewsletter = () => {
  const queryClient = useQueryClient();
  const { showSuccess, showError } = useToast();

  return useMutation({
    mutationFn: subscribeToNewsletter,

    onSuccess: () => {
      showSuccess('Confirmation email sent! Please check your inbox.');
      queryClient.invalidateQueries({ queryKey: newsletterKeys.status() });
    },

    onError: (error: Error) => {
      const message = error instanceof AxiosError ? error.response?.data?.message : error.message;
      showError(message || 'Subscription failed. Please try again.');
    },
  });
};

export const useConfirmNewsletter = () => {
  const { showSuccess, showError } = useToast();

  return useMutation({
    mutationFn: confirmNewsletterSubscription,
    onSuccess: () => {
      showSuccess('Your subscription has been confirmed!');
    },
    onError: (error: Error) => {
      const message = error instanceof AxiosError ? error.response?.data?.message : error.message;
      showError(message);
    },
  });
};

export const useNewsletterStatus = () =>
  useQuery({
    queryKey: newsletterKeys.status(),
    queryFn: checkNewsletterStatus,
  });

export const useUnsubscribeNewsletter = () => {
  const queryClient = useQueryClient();
  const { showSuccess, showError } = useToast();

  return useMutation({
    mutationFn: unsubscribeNewsletter,

    onMutate: async () => {
      await queryClient.cancelQueries({ queryKey: newsletterKeys.status() });

      const previous = queryClient.getQueryData(newsletterKeys.status());

      queryClient.setQueryData(newsletterKeys.status(), { subscribed: false });

      return { previous };
    },

    onSuccess: () => {
      showSuccess('You have unsubscribed from the newsletter.');
    },

    onError: (_err, _vars, context) => {
      if (context?.previous) {
        queryClient.setQueryData(newsletterKeys.status(), context.previous);
      }
      showError('Unsubscription failed. Please try again.');
    },

    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: newsletterKeys.status() });
    },
  });
};
