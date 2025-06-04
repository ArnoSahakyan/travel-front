import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { EmptyState, ErrorState, LoadingState, Pagination, TourCard } from '../../components';
import { getDuration } from '../../utils';
import { ROUTES } from '../../shared';
import { usePagination, useFavoritesList } from '../../hooks';

const FavoritesPage = () => {
  const { page, goToNextPage, goToPrevPage } = usePagination();
  const { data, isLoading, isError, error } = useFavoritesList({ page });

  const favorites = data?.favorites || [];
  const totalPages = data?.totalPages || 1;

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [page]);

  return (
    <section className='py-12 bg-background-light dark:bg-background-dark min-h-screen'>
      <div className='container mx-auto px-4 lg:px-8'>
        <div className='text-center mb-12'>
          <h2 className='text-3xl font-bold text-primary-light dark:text-text-dark mb-4'>
            Your Favorites
          </h2>
          <p className='text-secondary-light dark:text-secondary-dark max-w-2xl mx-auto'>
            All the tours you've saved for your next adventure
          </p>
        </div>

        {isLoading ? (
          <LoadingState message='Loading favorites...' />
        ) : isError ? (
          <ErrorState description={error && (error as Error).message} />
        ) : favorites.length === 0 ? (
          <div className='text-center py-12'>
            <EmptyState
              title='No tours in favorites'
              description="You haven't saved any tours yet. Start planning your next adventure!"
              action={
                <Link
                  to={ROUTES.TOURS}
                  className='mt-4 inline-block rounded-md bg-primary-light dark:bg-primary-dark px-6 py-3 text-sm font-medium text-white hover:bg-opacity-90 transition-colors'
                >
                  Browse Tours
                </Link>
              }
            />
          </div>
        ) : (
          <>
            <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'>
              {favorites.map((item) => (
                <TourCard
                  key={item.tour.tour_id}
                  id={item.tour.tour_id}
                  title={item.tour.name}
                  description={item.tour.description}
                  imageUrl={item.tour.image}
                  price={item.tour.price}
                  duration={getDuration(item.tour.start_date, item.tour.end_date)}
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

export default FavoritesPage;
