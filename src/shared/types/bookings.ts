export interface IBookingFilters {
  page: number;
  limit: number;
  sort?: string;
  search?: string;
}

export interface IBooking {
  booking_id: number;
  booking_date: string;
  number_of_people: number;
  total_price: string;
  status: string;
  tour_name: string;
  start_date: string;
  end_date: string;
  destination_name: string;
  category_name: string;
  image: string;
}
