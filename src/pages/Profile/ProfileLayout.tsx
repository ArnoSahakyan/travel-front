import { useState } from 'react';
import { Link, NavLink, Outlet } from 'react-router-dom';
import { Dialog, DialogBackdrop, DialogPanel, TransitionChild } from '@headlessui/react';
import {
  Bars3Icon,
  XMarkIcon,
  UserCircleIcon,
  HeartIcon,
  TicketIcon,
  ArrowLeftStartOnRectangleIcon,
} from '@heroicons/react/24/outline';
import { ROUTES } from '../../shared';
import { ThemeToggle } from '../../components';
import { useAuthStore } from '../../store';

const navigation = [
  { name: 'Account Info', href: ROUTES.PROFILE_INFO, icon: UserCircleIcon },
  { name: 'My Bookings', href: ROUTES.PROFILE_BOOKINGS, icon: TicketIcon },
  { name: 'Favorites', href: ROUTES.PROFILE_FAVORITES, icon: HeartIcon },
];

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ');
}

const ProfileLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { logout } = useAuthStore();

  return (
    <>
      <div className='min-h-full'>
        <Dialog open={sidebarOpen} onClose={setSidebarOpen} className='relative z-50 lg:hidden'>
          <DialogBackdrop
            transition
            className='fixed inset-0 bg-gray-900/80 transition-opacity duration-300 ease-linear data-[closed]:opacity-0'
          />

          <div className='fixed inset-0 flex'>
            <DialogPanel
              transition
              className='relative mr-16 flex w-full max-w-xs flex-1 transform transition duration-300 ease-in-out data-[closed]:-translate-x-full'
            >
              <TransitionChild>
                <div className='absolute left-full top-0 flex w-16 justify-center pt-5 duration-300 ease-in-out data-[closed]:opacity-0'>
                  <button
                    type='button'
                    onClick={() => setSidebarOpen(false)}
                    className='-m-2.5 p-2.5'
                  >
                    <span className='sr-only'>Close sidebar</span>
                    <XMarkIcon aria-hidden='true' className='size-6 text-white' />
                  </button>
                </div>
              </TransitionChild>
              <div className='flex grow flex-col gap-y-5 overflow-y-auto bg-primary-light dark:bg-background-dark px-6 pb-2'>
                <div className='flex justify-between h-16 shrink-0 items-center'>
                  <Link
                    to={ROUTES.HOME}
                    className='text-2xl font-bold text-background-light dark:text-text-dark'
                  >
                    WanderLuxe
                  </Link>
                  <ThemeToggle />
                </div>
                <nav className='flex flex-1 flex-col'>
                  <ul role='list' className='flex flex-1 flex-col gap-y-7'>
                    <li>
                      <ul role='list' className='-mx-2 space-y-1'>
                        {navigation.map((item) => (
                          <li key={item.name}>
                            <NavLink
                              to={item.href}
                              className={({ isActive }: { isActive: boolean }) =>
                                classNames(
                                  isActive
                                    ? 'bg-primary-dark/20 text-white'
                                    : 'text-background-light/80 dark:text-text-dark/80 hover:bg-primary-dark/10 hover:text-white',
                                  'group flex gap-x-3 rounded-md p-2 text-sm/6 font-semibold',
                                )
                              }
                            >
                              <item.icon aria-hidden='true' className='size-6 shrink-0' />
                              {item.name}
                            </NavLink>
                          </li>
                        ))}
                      </ul>
                    </li>
                    <li className='-mx-6 mt-auto'>
                      <button
                        className='w-full flex items-center gap-x-4 px-6 py-3 text-sm/6 font-semibold text-background-light dark:text-text-dark hover:bg-primary-dark/20 dark:hover:bg-primary-dark/5'
                        onClick={logout}
                      >
                        <div className='flex items-center justify-center size-8 rounded-full bg-primary-light/10 dark:bg-primary-dark/10 text-background-light dark:text-text-dark'>
                          <ArrowLeftStartOnRectangleIcon className='size-6' />
                        </div>
                        <span className='sr-only'>Your profile</span>
                        <span aria-hidden='true'>Sign Out</span>
                      </button>
                    </li>
                  </ul>
                </nav>
              </div>
            </DialogPanel>
          </div>
        </Dialog>

        {/* Static sidebar for desktop */}
        <div className='hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-72 lg:flex-col'>
          <div className='flex grow flex-col gap-y-5 overflow-y-auto border-r border-primary-light/20 dark:border-text-dark/50 bg-primary-light dark:bg-background-dark px-6'>
            <div className='flex justify-between h-16 shrink-0 items-center'>
              <Link
                to={ROUTES.HOME}
                className='text-2xl font-bold text-background-light dark:text-text-dark'
              >
                WanderLuxe
              </Link>
              <ThemeToggle />
            </div>
            <nav className='flex flex-1 flex-col'>
              <ul role='list' className='flex flex-1 flex-col gap-y-7'>
                <li>
                  <ul role='list' className='-mx-2 space-y-1'>
                    {navigation.map((item) => (
                      <li key={item.name}>
                        <NavLink
                          to={item.href}
                          className={({ isActive }: { isActive: boolean }) =>
                            classNames(
                              isActive
                                ? 'bg-primary-dark/20 text-white'
                                : 'text-background-light/80 dark:text-text-dark/80 hover:bg-primary-dark/10 hover:text-white',
                              'group flex gap-x-3 rounded-md p-2 text-sm/6 font-semibold',
                            )
                          }
                        >
                          <item.icon aria-hidden='true' className='size-6 shrink-0' />
                          {item.name}
                        </NavLink>
                      </li>
                    ))}
                  </ul>
                </li>
                <li className='-mx-6 mt-auto'>
                  <button className='w-full flex items-center gap-x-4 px-6 py-3 text-sm/6 font-semibold text-background-light dark:text-text-dark hover:bg-primary-dark/20 dark:hover:bg-primary-dark/5'>
                    <div className='flex items-center justify-center size-8 rounded-full bg-primary-light/10 dark:bg-primary-dark/10 text-background-light dark:text-text-dark'>
                      <ArrowLeftStartOnRectangleIcon className='size-6' />
                    </div>
                    <span className='sr-only'>Your profile</span>
                    <span onClick={logout} aria-hidden='true'>
                      Sign Out
                    </span>
                  </button>
                </li>
              </ul>
            </nav>
          </div>
        </div>

        {/* Mobile header */}
        <div className='sticky top-0 z-40 flex justify-between items-center gap-x-6 bg-primary-light dark:bg-background-dark dark:border-b dark:border-text-dark px-4 py-4 shadow-sm sm:px-6 lg:hidden'>
          <div className='text-sm/6 font-semibold text-background-light dark:text-text-dark'>
            My Profile
          </div>
          <button
            type='button'
            onClick={() => setSidebarOpen(true)}
            className='-m-2.5 p-2.5 text-background-light/80 dark:text-text-dark/80 lg:hidden'
          >
            <span className='sr-only'>Open sidebar</span>
            <Bars3Icon aria-hidden='true' className='size-6' />
          </button>
        </div>

        {/* Main content area */}
        <main className='py-10 lg:pl-72 bg-background-light dark:bg-background-dark min-h-screen'>
          <div className='px-4 sm:px-6 lg:px-8'>
            <Outlet />
          </div>
        </main>
      </div>
    </>
  );
};

export default ProfileLayout;
