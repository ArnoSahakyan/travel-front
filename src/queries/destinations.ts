import { IDestinationFilters } from '../shared';

export const destinationKeys = {
  all: ['destinations'],
  lists: () => [...destinationKeys.all, 'list'],
  list: (filters: Partial<IDestinationFilters>) => [...destinationKeys.lists(), filters],
  detail: (id: number) => [...destinationKeys.all, 'detail', id],
};
