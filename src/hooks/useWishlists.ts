import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { addToWishlist, fetchWishlistStatus, getWishlists, removeFromWishlist } from '../api';
import { useNavigate } from 'react-router-dom';
import { IFetchFilters, IWishlistResponse, ROUTES, WISHLISTS_LIMIT } from '../shared';
import { useAuthStore } from '../store';
import { useToast } from './useToast.ts';
import { wishlistKeys } from '../queries';
import { useMergedFilters } from '../utils';

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
    queryKey: wishlistKeys.status(tourId),
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
      queryClient.invalidateQueries({ queryKey: wishlistKeys.status(tourId) });
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
      queryClient.invalidateQueries({ queryKey: wishlistKeys.status(tourId) });
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

export const useWishlistList = (externalFilters?: Partial<IFetchFilters>) => {
  const filters = useMergedFilters(externalFilters, WISHLISTS_LIMIT);

  return useQuery<IWishlistResponse>({
    queryKey: wishlistKeys.list(filters),
    queryFn: () => getWishlists(filters),
    staleTime: 1000 * 60 * 5,
    placeholderData: (prev) => prev,
  });
};
