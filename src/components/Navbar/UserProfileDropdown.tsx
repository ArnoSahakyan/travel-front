import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react';
import { UserIcon, Squares2X2Icon, ShieldCheckIcon } from '@heroicons/react/24/outline';
import { Link } from 'react-router-dom';
import { ROUTES } from '../../shared';
import { useAuthStore } from '../../store';

export const UserProfileDropdown = () => {
  const { logout, user } = useAuthStore();
  const isAdmin = user?.role === 'admin';

  return (
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
            to={ROUTES.PROFILE}
            className='flex items-center gap-2 px-4 py-2 text-sm hover:bg-background-light hover:text-primary-light dark:hover:bg-secondary-light text-background-light dark:text-primary-dark'
          >
            <Squares2X2Icon className='size-4' />
            Dashboard
          </Link>
        </MenuItem>
        <MenuItem>
          <Link
            to={ROUTES.PROFILE_INFO}
            className='flex items-center gap-2 px-4 py-2 text-sm hover:bg-background-light hover:text-primary-light dark:hover:bg-secondary-light text-background-light dark:text-primary-dark'
          >
            <UserIcon className='size-4' />
            Account Settings
          </Link>
        </MenuItem>
        {isAdmin && (
          <MenuItem>
            <Link
              to={ROUTES.ADMIN_DASHBOARD}
              className='flex items-center gap-2 px-4 py-2 text-sm hover:bg-background-light hover:text-primary-light dark:hover:bg-secondary-light font-bold text-accent-light dark:text-accent-dark'
            >
              <ShieldCheckIcon className='size-4' />
              Admin Panel
            </Link>
          </MenuItem>
        )}
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
  );
};
