export interface IReview {
  full_name: string;
  tour_name: string;
  comment: string;
  rating: number;
  review_id: number;
  tour_id: number;
  user_id: number;
  created_at: string;
  updated_at: string;
}

export interface IReviewResponse {
  reviews: IReview[];
  currentPage: number;
  totalPages: number;
  total: number;
}
