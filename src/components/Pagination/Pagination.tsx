import { FC } from 'react';

interface PaginationProps {
  page: number;
  totalPages: number;
  goToPrevPage: () => void;
  goToNextPage: (totalPages: number) => void;
}

export const Pagination: FC<PaginationProps> = ({
  page,
  totalPages,
  goToPrevPage,
  goToNextPage,
}) => {
  return (
    <div className='flex justify-center items-center gap-4 mt-10'>
      <button
        onClick={goToPrevPage}
        disabled={page === 1}
        className='px-4 py-2 bg-primary-light text-white rounded-md disabled:opacity-50'
      >
        Previous
      </button>
      <span className='text-secondary-light dark:text-secondary-dark'>
        Page {page} of {totalPages}
      </span>
      <button
        onClick={() => goToNextPage(totalPages)}
        disabled={page === totalPages}
        className='px-4 py-2 bg-primary-light text-white rounded-md disabled:opacity-50'
      >
        Next
      </button>
    </div>
  );
};
