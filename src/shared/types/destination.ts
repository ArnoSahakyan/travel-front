export interface IDestinationFilters {
  page?: number;
  limit?: number;
  sort?: string;
  search?: string;
}

export interface IDestination {
  destination_id: string;
  description: string;
  name: string;
  image: string;
  tourCount: number;
  startingPrice?: number;
}

export interface IDestinationResponse {
  destinations: IDestination[];
  currentPage: number;
  totalPages: number;
  total: number;
}
