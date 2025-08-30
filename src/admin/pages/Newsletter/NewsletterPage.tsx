import { TrashIcon } from '@heroicons/react/24/outline';
import { useNewsletterSubscribers, usePagination, useUnsubscribeNewsletter } from '../../../hooks';
import { EmptyState, ErrorState, LoadingState, Pagination } from '../../../components';

export default function NewsletterPage() {
  const { data, isLoading, isError, error } = useNewsletterSubscribers();
  const { page, goToNextPage, goToPrevPage } = usePagination();

  const totalPages = data?.totalPages || 1;

  const deleteSubscriber = useUnsubscribeNewsletter();

  const handleDelete = (email: string) => {
    deleteSubscriber.mutate(email);
  };

  return (
    <div className='bg-background-light dark:bg-background-dark pt-10'>
      <h2 className='text-2xl font-bold text-primary-light dark:text-text-dark mb-6'>
        Newsletter Subscribers
      </h2>

      {isLoading ? (
        <LoadingState message='Loading subscribers...' />
      ) : isError ? (
        <ErrorState description={error && (error as Error).message} />
      ) : data?.subscribers?.length === 0 ? (
        <EmptyState
          title='No subscribers available'
          description="We couldn't find any newsletter subscribers"
        />
      ) : (
        <div className='overflow-x-auto'>
          <table className='w-full'>
            <thead>
              <tr className='text-left text-sm border-b border-gray-300 dark:border-gray-700'>
                <th className='pl-3 pb-3 text-secondary-light dark:text-text-dark font-semibold'>
                  Email
                </th>
                <th className='pr-4 pb-3 text-secondary-light dark:text-text-dark font-semibold'>
                  Subscribed at
                </th>
              </tr>
            </thead>
            <tbody>
              {data?.subscribers.map((subscriber) => (
                <tr
                  key={subscriber.subscriber_id}
                  className='border-b border-gray-300 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors'
                >
                  <td className='pl-3 py-4 text-secondary-light dark:text-text-dark'>
                    {subscriber.email}
                  </td>
                  <td className='py-4 text-secondary-light dark:text-text-dark'>
                    {subscriber.subscribed_at}
                  </td>
                  <td className='pr-4 py-4 text-right'>
                    <button
                      onClick={() => handleDelete(subscriber.email)}
                      className='p-2 rounded-md text-accent-light dark:text-accent-dark hover:bg-accent-light/10 dark:hover:bg-accent-dark/10 transition-colors'
                      title='Delete'
                    >
                      <TrashIcon className='w-5 h-5' />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {totalPages > 1 && (
            <Pagination
              page={page}
              totalPages={totalPages}
              goToPrevPage={goToPrevPage}
              goToNextPage={goToNextPage}
            />
          )}
        </div>
      )}
    </div>
  );
}
