import { Link } from 'react-router-dom';
import { IDestination, ROUTES } from '../../shared';
import { FC } from 'react';
import { MapPinIcon } from '@heroicons/react/24/outline';

export const DestinationCard: FC<IDestination> = ({
  destination_id,
  name,
  image,
  tourCount,
  description,
  startingPrice,
}) => {
  return (
    <div className='relative group overflow-hidden rounded-xl bg-background-light dark:bg-background-dark shadow-md border border-gray-200 dark:border-gray-700 transition-all hover:shadow-lg'>
      {/* Image with overlay */}
      <div className='relative h-60 overflow-hidden'>
        <img
          src={image}
          alt={name}
          className='w-full h-full object-cover transition-transform duration-500 group-hover:scale-105'
        />
        <div className='absolute inset-0 bg-gradient-to-t from-background-dark/70 via-transparent to-transparent' />

        {startingPrice && (
          <span className='absolute top-2 right-2 bg-background-light dark:bg-background-dark text-primary-light dark:text-primary-dark px-3 py-1 rounded-full text-sm font-semibold'>
            From ${startingPrice.toLocaleString()}
          </span>
        )}

        {/* Badges */}
        <div className='absolute bottom-4 left-4 right-4'>
          <div className='flex justify-between items-end'>
            <div>
              <h3 className='text-2xl font-bold text-background-light drop-shadow-md'>{name}</h3>
              <p className='text-background-light/90 text-sm mt-1 line-clamp-1'>{description}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className='p-4'>
        <div className='flex justify-between items-center text-sm text-secondary-light dark:text-secondary-dark'>
          <span className='flex items-center gap-1'>
            <MapPinIcon className='block size-6' /> {tourCount} Tour(s) Available
          </span>
          <Link
            to={`${ROUTES.DESTINATIONS}/${destination_id}`}
            className='flex items-center text-primary-light dark:text-primary-dark font-medium hover:underline'
          >
            Explore <span className='ml-1'>→</span>
          </Link>
        </div>
      </div>
    </div>
  );
};
