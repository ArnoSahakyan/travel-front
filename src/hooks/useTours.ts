import { useQuery } from '@tanstack/react-query';
import { useSearchParams } from 'react-router-dom';
import { ITourResponse, ITourFilters, TOURS_LIMIT, ISingleTour } from '../shared';
import { fetchTour, fetchTours } from '../api';
import { tourKeys } from '../queries';
import { useAuthStore } from '../store';

export const useTours = (externalFilters?: Partial<ITourFilters>) => {
  const [searchParams] = useSearchParams();

  const filters: ITourFilters = {
    page: externalFilters?.page ?? Number(searchParams.get('page') ?? 1),
    limit: externalFilters?.limit ?? Number(searchParams.get('limit') ?? TOURS_LIMIT),
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
    queryKey: tourKeys.list(filters),
    queryFn: () => fetchTours(filters),
    placeholderData: (previousData) => previousData,
    staleTime: 1000 * 60 * 5,
  });
};

export const useTour = (id: number) => {
  const user = useAuthStore((state) => state.user);
  return useQuery<ISingleTour>({
    queryKey: tourKeys.detail(id, user?.user_id),
    queryFn: () => fetchTour(id, user?.user_id),
    enabled: !!id,
    staleTime: 1000 * 60 * 5,
  });
};
