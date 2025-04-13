import { Link } from 'react-router-dom';
import { ROUTES } from '../../../shared';
import { ThemeToggle } from '../../../components';

export const AuthNavbar = () => {
  return (
    <nav className='fixed top-0 w-full bg-primary-light dark:bg-background-dark shadow-sm dark:border-b dark:border-secondary-dark'>
      <div className='flex h-16 items-center justify-between mx-auto max-w-7xl px-2 sm:px-4 lg:px-8'>
        <Link
          to={ROUTES.HOME}
          className='text-2xl font-bold text-background-light dark:text-text-dark'
        >
          WanderLuxe
        </Link>
        <ThemeToggle />
      </div>
    </nav>
  );
};
