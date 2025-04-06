import { DestinationCard, TourCard } from '../../components';
import { destinations, tours } from '../../assets';
import { BlogSection, Hero, ReviewsSection, WhyChooseUs } from './components';

export const HomePage = () => {
  return (
    <>
      <Hero />
      <section className='container mt-10 mx-auto px-4'>
        <div className='mb-8 text-center'>
          <h2 className='text-3xl font-bold text-text-light dark:text-text-dark'>
            Explore Our Destinations
          </h2>
          <p className='text-secondary-light dark:text-secondary-dark mt-2'>
            Discover the world's most breathtaking places
          </p>
        </div>
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'>
          {destinations.slice(0, 4).map((destination) => (
            <DestinationCard key={destination.id} {...destination} />
          ))}
        </div>
      </section>

      <section className='container mt-10 mx-auto px-4'>
        <div className='mb-8 text-center'>
          <h2 className='text-3xl font-bold text-text-light dark:text-text-dark'>Popular Tours</h2>
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
    </>
  );
};
