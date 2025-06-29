import { public_api } from './axios.ts';
import { ISearchFilters } from '../shared';

export const fetchSearchResults = async (filters: ISearchFilters) => {
  const response = await public_api.get('/search', {
    params: filters,
  });

  return response.data;
};
