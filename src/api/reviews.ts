import { api, public_api } from './axios.ts';
import { IFetchFilters } from '../shared';

export const fetchReviewsByTour = async (tour_id: number, filters: Partial<IFetchFilters>) => {
  const response = await api.get(`/review/tour/${tour_id}`, {
    params: filters,
  });
  return response.data;
};

export const fetchAllReviews = async (filters: Partial<IFetchFilters>) => {
  const response = await public_api.get(`/review`, {
    params: filters,
  });
  return response.data;
};

export const createReview = async ({
  tour_id,
  rating,
  comment,
}: {
  tour_id: number;
  rating: number;
  comment: string;
}) => {
  const response = await api.post(`/review`, { tour_id, rating, comment });
  return response.data;
};

export const deleteReview = async (review_id: number) => {
  const response = await api.delete(`/review/${review_id}`);
  return response.data;
};
