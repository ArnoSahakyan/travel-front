import {
  EmptyState,
  ErrorState,
  LoadingState,
  Pagination,
  SearchInput,
  TourCard,
} from '../../components';
import { usePagination } from '../../hooks';
import { useEffect } from 'react';
import { useTours } from '../../hooks';
import { getDuration } from '../../utils';
import { useSearchParams } from 'react-router-dom';

const ToursPage = () => {
  const [searchParams] = useSearchParams();
  const initialSearch = searchParams.get('search') || '';

  const { page, setSearch, goToNextPage, goToPrevPage } = usePagination();
  const { data, isLoading, isError, error } = useTours();

  const totalPages = data?.totalPages || 1;

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [page]);

  return (
    <section className='py-12 bg-background-light dark:bg-background-dark'>
      <div className='container mx-auto px-4 lg:px-8'>
        <div className='mx-auto max-w-2xl text-center mb-12'>
          <h1 className='text-4xl font-bold tracking-tight text-primary-light dark:text-text-dark sm:text-5xl'>
            Featured Tours
          </h1>
          <p className='mt-4 text-lg text-secondary-light dark:text-secondary-dark'>
            Discover our most popular travel experiences curated just for you
          </p>
        </div>
        {/* Search Input */}
        <div className='mb-12 max-w-2xl mx-auto'>
          <SearchInput
            initialValue={initialSearch}
            onSearch={setSearch}
            placeholder='Search tours by name or description'
            debounceDelay={400}
          />
        </div>
        {isLoading ? (
          <LoadingState message='Loading tours...' />
        ) : isError ? (
          <ErrorState description={error && (error as Error).message} />
        ) : data?.tours?.length === 0 ? (
          <EmptyState
            title='No tours available'
            description="We couldn't find any tours matching your criteria."
          />
        ) : (
          <>
            <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8'>
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
    </section>
  );
};

export default ToursPage;
