import { api, public_api } from './axios';
import { DestinationPayload, IFetchFilters } from '../shared';

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

export const createDestination = async (payload: DestinationPayload) => {
  const formData = new FormData();
  formData.append('name', payload.name);
  formData.append('description', payload.description);
  payload.images.forEach((image) => {
    formData.append('images', image);
  });

  const { data } = await api.post('/destinations', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
  return data;
};

export const updateDestination = async (id: number, payload: DestinationPayload) => {
  const formData = new FormData();
  formData.append('name', payload.name);
  formData.append('description', payload.description);
  payload.images.forEach((image) => {
    formData.append('images', image);
  });

  const { data } = await api.put(`/destinations/${id}`, formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
  return data;
};

export const deleteDestination = async (id: number) => {
  const { data } = await api.delete(`/destinations/${id}`);
  return data;
};
