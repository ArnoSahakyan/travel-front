import { useDestinations } from '../../../../hooks';
import { DestinationCard } from '../../../../components';

export const DestinationsSection = () => {
  const { data, isLoading, isError, error } = useDestinations(1, 4);
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
          <div className='text-center text-secondary-light dark:text-secondary-dark'>
            Loading destinations...
          </div>
        ) : isError ? (
          <div className='text-center text-red-500'>Error: {(error as Error).message}</div>
        ) : (
          data?.destinations?.map((destination) => (
            <DestinationCard key={destination.destination_id} {...destination} />
          ))
        )}
      </div>
    </section>
  );
};
