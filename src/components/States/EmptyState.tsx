import { FC, ReactNode } from 'react';
import { DocumentMagnifyingGlassIcon } from '@heroicons/react/24/outline';

interface EmptyStateProps {
  title?: string;
  description?: string;
  action?: ReactNode;
}

export const EmptyState: FC<EmptyStateProps> = ({
  title = 'No items found',
  description = 'There are currently no items to display.',
  action,
}) => {
  return (
    <div className='flex flex-col items-center justify-center py-12 text-center'>
      <DocumentMagnifyingGlassIcon className='h-16 w-16 text-secondary-light dark:text-secondary-dark mb-4' />
      <h3 className='text-xl font-semibold text-primary-light dark:text-primary-dark mb-2'>
        {title}
      </h3>
      <p className='text-secondary-light dark:text-secondary-dark max-w-md mb-6'>{description}</p>
      {action && action}
    </div>
  );
};
