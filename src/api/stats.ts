import { api } from './axios';

export interface AdminStats {
  metrics: {
    totalUsers: number;
    totalBookings: number;
    totalTours: number;
    totalDestinations: number;
    totalCategories: number;
    totalReviews: number;
    unreadMessages: number;
    totalRevenue: number | string;
  };
  recentBookings: {
    booking_id: number;
    booking_date: string;
    total_price: string;
    status: string;
    User: { full_name: string; email: string };
    Tour: { name: string };
  }[];
}

export const getAdminStats = async (): Promise<AdminStats> => {
  const response = await api.get('/stats');
  return response.data;
};
