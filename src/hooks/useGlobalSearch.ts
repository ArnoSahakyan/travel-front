import { useQuery } from '@tanstack/react-query';
import { fetchSearchResults } from '../api/search.ts';
import { ISearchResponse } from '../shared';

export const useGlobalSearch = (query: string, limit?: number) => {
  return useQuery<ISearchResponse>({
    queryKey: ['global-search', query],
    queryFn: () => fetchSearchResults({ query, limit }),
    enabled: !!query.trim(),
    staleTime: 1000 * 60,
  });
};
