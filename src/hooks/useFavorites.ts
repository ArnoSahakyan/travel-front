import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { addToFavorites, fetchFavoriteStatus, getFavorites, removeFromFavorites } from '../api';
import { useNavigate } from 'react-router-dom';
import { IFetchFilters, IFavoritesResponse, ROUTES, FAVORITES_LIMIT } from '../shared';
import { useAuthStore } from '../store';
import { useToast } from './useToast.ts';
import { favoritesKeys } from '../queries';
import { useMergedFilters } from '../utils';

interface UseFavoritesResult {
  inFavorites: boolean | undefined;
  isLoading: boolean;
  isError: boolean;
  handleAddToFavorites: () => void;
  handleRemoveFromFavorites: () => void;
}

export const useFavorite = (tourId: number): UseFavoritesResult => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { showSuccess, showError } = useToast();
  const { user, isAuthenticated } = useAuthStore();

  const {
    data: inFavorites,
    isLoading,
    isError,
  } = useQuery<boolean, Error>({
    queryKey: favoritesKeys.status(tourId),
    queryFn: () => fetchFavoriteStatus(tourId, user?.user_id),
    enabled: !!tourId,
  });

  const { mutate: add } = useMutation({
    mutationFn: addToFavorites,
    onError: (error) => {
      showError('Failed to add to favorites');
      console.error('Error adding to favorites:', error);
    },
    onSuccess: () => {
      showSuccess('Added to favorites');
      queryClient.invalidateQueries({ queryKey: favoritesKeys.status(tourId) });
    },
  });

  const { mutate: remove } = useMutation({
    mutationFn: removeFromFavorites,
    onError: (error) => {
      showError('Failed to remove from favorites');
      console.error('Error removing from favorites:', error);
    },
    onSuccess: () => {
      showSuccess('Removed from favorites');
      queryClient.invalidateQueries({ queryKey: favoritesKeys.status(tourId) });
    },
  });

  const checkAuth = () => {
    if (!isAuthenticated) {
      navigate(ROUTES.AUTH + ROUTES.SIGNIN);
      return false;
    }
    return true;
  };

  const handleAddToFavorites = () => {
    if (checkAuth()) {
      add(tourId);
    }
  };

  const handleRemoveFromFavorites = () => {
    if (checkAuth()) {
      remove(tourId);
    }
  };

  return {
    inFavorites,
    isLoading,
    isError,
    handleAddToFavorites,
    handleRemoveFromFavorites,
  };
};

export const useFavoritesList = (externalFilters?: Partial<IFetchFilters>) => {
  const filters = useMergedFilters(externalFilters, FAVORITES_LIMIT);

  return useQuery<IFavoritesResponse>({
    queryKey: favoritesKeys.list(filters),
    queryFn: () => getFavorites(filters),
    staleTime: 1000 * 60 * 5,
    placeholderData: (prev) => prev,
  });
};
