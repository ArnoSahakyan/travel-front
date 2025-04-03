import { TourCard } from '../../components';
import { Link } from 'react-router-dom';
import { ROUTES } from '../../shared';

const TOURS_DATA = [
  {
    id: '1',
    title: 'Bali Paradise Adventure',
    description:
      "Explore Bali's stunning beaches, ancient temples, and lush rice terraces on this 7-day guided tour. Perfect for adventure seekers and culture lovers.",
    imageUrl:
      'https://images.unsplash.com/photo-1577717903315-1691ae25ab3f?q=80&w=3870&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    price: 1299,
    duration: '7 days',
  },
  {
    id: '2',
    title: 'Italian Dream Vacation',
    description:
      'Experience the romance of Italy with visits to Rome, Florence, and Venice. Includes wine tasting and guided historical tours.',
    imageUrl:
      'https://images.unsplash.com/photo-1495567720989-cebdbdd97913?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1200&q=80',
    price: 1899,
    duration: '10 days',
  },
  {
    id: '3',
    title: 'Japanese Cultural Journey',
    description:
      'Discover Tokyo, Kyoto, and Osaka with authentic cultural experiences including tea ceremonies, sushi making, and samurai history.',
    imageUrl:
      'https://images.unsplash.com/photo-1492571350019-22de08371fd3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1200&q=80',
    price: 2199,
    duration: '12 days',
  },
  {
    id: '4',
    title: 'Greek Island Hopping',
    description:
      'Sail through the stunning Greek islands of Santorini, Mykonos, and Crete with luxury accommodations and private boat tours.',
    imageUrl:
      'https://images.unsplash.com/photo-1533107862482-0e6974b06ec4?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1200&q=80',
    price: 1599,
    duration: '8 days',
  },
];

export const ToursPage = () => {
  return (
    <section className='py-12 bg-background-light dark:bg-background-dark'>
      <div className='container mx-auto px-4'>
        <div className='text-center mb-12'>
          <h2 className='text-3xl font-bold text-text-light dark:text-text-dark mb-4'>
            Featured Tours
          </h2>
          <p className='text-secondary-light dark:text-secondary-dark max-w-2xl mx-auto'>
            Discover our most popular travel experiences curated just for you
          </p>
        </div>

        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8'>
          {TOURS_DATA.map((tour) => (
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
