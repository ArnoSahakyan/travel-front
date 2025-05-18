import { StarIcon } from '@heroicons/react/20/solid';
import { IReview } from '../../shared';
import { FC } from 'react';
import { formatDate } from '../../utils';

interface Review {
  review: IReview;
}

export const ReviewCard: FC<Review> = ({ review }) => {
  return (
    <div className='flex flex-col rounded-2xl bg-white dark:bg-gray-800 p-6 shadow-sm ring-1 ring-gray-200 dark:ring-gray-700 hover:shadow-md transition-all h-full'>
      <div className='flex-1'>
        <h3 className='text-base font-semibold text-primary-light dark:text-text-dark'>
          {review.full_name}
        </h3>
        <p className='text-sm text-secondary-light dark:text-secondary-dark'>{review.tour_name}</p>
      </div>

      <div className='mt-4 flex items-center'>
        {[0, 1, 2, 3, 4].map((rating) => (
          <StarIcon
            key={rating}
            className={`h-5 w-5 ${review.rating > rating ? 'text-yellow-400' : 'text-gray-300 dark:text-gray-500'}`}
            aria-hidden='true'
          />
        ))}
      </div>

      <p className='mt-4 text-pretty text-secondary-light dark:text-secondary-dark'>
        "{review.comment}"
      </p>

      <div className='mt-4 text-sm text-gray-500 dark:text-gray-400'>
        {formatDate(review.createdAt)}
      </div>
    </div>
  );
};
