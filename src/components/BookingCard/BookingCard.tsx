import { FC } from 'react';
import { Link } from 'react-router-dom';
import { ROUTES } from '../../shared';
import { formatDate } from '../../utils';

interface BookingCardProps {
  booking: {
    booking_id: number;
    booking_date: string;
    number_of_people: number;
    total_price: string;
    status: string;
    tour_name: string;
    start_date: string;
    end_date: string;
    destination_name: string;
    category_name: string;
    image: string;
  };
}

export const BookingCard: FC<BookingCardProps> = ({ booking }) => {
  const statusColors = {
    confirmed: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
    pending: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200',
    cancelled: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200',
  };

  return (
    <div className='flex h-40 w-full overflow-hidden rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 shadow-sm transition-all hover:shadow-md'>
      {/* Image Section (25% width) */}
      <div className='relative w-1/4 min-w-[120px]'>
        <img
          src={booking.image}
          alt={booking.tour_name}
          className='h-full w-full object-cover'
          onError={(e) => {
            (e.target as HTMLImageElement).src =
              'https://via.placeholder.com/300x160?text=WanderLuxe';
          }}
        />
        <span
          className={`absolute top-2 right-2 rounded-full px-2 py-0.5 text-xs font-medium ${statusColors[booking.status as keyof typeof statusColors] || 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200'}`}
        >
          {booking.status}
        </span>
      </div>

      {/* Content Section (75% width) */}
      <div className='flex w-3/4 flex-col justify-between p-4'>
        {/* Top Row - Title and Price */}
        <div className='flex justify-between'>
          <div>
            <h3 className='text-lg font-semibold text-primary-light dark:text-text-dark line-clamp-1'>
              {booking.tour_name}
            </h3>
            <p className='text-sm text-secondary-light dark:text-secondary-dark'>
              {booking.destination_name} • {formatDate(booking.start_date)} -{' '}
              {formatDate(booking.end_date)}
            </p>
          </div>
          <div className='text-right'>
            <p className='text-lg font-bold text-primary-light dark:text-text-dark'>
              ${booking.total_price}
            </p>
            <p className='text-xs text-secondary-light dark:text-secondary-dark'>
              {booking.number_of_people} {booking.number_of_people === 1 ? 'person' : 'people'}
            </p>
          </div>
        </div>

        {/* Bottom Row - Action Button */}
        <div className='flex items-center justify-between'>
          <div className='text-sm text-secondary-light dark:text-secondary-dark'>
            Booked on {new Date(booking.start_date).toLocaleDateString()}
          </div>
          <Link
            to={`${ROUTES.PROFILE_BOOKINGS}/${booking.booking_id}`}
            className='rounded-md bg-primary-light dark:bg-primary-dark px-3 py-1.5 text-sm font-medium text-white hover:bg-opacity-90 transition-colors'
          >
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
};
