import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useSearchParams } from 'react-router-dom';
import { BOOKINGS_LIMIT, IBookingFilters } from '../shared';
import { bookingKeys } from '../queries';
import { cancelBooking, createBooking, fetchBooking, fetchUserBookings } from '../api';

export const useBookings = (externalFilters?: Partial<IBookingFilters>) => {
  const [searchParams] = useSearchParams();

  const filters: Partial<IBookingFilters> = {
    page: externalFilters?.page ?? Number(searchParams.get('page') ?? 1),
    limit: externalFilters?.limit ?? Number(searchParams.get('limit') ?? BOOKINGS_LIMIT),
    sort: externalFilters?.sort ?? searchParams.get('sort') ?? undefined,
    search: externalFilters?.search ?? searchParams.get('search') ?? undefined,
  };

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
