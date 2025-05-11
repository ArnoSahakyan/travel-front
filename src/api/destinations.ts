import { public_api } from './axios.ts';
import { addSupabaseUrl } from '../utils';
import { IDestination } from '../shared';

export const fetchDestinations = async (page = 1, limit = 8) => {
  const response = await public_api.get('/destinations', {
    params: { page, limit },
  });

  const modifiedDestinations = response.data.destinations.map((destination: IDestination) => ({
    ...destination,
    image: addSupabaseUrl(destination.image, 'destination-images'),
  }));

  return {
    ...response.data,
    destinations: modifiedDestinations,
  };
};

export const fetchDestination = async (id: number) => {
  const response = await public_api.get(`/destinations/${id}`);
  const destination: IDestination = response.data;

  return {
    ...destination,
    image: addSupabaseUrl(destination.image, 'destination-images'),
  };
};
