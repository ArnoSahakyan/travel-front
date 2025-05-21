import { IFetchFilters } from '../shared';

export const destinationKeys = {
  all: ['destinations'],
  lists: () => [...destinationKeys.all, 'list'],
  list: (filters: Partial<IFetchFilters>) => [...destinationKeys.lists(), filters],
  detail: (id: number) => [...destinationKeys.all, 'detail', id],
};
