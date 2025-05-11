import { api } from './axios.ts';

export const fetchWishlistStatus = async (tourId: number) => {
  const response = await api.get(`/wishlist/check/${tourId}`);
  return response.data.inWishlist;
};

export const addToWishlist = async (tourId: number) => {
  const response = await api.post('/wishlist', { tour_id: tourId });
  return response.data;
};

export const removeFromWishlist = async (tourId: number) => {
  const response = await api.delete(`/wishlist/${tourId}`);
  return response.data;
};
