import { public_api } from './axios.ts';
import { images } from '../utils';
import { IDestination } from '../shared';

export const fetchDestinations = async (page = 1, limit = 8) => {
  const response = await public_api.get('/destinations', {
    params: { page, limit },
  });

  const modifiedDestinations = response.data.destinations.map((destination: IDestination) => {
    return {
      ...destination,
      image: images(destination.image, 'destination-images'),
    };
  });

  return {
    ...response.data,
    destinations: modifiedDestinations,
  };
};
