import { api } from './axios.ts';
import { SignInFormData, SignUpFormData } from '../shared';

export const signIn = async (credentials: SignInFormData) => {
  const response = await api.post('/auth/signin', credentials);
  return response.data;
};

export const signUp = async (payload: SignUpFormData) => {
  const response = await api.post('/auth/signup', payload);
  return response.data;
};

export const refreshToken = async (refreshToken: string) => {
  const response = await api.post(
    `${import.meta.env.VITE_BACK_BASE_URL}/api/auth/refresh`,
    { refreshToken },
    { withCredentials: true },
  );
  return response.data;
};

export const logoutUser = async () => {
  await api.post('/auth/logout');
};
