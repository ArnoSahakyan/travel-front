import { Link } from 'react-router-dom';
import { ROUTES } from '../../../../shared';

export const Hero = () => {
  return (
    <div className='relative isolate overflow-hidden'>
      {/* Background image with overlay */}
      <div className='absolute inset-0 -z-10'>
        <img
          src='/hero.avif'
          alt='Beautiful travel destination'
          className='h-full w-full object-cover'
          loading='eager'
        />
        <div className='absolute inset-0 bg-gradient-to-t from-background-dark/80 via-background-dark/30 to-transparent dark:from-background-dark/90 dark:via-background-dark/40' />
      </div>

      {/* Content */}
      <div className='mx-auto max-w-7xl px-6 pb-32 pt-48 sm:pb-40 sm:pt-56 lg:px-8 lg:pt-48'>
        <div className='mx-auto max-w-2xl text-center'>
          <h1 className='text-5xl font-bold tracking-tight text-background-light drop-shadow-lg sm:text-7xl'>
            Discover Your Next Adventure
          </h1>
          <p className='mt-6 text-xl/8 text-background-light/90 drop-shadow-md'>
            Curated experiences that transform ordinary trips into extraordinary journeys
          </p>
          <div className='mt-10 flex flex-col sm:flex-row items-center justify-center gap-6'>
            <Link
              to={ROUTES.TOURS}
              className='rounded-md bg-primary-light px-6 py-3.5 text-lg font-semibold text-background-light shadow-sm hover:bg-primary-light/90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-light dark:bg-primary-dark dark:hover:bg-primary-dark/90'
            >
              Explore Tours
            </Link>
            <Link
              to={ROUTES.DESTINATIONS}
              className='rounded-md px-6 py-3.5 text-lg font-semibold text-background-light ring-1 ring-background-light hover:bg-background-light/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white'
            >
              View Destinations <span aria-hidden='true'>→</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Decorative elements */}
      <div className='absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-background-light to-transparent dark:from-background-dark' />
    </div>
  );
};
