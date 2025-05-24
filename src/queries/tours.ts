import { ITourFilters } from '../shared';

export const tourKeys = {
  all: ['tours'] as const,
  list: (filters: Partial<ITourFilters>) => ['tours', filters] as const,
  detail: (id: number, userId?: number) => ['tour', id, userId] as const,
};
