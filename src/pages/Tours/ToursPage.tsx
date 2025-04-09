import { TourCard } from '../../components';
import { Link } from 'react-router-dom';
import { ROUTES } from '../../shared';
import { tours } from '../../assets';

export const ToursPage = () => {
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

        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8'>
          {tours.map((tour) => (
            <TourCard
              key={tour.id}
              id={tour.id}
              title={tour.title}
              description={tour.description}
              imageUrl={tour.imageUrl}
              price={tour.price}
              duration={tour.duration}
            />
          ))}
        </div>

        <div className='text-center mt-12'>
          <Link
            to={ROUTES.TOURS}
            className='inline-block rounded-md bg-primary-light dark:bg-primary-dark px-6 py-3 text-sm font-medium text-white hover:bg-opacity-90 transition-colors shadow-md'
          >
            View All Tours
          </Link>
        </div>
      </div>
    </section>
  );
};
