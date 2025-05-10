import { api } from './axios.ts';
import { getImageUrl } from '../utils/getImageUrl.ts';
import { IDestination } from '../shared';

export const fetchDestinations = async (page = 1, limit = 8) => {
  const response = await api.get('/destinations', {
    params: { page, limit },
  });

  const modifiedDestinations = response.data.destinations.map((destination: IDestination) => {
    return {
      ...destination,
      image: getImageUrl(destination.image, 'destination-images'),
    };
  });

  return {
    ...response.data,
    destinations: modifiedDestinations,
  };
};
