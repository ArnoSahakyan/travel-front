interface User {
  user_id: number;
  full_name: string;
  email: string;
  phone: string;
  role: string;
}

export interface AuthState {
  user: User | null;
  accessToken: string | null;
  refreshToken: string | null;
  isAuthenticated: boolean;
  login: (payload: { user: User; token: string | null; refreshToken: string | null }) => void;
  logout: () => void;
}
