import { ReviewCard } from '../../../../components';
import { useAllReviews } from '../../../../hooks';

export const ReviewsSection = () => {
  const { data, isLoading, isError, error } = useAllReviews();

  return (
    <div className='bg-background-light dark:bg-background-dark py-10 sm:py-20'>
      <div className='mx-auto max-w-7xl px-6 lg:px-8'>
        <div className='mx-auto max-w-2xl text-center'>
          <h2 className='text-balance text-4xl font-semibold tracking-tight text-primary-light dark:text-text-dark sm:text-5xl'>
            Travelers Love WanderLuxe
          </h2>
          <p className='mt-4 text-lg/8 text-secondary-light dark:text-secondary-dark'>
            Hear from adventurers who've explored with us
          </p>
        </div>

        <div className='mt-16 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4'>
          {isLoading ? (
            <div className='text-center text-secondary-light dark:text-secondary-dark'>
              Loading destinations...
            </div>
          ) : isError ? (
            <div className='text-center text-red-500'>Error: {(error as Error).message}</div>
          ) : (
            data?.reviews?.map((review) => <ReviewCard key={review.review_id} review={review} />)
          )}
        </div>
      </div>
    </div>
  );
};
