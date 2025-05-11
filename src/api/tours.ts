import { public_api } from './axios.ts';
import { addSupabaseUrl } from '../utils';
import { ITourFilters, IDestination, ISingleTour } from '../shared';

export const fetchTours = async (filters: ITourFilters) => {
  const response = await public_api.get('/tours', {
    params: filters,
  });

  const modifiedTours = response.data.tours.map((tour: IDestination) => {
    return {
      ...tour,
      image: addSupabaseUrl(tour.image, 'tour-images'),
    };
  });

  return {
    ...response.data,
    tours: modifiedTours,
  };
};

export const fetchTour = async (id: number) => {
  const response = await public_api.get(`/tours/${id}`);
  const tour: ISingleTour = response.data;
  return tour;
};
