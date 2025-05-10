import axios, { AxiosResponse, InternalAxiosRequestConfig } from 'axios';
import { logoutUser, refreshToken } from './auth';
import { useAuthStore } from '../store';
import { BACK_URL } from '../shared'; // use raw API functions

export const api = axios.create({
  baseURL: BACK_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

// Request Interceptor
api.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  const auth = useAuthStore.getState();

  if (auth.accessToken) {
    config.headers['Authorization'] = `Bearer ${auth.accessToken}`;
  }

  return config;
});

// Response Interceptor
api.interceptors.response.use(
  (response: AxiosResponse) => response,
  async (error) => {
    const auth = useAuthStore.getState();
    const prevRequest = error?.config;

    if (error?.response?.status === 401 && !prevRequest?.sent && auth.refreshToken) {
      prevRequest.sent = true;
      try {
        const { accessToken } = await refreshToken(auth.refreshToken);

        useAuthStore.setState(() => ({
          accessToken,
          isAuthenticated: true,
        }));

        prevRequest.headers['Authorization'] = `Bearer ${accessToken}`;
        return api(prevRequest);
      } catch (err) {
        console.error(err);
        useAuthStore.getState().logout(); // logout from Zustand directly
        await logoutUser(); // call backend logout if needed
      }
    }

    return Promise.reject(error);
  },
);
