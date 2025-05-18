import { IFetchFilters } from '../shared';

export const reviewKeys = {
  all: ['reviews'] as const,
  list: (filters?: Partial<IFetchFilters>) => [...reviewKeys.all, 'list', filters] as const,
  tour: (tour_id: number, filters?: Partial<IFetchFilters>) =>
    [...reviewKeys.all, 'tour', tour_id, filters] as const,
};
