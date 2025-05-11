import { public_api } from './axios.ts';
import { images } from '../utils';
import { IDestination } from '../shared';

export const fetchTours = async (page = 1, limit = 8) => {
  const response = await public_api.get('/tours', {
    params: { page, limit },
  });

  const modifiedTours = response.data.tours.map((tour: IDestination) => {
    return {
      ...tour,
      image: images(tour.image, 'tour-images'),
    };
  });
  return {
    ...response.data,
    tours: modifiedTours,
  };
};
