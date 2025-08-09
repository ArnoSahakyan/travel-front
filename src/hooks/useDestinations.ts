import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { useToast } from './useToast.ts';
import {
  DestinationPayload,
  DESTINATIONS_LIMIT,
  IDestinationResponse,
  IFetchFilters,
  ISingleDestination,
  ROUTES,
} from '../shared';
import {
  createDestination,
  deleteDestination,
  fetchDestination,
  fetchDestinations,
  updateDestination,
} from '../api';
import { destinationKeys } from '../queries';
import { useMergedFilters } from '../utils';

export const useDestinations = (externalFilters?: Partial<IFetchFilters>) => {
  const filters = useMergedFilters(externalFilters, DESTINATIONS_LIMIT);

  return useQuery<IDestinationResponse>({
    queryKey: destinationKeys.list(filters),
    queryFn: () => fetchDestinations(filters),
    staleTime: 1000 * 60 * 5,
    placeholderData: (prev) => prev,
  });
};

export const useDestination = (id: number) =>
  useQuery<ISingleDestination>({
    queryKey: destinationKeys.detail(id),
    queryFn: () => fetchDestination(id),
    enabled: !!id,
    staleTime: 1000 * 60 * 5,
  });

export const useCreateDestination = () => {
  const queryClient = useQueryClient();
  const { showSuccess, showError } = useToast();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: (payload: DestinationPayload) => createDestination(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: destinationKeys.lists() });
      showSuccess('Destination created');
      navigate(ROUTES.ADMIN_DESTINATIONS);
    },
    onError: () => showError('Failed to create destination'),
  });
};

export const useUpdateDestination = (id: number) => {
  const queryClient = useQueryClient();
  const { showSuccess, showError } = useToast();

  return useMutation({
    mutationFn: (payload: DestinationPayload) => updateDestination(id, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: destinationKeys.lists() });
      queryClient.invalidateQueries({ queryKey: destinationKeys.detail(id) });
      showSuccess('Destination updated');
    },
    onError: () => showError('Failed to update destination'),
  });
};

export const useDeleteDestination = () => {
  const queryClient = useQueryClient();
  const { showSuccess, showError } = useToast();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: deleteDestination,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: destinationKeys.all });
      showSuccess('Destination deleted');
      navigate(ROUTES.ADMIN_DESTINATIONS);
    },
    onError: () => showError('Failed to delete destination'),
  });
};
