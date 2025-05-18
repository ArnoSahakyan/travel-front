import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { createReview, deleteReview, fetchAllReviews, fetchReviewsByTour } from '../api';
import { reviewKeys } from '../queries/reviews.ts';
import { IFetchFilters, IReviewResponse, REVIEWS_LIMIT } from '../shared';
import { useMergedFilters } from '../utils';

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

export const useCreateReview = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createReview,
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({ queryKey: reviewKeys.tour(variables.tour_id) });
    },
  });
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
