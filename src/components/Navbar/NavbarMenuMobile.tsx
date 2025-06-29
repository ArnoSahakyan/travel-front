import { DisclosurePanel, DisclosureButton } from '@headlessui/react';
import { NavLink, Link } from 'react-router-dom';
import { NavItem, ROUTES } from '../../shared';
import { useAuthStore } from '../../store';
import { ThemeToggle } from '../ThemeToggle';

interface NavbarMobileMenuProps {
  navigation: NavItem[];
}

export const NavbarMobileMenu = ({ navigation }: NavbarMobileMenuProps) => {
  const { isAuthenticated, user, logout } = useAuthStore();

  return (
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
  );
};
