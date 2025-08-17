import { api } from './axios.ts';
import { IFavoritesResponse, IFetchFilters } from '../shared';

export const fetchFavoriteStatus = async (tourId: number, userId?: number) => {
  const response = await api.get(`/favorite/check/${tourId}`, { params: userId });
  return response.data.inFavorites;
};

export const getFavorites = async (
  filters?: Partial<IFetchFilters>,
): Promise<IFavoritesResponse> => {
  const response = await api.get('/favorite', { params: filters });
  return response.data;
};

export const addToFavorites = async (tourId: number) => {
  const response = await api.post('/favorite', { tour_id: tourId });
  return response.data;
};

export const removeFromFavorites = async (tourId: number) => {
  const response = await api.delete(`/favorite/${tourId}`);
  return response.data;
};
