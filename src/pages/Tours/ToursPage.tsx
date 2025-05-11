import { TourCard } from '../../components';
import { DESTINATIONS_LIMIT } from '../../shared';
import { usePagination } from '../../hooks';
import { useEffect } from 'react';
import { useTours } from '../../hooks';
import { getDuration } from '../../utils';

const ToursPage = () => {
  const { page, goToNextPage, goToPrevPage } = usePagination();
  const { data, isLoading, isError, error } = useTours(page, DESTINATIONS_LIMIT);

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
          <div className='text-center text-secondary-light dark:text-secondary-dark'>
            Loading destinations...
          </div>
        ) : isError ? (
          <div className='text-center text-red-500'>Error: {(error as Error).message}</div>
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

            <div className='flex justify-center items-center gap-4 mt-10'>
              <button
                onClick={() => goToPrevPage()}
                disabled={page === 1}
                className='px-4 py-2 bg-primary-light text-white rounded-md disabled:opacity-50'
              >
                Previous
              </button>
              <span className='text-secondary-light dark:text-secondary-dark'>
                Page {page} of {data?.totalPages}
              </span>
              <button
                onClick={() => goToNextPage(data?.totalPages || 1)}
                disabled={page === data?.totalPages}
                className='px-4 py-2 bg-primary-light text-white rounded-md disabled:opacity-50'
              >
                Next
              </button>
            </div>
          </>
        )}
      </div>
    </section>
  );
};

export default ToursPage;
