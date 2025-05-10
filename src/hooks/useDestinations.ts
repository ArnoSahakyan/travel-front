import { useQuery } from '@tanstack/react-query';
import { fetchDestinations } from '../api';
import { IDestinationResponse } from '../shared';

export const useDestinations = (page: number, limit: number) => {
  return useQuery<IDestinationResponse>({
    queryKey: ['destinations', page, limit],
    queryFn: () => fetchDestinations(page, limit),
    placeholderData: (previousData) => previousData,
    staleTime: 1000 * 60 * 5,
  });
};
