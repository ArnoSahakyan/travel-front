import { IFetchFilters } from '../shared';

export const blogKeys = {
  all: ['blogs'],
  lists: () => [...blogKeys.all, 'list'],
  list: (filters: Partial<IFetchFilters>) => [...blogKeys.lists(), filters],
  detail: (slug: string) => [...blogKeys.all, 'detail', slug],
};
