import { useQuery } from '@tanstack/react-query';
import { fetchDestination, fetchDestinations } from '../api';
import { IDestination, IDestinationResponse } from '../shared';

export const useDestinations = (page: number, limit: number) => {
  return useQuery<IDestinationResponse>({
    queryKey: ['destinations', page, limit],
    queryFn: () => fetchDestinations(page, limit),
    placeholderData: (previousData) => previousData,
    staleTime: 1000 * 60 * 5,
  });
};

export const useDestination = (id: number) => {
  return useQuery<IDestination>({
    queryKey: ['destination', id],
    queryFn: () => fetchDestination(id),
    enabled: !!id, // ensures the query runs only when id is valid
    staleTime: 1000 * 60 * 5,
  });
};
