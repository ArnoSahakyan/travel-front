export const bookingKeys = {
  all: ['bookings'] as const,
  list: (filters: object) => [...bookingKeys.all, 'list', filters] as const,
  detail: (id: number) => [...bookingKeys.all, 'detail', id] as const,
};
