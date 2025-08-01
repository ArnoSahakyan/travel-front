import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { fetchAllCategories, createCategory, updateCategory, deleteCategoryById } from '../api';
import { useToast } from './useToast';
import { categoryKeys } from '../queries';

export const useCategories = () => {
  return useQuery({
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
    onError: () => showError('Failed to create category'),
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
    onError: () => showError('Failed to update category'),
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
    onError: () => showError('Failed to delete category'),
  });
};
