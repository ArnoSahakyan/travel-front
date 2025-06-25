import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { BOOKINGS_LIMIT, IFetchFilters, ROUTES } from '../shared';
import { bookingKeys } from '../queries';
import { cancelBooking, createBooking, fetchBooking, fetchUserBookings } from '../api';
import { useMergedFilters } from '../utils';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store';
import { useToast } from './useToast.ts';

export const useBookings = (externalFilters?: Partial<IFetchFilters>) => {
  const filters = useMergedFilters(externalFilters, BOOKINGS_LIMIT);

  return useQuery({
    queryKey: bookingKeys.list(filters),
    queryFn: () => fetchUserBookings(filters),
    staleTime: 1000 * 60 * 5,
    placeholderData: (prev) => prev,
  });
};

export const useBooking = (id: number) =>
  useQuery({
    queryKey: bookingKeys.detail(id),
    queryFn: () => fetchBooking(id),
    enabled: !!id,
    staleTime: 1000 * 60 * 5,
  });

export const useCreateBooking = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { isAuthenticated } = useAuthStore();
  const { showSuccess, showError } = useToast();

  const { mutate, isPending } = useMutation({
    mutationFn: ({ tour_id, number_of_people }: { tour_id: number; number_of_people: number }) =>
      createBooking(tour_id, number_of_people),
    onSuccess: () => {
      showSuccess('Booking successful!');
      queryClient.invalidateQueries({ queryKey: bookingKeys.all });
    },
    onError: () => {
      showError('Booking failed. Please try again.');
    },
  });

  const handleCreateBooking = (tour_id: number, number_of_people: number) => {
    if (!isAuthenticated) {
      navigate(ROUTES.AUTH + ROUTES.SIGNIN);
      return;
    }
    mutate({ tour_id, number_of_people });
  };

  return { handleCreateBooking, isPending };
};

export const useCancelBooking = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (booking_id: number) => cancelBooking(booking_id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: bookingKeys.all });
    },
  });
};
