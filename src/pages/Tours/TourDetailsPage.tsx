import { Link, useParams } from 'react-router-dom';
import { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Swiper as SwiperClass } from 'swiper/types';
import { FreeMode, Thumbs } from 'swiper/modules';
import { PhotoProvider, PhotoView } from 'react-photo-view';
import { useCreateBooking, useReview, useToast, useTour, useFavorite } from '../../hooks';
import { getDuration } from '../../utils';
import { HeartIcon } from '@heroicons/react/24/outline';
import { HeartIcon as HeartIconSolid } from '@heroicons/react/24/solid';
import { ReviewForm, ReviewModal } from './components';
import { StarIcon } from '@heroicons/react/20/solid';
import { LoadingState, ErrorState, EmptyState } from '../../components';

const TourDetailsPage = () => {
  const { tourId } = useParams<{ tourId: string }>();
  const id = parseInt(tourId || '', 10);

  const { data: tour, isLoading, isError, error } = useTour(id);
  const { mutate: createBooking, isPending: bookingLoading } = useCreateBooking();
  const { data: reviewsData, isLoading: reviewsLoading } = useReview(id, { limit: 3 });
  const { showSuccess, showError } = useToast();

  const [thumbsSwiper, setThumbsSwiper] = useState<SwiperClass | null>(null);
  const [guestCount, setGuestCount] = useState(1);
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
  const [reviewsUpdated, setReviewsUpdated] = useState(false);

  const {
    inFavorites,
    isLoading: favoriteLoading,
    handleAddToFavorites,
    handleRemoveFromFavorites,
  } = useFavorite(id);

  const handleBooking = () => {
    if (guestCount < 1) {
      showError('Number of guests must be at least 1');
      return;
    }

    if (tour?.available_spots && guestCount > tour?.available_spots) {
      showError(`Only ${tour?.available_spots} spot(s) available`);
      return;
    }

    createBooking(
      { tour_id: id, number_of_people: guestCount },
      {
        onSuccess: () => {
          showSuccess('Booking successful!');
        },
        onError: () => {
          showError('Booking failed. Please try again.');
        },
      },
    );
  };

  if (isLoading) {
    return (
      <section className='py-12 bg-background-light dark:bg-background-dark min-h-screen'>
        <LoadingState message='Loading tour details...' fullPage />
      </section>
    );
  }

  if (isError || !tour) {
    return (
      <div className='min-h-screen bg-background-light dark:bg-background-dark flex items-center justify-center'>
        <ErrorState
          title='Tour not found'
          description={error?.message || "We couldn't load this tour"}
          action={
            <Link to='/tours' className='form-button mt-4'>
              Browse All Tours
            </Link>
          }
          fullPage
        />
      </div>
    );
  }

  return (
    <section className='py-12 bg-background-light dark:bg-background-dark'>
      <div className='container mx-auto px-4 lg:px-8'>
        <div className='flex flex-col lg:flex-row gap-8'>
          {/* Sticky Image Gallery */}
          <div className='lg:w-1/2 lg:sticky lg:top-24 lg:h-[calc(100vh-2rem)] lg:overflow-y-auto'>
            <PhotoProvider>
              <div className='mb-4'>
                <Swiper
                  spaceBetween={10}
                  thumbs={{ swiper: thumbsSwiper }}
                  modules={[FreeMode, Thumbs]}
                  className='rounded-lg overflow-hidden'
                >
                  {tour.images.map((image) => (
                    <SwiperSlide key={image.image_id}>
                      <PhotoView src={image.image_url}>
                        <img
                          src={image.image_url}
                          alt={`Tour ${image.image_id}`}
                          className='w-full h-auto max-h-[70vh] object-cover rounded-lg cursor-zoom-in'
                        />
                      </PhotoView>
                    </SwiperSlide>
                  ))}
                </Swiper>
              </div>

              <Swiper
                onSwiper={setThumbsSwiper}
                spaceBetween={10}
                slidesPerView={4}
                freeMode={true}
                watchSlidesProgress
                modules={[FreeMode, Thumbs]}
                className='rounded-lg'
              >
                {tour.images.map((image) => (
                  <SwiperSlide key={image.image_id}>
                    <img
                      src={image.image_url}
                      alt={`Thumb ${image.image_id}`}
                      className='h-20 w-full object-cover rounded-md cursor-pointer border border-gray-200 dark:border-gray-600'
                    />
                  </SwiperSlide>
                ))}
              </Swiper>
            </PhotoProvider>
          </div>

          {/* Scrollable Content */}
          <div className='lg:w-1/2 space-y-8'>
            {/* Tour Info Section */}
            <div className='bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 md:p-8'>
              <div className='flex justify-between items-start'>
                <h1 className='text-3xl font-bold text-primary-light dark:text-text-dark'>
                  {tour.name}
                </h1>
                <button
                  onClick={inFavorites ? handleRemoveFromFavorites : handleAddToFavorites}
                  disabled={favoriteLoading}
                  className={`flex items-center gap-1 px-3 py-1 text-sm rounded-md ${
                    inFavorites
                      ? 'bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400'
                      : 'bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-300'
                  }`}
                >
                  {inFavorites ? (
                    <HeartIconSolid className='w-4 h-4' />
                  ) : (
                    <HeartIcon className='w-4 h-4' />
                  )}
                  {inFavorites ? 'Saved' : 'Save'}
                </button>
              </div>

              <p className='text-secondary-light dark:text-secondary-dark mt-4'>
                {tour.description}
              </p>

              <div className='grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6 text-sm'>
                <div>
                  <span className='font-medium text-text-light dark:text-text-dark'>
                    Destination:
                  </span>{' '}
                  <span className='text-secondary-light dark:text-secondary-dark'>
                    {tour.destination_name}
                  </span>
                </div>
                <div>
                  <span className='font-medium text-text-light dark:text-text-dark'>Category:</span>{' '}
                  <span className='text-secondary-light dark:text-secondary-dark'>
                    {tour.category_name || 'N/A'}
                  </span>
                </div>
                <div>
                  <span className='font-medium text-text-light dark:text-text-dark'>Duration:</span>{' '}
                  <span className='text-secondary-light dark:text-secondary-dark'>
                    {getDuration(tour.start_date, tour.end_date)} days
                  </span>
                </div>
                <div>
                  <span className='font-medium text-text-light dark:text-text-dark'>
                    Available Spots:
                  </span>{' '}
                  <span className='text-secondary-light dark:text-secondary-dark'>
                    {tour.available_spots}
                  </span>
                </div>
                <div>
                  <span className='font-medium text-text-light dark:text-text-dark'>
                    Start Date:
                  </span>{' '}
                  <span className='text-secondary-light dark:text-secondary-dark'>
                    {new Date(tour.start_date).toLocaleDateString()}
                  </span>
                </div>
                <div>
                  <span className='font-medium text-text-light dark:text-text-dark'>End Date:</span>{' '}
                  <span className='text-secondary-light dark:text-secondary-dark'>
                    {new Date(tour.end_date).toLocaleDateString()}
                  </span>
                </div>
              </div>

              <div className='mt-8 pt-6 border-t border-gray-200 dark:border-gray-700'>
                <div className='flex justify-between items-center'>
                  <div>
                    <h3 className='text-lg font-medium text-text-light dark:text-text-dark'>
                      Price per person
                    </h3>
                    <p className='text-sm text-secondary-light dark:text-secondary-dark'>
                      Total for {guestCount} {guestCount === 1 ? 'guest' : 'guests'}
                    </p>
                  </div>
                  <p className='text-2xl font-bold text-accent-light dark:text-accent-dark'>
                    $
                    {(tour.price * guestCount).toLocaleString('en-US', {
                      minimumFractionDigits: 2,
                    })}
                  </p>
                </div>

                <div className='mt-6 flex flex-col sm:flex-row gap-4'>
                  <div className='flex items-center gap-2'>
                    <label htmlFor='guests' className='form-label'>
                      Guests:
                    </label>
                    <input
                      id='guests'
                      type='number'
                      min={1}
                      max={tour.available_spots}
                      value={guestCount}
                      onChange={(e) => setGuestCount(Number(e.target.value))}
                      className='form-input w-20'
                    />
                  </div>
                  <button
                    onClick={handleBooking}
                    disabled={bookingLoading || guestCount < 1}
                    className='form-button flex-1'
                  >
                    {bookingLoading ? 'Booking...' : 'Book Now'}
                  </button>
                </div>
              </div>
            </div>

            {/* Reviews Section */}
            <div className='bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 md:p-8'>
              <div className='flex justify-between items-center mb-6'>
                <h2 className='text-xl font-bold text-primary-light dark:text-primary-dark'>
                  Customer Reviews
                </h2>
                {typeof reviewsData?.total === 'number' && reviewsData.total > 3 && (
                  <button
                    onClick={() => setIsReviewModalOpen(true)}
                    className='text-sm font-medium text-primary-light dark:text-primary-dark hover:underline'
                  >
                    View All ({reviewsData.total})
                  </button>
                )}
              </div>

              {reviewsLoading ? (
                <LoadingState message='Loading reviews...' />
              ) : reviewsData?.reviews.length ? (
                <div className='space-y-6'>
                  {reviewsData.reviews.map((review) => (
                    <div
                      key={review.review_id}
                      className='border-b border-gray-200 dark:border-gray-700 pb-6 last:border-0 last:pb-0'
                    >
                      <div className='flex items-center gap-3 mb-3'>
                        <div className='flex-1'>
                          <h4 className='font-semibold text-text-light dark:text-text-dark'>
                            {review.full_name}
                          </h4>
                          <div className='flex items-center gap-1 mt-1'>
                            {[1, 2, 3, 4, 5].map((star) => (
                              <StarIcon
                                key={star}
                                className={`h-4 w-4 ${review.rating >= star ? 'text-yellow-400' : 'text-gray-300 dark:text-gray-500'}`}
                              />
                            ))}
                          </div>
                        </div>
                        <span className='text-xs text-secondary-light dark:text-secondary-dark'>
                          {new Date(review.created_at).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'short',
                            day: 'numeric',
                          })}
                        </span>
                      </div>
                      <p className='text-sm text-secondary-light dark:text-secondary-dark'>
                        {review.comment}
                      </p>
                    </div>
                  ))}
                </div>
              ) : (
                <EmptyState
                  title='No reviews yet'
                  description='Be the first to review this tour!'
                />
              )}
            </div>

            {/* Review Form Section */}
            {!tour?.hasReviewed && (
              <ReviewForm
                tourId={id}
                onReviewSubmitted={() => setReviewsUpdated(!reviewsUpdated)}
              />
            )}
          </div>
        </div>
      </div>

      {/* Review Modal */}
      {reviewsData && (
        <ReviewModal
          tourId={id}
          isOpen={isReviewModalOpen}
          onClose={() => setIsReviewModalOpen(false)}
          totalReviews={reviewsData.total}
        />
      )}
    </section>
  );
};

export default TourDetailsPage;
