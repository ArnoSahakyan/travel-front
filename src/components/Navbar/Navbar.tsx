import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
} from '@headlessui/react';
import { MagnifyingGlassIcon } from '@heroicons/react/20/solid';
import { Bars3Icon, UserIcon, XMarkIcon } from '@heroicons/react/24/outline';
import { Link, NavLink } from 'react-router-dom';
import { ThemeToggle } from '../ThemeToggle';
import { ROUTES, NavItem } from '../../shared';
import { useAuthStore } from '../../store';

export const Navbar = () => {
  const { user, isAuthenticated, logout } = useAuthStore();

  const navigation: NavItem[] = [
    { name: 'Destinations', href: ROUTES.DESTINATIONS },
    { name: 'Tours', href: ROUTES.TOURS },
    { name: 'Blog', href: ROUTES.BLOG },
    { name: 'Contact', href: ROUTES.CONTACT },
    { name: 'About', href: ROUTES.ABOUT },
  ];

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
              <div className='hidden lg:ml-6 lg:block'>
                <div className='flex space-x-4'>
                  {navigation.map((item) => (
                    <NavLink
                      key={item.name}
                      to={item.href}
                      className={({ isActive }) =>
                        `rounded-md px-3 py-2 text-sm font-medium ${
                          isActive
                            ? 'bg-background-light text-primary-light dark:bg-primary-dark/20 dark:text-primary-dark'
                            : 'text-background-light hover:bg-background-light hover:text-primary-light dark:text-primary-dark dark:hover:bg-secondary-light dark:hover:text-primary-dark'
                        }`
                      }
                    >
                      {item.name}
                    </NavLink>
                  ))}
                </div>
              </div>
            </div>

            {/* Center - Search */}
            <div className='flex flex-1 justify-center px-2 lg:ml-6 lg:justify-end'>
              <div className='grid w-full max-w-lg grid-cols-1 lg:max-w-xs'>
                <input
                  name='search'
                  type='search'
                  placeholder='Search'
                  aria-label='Search'
                  className='col-start-1 row-start-1 block w-full rounded-md bg-gray-100 py-1.5 pr-3 pl-10 text-base text-text-light outline-none placeholder:text-secondary-light focus:bg-background-light focus:text-text-light focus:placeholder:text-secondary-light dark:bg-gray-700 dark:text-text-dark dark:placeholder-secondary-dark dark:focus:bg-gray-600 sm:text-sm/6'
                />
                <MagnifyingGlassIcon
                  aria-hidden='true'
                  className='pointer-events-none col-start-1 row-start-1 ml-3 size-5 self-center text-secondary-light dark:text-secondary-dark'
                />
              </div>
            </div>

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
                  <Menu as='div' className='relative shrink-0'>
                    <div>
                      <MenuButton className='p-2 relative flex rounded-lg text-sm focus:outline-none text-background-light hover:text-primary-light hover:bg-background-light dark:text-background-light dark:hover:bg-secondary-light'>
                        <span className='sr-only'>Open user menu</span>
                        <UserIcon className='block size-6' />
                      </MenuButton>
                    </div>
                    <MenuItems
                      transition
                      className='absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-primary-light py-1 shadow-lg ring-1 ring-black/5 dark:bg-background-dark'
                    >
                      <MenuItem>
                        <Link
                          to={ROUTES.PROFILE_INFO}
                          className='block px-4 py-2 text-sm hover:bg-background-light hover:text-primary-light dark:hover:bg-secondary-light text-background-light dark:text-primary-dark'
                        >
                          Your Profile
                        </Link>
                      </MenuItem>
                      <MenuItem>
                        <button
                          onClick={logout}
                          className='block w-full text-left px-4 py-2 text-sm hover:bg-background-light hover:text-primary-light dark:hover:bg-secondary-light text-background-light dark:text-primary-dark'
                        >
                          Sign Out
                        </button>
                      </MenuItem>
                    </MenuItems>
                  </Menu>
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
        <DisclosurePanel className='lg:hidden'>
          <div className='space-y-1 px-2 pt-2 pb-3'>
            {navigation.map((item) => (
              <DisclosureButton
                key={item.name}
                as={NavLink}
                to={item.href}
                className={({ isActive }: { isActive: boolean }) =>
                  `block w-full rounded-md px-3 py-2 text-base font-medium ${
                    isActive
                      ? 'bg-background-light text-primary-light dark:bg-primary-dark/10 dark:text-primary-dark'
                      : 'text-background-light hover:bg-gray-100 hover:text-primary-light dark:text-primary-dark dark:hover:bg-gray-700 dark:hover:text-primary-dark'
                  }`
                }
              >
                {item.name}
              </DisclosureButton>
            ))}
          </div>
          <div className='flex items-end justify-between border-t border-gray-200 pt-4 pb-3 dark:border-gray-700'>
            {isAuthenticated ? (
              <div className='grow'>
                <div className='items-center px-5'>
                  <div className='ml-3'>
                    <div className='text-base font-medium text-background-light dark:text-text-dark'>
                      {user?.full_name}
                    </div>
                    <div className='text-sm font-medium text-background-light/80 dark:text-secondary-dark'>
                      {user?.email}
                    </div>
                  </div>
                </div>
                <div className='grow mt-3 space-y-1 px-2'>
                  <DisclosureButton
                    as={Link}
                    to={ROUTES.PROFILE_INFO}
                    className='block w-full rounded-md px-3 py-2 text-base font-medium text-background-light hover:bg-gray-100 hover:text-primary-light dark:text-secondary-dark dark:hover:bg-gray-700 dark:hover:text-primary-dark'
                  >
                    Your Profile
                  </DisclosureButton>
                  <DisclosureButton
                    as='button'
                    onClick={logout}
                    className='block w-full rounded-md px-3 py-2 text-base font-medium text-background-light hover:bg-gray-100 hover:text-primary-light dark:text-secondary-dark dark:hover:bg-gray-700 dark:hover:text-primary-dark'
                  >
                    Sign Out
                  </DisclosureButton>
                </div>
              </div>
            ) : (
              <div className='grow space-y-1 px-2'>
                <DisclosureButton
                  as={Link}
                  to={ROUTES.AUTH + ROUTES.SIGNIN}
                  className='block w-full rounded-md px-3 py-2 text-base font-medium text-background-light hover:bg-gray-100 hover:text-primary-light dark:text-secondary-dark dark:hover:bg-gray-700 dark:hover:text-primary-dark'
                >
                  Login
                </DisclosureButton>
              </div>
            )}
            <ThemeToggle />
          </div>
        </DisclosurePanel>
      </>
    </Disclosure>
  );
};
