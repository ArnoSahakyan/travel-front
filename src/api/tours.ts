import { api, public_api } from './axios.ts';
import {
  ITourFilters,
  TourCreateImagePayload,
  TourCreatePayload,
  TourUpdatePayload,
} from '../shared';

export const fetchTours = async (filters: ITourFilters) => {
  const response = await public_api.get('/tours', {
    params: filters,
  });

  return response.data;
};

export const fetchTour = async (id: number, userId?: number) => {
  const response = await public_api.get(`/tours/${id}`, {
    params: userId ? { user_id: userId } : undefined,
  });

  return response.data;
};

export const createTour = async (payload: TourCreatePayload) => {
  const formData = new FormData();
  formData.append('name', payload.name);
  formData.append('description', payload.description);
  formData.append('price', payload.price.toString());
  formData.append('start_date', payload.start_date);
  formData.append('end_date', payload.end_date);
  formData.append('available_spots', payload.available_spots.toString());
  formData.append('category_id', payload.category_id.toString());
  formData.append('destination_id', payload.destination_id.toString());
  payload.images.forEach((image) => {
    formData.append('images', image);
  });

  const { data } = await api.post('/tours', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
  return data;
};

export const addTourImage = async (tour_id: number, payload: TourCreateImagePayload) => {
  const formData = new FormData();
  payload.images.forEach((image) => {
    formData.append('images', image);
  });

  const { data } = await api.post(`/tours/${tour_id}/images`, formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
  return data;
};

export const setCoverImage = async (payload: { tour_id: number; image_id: number }) => {
  const { data } = await api.patch(`/tours/cover`, payload);
  return data;
};

export const updateTour = async (id: number, payload: TourUpdatePayload) => {
  const { data } = await api.put(`/tours/${id}`, payload);
  return data;
};

export const deleteTour = async (tour_id: number) => {
  const { data } = await api.delete(`/tours/${tour_id}`);
  return data;
};

export const deleteTourImage = async (tour_id: number, image_id: number) => {
  const { data } = await api.delete(`/tours/${tour_id}/images/${image_id}`);
  return data;
};
