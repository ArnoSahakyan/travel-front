import { FC, ReactNode } from 'react';
import { ExclamationTriangleIcon } from '@heroicons/react/24/outline';

interface ErrorStateProps {
  title?: string;
  description?: string;
  action?: ReactNode;
  fullPage?: boolean;
}

export const ErrorState: FC<ErrorStateProps> = ({
  title = 'Something went wrong',
  description = 'We encountered an error while loading the content.',
  action,
  fullPage = false,
}) => {
  return (
    <div
      className={`flex flex-col items-center justify-center text-center ${fullPage ? 'py-12 min-h-screen' : 'py-8'}`}
    >
      <ExclamationTriangleIcon className='h-16 w-16 text-red-500 dark:text-red-400 mb-4' />
      <h3 className='text-xl font-semibold text-primary-light dark:text-primary-dark mb-2'>
        {title}
      </h3>
      <p className='text-secondary-light dark:text-secondary-dark max-w-md mb-6'>{description}</p>
      {action && action}
    </div>
  );
};
