import { IFetchFilters } from '../shared';

export const newsletterKeys = {
  all: ['newsletter'],
  status: () => [...newsletterKeys.all, 'status'],
  lists: () => [...newsletterKeys.all, 'list'],
  list: (filters: Partial<IFetchFilters>) => [...newsletterKeys.lists(), filters],
};
