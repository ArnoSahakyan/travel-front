import { useQuery } from '@tanstack/react-query';
import { BLOGS_LIMIT, IBlogResponse, IFetchFilters, ISingleBlog } from '../shared';
import { fetchBlog, fetchBlogs } from '../api';
import { useMergedFilters } from '../utils';
import { blogKeys } from '../queries';

export const useBlogs = (externalFilters?: Partial<IFetchFilters>) => {
  const filters = useMergedFilters(externalFilters, BLOGS_LIMIT);

  return useQuery<IBlogResponse>({
    queryKey: blogKeys.list(filters),
    queryFn: () => fetchBlogs(filters),
    staleTime: 1000 * 60 * 5,
    placeholderData: (prev) => prev,
  });
};

export const useBlog = (slug: string) =>
  useQuery<ISingleBlog>({
    queryKey: blogKeys.detail(slug),
    queryFn: () => fetchBlog(slug),
    enabled: !!slug,
    staleTime: 1000 * 60 * 5,
  });
