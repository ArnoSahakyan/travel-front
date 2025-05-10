import { create } from 'zustand';

type User = {
  user_id: number;
  full_name: string;
  email: string;
  phone: string;
  role: string;
};

type AuthState = {
  user: User | null;
  accessToken: string | null;
  refreshToken: string | null;
  isAuthenticated: boolean;
  login: (payload: { user: User; token: string; refreshToken: string }) => void;
  logout: () => void;
};

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  accessToken: null,
  refreshToken: null,
  isAuthenticated: false,
  login: ({ user, token, refreshToken }) =>
    set({
      user,
      accessToken: token,
      refreshToken,
      isAuthenticated: true,
    }),
  logout: () =>
    set({
      user: null,
      accessToken: null,
      refreshToken: null,
      isAuthenticated: false,
    }),
}));
