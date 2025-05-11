interface ITour {
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
