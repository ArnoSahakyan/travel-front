import { ROUTES } from '../../shared';

const navigation = [
  { name: 'About', href: ROUTES.ABOUT },
  { name: 'Tours', href: ROUTES.TOURS },
  { name: 'Contact', href: ROUTES.CONTACT },
];

export const Footer = () => {
  return (
    <footer className='bg-background-light dark:bg-background-dark border-t border-gray-200 dark:border-gray-700 mt-20'>
      <div className='mx-auto max-w-7xl overflow-hidden px-6 py-12 sm:py-16 lg:px-8'>
        {/* Navigation Links */}
        <nav
          aria-label='Footer'
          className='-mb-6 flex flex-wrap justify-center gap-x-8 gap-y-4 text-sm/6'
        >
          {navigation.map((item) => (
            <a
              key={item.name}
              href={item.href}
              className='text-secondary-light hover:text-primary-light dark:text-secondary-dark dark:hover:text-primary-dark transition-colors'
            >
              {item.name}
            </a>
          ))}
        </nav>

        {/* Copyright */}
        <p className='mt-10 text-center text-sm/6 text-secondary-light dark:text-secondary-dark'>
          &copy; {new Date().getFullYear()} Travel Agency. All rights reserved.
        </p>
      </div>
    </footer>
  );
};
