import { api, public_api } from './axios.ts';

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

export const unsubscribeNewsletter = async (): Promise<{ message: string }> => {
  const response = await api.post('/newsletter/unsubscribe');
  return response.data;
};
