import { IFetchFilters } from '../shared';

export const blogKeys = {
  all: ['blogs'],
  lists: () => [...blogKeys.all, 'list'],
  list: (filters: Partial<IFetchFilters>, isAdmin: boolean) =>
    [...blogKeys.lists(), { filters, isAdmin }] as const,
  detail: (slug: string) => [...blogKeys.all, 'detail', slug] as const,
};
