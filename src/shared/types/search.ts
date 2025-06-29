export interface ISearchResponse {
  tours: {
    id: number;
    name: string;
    description: string;
    image: string;
    type: string;
  }[];
  destinations: {
    id: number;
    name: string;
    description: string;
    image: string;
    type: string;
  }[];
  posts: {
    id: number;
    name: string;
    excerpt: string;
    image: string;
    type: string;
    slug: string;
  }[];
}

export interface ISearchFilters {
  query: string;
  limit?: number;
}
