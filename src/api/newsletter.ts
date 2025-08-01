import { api, public_api } from './axios.ts';
import { IFetchFilters, INewsletterSubscribersResponse } from '../shared';

export const getAllNewsletterSubscribers = async (
  filters: IFetchFilters,
): Promise<INewsletterSubscribersResponse> => {
  const response = await api.get('/newsletter/all', {
    params: filters,
  });
  return response.data;
};

export const subscribeToNewsletter = async (email: string) => {
  const response = await public_api.post('/newsletter/subscribe', { email });
  return response.data;
};

export const confirmNewsletterSubscription = async (token: string) => {
  const response = await public_api.get(`/newsletter/verify`, {
    params: { token },
  });
  return response.data;
};

export const checkNewsletterStatus = async (): Promise<{ subscribed: boolean }> => {
  const response = await api.get('/newsletter/is-subscribed');
  return response.data;
};

export const unsubscribeNewsletter = async (email?: string): Promise<{ message: string }> => {
  const url = email
    ? `/newsletter/unsubscribe?email=${encodeURIComponent(email)}`
    : '/newsletter/unsubscribe';
  const response = await api.post(url);
  return response.data;
};
