import { useQuery } from '@tanstack/react-query';
import { ITourResponse } from '../shared';
import { fetchTours } from '../api';

export const useTours = (page: number, limit: number) => {
  return useQuery<ITourResponse>({
    queryKey: ['tours', page, limit],
    queryFn: () => fetchTours(page, limit),
    placeholderData: (previousData) => previousData,
    staleTime: 1000 * 60 * 5,
  });
};
