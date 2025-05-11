import { useParams } from 'react-router-dom';
import { useDestination, useTours } from '../../hooks';
import { getDuration } from '../../utils';
import { Pagination, TourCard } from '../../components';
import { usePagination } from '../../hooks';

const DestinationDetailsPage = () => {
  const { destinationId } = useParams<{ destinationId: string }>();
  const id = parseInt(destinationId || '', 10);

  const { data: destination, isLoading: loadingDestination } = useDestination(id);

  // Use pagination hook for tours
  const { page, limit, goToNextPage, goToPrevPage } = usePagination();

  // Fetch tours with pagination using destination_id and pagination params
  const { data: tours, isLoading: loadingTours } = useTours({
    destination_id: id,
    page,
    limit,
  });

  if (loadingDestination || loadingTours) return <div>Loading...</div>;
  if (!destination) return <div>Destination not found</div>;

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

        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8'>
          {tours?.tours?.map((tour) => (
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

        {/* Reusable Pagination Component */}
        <Pagination
          page={page}
          totalPages={tours?.totalPages || 1}
          goToPrevPage={goToPrevPage}
          goToNextPage={goToNextPage}
        />
      </div>
    </section>
  );
};

export default DestinationDetailsPage;
