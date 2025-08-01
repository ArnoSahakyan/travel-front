import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
  checkNewsletterStatus,
  confirmNewsletterSubscription,
  getAllNewsletterSubscribers,
  subscribeToNewsletter,
  unsubscribeNewsletter,
} from '../api';
import { useToast } from './useToast.ts';
import { AxiosError } from 'axios';
import { newsletterKeys } from '../queries';
import { useMergedFilters } from '../utils';
import { IFetchFilters } from '../shared';

export const useNewsletterSubscribers = (externalFilters?: Partial<IFetchFilters>) => {
  const filters = useMergedFilters(externalFilters, 20);

  return useQuery({
    queryKey: newsletterKeys.list(filters),
    queryFn: () => getAllNewsletterSubscribers(filters),
  });
};

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
    mutationFn: (email?: string) => unsubscribeNewsletter(email),

    onMutate: async (email) => {
      if (!email) {
        await queryClient.cancelQueries({ queryKey: newsletterKeys.status() });
        const previous = queryClient.getQueryData(newsletterKeys.status());
        queryClient.setQueryData(newsletterKeys.status(), { subscribed: false });
        return { previous };
      }
      return {};
    },

    onSuccess: (_data, email) => {
      showSuccess(
        email
          ? `Unsubscribed ${email} from newsletter.`
          : 'You have unsubscribed from the newsletter.',
      );
    },

    onError: (_error, email, context) => {
      if (!email && context?.previous) {
        queryClient.setQueryData(newsletterKeys.status(), context.previous);
      }
      showError('Unsubscription failed. Please try again.');
    },

    onSettled: (_data, _error, email) => {
      if (!email) {
        queryClient.invalidateQueries({ queryKey: newsletterKeys.status() });
      }
      queryClient.invalidateQueries({ queryKey: newsletterKeys.all });
    },
  });
};
