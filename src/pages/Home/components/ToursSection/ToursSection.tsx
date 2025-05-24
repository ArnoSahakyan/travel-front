import { useTours } from '../../../../hooks';
import { ErrorState, LoadingState, TourCard } from '../../../../components';
import { getDuration } from '../../../../utils';

export const ToursSection = () => {
  const { data, isLoading, isError, error } = useTours({ page: 1, limit: 3 });

  if (data?.tours.length === 0) return;
  return (
    <section className='mx-auto py-10 lg:mt-20 max-w-7xl px-6 lg:px-8'>
      <div className='mb-8 text-center'>
        <h2 className='text-3xl font-bold text-primary-light dark:text-text-dark'>Popular Tours</h2>
        <p className='text-secondary-light dark:text-secondary-dark mt-2'>
          Our most booked experiences
        </p>
      </div>
      <div>
        {isLoading ? (
          <LoadingState message='Loading tours...' />
        ) : isError ? (
          <ErrorState description={error && (error as Error).message} />
        ) : (
          <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'>
            {data?.tours?.map((tour) => (
              <TourCard
                key={tour.tour_id}
                id={tour.tour_id}
                title={tour.name}
                description={tour.description}
                imageUrl={tour.image}
                price={tour.price}
                duration={getDuration(tour.start_date, tour.end_date)}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};
