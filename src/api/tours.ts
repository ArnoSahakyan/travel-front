import { public_api } from './axios.ts';
import { ITourFilters } from '../shared';

export const fetchTours = async (filters: ITourFilters) => {
  const response = await public_api.get('/tours', {
    params: filters,
  });

  return response.data;
};

export const fetchTour = async (id: number) => {
  const response = await public_api.get(`/tours/${id}`);
  return response.data;
};
