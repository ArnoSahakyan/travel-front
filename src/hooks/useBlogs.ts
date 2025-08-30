import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { useToast } from './useToast.ts';
import { AxiosError } from 'axios';
import { BLOGS_LIMIT, IBlogResponse, IFetchFilters, ISingleBlog, ROUTES } from '../shared';
import {
  BlogPayload,
  createBlog,
  deleteBlog,
  fetchAdminBlog,
  fetchAdminBlogs,
  fetchBlog,
  fetchBlogs,
  updateBlog,
} from '../api';
import { useMergedFilters } from '../utils';
import { blogKeys } from '../queries';

export const useBlogs = (externalFilters?: Partial<IFetchFilters>, isAdmin: boolean = false) => {
  const filters = useMergedFilters(externalFilters, BLOGS_LIMIT);

  return useQuery<IBlogResponse>({
    queryKey: blogKeys.list(filters, isAdmin),
    queryFn: () => (isAdmin ? fetchAdminBlogs(filters) : fetchBlogs(filters)),
    staleTime: 1000 * 60 * 5,
    placeholderData: (prev) => prev,
  });
};

export const useBlog = (slug: string, isAdmin: boolean = false) =>
  useQuery<ISingleBlog>({
    queryKey: blogKeys.detail(slug),
    queryFn: () => (isAdmin ? fetchAdminBlog(slug) : fetchBlog(slug)),
    enabled: !!slug,
    staleTime: 1000 * 60 * 5,
  });

export const useCreateBlog = () => {
  const queryClient = useQueryClient();
  const { showSuccess, showError } = useToast();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: (payload: BlogPayload) => createBlog(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: blogKeys.lists() });
      showSuccess('Blog created');
      navigate(ROUTES.ADMIN_BLOG);
    },
    onError: (error: Error) => {
      const message = error instanceof AxiosError ? error.response?.data?.message : error.message;
      showError(message || 'Failed to create blog');
    },
  });
};

export const useUpdateBlog = (slug: string) => {
  const queryClient = useQueryClient();
  const { showSuccess, showError } = useToast();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: (payload: Partial<BlogPayload>) => updateBlog(slug, payload),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: blogKeys.lists() });
      queryClient.invalidateQueries({ queryKey: blogKeys.detail(slug) });
      showSuccess('Blog updated');

      if (variables.slug && variables.slug !== slug) {
        navigate(`${ROUTES.ADMIN_BLOG}/${variables.slug}`);
      }
    },
    onError: (error: Error) => {
      const message = error instanceof AxiosError ? error.response?.data?.message : error.message;
      showError(message || 'Failed to update blog');
    },
  });
};

export const useDeleteBlog = () => {
  const queryClient = useQueryClient();
  const { showSuccess, showError } = useToast();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: (id: number) => deleteBlog(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: blogKeys.all });
      showSuccess('Blog deleted');
      navigate(ROUTES.ADMIN_BLOG);
    },
    onError: (error: Error) => {
      const message = error instanceof AxiosError ? error.response?.data?.message : error.message;
      showError(message || 'Failed to delete blog');
    },
  });
};
