import { public_api } from './axios';
import { IFetchFilters } from '../shared';

export const fetchDestinations = async (filters: Partial<IFetchFilters>) => {
  const response = await public_api.get('/destinations', {
    params: filters,
  });

  return response.data;
};

export const fetchDestination = async (id: number) => {
  const response = await public_api.get(`/destinations/${id}`);
  return response.data;
};
