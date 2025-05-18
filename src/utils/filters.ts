import { useSearchParams } from 'react-router-dom';
import { IFetchFilters } from '../shared';

export const useMergedFilters = (
  externalFilters?: Partial<IFetchFilters>,
  defaultLimit?: number,
) => {
  const [searchParams] = useSearchParams();

  return {
    page: externalFilters?.page ?? Number(searchParams.get('page') ?? 1),
    limit: externalFilters?.limit ?? Number(searchParams.get('limit') ?? defaultLimit),
    sort: externalFilters?.sort ?? searchParams.get('sort') ?? undefined,
    search: externalFilters?.search ?? searchParams.get('search') ?? undefined,
  };
};
