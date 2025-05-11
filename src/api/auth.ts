import { api, public_api } from './axios.ts';
import { SignInFormData, SignUpFormData } from '../shared';

export const signIn = async (credentials: SignInFormData) => {
  const response = await public_api.post('/auth/signin', credentials);
  return response.data;
};

export const signUp = async (payload: SignUpFormData) => {
  const response = await public_api.post('/auth/signup', payload);
  return response.data;
};

export const refreshToken = async (refreshToken: string) => {
  const response = await api.post(`auth/refresh`, { refreshToken }, { withCredentials: true });
  return response.data;
};

export const fetchCurrentUser = async () => {
  try {
    const response = await api.get('/auth/me');
    return response.data.user;
  } catch (error) {
    console.error('Fetching User Data Error:', error);
    throw new Error('Failed to fetch current user');
  }
};
