import { NavLink, Link } from 'react-router-dom';
import {
  UserCircleIcon,
  HeartIcon,
  TicketIcon,
  ArrowLeftStartOnRectangleIcon,
} from '@heroicons/react/24/outline';
import { ThemeToggle } from '../../../components';
import { ROUTES } from '../../../shared';

const navigation = [
  { name: 'Account Info', href: ROUTES.PROFILE_INFO, icon: UserCircleIcon },
  { name: 'My Bookings', href: ROUTES.PROFILE_BOOKINGS, icon: TicketIcon },
  { name: 'Favorites', href: ROUTES.PROFILE_FAVORITES, icon: HeartIcon },
];

const classNames = (...classes: string[]) => classes.filter(Boolean).join(' ');

export const SidebarContent = ({
  onLinkClick,
  logout,
}: {
  onLinkClick?: () => void;
  logout: () => void;
}) => (
  <div className='flex grow flex-col gap-y-5 overflow-y-auto bg-primary-light dark:bg-background-dark px-6 pb-2'>
    <div className='flex justify-between h-16 shrink-0 items-center'>
      <Link
        to={ROUTES.HOME}
        onClick={onLinkClick}
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
                  onClick={onLinkClick}
                  className={({ isActive }) =>
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
            onClick={logout}
            className='w-full flex items-center gap-x-4 px-6 py-3 text-sm/6 font-semibold text-background-light dark:text-text-dark hover:bg-primary-dark/20 dark:hover:bg-primary-dark/5'
          >
            <div className='flex items-center justify-center size-8 rounded-full bg-primary-light/10 dark:bg-primary-dark/10 text-background-light dark:text-text-dark'>
              <ArrowLeftStartOnRectangleIcon className='size-6' />
            </div>
            <span aria-hidden='true'>Sign Out</span>
          </button>
        </li>
      </ul>
    </nav>
  </div>
);
