import { Link } from 'react-router-dom';
import { ROUTES } from '../../shared';

const NotFoundPage = () => {
  return (
    <main className='grid min-h-screen place-items-center bg-background-light dark:bg-background-dark px-6 py-24 sm:py-32 lg:px-8'>
      <div className='text-center'>
        <p className='text-base font-semibold text-primary-light dark:text-primary-dark'>404</p>
        <h1 className='mt-4 text-balance text-5xl font-semibold tracking-tight text-primary-light dark:text-text-dark sm:text-7xl'>
          Page not found
        </h1>
        <p className='mt-6 text-pretty text-lg font-medium text-secondary-light dark:text-secondary-dark sm:text-xl/8'>
          Sorry, we couldn't find the page you're looking for.
        </p>
        <div className='mt-10 flex items-center justify-center gap-x-6'>
          <Link
            to={ROUTES.HOME} // Using your routes constant
            className='rounded-md bg-primary-light dark:bg-primary-dark px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-opacity-90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-light dark:focus-visible:outline-primary-dark transition-colors'
          >
            Go back home
          </Link>
          <Link
            to={ROUTES.CONTACT}
            className='text-sm font-semibold text-primary-light dark:text-text-dark hover:text-primary-light dark:hover:text-primary-dark transition-colors'
          >
            Contact support <span aria-hidden='true'>&rarr;</span>
          </Link>
        </div>
      </div>
    </main>
  );
};

export default NotFoundPage;
