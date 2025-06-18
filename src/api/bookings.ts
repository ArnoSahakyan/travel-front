import { api } from './axios.ts';
import { ITourFilters } from '../shared';

export const fetchUserBookings = async (filters: ITourFilters) => {
  const response = await api.get(`/booking/my`, {
    params: filters,
  });
  return response.data;
};

export const fetchBooking = async (id: number) => {
  const response = await api.get(`/booking/${id}`);
  return response.data;
};

export const createBooking = async (tour_id: number, number_of_people: number) => {
  const response = await api.post('/booking', { tour_id, number_of_people });
  return response.data;
};

export const cancelBooking = async (booking_id: number) => {
  const response = await api.delete(`/booking/${booking_id}`);
  return response.data;
};
