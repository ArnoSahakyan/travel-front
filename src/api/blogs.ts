import { public_api } from './axios';
import { IFetchFilters } from '../shared';

export const fetchBlogs = async (filters: Partial<IFetchFilters>) => {
  const response = await public_api.get('/blog', {
    params: filters,
  });

  return response.data;
};

export const fetchBlog = async (slug: string) => {
  const response = await public_api.get(`/blog/${slug}`);
  return response.data;
};
