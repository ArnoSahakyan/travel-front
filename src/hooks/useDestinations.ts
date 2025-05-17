import { useQuery } from '@tanstack/react-query';
import { useSearchParams } from 'react-router-dom';
import { DESTINATIONS_LIMIT, IDestinationFilters } from '../shared';
import { fetchDestination, fetchDestinations } from '../api';
import { destinationKeys } from '../queries';

export const useDestinations = (externalFilters?: Partial<IDestinationFilters>) => {
  const [searchParams] = useSearchParams();

  const filters: Partial<IDestinationFilters> = {
    page: externalFilters?.page ?? Number(searchParams.get('page') ?? 1),
    limit: externalFilters?.limit ?? Number(searchParams.get('limit') ?? DESTINATIONS_LIMIT),
    sort: externalFilters?.sort ?? searchParams.get('sort') ?? undefined,
    search: externalFilters?.search ?? searchParams.get('search') ?? undefined,
  };

  return useQuery({
    queryKey: destinationKeys.list(filters),
    queryFn: () => fetchDestinations(filters),
    staleTime: 1000 * 60 * 5,
    placeholderData: (prev) => prev,
  });
};

export const useDestination = (id: number) =>
  useQuery({
    queryKey: destinationKeys.detail(id),
    queryFn: () => fetchDestination(id),
    enabled: !!id,
    staleTime: 1000 * 60 * 5,
  });
