import { useQuery } from '@tanstack/react-query';
import {
  DESTINATIONS_LIMIT,
  IDestinationResponse,
  IFetchFilters,
  ISingleDestination,
} from '../shared';
import { fetchDestination, fetchDestinations } from '../api';
import { destinationKeys } from '../queries';
import { useMergedFilters } from '../utils';

export const useDestinations = (externalFilters?: Partial<IFetchFilters>) => {
  const filters = useMergedFilters(externalFilters, DESTINATIONS_LIMIT);

  return useQuery<IDestinationResponse>({
    queryKey: destinationKeys.list(filters),
    queryFn: () => fetchDestinations(filters),
    staleTime: 1000 * 60 * 5,
    placeholderData: (prev) => prev,
  });
};

export const useDestination = (id: number) =>
  useQuery<ISingleDestination>({
    queryKey: destinationKeys.detail(id),
    queryFn: () => fetchDestination(id),
    enabled: !!id,
    staleTime: 1000 * 60 * 5,
  });
