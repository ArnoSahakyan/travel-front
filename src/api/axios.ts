import axios, { AxiosResponse, InternalAxiosRequestConfig } from 'axios';
import { refreshToken } from './auth';
import { useAuthStore } from '../store';
import { BACK_URL, ROUTES } from '../shared';

const navigateToHomeIfForbidden = () => {
  if (typeof window !== 'undefined') {
    window.location.href = ROUTES.HOME;
  }
};

export const public_api = axios.create({
  baseURL: BACK_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

export const api = axios.create({
  baseURL: BACK_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

// Request Interceptor
api.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  const { accessToken } = useAuthStore.getState();
  if (accessToken) {
    config.headers = config.headers || {};
    config.headers['Authorization'] = `Bearer ${accessToken}`;
  }

  return config;
});

// Response Interceptor
api.interceptors.response.use(
  (response: AxiosResponse) => response,
  async (error) => {
    const auth = useAuthStore.getState();
    const prevRequest = error?.config;

    if (error?.response?.status === 401 && !prevRequest?._retry && auth.refreshToken) {
      prevRequest._retry = true;

      try {
        const { token: newAccessToken } = await refreshToken(auth.refreshToken);

        // Update token(s) in Zustand
        useAuthStore.setState(() => ({
          accessToken: newAccessToken,
          isAuthenticated: true,
        }));

        prevRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;

        return api(prevRequest);
      } catch (err) {
        console.error('Refresh token failed:', err);
        useAuthStore.getState().logout();
      }
    }

    if (error?.response?.status === 403) {
      navigateToHomeIfForbidden();
    }

    return Promise.reject(error);
  },
);
