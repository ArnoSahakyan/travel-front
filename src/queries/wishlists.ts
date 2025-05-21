import { IFetchFilters } from '../shared';

export const wishlistKeys = {
  all: ['wishlists'] as const,
  list: (filters: Partial<IFetchFilters>) => ['wishlists', filters] as const,
  status: (tourId: number) => ['wishlist-status', tourId] as const,
};
