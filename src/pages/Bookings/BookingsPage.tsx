import { useEffect } from 'react';
import { BookingCard, EmptyState, ErrorState, LoadingState, Pagination } from '../../components';
import { IBooking, ROUTES } from '../../shared';
import { Link } from 'react-router-dom';
import { useBookings, usePagination } from '../../hooks';

const BookingsPage = () => {
  const { page, goToNextPage, goToPrevPage } = usePagination();
  const { data, isLoading, isError, error } = useBookings({ page });

  const bookings = data?.bookings || [];
  const totalPages = data?.totalPages || 1;

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [page]);

  return (
    <section className='py-12 bg-background-light dark:bg-background-dark min-h-screen'>
      <div className='container mx-auto px-4 lg:px-8'>
        <div className='text-center mb-12'>
          <h2 className='text-3xl font-bold text-primary-light dark:text-text-dark mb-4'>
            Your Bookings
          </h2>
          <p className='text-secondary-light dark:text-secondary-dark max-w-2xl mx-auto'>
            All your upcoming and past adventures with WanderLuxe
          </p>
        </div>

        {isLoading ? (
          <LoadingState message='Loading bookings...' />
        ) : isError ? (
          <ErrorState description={error && (error as Error).message} />
        ) : bookings.length === 0 ? (
          <div className='text-center py-12'>
            <EmptyState
              title='No bookings available'
              description="You don't have any bookings yet. Start your next adventure!"
              action={
                <Link
                  to={ROUTES.TOURS}
                  className='mt-4 inline-block rounded-md bg-primary-light dark:bg-primary-dark px-6 py-3 text-sm font-medium text-white hover:bg-opacity-90 transition-colors'
                >
                  Browse Tours
                </Link>
              }
            />
          </div>
        ) : (
          <>
            <div className='flex flex-col gap-8'>
              {bookings.map((booking: IBooking) => (
                <BookingCard key={booking.booking_id} booking={booking} />
              ))}
            </div>

            {totalPages > 1 && (
              <Pagination
                page={page}
                totalPages={totalPages}
                goToPrevPage={goToPrevPage}
                goToNextPage={goToNextPage}
              />
            )}
          </>
        )}
      </div>
    </section>
  );
};

export default BookingsPage;
