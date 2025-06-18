import { FC } from 'react';

interface LoadingStateProps {
  message?: string;
  fullPage?: boolean;
}

export const LoadingState: FC<LoadingStateProps> = ({
  message = 'Loading...',
  fullPage = false,
}) => {
  return (
    <div
      className={`flex flex-col items-center justify-center ${fullPage ? 'py-12 min-h-screen' : 'py-8'}`}
    >
      <div className='relative h-12 w-12 mb-4'>
        <div className='absolute inset-0 rounded-full border-4 border-primary-light/30 dark:border-primary-dark/30'></div>
        <div className='absolute inset-0 rounded-full border-4 border-t-primary-light dark:border-t-primary-dark border-transparent animate-spin'></div>
      </div>
      <p className='text-lg text-secondary-light dark:text-secondary-dark'>{message}</p>
    </div>
  );
};
