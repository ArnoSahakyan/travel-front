import { ROUTES } from '../../shared';

const navigation = [
  { name: 'About', href: ROUTES.ABOUT },
  { name: 'Tours', href: ROUTES.TOURS },
  { name: 'Contact', href: ROUTES.CONTACT },
  { name: 'FAQ', href: ROUTES.FAQ },
  { name: 'Terms and Conditions', href: ROUTES.LEGAL },
];

export const Footer = () => {
  return (
    <footer className='bg-primary-light dark:bg-background-dark border-t border-background-light dark:border-secondary-dark'>
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
              className='text-background-light hover:text-text-light dark:text-secondary-dark dark:hover:text-primary-dark transition-colors'
            >
              {item.name}
            </a>
          ))}
        </nav>

        {/* Copyright */}
        <p className='mt-10 text-center text-sm/6 text-background-light dark:text-secondary-dark'>
          &copy; {new Date().getFullYear()} Travel Agency. All rights reserved.
        </p>
      </div>
    </footer>
  );
};
