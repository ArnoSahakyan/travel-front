import { public_api } from './axios.ts';
import { ContactFormData } from '../shared';

export const sendContactMessage = async (data: ContactFormData) => {
  const response = await public_api.post('/contact', data);
  return response.data;
};
