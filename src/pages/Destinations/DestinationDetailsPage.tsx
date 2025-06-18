import { useParams, Link } from 'react-router-dom';
import { useDestination, useTours, usePagination } from '../../hooks';
import { getDuration } from '../../utils';
import { Pagination, TourCard, LoadingState, ErrorState, EmptyState } from '../../components';

const DestinationDetailsPage = () => {
  const { destinationId } = useParams<{ destinationId: string }>();
  const id = parseInt(destinationId || '', 10);

  const {
    data: destination,
    isLoading: loadingDestination,
    isError: errorDestination,
  } = useDestination(id);

  const { page, limit, goToNextPage, goToPrevPage } = usePagination();

  const {
    data: tours,
    isLoading: loadingTours,
    isError: errorTours,
    error,
  } = useTours({
    destination_id: id,
    page,
    limit,
  });

  const isLoading = loadingDestination || loadingTours;
  const isError = errorDestination || errorTours;
  const totalPages = tours?.totalPages || 1;

  if (isLoading) {
    return (
      <section className='py-12 bg-background-light dark:bg-background-dark min-h-screen'>
        <LoadingState message='Loading destination details...' fullPage />
      </section>
    );
  }

  if (isError || !destination) {
    return (
      <div className='min-h-screen bg-background-light dark:bg-background-dark flex items-center justify-center'>
        <ErrorState
          title='Destination not found'
          description={error?.message || "We couldn't load this destination"}
          action={
            <Link to='/destinations' className='form-button mt-4'>
              Browse All Destinations
            </Link>
          }
          fullPage
        />
      </div>
    );
  }

  return (
    <section className='py-12 bg-background-light dark:bg-background-dark'>
      <div className='container mx-auto px-4 lg:px-8'>
        <h1 className='text-3xl font-bold text-primary-light dark:text-text-dark mb-4'>
          {destination.name}
        </h1>
        <img
          src={destination.image}
          alt={destination.name}
          className='rounded-lg w-full max-h-[400px] object-cover mb-6'
        />
        <p className='text-secondary-light dark:text-secondary-dark mb-10'>
          {destination.description}
        </p>

        <h2 className='text-2xl font-semibold text-primary-light dark:text-text-dark mb-4'>
          Tours in {destination.name}
        </h2>

        {tours?.tours?.length ? (
          <>
            <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8'>
              {tours.tours.map((tour) => (
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
        ) : (
          <EmptyState
            title='No tours found'
            description='There are currently no tours available for this destination.'
          />
        )}
      </div>
    </section>
  );
};

export default DestinationDetailsPage;
