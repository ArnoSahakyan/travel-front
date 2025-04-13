import { create } from 'zustand';

type AuthState = {
  user: null | { id: number; name: string; role: string };
  isAuthenticated: boolean;
  login: (user: AuthState['user']) => void;
  logout: () => void;
};

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isAuthenticated: false,
  login: (user) => set({ user, isAuthenticated: true }),
  logout: () => set({ user: null, isAuthenticated: false }),
}));
