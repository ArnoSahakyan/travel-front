import { Link, Outlet } from 'react-router-dom';
import { ThemeToggle } from '../../components';
import { ROUTES } from '../../shared';

export const AuthLayout = () => {
  return (
    <div className='flex flex-col min-h-screen'>
      {/* Simple Navbar */}
      <nav className='fixed top-0 p-4 w-full bg-primary-light dark:bg-background-dark shadow-sm dark:border-b dark:border-secondary-dark'>
        <div className='flex items-center justify-between mx-auto max-w-7xl px-2 sm:px-4 lg:px-8'>
          <Link
            to={ROUTES.HOME}
            className='text-2xl font-bold text-background-light dark:text-text-dark'
          >
            WanderLuxe
          </Link>
          <ThemeToggle />
        </div>
      </nav>

      {/* Page Content */}
      <main className='flex flex-1 items-center justify-center bg-background-light dark:bg-background-dark'>
        <Outlet />
      </main>
    </div>
  );
};
