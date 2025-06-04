import { IFetchFilters } from '../shared';

export const favoritesKeys = {
  all: ['favorites'] as const,
  list: (filters: Partial<IFetchFilters>) => ['favorites', filters] as const,
  status: (tourId: number) => ['favorite-status', tourId] as const,
};
