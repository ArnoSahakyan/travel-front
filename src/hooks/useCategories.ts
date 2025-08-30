import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { fetchAllCategories, createCategory, updateCategory, deleteCategoryById } from '../api';
import { useToast } from './useToast';
import { categoryKeys } from '../queries';
import { AxiosError } from 'axios';

export const useCategories = () => {
  return useQuery<{ category_id: number; name: string }[]>({
    queryKey: categoryKeys.all,
    queryFn: fetchAllCategories,
    staleTime: 5 * 60 * 1000,
    placeholderData: (prev) => prev,
  });
};

export const useCreateCategory = () => {
  const queryClient = useQueryClient();
  const { showSuccess, showError } = useToast();

  return useMutation({
    mutationFn: createCategory,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: categoryKeys.all });
      showSuccess('Category created');
    },
    onError: (error: Error) => {
      const message = error instanceof AxiosError ? error.response?.data?.message : error.message;
      showError(message || 'Failed to create category');
    },
  });
};

export const useUpdateCategory = () => {
  const queryClient = useQueryClient();
  const { showSuccess, showError } = useToast();

  return useMutation({
    mutationFn: ({ id, name }: { id: number; name: string }) => updateCategory(id, { name }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: categoryKeys.all });
      showSuccess('Category updated');
    },
    onError: (error: Error) => {
      const message = error instanceof AxiosError ? error.response?.data?.message : error.message;
      showError(message || 'Failed to update category');
    },
  });
};

export const useDeleteCategory = () => {
  const queryClient = useQueryClient();
  const { showSuccess, showError } = useToast();

  return useMutation({
    mutationFn: deleteCategoryById,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: categoryKeys.all });
      showSuccess('Category deleted');
    },
    onError: (error: Error) => {
      const message = error instanceof AxiosError ? error.response?.data?.message : error.message;
      showError(message || 'Failed to delete category');
    },
  });
};
