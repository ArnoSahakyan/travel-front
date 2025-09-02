import { useState } from 'react';
import { Dialog, DialogBackdrop, DialogPanel } from '@headlessui/react';
import { Bars3Icon, UserCircleIcon, HeartIcon, TicketIcon } from '@heroicons/react/24/outline';
import { Outlet } from 'react-router-dom';
import { useAuthStore } from '../../store';
import { SidebarContent } from './components';
import { ROUTES } from '../../shared';

const navigation = [
  { name: 'Account Info', href: ROUTES.PROFILE_INFO, icon: UserCircleIcon },
  { name: 'My Bookings', href: ROUTES.PROFILE_BOOKINGS, icon: TicketIcon },
  { name: 'Favorites', href: ROUTES.PROFILE_FAVORITES, icon: HeartIcon },
];

const ProfileLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { logout } = useAuthStore();

  return (
    <div className='min-h-full'>
      {/* Mobile sidebar */}
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
            <SidebarContent
              navigation={navigation}
              logout={logout}
              onLinkClick={() => setSidebarOpen(false)}
            />
          </DialogPanel>
        </div>
      </Dialog>

      {/* Desktop sidebar */}
      <div className='hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-72 lg:flex-col'>
        <SidebarContent navigation={navigation} logout={logout} />
      </div>

      {/* Mobile top bar */}
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
          <Bars3Icon className='size-6' />
        </button>
      </div>

      {/* Main content */}
      <main className='py-10 lg:pl-72 bg-background-light dark:bg-background-dark min-h-screen'>
        <div className='px-4 sm:px-6 lg:px-8'>
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default ProfileLayout;
