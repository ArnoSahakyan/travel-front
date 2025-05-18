import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { BOOKINGS_LIMIT, IFetchFilters } from '../shared';
import { bookingKeys } from '../queries';
import { cancelBooking, createBooking, fetchBooking, fetchUserBookings } from '../api';
import { useMergedFilters } from '../utils';

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

  return useMutation({
    mutationFn: ({ tour_id, number_of_people }: { tour_id: number; number_of_people: number }) =>
      createBooking(tour_id, number_of_people),
    onSuccess: () => {
      // Invalidate list to show updated bookings
      queryClient.invalidateQueries({ queryKey: bookingKeys.all });
    },
  });
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
