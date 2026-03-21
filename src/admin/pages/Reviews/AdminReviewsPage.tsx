import { useState, useEffect } from 'react';
import { fetchAllReviews, deleteReview } from '../../../api';
import { Loader, Pagination, ConfirmModal } from '../../../components';
import { format } from 'date-fns';
import { toast } from 'react-toastify';
import { StarIcon, TrashIcon } from '@heroicons/react/24/outline';
import { StarIcon as StarIconSolid } from '@heroicons/react/24/solid';

interface AdminReview {
  review_id: number;
  user_id: number;
  tour_id: number;
  rating: number;
  comment: string;
  createdAt?: string;
  created_at?: string;
  full_name?: string;
  tour_name?: string;
}

const AdminReviewsPage = () => {
  const [reviews, setReviews] = useState<AdminReview[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [deleteReviewId, setDeleteReviewId] = useState<number | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const loadReviews = async (currentPage = 1) => {
    try {
      setLoading(true);
      const res = await fetchAllReviews({ page: currentPage, limit: 10 });
      setReviews(res.reviews);
      setTotalPages(res.totalPages);
    } catch (err: any) {
      toast.error('Failed to load reviews');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadReviews(page);
  }, [page]);

  const handleDeleteReview = async (id: number) => {
    setDeleteReviewId(id);
  };

  const confirmDeleteReview = async () => {
    if (!deleteReviewId) return;
    setIsDeleting(true);
    try {
      await deleteReview(deleteReviewId);
      toast.success('Review deleted successfully');
      loadReviews(page);
    } catch (err: any) {
      toast.error('Failed to delete review');
    } finally {
      setIsDeleting(false);
      setDeleteReviewId(null);
    }
  };

  if (loading && reviews.length === 0) return <Loader />;

  return (
    <div className='py-8'>
      <div className='sm:flex sm:items-center'>
        <div className='sm:flex-auto'>
          <h1 className='text-3xl font-semibold leading-6 text-primary-light dark:text-text-dark'>
            Reviews Moderation
          </h1>
          <p className='mt-2 text-sm text-secondary-light dark:text-secondary-dark'>
            Monitor customer feedback across all tours and remove inappropriate reviews.
          </p>
        </div>
      </div>

      <div className='mt-8 flex flex-col'>
        <div className='-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8'>
          <div className='inline-block min-w-full py-2 align-middle md:px-6 lg:px-8'>
            <div className='overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg'>
              <table className='min-w-full divide-y divide-gray-300 dark:divide-gray-700'>
                <thead className='bg-gray-50 dark:bg-gray-800'>
                  <tr>
                    <th
                      scope='col'
                      className='py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-primary-light dark:text-text-dark sm:pl-6'
                    >
                      Reviewer
                    </th>
                    <th
                      scope='col'
                      className='px-3 py-3.5 text-left text-sm font-semibold text-primary-light dark:text-text-dark'
                    >
                      Tour
                    </th>
                    <th
                      scope='col'
                      className='px-3 py-3.5 text-left text-sm font-semibold text-primary-light dark:text-text-dark'
                    >
                      Rating & Comment
                    </th>
                    <th scope='col' className='relative py-3.5 pl-3 pr-4 sm:pr-6'>
                      <span className='sr-only'>Actions</span>
                    </th>
                  </tr>
                </thead>
                <tbody className='divide-y divide-gray-200 dark:divide-gray-700 bg-background-light dark:bg-background-dark'>
                  {reviews.map((review) => (
                    <tr key={review.review_id}>
                      <td className='whitespace-nowrap py-4 pl-4 pr-3 text-sm sm:pl-6 text-primary-light dark:text-text-dark'>
                        <div className='font-semibold'>{review.full_name || 'Anonymous User'}</div>
                        <div className='text-secondary-light dark:text-secondary-dark mt-1 text-xs'>
                          {review.createdAt || review.created_at
                            ? format(
                                new Date(review.createdAt || review.created_at || ''),
                                'MMM dd, yyyy HH:mm',
                              )
                            : 'Unknown Date'}
                        </div>
                      </td>
                      <td className='whitespace-nowrap px-3 py-4 text-sm text-primary-light dark:text-text-dark'>
                        <div className='font-medium max-w-[200px] truncate'>
                          {review.tour_name || 'Unknown Tour'}
                        </div>
                      </td>
                      <td className='px-3 py-4 text-sm text-secondary-light dark:text-secondary-dark'>
                        <div className='flex items-center mb-1'>
                          {[...Array(5)].map((_, i) =>
                            i < review.rating ? (
                              <StarIconSolid key={i} className='w-4 h-4 text-yellow-400' />
                            ) : (
                              <StarIcon key={i} className='w-4 h-4 text-gray-300' />
                            ),
                          )}
                        </div>
                        <div className='line-clamp-3 text-sm italic py-1'>
                          "{review.comment || 'No written comment'}"
                        </div>
                      </td>
                      <td className='relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6'>
                        <button
                          onClick={() => handleDeleteReview(review.review_id)}
                          title='Delete Review'
                          className='text-red-600 hover:text-red-900 flex items-center gap-1 ml-auto'
                        >
                          <TrashIcon className='w-4 h-4' /> Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                  {reviews.length === 0 && (
                    <tr>
                      <td colSpan={4} className='py-8 text-center text-sm text-gray-500'>
                        No reviews found.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className='mt-4 px-4 py-3 sm:px-6'>
                <Pagination
                  page={page}
                  totalPages={totalPages}
                  goToPrevPage={() => setPage((p) => Math.max(1, p - 1))}
                  goToNextPage={() => setPage((p) => Math.min(totalPages, p + 1))}
                />
              </div>
            )}
          </div>
        </div>
      </div>

      <ConfirmModal
        isOpen={!!deleteReviewId}
        onClose={() => setDeleteReviewId(null)}
        onConfirm={confirmDeleteReview}
        title='Delete Review'
        message='Are you absolutely sure you want to delete this review? This action cannot be undone.'
        confirmText='Delete Review'
        isLoading={isDeleting}
      />
    </div>
  );
};

export default AdminReviewsPage;
