import { useQuery } from '@tanstack/react-query';
import { useSearchParams } from 'react-router-dom';
import { ITourResponse, ITourFilters, DESTINATIONS_LIMIT, ISingleTour } from '../shared';
import { fetchTour, fetchTours } from '../api';

export const useTours = (externalFilters?: Partial<ITourFilters>) => {
  const [searchParams] = useSearchParams();

  // Default filters with fallbacks from search params or external filters
  const filters: ITourFilters = {
    page:
      externalFilters?.page ?? (searchParams.get('page') ? parseInt(searchParams.get('page')!) : 1),
    limit:
      externalFilters?.limit ??
      (searchParams.get('limit') ? parseInt(searchParams.get('limit')!) : DESTINATIONS_LIMIT),
    category_id:
      externalFilters?.category_id ??
      (searchParams.get('category_id') ? parseInt(searchParams.get('category_id')!) : undefined),
    destination_id:
      externalFilters?.destination_id ??
      (searchParams.get('destination_id')
        ? parseInt(searchParams.get('destination_id')!)
        : undefined),
    sort: externalFilters?.sort ?? searchParams.get('sort') ?? undefined,
    search: externalFilters?.search ?? searchParams.get('search') ?? undefined,
  };

  return useQuery<ITourResponse>({
    queryKey: ['tours', filters],
    queryFn: () => fetchTours(filters),
    placeholderData: (previousData) => previousData,
    staleTime: 1000 * 60 * 5,
  });
};

export const useTour = (id: number) => {
  return useQuery<ISingleTour>({
    queryKey: ['tour', id],
    queryFn: () => fetchTour(id),
    enabled: !!id,
    staleTime: 1000 * 60 * 5,
  });
};
