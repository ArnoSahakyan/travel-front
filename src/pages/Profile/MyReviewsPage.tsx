import { useState } from 'react';
import { useUserReviews, useDeleteReview } from '../../hooks';
import { Loader, Pagination, ConfirmModal, EmptyState } from '../../components';
import { format } from 'date-fns';
import { StarIcon, TrashIcon } from '@heroicons/react/24/outline';
import { StarIcon as StarIconSolid } from '@heroicons/react/24/solid';
import { usePagination } from '../../hooks';
import { toast } from 'react-toastify';

const MyReviewsPage = () => {
  const { page, goToNextPage, goToPrevPage } = usePagination();
  const { data, isLoading, isError, refetch } = useUserReviews({ page, limit: 5 });
  const [deleteId, setDeleteId] = useState<number | null>(null);

  const deleteMutation = useDeleteReview();

  const handleDelete = (review_id: number) => {
    setDeleteId(review_id);
  };

  const confirmDelete = async () => {
    if (!deleteId) return;

    try {
      await deleteMutation.mutateAsync(deleteId);
      toast.success('Review deleted successfully');
      refetch();
    } catch (err: any) {
      toast.error('Failed to delete review');
    } finally {
      setDeleteId(null);
    }
  };

  if (isLoading) return <Loader />;
  if (isError) return <div className='text-center py-12 text-red-500'>Failed to load reviews.</div>;

  const reviews = data?.reviews || [];
  const totalPages = data?.totalPages || 1;

  return (
    <div className='max-w-4xl mx-auto'>
      <div className='mb-8'>
        <h1 className='text-3xl font-bold text-primary-light dark:text-text-dark'>My Reviews</h1>
        <p className='mt-2 text-secondary-light dark:text-secondary-dark'>
          Here are all the reviews and ratings you've shared with the WanderLuxe community.
        </p>
      </div>

      {reviews.length === 0 ? (
        <EmptyState
          title='No reviews yet'
          description="You haven't left any reviews for your tours yet. Share your experience after your next trip!"
        />
      ) : (
        <div className='space-y-6'>
          {reviews.map((review: any) => (
            <div
              key={review.review_id}
              className='bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-100 dark:border-gray-700 transition-all hover:shadow-md'
            >
              <div className='flex justify-between items-start mb-4'>
                <div>
                  <h3 className='font-bold text-lg text-primary-light dark:text-text-dark'>
                    {review.tour_name}
                  </h3>
                  <p className='text-xs text-secondary-light dark:text-secondary-dark'>
                    Reviewed on{' '}
                    {format(new Date(review.createdAt || review.created_at), 'MMMM dd, yyyy')}
                  </p>
                </div>
                <div className='flex items-center gap-1'>
                  {[...Array(5)].map((_, i) =>
                    i < review.rating ? (
                      <StarIconSolid key={i} className='w-5 h-5 text-yellow-500' />
                    ) : (
                      <StarIcon key={i} className='w-5 h-5 text-gray-300 dark:text-gray-600' />
                    ),
                  )}
                </div>
              </div>

              <div className='relative'>
                <p className='text-secondary-light dark:text-secondary-dark italic leading-relaxed'>
                  "{review.comment || 'No written comment'}"
                </p>
              </div>

              <div className='mt-6 pt-4 border-t border-gray-50 dark:border-gray-700 flex justify-end'>
                <button
                  onClick={() => handleDelete(review.review_id)}
                  className='flex items-center gap-2 text-sm font-medium text-red-600 hover:text-red-700 transition-colors'
                >
                  <TrashIcon className='w-4 h-4' />
                  Delete Review
                </button>
              </div>
            </div>
          ))}

          {totalPages > 1 && (
            <div className='mt-8 flex justify-center'>
              <Pagination
                page={page}
                totalPages={totalPages}
                goToPrevPage={goToPrevPage}
                goToNextPage={goToNextPage}
              />
            </div>
          )}
        </div>
      )}

      <ConfirmModal
        isOpen={!!deleteId}
        onClose={() => setDeleteId(null)}
        onConfirm={confirmDelete}
        title='Delete Review'
        message='Are you sure you want to delete this review? This action cannot be undone.'
        confirmText='Delete'
        isLoading={deleteMutation.isPending}
      />
    </div>
  );
};

export default MyReviewsPage;
