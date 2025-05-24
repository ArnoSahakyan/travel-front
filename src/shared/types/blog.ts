export interface ISingleBlog {
  post_id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  is_published: boolean;
  image: string;
  createdAt: string;
  updatedAt: string;
}

export type IBlog = Omit<ISingleBlog, 'content'>;

export interface IBlogResponse {
  posts: IBlog[];
  currentPage: number;
  totalPages: number;
  total: number;
}
