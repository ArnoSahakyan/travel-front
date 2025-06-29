import { Disclosure, DisclosureButton } from '@headlessui/react';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import { Link } from 'react-router-dom';
import { ThemeToggle } from '../ThemeToggle';
import { ROUTES, NavItem } from '../../shared';
import { useAuthStore } from '../../store';
import { GlobalSearch } from './GlobalSearch.tsx';
import { NavbarDesktopLinks } from './NavbarDesktopLinks.tsx';
import { NavbarMobileMenu } from './NavbarMenuMobile.tsx';
import { UserProfileDropdown } from './UserProfileDropdown.tsx';

const navigation: NavItem[] = [
  { name: 'Destinations', href: ROUTES.DESTINATIONS },
  { name: 'Tours', href: ROUTES.TOURS },
  { name: 'Blog', href: ROUTES.BLOG },
  { name: 'Contact', href: ROUTES.CONTACT },
  { name: 'About', href: ROUTES.ABOUT },
];

export const Navbar = () => {
  const { isAuthenticated } = useAuthStore();

  return (
    <Disclosure
      as='nav'
      className='fixed top-0 z-10 w-full bg-primary-light dark:bg-background-dark shadow-sm dark:border-b dark:border-secondary-dark'
    >
      <>
        <div className='mx-auto max-w-7xl px-2 sm:px-4 lg:px-8'>
          <div className='relative flex h-16 items-center justify-between'>
            {/* Left side - Logo and navigation */}
            <div className='flex items-center px-2 lg:px-0'>
              <div className='shrink-0'>
                <Link to={ROUTES.HOME} className='flex items-center justify-center'>
                  <span className='text-background-light dark:text-text-dark text-xl font-bold '>
                    WanderLuxe
                  </span>
                </Link>
              </div>
              <NavbarDesktopLinks items={navigation} />
            </div>

            {/* Center - Search */}
            <GlobalSearch />

            {/* Right side - Mobile menu button and user profile */}
            <div className='flex lg:hidden'>
              <DisclosureButton className='group relative inline-flex items-center justify-center rounded-md p-2 text-background-light hover:bg-gray-100 hover:text-primary-light focus:outline-none dark:text-secondary-dark dark:hover:bg-gray-700 dark:hover:text-primary-dark'>
                <span className='absolute -inset-0.5' />
                <span className='sr-only'>Open main menu</span>
                <Bars3Icon aria-hidden='true' className='block size-6 group-data-open:hidden' />
                <XMarkIcon aria-hidden='true' className='hidden size-6 group-data-open:block' />
              </DisclosureButton>
            </div>

            <div className='hidden lg:ml-4 lg:block'>
              <div className='flex items-center gap-4'>
                <ThemeToggle />

                {/* Profile dropdown */}
                {isAuthenticated ? (
                  <UserProfileDropdown />
                ) : (
                  <Link
                    to={ROUTES.AUTH + ROUTES.SIGNIN}
                    className='rounded-md bg-primary-light px-4 py-2 text-sm font-medium text-white hover:bg-primary-light/80 dark:bg-primary-dark dark:hover:bg-primary-dark/80'
                  >
                    Login
                  </Link>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        <NavbarMobileMenu navigation={navigation} />
      </>
    </Disclosure>
  );
};
