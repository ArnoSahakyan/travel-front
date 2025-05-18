import { FC } from 'react';
import { useCreateReview, useToast } from '../../../hooks';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { ReviewFormData, reviewSchema } from '../../../shared';
import { StarRating } from './StarRating.tsx';

interface ReviewFormProps {
  tourId: number;
  onReviewSubmitted: () => void;
}

export const ReviewForm: FC<ReviewFormProps> = ({ tourId, onReviewSubmitted }) => {
  const { showSuccess, showError } = useToast();
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors },
  } = useForm<ReviewFormData>({
    resolver: zodResolver(reviewSchema),
    defaultValues: {
      rating: 0,
      comment: '',
    },
  });

  const ratingValue = watch('rating');
  const { mutate: createReview, isPending } = useCreateReview();

  const handleRatingChange = (value: number) => {
    setValue('rating', value, { shouldValidate: true });
  };

  const onSubmit = (data: ReviewFormData) => {
    createReview(
      { ...data, tour_id: tourId },
      {
        onSuccess: () => {
          showSuccess('Review submitted successfully!');
          reset();
          onReviewSubmitted();
        },
        onError: () => {
          showError('Failed to submit review. Please try again.');
        },
      },
    );
  };

  return (
    <div className='mt-12 bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 md:p-8'>
      <h2 className='text-2xl font-bold text-primary-light dark:text-primary-dark mb-6'>
        Leave a Review
      </h2>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className='mb-6'>
          <StarRating value={ratingValue} onChange={(val) => handleRatingChange(val)} />
          <input type='hidden' {...register('rating')} />
          {errors.rating && <p className='form-error'>{errors.rating.message}</p>}
        </div>

        <div className='mb-6'>
          <label htmlFor='comment' className='form-label'>
            Your Review
          </label>
          <textarea
            id='comment'
            rows={4}
            className='form-input mt-2 resize-none'
            placeholder='Share your experience with this tour...'
            {...register('comment')}
          />
          {errors.comment && <p className='form-error'>{errors.comment.message}</p>}
        </div>

        <button type='submit' disabled={isPending} className='form-button'>
          {isPending ? 'Submitting...' : 'Submit Review'}
        </button>
      </form>
    </div>
  );
};
