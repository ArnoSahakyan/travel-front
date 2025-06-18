import { EmptyState, ErrorState, LoadingState, Pagination, TourCard } from '../../components';
import { usePagination } from '../../hooks';
import { useEffect } from 'react';
import { useTours } from '../../hooks';
import { getDuration } from '../../utils';

const ToursPage = () => {
  const { page, goToNextPage, goToPrevPage } = usePagination();
  const { data, isLoading, isError, error } = useTours();

  const totalPages = data?.totalPages || 1;

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [page]);

  return (
    <section className='py-12 bg-background-light dark:bg-background-dark'>
      <div className='container mx-auto px-4 lg:px-8'>
        <div className='text-center mb-12'>
          <h2 className='text-3xl font-bold text-primary-light dark:text-text-dark mb-4'>
            Featured Tours
          </h2>
          <p className='text-secondary-light dark:text-secondary-dark max-w-2xl mx-auto'>
            Discover our most popular travel experiences curated just for you
          </p>
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
