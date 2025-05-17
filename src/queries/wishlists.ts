import { IWishlistFilters } from '../shared';

export const wishlistKeys = {
  all: ['wishlists'] as const,
  list: (filters: Partial<IWishlistFilters>) => ['wishlists', filters] as const,
  status: (tourId: number) => ['wishlist-status', tourId] as const,
};
