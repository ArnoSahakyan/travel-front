import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { addToWishlist, fetchWishlistStatus, removeFromWishlist } from '../api';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '../shared';
import { useAuthStore } from '../store';
import { useToast } from './useToast.ts';

interface UseWishlistResult {
  inWishlist: boolean | undefined;
  isLoading: boolean;
  isError: boolean;
  handleAddToWishlist: () => void;
  handleRemoveFromWishlist: () => void;
}

export const useWishlist = (tourId: number): UseWishlistResult => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { showSuccess, showError } = useToast();
  const { isAuthenticated } = useAuthStore();

  const {
    data: inWishlist,
    isLoading,
    isError,
  } = useQuery<boolean, Error>({
    queryKey: ['wishlist-status', tourId],
    queryFn: () => fetchWishlistStatus(tourId),
    enabled: !!tourId,
  });

  const { mutate: add } = useMutation({
    mutationFn: addToWishlist,
    onError: (error) => {
      showError('Failed to add to wishlist');
      console.error('Error adding to wishlist:', error);
    },
    onSuccess: () => {
      showSuccess('Added to wishlist');
      queryClient.invalidateQueries({ queryKey: ['wishlist-status', tourId] });
    },
  });

  const { mutate: remove } = useMutation({
    mutationFn: removeFromWishlist,
    onError: (error) => {
      showError('Failed to remove from wishlist');
      console.error('Error removing from wishlist:', error);
    },
    onSuccess: () => {
      showSuccess('Removed from wishlist');
      queryClient.invalidateQueries({ queryKey: ['wishlist-status', tourId] });
    },
  });

  const checkAuth = () => {
    if (!isAuthenticated) {
      navigate(ROUTES.AUTH + ROUTES.SIGNIN);
      return false;
    }
    return true;
  };

  const handleAddToWishlist = () => {
    if (checkAuth()) {
      add(tourId);
    }
  };

  const handleRemoveFromWishlist = () => {
    if (checkAuth()) {
      remove(tourId);
    }
  };

  return {
    inWishlist,
    isLoading,
    isError,
    handleAddToWishlist,
    handleRemoveFromWishlist,
  };
};
