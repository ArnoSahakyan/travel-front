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
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import { NavLink } from 'react-router-dom';
import { ThemeToggle } from '../ThemeToggle';
import { ROUTES } from '../../shared';

type NavItem = {
  name: string;
  href: string;
};

type UserNavigationItem = {
  name: string;
  href: string;
};

export const Navbar = () => {
  const navigation: NavItem[] = [
    { name: 'Home', href: ROUTES.HOME },
    { name: 'Tours', href: ROUTES.TOURS },
    { name: 'Contact', href: ROUTES.CONTACT },
    { name: 'About', href: ROUTES.ABOUT },
  ];

  const userNavigation: UserNavigationItem[] = [
    { name: 'Your Profile', href: '#' },
    { name: 'Sign out', href: '#' },
  ];

  return (
    <Disclosure
      as='nav'
      className='bg-background-light dark:bg-background-dark shadow-sm border-b border-gray-200 dark:border-gray-700'
    >
      <div className='mx-auto max-w-7xl px-2 sm:px-4 lg:px-8'>
        <div className='relative flex h-16 items-center justify-between'>
          {/* Left side - Logo and navigation */}
          <div className='flex items-center px-2 lg:px-0'>
            <div className='shrink-0'>
              <div className='h-8 w-8 rounded-md bg-primary-light dark:bg-primary-dark flex items-center justify-center'>
                <span className='text-white font-bold text-sm'>TA</span>
              </div>
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
                          ? 'bg-primary-light/10 text-primary-light dark:bg-primary-dark/10 dark:text-primary-dark'
                          : 'text-text-light hover:bg-gray-100 hover:text-primary-light dark:text-text-dark dark:hover:bg-gray-700 dark:hover:text-primary-dark'
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
                className='col-start-1 row-start-1 block w-full rounded-md bg-gray-100 py-1.5 pr-3 pl-10 text-base text-text-light outline-none placeholder:text-secondary-light focus:bg-white focus:text-text-light focus:placeholder:text-secondary-light dark:bg-gray-700 dark:text-text-dark dark:placeholder-secondary-dark dark:focus:bg-gray-600 sm:text-sm/6'
              />
              <MagnifyingGlassIcon
                aria-hidden='true'
                className='pointer-events-none col-start-1 row-start-1 ml-3 size-5 self-center text-secondary-light dark:text-secondary-dark'
              />
            </div>
          </div>

          {/* Right side - Mobile menu button and user profile */}
          <div className='flex lg:hidden'>
            <DisclosureButton className='group relative inline-flex items-center justify-center rounded-md p-2 text-secondary-light hover:bg-gray-100 hover:text-primary-light focus:outline-none dark:text-secondary-dark dark:hover:bg-gray-700 dark:hover:text-primary-dark'>
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
              <Menu as='div' className='relative shrink-0'>
                <div>
                  <MenuButton className='relative flex rounded-full bg-white text-sm focus:outline-none dark:bg-gray-800'>
                    <span className='absolute -inset-1.5' />
                    <span className='sr-only'>Open user menu</span>
                    <img
                      alt=''
                      src='https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
                      className='size-8 rounded-full'
                    />
                  </MenuButton>
                </div>
                <MenuItems
                  transition
                  className='absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black/5 transition focus:outline-none data-closed:scale-95 data-closed:transform data-closed:opacity-0 data-enter:duration-100 data-enter:ease-out data-leave:duration-75 data-leave:ease-in dark:bg-gray-700'
                >
                  {userNavigation.map((item) => (
                    <MenuItem key={item.name}>
                      <a
                        href={item.href}
                        className='block px-4 py-2 text-sm text-text-light data-focus:bg-gray-100 data-focus:outline-none dark:text-text-dark dark:data-focus:bg-gray-600'
                      >
                        {item.name}
                      </a>
                    </MenuItem>
                  ))}
                </MenuItems>
              </Menu>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <DisclosurePanel className='lg:hidden'>
        <div className='space-y-1 px-2 pt-2 pb-3'>
          {navigation.map((item) => (
            <NavLink
              key={item.name}
              to={item.href}
              className={({ isActive }) =>
                `rounded-md px-3 py-2 text-sm font-medium ${
                  isActive
                    ? 'bg-primary-light/10 text-primary-light dark:bg-primary-dark/10 dark:text-primary-dark'
                    : 'text-text-light hover:bg-gray-100 hover:text-primary-light dark:text-text-dark dark:hover:bg-gray-700 dark:hover:text-primary-dark'
                }`
              }
            >
              {item.name}
            </NavLink>
          ))}
        </div>
        <div className='border-t border-gray-200 pt-4 pb-3 dark:border-gray-700'>
          <div className='flex items-center px-5'>
            <div className='shrink-0'>
              <img
                alt=''
                src='https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
                className='size-10 rounded-full'
              />
            </div>
            <div className='ml-3'>
              <div className='text-base font-medium text-text-light dark:text-text-dark'>
                Tom Cook
              </div>
              <div className='text-sm font-medium text-secondary-light dark:text-secondary-dark'>
                tom@example.com
              </div>
            </div>
            <div className='ml-auto'>
              <ThemeToggle />
            </div>
          </div>
          <div className='mt-3 space-y-1 px-2'>
            {userNavigation.map((item) => (
              <DisclosureButton
                key={item.name}
                as='a'
                href={item.href}
                className='block rounded-md px-3 py-2 text-base font-medium text-secondary-light hover:bg-gray-100 hover:text-primary-light dark:text-secondary-dark dark:hover:bg-gray-700 dark:hover:text-primary-dark'
              >
                {item.name}
              </DisclosureButton>
            ))}
          </div>
        </div>
      </DisclosurePanel>
    </Disclosure>
  );
};
