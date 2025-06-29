import { useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { ROUTES } from '../../shared';
import {
  DestinationCard,
  EmptyState,
  ErrorState,
  LoadingState,
  Pagination,
  SearchInput,
} from '../../components';
import { useDestinations, usePagination } from '../../hooks';

const DestinationsPage = () => {
  const [searchParams] = useSearchParams();
  const initialSearch = searchParams.get('search') || '';

  const { page, setSearch, goToNextPage, goToPrevPage } = usePagination();
  const { data, isLoading, isError, error } = useDestinations();

  const totalPages = data?.totalPages || 1;

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [page]);

  return (
    <div className='bg-background-light dark:bg-background-dark py-12'>
      <div className='container mx-auto px-4 lg:px-8'>
        {/* Page Header */}
        <div className='mx-auto max-w-2xl text-center mb-12'>
          <h1 className='text-4xl font-bold tracking-tight text-primary-light dark:text-text-dark sm:text-5xl'>
            Discover Our Destinations
          </h1>
          <p className='mt-4 text-lg text-secondary-light dark:text-secondary-dark'>
            Explore the world's most breathtaking countries
          </p>
        </div>
        {/* Search Input */}
        <div className='mb-12 max-w-2xl mx-auto'>
          <SearchInput
            initialValue={initialSearch}
            onSearch={setSearch}
            placeholder='Search destinations by name or description'
            debounceDelay={400}
          />
        </div>
        {/* Loading/Error */}
        {isLoading ? (
          <LoadingState message='Loading destinations...' />
        ) : isError ? (
          <ErrorState description={error && (error as Error).message} />
        ) : data?.destinations?.length === 0 ? (
          <EmptyState
            title='No destinations available'
            description="We couldn't find any destinations matching your criteria."
          />
        ) : (
          <>
            {/* Destination Cards Grid */}
            <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8'>
              {data?.destinations?.map((destination) => (
                <DestinationCard key={destination.destination_id} {...destination} />
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

        {/* Call to Action */}
        <div className='mt-16 text-center'>
          <h2 className='text-2xl font-semibold text-primary-light dark:text-text-dark'>
            Can't find what you're looking for?
          </h2>
          <p className='mt-4 text-secondary-light dark:text-secondary-dark'>
            Our travel experts can create a custom itinerary just for you
          </p>
          <div className='mt-6'>
            <Link
              to={ROUTES.CONTACT}
              className='inline-flex items-center rounded-md bg-primary-light dark:bg-primary-dark px-4 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-opacity-90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-light dark:focus-visible:outline-primary-dark transition-colors'
            >
              Contact Our Team
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DestinationsPage;
