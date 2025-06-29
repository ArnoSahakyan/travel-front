import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react';
import { UserIcon } from '@heroicons/react/24/outline';
import { Link } from 'react-router-dom';
import { ROUTES } from '../../shared';
import { useAuthStore } from '../../store';

export const UserProfileDropdown = () => {
  const { logout } = useAuthStore();

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
  );
};
