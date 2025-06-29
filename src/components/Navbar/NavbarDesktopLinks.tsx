import { NavLink } from 'react-router-dom';
import { NavItem } from '../../shared';

interface NavbarDesktopLinksProps {
  items: NavItem[];
}

export const NavbarDesktopLinks = ({ items }: NavbarDesktopLinksProps) => {
  return (
    <div className='hidden lg:ml-6 lg:block'>
      <div className='flex space-x-4'>
        {items.map((item) => (
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
  );
};
