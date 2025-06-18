import { ITour } from './tour.ts';

export interface IFavorite {
  favorite_id: string;
  user_id: string;
  created_at: string;
  updated_at: string;
  tour: ITour;
}

export interface IFavoritesResponse {
  favorites: IFavorite[];
  currentPage: number;
  totalPages: number;
  total: number;
}
