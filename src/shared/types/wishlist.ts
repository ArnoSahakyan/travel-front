import { ITour } from './tour.ts';

export interface IWishlistFilters {
  page: number;
  limit: number;
  search?: string;
  sort?: string;
}

export interface IWishlist {
  wishlist_id: string;
  user_id: string;
  created_at: string;
  updated_at: string;
  tour: ITour;
}

export interface IWishlistResponse {
  wishlists: IWishlist[];
  currentPage: number;
  totalPages: number;
  total: number;
}
