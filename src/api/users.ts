import { api } from './axios';

export interface UserRole {
  role_id: number;
  name: string;
}

export interface AdminUser {
  user_id: number;
  full_name: string;
  email: string;
  phone_number: string | null;
  role_id: number | null;
  Role: UserRole | null;
  createdAt?: string;
  created_at?: string;
}

export interface UsersResponse {
  total: number;
  page: number;
  totalPages: number;
  users: AdminUser[];
}

export const getAdminUsers = async (page = 1, limit = 10): Promise<UsersResponse> => {
  const response = await api.get(`/account?page=${page}&limit=${limit}`);
  return response.data;
};

export const updateUserRole = async (user_id: number, role_id: number): Promise<void> => {
  await api.patch(`/account/${user_id}/role`, { role_id });
};

export const deleteAdminUser = async (user_id: number): Promise<void> => {
  await api.delete(`/account/${user_id}`);
};

export interface UpdateUserAdminPayload {
  full_name: string;
  email: string;
  phone_number?: string | null;
  role_id: number;
}

export const updateUserAdmin = async (
  userId: number,
  payload: UpdateUserAdminPayload,
): Promise<AdminUser> => {
  const response = await api.put<{ message: string; user: AdminUser }>(
    `/account/${userId}`,
    payload,
  );
  return response.data.user;
};

export interface UserStats {
  stats: {
    totalBookings: number;
    totalReviews: number;
    totalFavorites: number;
    rank: string;
  };
  recentBookings: any[];
}

export const getUserStats = async (): Promise<UserStats> => {
  const response = await api.get('/account/stats');
  return response.data;
};
