import { useParams, useNavigate, Link } from 'react-router-dom';
import { useBooking, useCancelBooking, useToast } from '../../hooks';
import { formatDate, getDuration } from '../../utils';
import { useEffect } from 'react';
import { ROUTES } from '../../shared';
import {
  ArrowLeftIcon,
  CalendarIcon,
  EnvelopeIcon,
  MapPinIcon,
  PhoneIcon,
  TrashIcon,
} from '@heroicons/react/24/outline';
import { LoadingState, ErrorState } from '../../components';

const BookingDetailsPage = () => {
  const { bookingId } = useParams<{ bookingId: string }>();
  const id = parseInt(bookingId || '', 10);

  const navigate = useNavigate();
  const { showSuccess, showError } = useToast();

  const { data: booking, isLoading, isError, error } = useBooking(id);
  const {
    mutate: cancelBooking,
    isPending: cancelling,
    isSuccess,
    isError: cancelError,
  } = useCancelBooking();

  useEffect(() => {
    if (isSuccess) {
      showSuccess('Booking cancelled successfully.');
      navigate(ROUTES.PROFILE_BOOKINGS);
    } else if (cancelError) {
      showError('Failed to cancel booking.');
    }
  }, [isSuccess, showSuccess, navigate, cancelError, showError]);

  if (isLoading) {
    return (
      <div className='min-h-screen bg-background-light dark:bg-background-dark flex items-center justify-center'>
        <LoadingState message='Loading booking details...' fullPage />
      </div>
    );
  }

  if (isError) {
    return (
      <div className='min-h-screen bg-background-light dark:bg-background-dark flex items-center justify-center'>
        <ErrorState
          title='Booking not found'
          description={error?.message || "We couldn't load this booking"}
          action={
            <Link to={ROUTES.PROFILE_BOOKINGS} className='form-button mt-4'>
              Back to My Bookings
            </Link>
          }
          fullPage
        />
      </div>
    );
  }

  if (!booking) {
    return (
      <div className='min-h-screen bg-background-light dark:bg-background-dark flex items-center justify-center'>
        <ErrorState
          title='Booking not found'
          description="The booking you're looking for doesn't exist"
          action={
            <Link to={ROUTES.PROFILE_BOOKINGS} className='form-button mt-4'>
              Back to My Bookings
            </Link>
          }
          fullPage
        />
      </div>
    );
  }

  const handleCancel = () => {
    cancelBooking(booking.booking_id);
  };

  return (
    <div className='min-h-screen bg-background-light dark:bg-background-dark'>
      {/* Back button and hero section remain the same */}
      <div className='mb-8'>
        <Link
          to={ROUTES.PROFILE_BOOKINGS}
          className='inline-flex items-center text-primary-light dark:text-primary-dark hover:text-accent-light dark:hover:text-accent-dark'
        >
          <ArrowLeftIcon className='mr-2 size-5' />
          Back to My Bookings
        </Link>
      </div>

      {/* Hero Section */}
      <div className='relative h-80 overflow-hidden'>
        <img src={booking.image} alt={booking.tour_name} className='w-full h-full object-cover' />
        <div className='absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent flex items-end pb-8'>
          <div className='container mx-auto px-4 lg:px-8 text-white'>
            <h1 className='text-3xl font-bold mb-1'>{booking.tour_name}</h1>
            <div className='flex items-center space-x-4 text-sm'>
              <span className='flex items-center'>
                <MapPinIcon className='size-4 mr-1' />
                {booking.destination_name}
              </span>
              <span className='flex items-center'>
                <CalendarIcon className='size-4 mr-1' />
                {getDuration(booking.start_date, booking.end_date)} days
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Rest of your booking details content remains the same */}
      <div className='container mx-auto px-4 lg:px-8 py-8 -mt-12 relative z-10'>
        <div className='flex flex-col gap-8'>
          {/* Booking Details Card */}
          <div className='bg-white dark:bg-gray-800 rounded-xl shadow-xl overflow-hidden'>
            <div className='p-8'>
              <div className='flex flex-col md:flex-row md:items-center md:justify-between mb-8'>
                <div>
                  <h2 className='text-2xl font-bold text-primary-light dark:text-primary-dark mb-2'>
                    Your Booking Summary
                  </h2>
                  <p className='text-secondary-light dark:text-secondary-dark'>
                    Booking ID: {booking.booking_id}
                  </p>
                </div>
                <div className='mt-4 md:mt-0'>
                  <span
                    className={`px-4 py-2 rounded-full text-sm font-medium ${
                      booking.status === 'confirmed'
                        ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                        : 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200'
                    }`}
                  >
                    {booking.status.toUpperCase()}
                  </span>
                </div>
              </div>

              <div className='grid grid-cols-1 md:grid-cols-3 gap-8 mb-8'>
                <div className='border-r border-gray-200 dark:border-gray-700 pr-8'>
                  <h3 className='text-sm font-semibold text-secondary-light dark:text-secondary-dark mb-2'>
                    TRAVEL DATES
                  </h3>
                  <p className='text-lg text-text-light dark:text-text-dark'>
                    {formatDate(booking.start_date)} -<br />
                    {formatDate(booking.end_date)}
                  </p>
                </div>
                <div className='border-r border-gray-200 dark:border-gray-700 pr-8'>
                  <h3 className='text-sm font-semibold text-secondary-light dark:text-secondary-dark mb-2'>
                    TRAVELERS
                  </h3>
                  <p className='text-lg text-text-light dark:text-text-dark'>
                    {booking.number_of_people} {booking.number_of_people > 1 ? 'Guests' : 'Guest'}
                  </p>
                </div>
                <div>
                  <h3 className='text-sm font-semibold text-secondary-light dark:text-secondary-dark mb-2'>
                    TOTAL PRICE
                  </h3>
                  <p className='text-3xl font-bold text-accent-light dark:text-accent-dark'>
                    $
                    {parseFloat(booking.total_price).toLocaleString('en-US', {
                      minimumFractionDigits: 2,
                    })}
                  </p>
                </div>
              </div>

              {(booking.status === 'confirmed' || booking.status === 'pending') && (
                <div className='pt-6 border-t border-gray-200 dark:border-gray-700'>
                  <div className='flex flex-col md:flex-row md:items-center md:justify-between'>
                    <div className='mb-4 md:mb-0'>
                      <h3 className='text-sm font-semibold text-secondary-light dark:text-secondary-dark mb-1'>
                        NEED TO MAKE CHANGES?
                      </h3>
                      <p className='text-sm text-gray-500 dark:text-gray-400'>
                        Cancellation fees may apply based on your booking policy
                      </p>
                    </div>
                    <button
                      onClick={handleCancel}
                      disabled={cancelling}
                      className='px-8 py-3 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-lg hover:from-red-600 hover:to-red-700 transition-all disabled:opacity-50 flex items-center justify-center space-x-2'
                    >
                      {cancelling ? (
                        <>
                          <svg
                            className='animate-spin -ml-1 mr-2 h-4 w-4 text-white'
                            xmlns='http://www.w3.org/2000/svg'
                            fill='none'
                            viewBox='0 0 24 24'
                          >
                            <circle
                              className='opacity-25'
                              cx='12'
                              cy='12'
                              r='10'
                              stroke='currentColor'
                              strokeWidth='4'
                            ></circle>
                            <path
                              className='opacity-75'
                              fill='currentColor'
                              d='M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z'
                            ></path>
                          </svg>
                          <span>Cancelling...</span>
                        </>
                      ) : (
                        <>
                          <TrashIcon className='size-5' />
                          <span>Cancel Booking</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Help & Support Card - Reusable for all bookings */}
          <div className='bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden h-fit'>
            <div className='p-6 md:p-8'>
              <h2 className='text-xl font-bold text-primary-light dark:text-primary-dark mb-6'>
                Need Assistance?
              </h2>
              <div className='space-y-6'>
                <div className='flex items-start'>
                  <div className='bg-primary-light/10 dark:bg-primary-dark/10 p-3 rounded-lg mr-4'>
                    <PhoneIcon className='size-5 text-primary-light dark:text-primary-dark' />
                  </div>
                  <div>
                    <h3 className='font-medium text-text-light dark:text-text-dark mb-1'>
                      Contact Support
                    </h3>
                    <p className='text-sm text-secondary-light dark:text-secondary-dark'>
                      Available 24/7 for any questions
                    </p>
                    <a
                      href='tel:+18005551234'
                      className='text-sm text-primary-light dark:text-primary-dark hover:underline mt-1 block'
                    >
                      +1 (800) 555-1234
                    </a>
                  </div>
                </div>

                <div className='flex items-start'>
                  <div className='bg-primary-light/10 dark:bg-primary-dark/10 p-3 rounded-lg mr-4'>
                    <EnvelopeIcon className='size-5 text-primary-light dark:text-primary-dark' />
                  </div>
                  <div>
                    <h3 className='font-medium text-text-light dark:text-text-dark mb-1'>
                      Email Support
                    </h3>
                    <p className='text-sm text-secondary-light dark:text-secondary-dark'>
                      We respond within 2 hours
                    </p>
                    <a
                      href='mailto:concierge@wanderluxe.com'
                      className='text-sm text-primary-light dark:text-primary-dark hover:underline mt-1 block'
                    >
                      concierge@wanderluxe.com
                    </a>
                  </div>
                </div>

                <div className='flex items-start'>
                  <div className='bg-primary-light/10 dark:bg-primary-dark/10 p-3 rounded-lg mr-4'>
                    <CalendarIcon className='h-5 w-5 text-primary-light dark:text-primary-dark' />
                  </div>
                  <div>
                    <h3 className='font-medium text-text-light dark:text-text-dark mb-1'>
                      Important Dates
                    </h3>
                    <p className='text-sm text-secondary-light dark:text-secondary-dark'>
                      Final payment due:{' '}
                      {formatDate(
                        new Date(
                          new Date(booking.start_date).setDate(
                            new Date(booking.start_date).getDate() - 30,
                          ),
                        ).toString(),
                      )}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingDetailsPage;
