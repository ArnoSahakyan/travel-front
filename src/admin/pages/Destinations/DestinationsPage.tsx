import { useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import {
  DestinationCard,
  EmptyState,
  ErrorState,
  LoadingState,
  Pagination,
  SearchInput,
} from '../../../components';
import { useDestinations, usePagination } from '../../../hooks';
import { PlusIcon } from '@heroicons/react/24/outline';
import { ROUTES } from '../../../shared';

const DestinationsPage = () => {
  const [searchParams] = useSearchParams();
  const initialSearch = searchParams.get('search') || '';

  const { page, setSearch, goToNextPage, goToPrevPage } = usePagination();
  const { data, isLoading, isError, error } = useDestinations({ limit: 20 });

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
            View & Edit Destinations
          </h1>
        </div>
        {/* Search Input */}
        <div className='flex flex-col-reverse sm:flex-row justify-between items-center gap-4 mb-12'>
          <div className='w-full max-w-2xl'>
            <SearchInput
              initialValue={initialSearch}
              onSearch={setSearch}
              placeholder='Search destinations by name or description'
              debounceDelay={400}
            />
          </div>
          <Link
            to={ROUTES.ADMIN_DESTINATIONS_NEW}
            className='max-w-2xl flex items-center gap-1 form-button whitespace-nowrap w-full sm:w-auto'
          >
            <PlusIcon className='w-5 h-5' /> Add Destination
          </Link>
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
                <DestinationCard key={destination.destination_id} {...destination} mode='admin' />
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
      </div>
    </div>
  );
};

export default DestinationsPage;
