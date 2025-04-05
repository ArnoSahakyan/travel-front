import { Link } from 'react-router-dom';
import { ROUTES } from '../../shared';
import { FC } from 'react';
import { ITourCardProps } from '../../shared/types';
import { ClockIcon } from '@heroicons/react/24/solid';

export const TourCard: FC<ITourCardProps> = ({
  id,
  title,
  description,
  imageUrl,
  price,
  duration,
}) => {
  return (
    <div className='relative flex flex-col rounded-xl bg-background-light dark:bg-background-dark shadow-md overflow-hidden border border-gray-200 dark:border-gray-700 transition-transform hover:scale-[1.02] hover:shadow-lg'>
      {/* Image with price tag */}
      <div className='relative h-48 overflow-hidden'>
        <img src={imageUrl} alt={title} className='w-full h-full object-cover' />
        <div className='absolute top-4 right-4 bg-primary-light dark:bg-primary-dark text-background-light px-3 py-1 rounded-full font-bold text-sm shadow-md'>
          ${price.toLocaleString()}
        </div>
        <div className='absolute flex items-center gap-1 bottom-4 left-4 bg-background-light dark:bg-background-dark text-text-light dark:text-text-dark px-2 py-1 rounded text-xs font-medium'>
          <ClockIcon className='block size-4' /> {duration}
        </div>
      </div>

      <div className='p-4 flex flex-col flex-grow'>
        <h3 className='text-lg font-semibold text-text-light dark:text-text-dark mb-2 line-clamp-2'>
          {title}
        </h3>
        <p className='text-sm text-secondary-light dark:text-secondary-dark mb-4 line-clamp-3'>
          {description}
        </p>

        <div className='mt-auto'>
          <Link
            to={`${ROUTES.TOURS}/${id}`}
            className='w-full inline-flex justify-center rounded-md bg-primary-light dark:bg-primary-dark px-4 py-2 text-sm font-medium text-background-light hover:bg-opacity-90 focus:outline-none focus-visible:ring-2 focus-visible:ring-background-light focus-visible:ring-opacity-75 transition-colors'
          >
            View Tour
          </Link>
        </div>
      </div>
    </div>
  );
};
