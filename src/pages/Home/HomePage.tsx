import { DestinationCard, Newsletter, TourCard } from '../../components';
import { tours } from '../../assets';
import { BlogSection, Hero, ReviewsSection, WhyChooseUs } from './components';
import { useDestinations } from '../../hooks';

const HomePage = () => {
  const { data: destinationsData, isLoading, isError, error } = useDestinations(1, 4);

  return (
    <>
      <Hero />
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
            destinationsData?.destinations.map((destination) => (
              <DestinationCard key={destination.destination_id} {...destination} />
            ))
          )}
        </div>
      </section>

      <section className='mx-auto py-10 lg:mt-20 max-w-7xl px-6 lg:px-8'>
        <div className='mb-8 text-center'>
          <h2 className='text-3xl font-bold text-primary-light dark:text-text-dark'>
            Popular Tours
          </h2>
          <p className='text-secondary-light dark:text-secondary-dark mt-2'>
            Our most booked experiences
          </p>
        </div>
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'>
          {tours.slice(0, 6).map((tour) => (
            <TourCard key={tour.id} {...tour} />
          ))}
        </div>
      </section>

      <WhyChooseUs />

      <ReviewsSection />

      <BlogSection />

      <Newsletter />
    </>
  );
};

export default HomePage;
