import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useNavigate, useSearchParams } from 'react-router-dom';
import {
  ITourResponse,
  ITourFilters,
  TOURS_LIMIT,
  ISingleTour,
  TourCreatePayload,
  TourUpdatePayload,
  TourCreateImagePayload,
  ROUTES,
} from '../shared';
import {
  addTourImage,
  createTour,
  deleteTour,
  deleteTourImage,
  fetchTour,
  fetchTours,
  setCoverImage,
  updateTour,
} from '../api';
import { tourKeys } from '../queries';
import { useAuthStore } from '../store';
import { useToast } from './useToast.ts';
import { AxiosError } from 'axios';

export const useTours = (externalFilters?: Partial<ITourFilters>) => {
  const [searchParams] = useSearchParams();

  const filters: ITourFilters = {
    page: externalFilters?.page ?? Number(searchParams.get('page') ?? 1),
    limit: externalFilters?.limit ?? Number(searchParams.get('limit') ?? TOURS_LIMIT),
    category_id:
      externalFilters?.category_id ??
      (searchParams.get('category_id') ? parseInt(searchParams.get('category_id')!) : undefined),
    destination_id:
      externalFilters?.destination_id ??
      (searchParams.get('destination_id')
        ? parseInt(searchParams.get('destination_id')!)
        : undefined),
    sort: externalFilters?.sort ?? searchParams.get('sort') ?? undefined,
    search: externalFilters?.search ?? searchParams.get('search') ?? undefined,
  };

  return useQuery<ITourResponse>({
    queryKey: tourKeys.list(filters),
    queryFn: () => fetchTours(filters),
    placeholderData: (previousData) => previousData,
    staleTime: 1000 * 60 * 5,
  });
};

export const useTour = (id: number) => {
  const user = useAuthStore((state) => state.user);
  return useQuery<ISingleTour>({
    queryKey: tourKeys.detail(id, user?.user_id),
    queryFn: () => fetchTour(id, user?.user_id),
    enabled: !!id,
    staleTime: 1000 * 60 * 5,
  });
};

/**
 * Create tour
 */
export const useCreateTour = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { showSuccess, showError } = useToast();

  return useMutation({
    mutationFn: (payload: TourCreatePayload) => createTour(payload),
    onSuccess: () => {
      showSuccess('Tour created successfully');
      queryClient.invalidateQueries({ queryKey: tourKeys.all });
      navigate(ROUTES.ADMIN_TOURS);
    },
    onError: (error: Error) => {
      const message = error instanceof AxiosError ? error.response?.data?.message : error.message;
      showError(message || 'Failed to create tour');
    },
  });
};

/**
 * Update tour details
 */
export const useUpdateTour = (id: number) => {
  const queryClient = useQueryClient();
  const { showSuccess, showError } = useToast();
  const user = useAuthStore((state) => state.user);

  return useMutation({
    mutationFn: (payload: TourUpdatePayload) => updateTour(id, payload),
    onSuccess: () => {
      showSuccess('Tour updated successfully');
      queryClient.invalidateQueries({ queryKey: tourKeys.all });
      queryClient.invalidateQueries({ queryKey: tourKeys.detail(id, user?.user_id) });
    },
    onError: (error: Error) => {
      const message = error instanceof AxiosError ? error.response?.data?.message : error.message;
      showError(message || 'Failed to update tour');
    },
  });
};

/**
 * Delete a tour
 */
export const useDeleteTour = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { showSuccess, showError } = useToast();

  return useMutation({
    mutationFn: (tourId: number) => deleteTour(tourId),
    onSuccess: () => {
      showSuccess('Tour deleted successfully');
      queryClient.invalidateQueries({ queryKey: tourKeys.all });
      navigate(ROUTES.ADMIN_TOURS);
    },
    onError: (error: Error) => {
      const message = error instanceof AxiosError ? error.response?.data?.message : error.message;
      showError(message || 'Failed to delete tour');
    },
  });
};

/**
 * Add images to a tour
 */
export const useAddTourImage = (tourId: number) => {
  const queryClient = useQueryClient();
  const { showSuccess, showError } = useToast();
  const user = useAuthStore((state) => state.user);

  return useMutation({
    mutationFn: (payload: TourCreateImagePayload) => addTourImage(tourId, payload),
    onSuccess: () => {
      showSuccess('Image(s) added successfully');
      queryClient.invalidateQueries({ queryKey: tourKeys.detail(tourId, user?.user_id) });
    },
    onError: (error: Error) => {
      const message = error instanceof AxiosError ? error.response?.data?.message : error.message;
      showError(message || 'Failed to add image(s)');
    },
  });
};

/**
 * Set tour cover image
 */
export const useSetTourCoverImage = (tourId: number) => {
  const queryClient = useQueryClient();
  const { showSuccess, showError } = useToast();
  const user = useAuthStore((state) => state.user);

  return useMutation({
    mutationFn: (imageId: number) => setCoverImage({ tour_id: tourId, image_id: imageId }),
    onSuccess: () => {
      showSuccess('Image set as cover successfully');
      queryClient.invalidateQueries({ queryKey: tourKeys.detail(tourId, user?.user_id) });
    },
    onError: (error: Error) => {
      const message = error instanceof AxiosError ? error.response?.data?.message : error.message;
      showError(message || 'Failed to set cover image');
    },
  });
};

/**
 * Delete a tour image
 */
export const useDeleteTourImage = (tourId: number) => {
  const queryClient = useQueryClient();
  const { showSuccess, showError } = useToast();
  const user = useAuthStore((state) => state.user);

  return useMutation({
    mutationFn: (imageId: number) => deleteTourImage(tourId, imageId),
    onSuccess: () => {
      showSuccess('Image deleted successfully');
      queryClient.invalidateQueries({ queryKey: tourKeys.detail(tourId, user?.user_id) });
    },
    onError: (error: Error) => {
      const message = error instanceof AxiosError ? error.response?.data?.message : error.message;
      showError(message || 'Failed to delete image');
    },
  });
};
