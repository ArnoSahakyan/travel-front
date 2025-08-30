export interface ITour {
  tour_id: string;
  name: string;
  description: string;
  price: number;
  start_date: string;
  end_date: string;
  available_spots: number;
  category_id: number;
  destination_id: number;
  image: string;
}

export interface ITourResponse {
  tours: ITour[];
  currentPage: number;
  totalPages: number;
  total: number;
}

export interface ITourFilters {
  page?: number;
  limit?: number;
  category_id?: number;
  destination_id?: number;
  sort?: string;
  search?: string;
}

export interface ITourImage {
  image_id: number;
  is_cover: boolean;
  image_url: string;
}

export interface ISingleTour {
  tour_id: string;
  name: string;
  description: string;
  price: number;
  start_date: string;
  end_date: string;
  available_spots: number;
  category_id: number;
  category_name: string;
  destination_id: number;
  destination_name: string;
  hasReviewed: boolean;
  images: ITourImage[];
}

export interface TourUpdatePayload {
  name: string;
  description: string;
  price: number;
  available_spots: number;
  start_date: string;
  end_date: string;
  category_id: number;
  destination_id: number;
}

export interface TourCreateImagePayload {
  images: File[];
}

export interface TourCreatePayload extends TourCreateImagePayload, TourUpdatePayload {}
