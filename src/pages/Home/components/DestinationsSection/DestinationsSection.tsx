import { useDestinations } from '../../../../hooks';
import { DestinationCard, ErrorState, LoadingState } from '../../../../components';

export const DestinationsSection = () => {
  const { data, isLoading, isError, error } = useDestinations({ page: 1, limit: 4 });

  if (data?.destinations.length === 0) return;
  return (
    <section className='mx-auto py-10 lg:mt-20 max-w-7xl px-6 lg:px-8'>
      <div className='mb-8 text-center'>
        <h2 className='text-3xl font-bold text-primary-light dark:text-text-dark'>
          Explore Our Destinations
        </h2>
        <p className='text-secondary-light dark:text-secondary-dark mt-2'>
          Discover the world's most breathtaking places
        </p>
      </div>
      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'>
        {isLoading ? (
          <LoadingState message='Loading destinations...' />
        ) : isError ? (
          <ErrorState description={error && (error as Error).message} />
        ) : (
          data?.destinations?.map((destination) => (
            <DestinationCard key={destination.destination_id} {...destination} />
          ))
        )}
      </div>
    </section>
  );
};
