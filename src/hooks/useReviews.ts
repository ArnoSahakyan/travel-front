import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { createReview, deleteReview, fetchAllReviews, fetchReviewsByTour } from '../api';
import { reviewKeys } from '../queries/reviews.ts';
import { IFetchFilters, IReviewResponse, ReviewFormData, REVIEWS_LIMIT, ROUTES } from '../shared';
import { useMergedFilters } from '../utils';
import { useToast } from './useToast.ts';
import { AxiosError } from 'axios';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store';

interface ICreateReview extends ReviewFormData {
  tour_id: number;
}

export const useReview = (tour_id: number, externalFilters?: Partial<IFetchFilters>) => {
  const filters = useMergedFilters(externalFilters, REVIEWS_LIMIT);

  return useQuery<IReviewResponse>({
    queryKey: reviewKeys.tour(tour_id, filters),
    queryFn: () => fetchReviewsByTour(tour_id, filters),
    enabled: !!tour_id,
    staleTime: 1000 * 60 * 5,
    placeholderData: (prev) => prev,
  });
};

export const useAllReviews = (externalFilters?: Partial<IFetchFilters>) => {
  const filters = useMergedFilters(externalFilters, REVIEWS_LIMIT);

  return useQuery<IReviewResponse>({
    queryKey: reviewKeys.list(filters),
    queryFn: () => fetchAllReviews(filters),
    staleTime: 1000 * 60 * 5,
    placeholderData: (prev) => prev,
  });
};

export const useCreateReview = (options?: { onSuccess?: () => void }) => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { isAuthenticated } = useAuthStore();
  const { showSuccess, showError } = useToast();

  const mutation = useMutation({
    mutationFn: createReview,
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({ queryKey: ['reviews', variables.tour_id] });
      showSuccess('Review submitted successfully!');
      options?.onSuccess?.();
    },
    onError: (error: unknown) => {
      const message =
        error instanceof AxiosError ? error.response?.data?.message : (error as Error).message;
      showError(message || 'Failed to submit review. Please try again.');
    },
  });

  const handleCreateReview = (data: ICreateReview) => {
    if (!isAuthenticated) {
      navigate(ROUTES.AUTH + ROUTES.SIGNIN);
      return;
    }

    mutation.mutate(data);
  };

  return {
    handleCreateReview,
    isPending: mutation.isPending,
  };
};

export const useDeleteReview = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteReview,
    onSuccess: (_data, _review_id, context: { tour_id: number }) => {
      queryClient.invalidateQueries({ queryKey: reviewKeys.tour(context.tour_id) });
    },
  });
};
