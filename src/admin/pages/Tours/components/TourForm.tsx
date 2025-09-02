import { ChangeEvent, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  createTourSchema,
  updateTourSchema,
  CreateTourFormData,
  UpdateTourFormData,
  ITourImage,
  ROUTES,
} from '../../../../shared';
import {
  useTour,
  useCreateTour,
  useUpdateTour,
  useDeleteTour,
  useDeleteTourImage,
  useSetTourCoverImage,
  useAddTourImage,
} from '../../../../hooks';
import { useCategories, useDestinations } from '../../../../hooks';
import {
  StarIcon as StarOutline,
  TrashIcon,
  XMarkIcon,
  PhotoIcon,
  ChevronLeftIcon,
} from '@heroicons/react/24/outline';
import { StarIcon as StarSolid } from '@heroicons/react/24/solid';
import NotFoundPage from '../../../../pages/NotFound/NotFoundPage.tsx';
import { LoadingState } from '../../../../components';
import { Link } from 'react-router-dom';

interface TourFormProps {
  tourId?: number;
}

type TourFormData = CreateTourFormData | UpdateTourFormData;

export const TourForm = ({ tourId }: TourFormProps) => {
  const createMutation = useCreateTour();
  const updateMutation = useUpdateTour(tourId || 0);
  const deleteMutation = useDeleteTour();
  const deleteImageMutation = useDeleteTourImage(tourId || 0);
  const setCoverMutation = useSetTourCoverImage(tourId || 0);
  const uploadImageMutation = useAddTourImage(tourId || 0);
  const { data: tourData, isPending } = useTour(tourId || 0);

  const { data: categoriesData } = useCategories();
  const { data: destinationsData } = useDestinations({ limit: 100 });

  const [imagePreviews, setImagePreviews] = useState<ITourImage[]>([]);
  const [newImages, setNewImages] = useState<File[]>([]);

  const { register, handleSubmit, formState, reset, setValue } = useForm<TourFormData>({
    resolver: zodResolver(tourId ? updateTourSchema : createTourSchema),
    defaultValues: tourId
      ? ({
          name: '',
          description: '',
          price: 0,
          available_spots: 1,
          start_date: '',
          end_date: '',
          category_id: 0,
          destination_id: 0,
        } satisfies UpdateTourFormData)
      : ({
          name: '',
          description: '',
          price: 0,
          available_spots: 1,
          start_date: '',
          end_date: '',
          category_id: 0,
          destination_id: 0,
          images: [],
        } satisfies CreateTourFormData),
  });

  const { errors, isDirty } = formState;

  // Prefill form when editing
  useEffect(() => {
    if (tourData) {
      reset({
        name: tourData.name,
        description: tourData.description || '',
        price: tourData.price,
        available_spots: tourData.available_spots,
        start_date: tourData.start_date,
        end_date: tourData.end_date,
        category_id: tourData.category_id,
        destination_id: tourData.destination_id,
        images: [],
      });
      if (tourData.images && tourData.images.length > 0) {
        setImagePreviews(tourData.images);
      }
    }
  }, [tourData, reset]);

  const onSubmit = (data: CreateTourFormData | UpdateTourFormData) => {
    if (tourId) {
      updateMutation.mutate(data);
    } else {
      createMutation.mutate({
        ...data,
        images: newImages,
      });
    }
  };

  const handleImageUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files ? Array.from(e.target.files) : [];
    if (!files.length) return;
    if (tourId) {
      uploadImageMutation.mutate({ images: files });
    } else {
      setValue('images', files, { shouldValidate: true });
      setNewImages((prev) => [...prev, ...files]);
    }

    e.target.value = '';
  };

  const handleRemoveNewImage = (index: number) => {
    setNewImages((prev) => prev.filter((_, i) => i !== index));
  };

  const handleRemoveImage = (imageId: number) => {
    deleteImageMutation.mutate(imageId);
  };

  const handleSetCover = (imageId: number) => {
    setCoverMutation.mutate(imageId);
  };

  if (
    (tourId && isPending) ||
    createMutation.isPending ||
    updateMutation.isPending ||
    deleteMutation.isPending ||
    deleteImageMutation.isPending ||
    uploadImageMutation.isPending
  ) {
    return (
      <div className='space-y-6 bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm'>
        <LoadingState fullPage={true} />
      </div>
    );
  }

  if (tourId && !tourData) return <NotFoundPage />;

  return (
    <div className='space-y-6 bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm'>
      <form id='tour-form' onSubmit={handleSubmit(onSubmit)}>
        <div className='flex flex-col sm:flex-row items-center sm:items-center sm:justify-between gap-4 sm:gap-0 border-b border-gray-200 dark:border-gray-700 pb-4'>
          <div className='w-full sm:w-auto flex justify-start'>
            <Link
              to={ROUTES.ADMIN_TOURS}
              className='inline-flex justify-center rounded-md border border-text-light dark:border-text-dark px-4 py-2 text-sm font-medium text-text-light dark:text-text-dark'
            >
              <ChevronLeftIcon className='w-5 h-5 mr-2' />
              Back to Tours
            </Link>
          </div>

          <div className='w-full sm:flex-1 flex justify-center'>
            <h3 className='text-xl font-bold text-primary-light dark:text-text-dark text-center'>
              {tourId ? 'Edit Tour' : 'Create Tour'}
            </h3>
          </div>

          <div className='w-full sm:w-auto flex justify-center'>
            {tourId && (
              <button
                type='button'
                onClick={() => deleteMutation.mutate(tourId)}
                className='flex items-center gap-1 px-3 py-1.5 text-sm rounded-md bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400 hover:bg-red-200 dark:hover:bg-red-800/50 transition-colors'
              >
                <TrashIcon className='w-4 h-4' />
                Delete Tour
              </button>
            )}
          </div>
        </div>

        <div className='grid grid-cols-1 sm:grid-cols-2 gap-6'>
          {/* Name */}
          <div className='sm:col-span-2'>
            <label className='form-label mb-2'>Tour Name</label>
            <input {...register('name')} className='form-input' placeholder='Enter tour name' />
            {errors.name && <p className='form-error'>{errors.name.message}</p>}
          </div>

          {/* Description */}
          <div className='sm:col-span-2'>
            <label className='form-label mb-2'>Description</label>
            <textarea
              {...register('description')}
              className='form-input min-h-[120px]'
              placeholder='Describe this tour...'
              rows={4}
            />
            {errors.description && <p className='form-error'>{errors.description.message}</p>}
          </div>

          {/* Price */}
          <div>
            <label className='form-label mb-2'>Price</label>
            <input
              type='number'
              step='.01'
              {...register('price', { valueAsNumber: true })}
              className='form-input'
              placeholder='Enter price'
            />
            {errors.price && <p className='form-error'>{errors.price.message}</p>}
          </div>

          {/* Available spots */}
          <div>
            <label className='form-label mb-2'>Available Spots</label>
            <input
              type='number'
              {...register('available_spots', { valueAsNumber: true })}
              className='form-input'
              placeholder='Enter number of spots'
            />
            {errors.available_spots && (
              <p className='form-error'>{errors.available_spots.message}</p>
            )}
          </div>

          {/* Start date */}
          <div>
            <label className='form-label mb-2'>Start Date</label>
            <input type='date' {...register('start_date')} className='form-date' />
            {errors.start_date && <p className='form-error'>{errors.start_date.message}</p>}
          </div>

          {/* End date */}
          <div>
            <label className='form-label mb-2'>End Date</label>
            <input type='date' {...register('end_date')} className='form-date' />
            {errors.end_date && <p className='form-error'>{errors.end_date.message}</p>}
          </div>

          {/* Category */}
          <div>
            <label className='form-label mb-2'>Category</label>
            <select {...register('category_id', { valueAsNumber: true })} className='form-select'>
              <option value=''>Select a category</option>
              {categoriesData?.map((cat) => (
                <option key={cat.category_id} value={cat.category_id}>
                  {cat.name}
                </option>
              ))}
            </select>
            {errors.category_id && <p className='form-error'>{errors.category_id.message}</p>}
          </div>

          {/* Destination */}
          <div>
            <label className='form-label mb-2'>Destination</label>
            <select
              {...register('destination_id', { valueAsNumber: true })}
              className='form-select'
            >
              <option value=''>Select a destination</option>
              {destinationsData?.destinations?.map((dest) => (
                <option key={dest.destination_id} value={dest.destination_id}>
                  {dest.name}
                </option>
              ))}
            </select>
            {errors.destination_id && <p className='form-error'>{errors.destination_id.message}</p>}
          </div>

          {/* Submit */}
          <div className='flex justify-end sm:col-span-2 pt-4'>
            {tourId && (
              <button
                type='submit'
                className='form-button w-full sm:w-auto px-8'
                disabled={!isDirty || createMutation.isPending || updateMutation.isPending}
              >
                {updateMutation.isPending ? 'Saving...' : 'Save Changes'}
              </button>
            )}
          </div>
        </div>
      </form>

      {/* IMAGE MANAGER */}
      {tourId ? (
        <div className='bg-white dark:bg-gray-800 rounded-xl shadow-sm space-y-4'>
          <h4 className='text-lg font-semibold text-primary-light dark:text-text-dark'>
            Tour Images
          </h4>
          <div className='grid grid-cols-2 lg:grid-cols-3 gap-4'>
            {/* Upload card */}
            <label className='flex flex-col items-center justify-center border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg h-56 lg:h-72 cursor-pointer hover:border-primary-light transition-colors'>
              <input
                type='file'
                accept='image/*'
                className='hidden'
                multiple
                onChange={handleImageUpload}
              />
              <PhotoIcon className='w-10 h-10 text-gray-400' />
              <span className='mt-2 text-sm text-gray-500'>Upload image</span>
            </label>

            {/* Existing images */}
            {imagePreviews.map((img) => (
              <div key={img.image_id} className='relative group'>
                <img
                  src={img.image_url}
                  alt=''
                  className='h-56 lg:h-72 w-full object-cover rounded-lg border border-gray-200 dark:border-gray-700'
                />
                {/* Remove button */}
                <button
                  type='button'
                  onClick={() => handleRemoveImage(img.image_id)}
                  className='absolute top-2 right-2 p-1.5 bg-white/90 dark:bg-gray-800/90 rounded-full shadow-sm text-red-500 hover:bg-red-100 dark:hover:bg-red-900/50 transition-colors'
                >
                  <XMarkIcon className='w-4 h-4' />
                </button>
                {/* Cover button */}
                {img.is_cover ? (
                  <div className='absolute top-2 left-2 p-1.5 bg-white/90 dark:bg-gray-800/90 rounded-full shadow-sm text-yellow-500'>
                    <StarSolid className='w-4 h-4' />
                  </div>
                ) : (
                  <button
                    type='button'
                    onClick={() => handleSetCover(img.image_id)}
                    className='absolute top-2 left-2 p-1.5 bg-white/90 dark:bg-gray-800/90 rounded-full shadow-sm text-yellow-500 opacity-0 group-hover:opacity-100 transition-opacity'
                  >
                    <StarOutline className='w-4 h-4' />
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className='bg-white dark:bg-gray-800 rounded-xl shadow-sm space-y-4'>
          <h4 className='text-lg font-semibold text-primary-light dark:text-text-dark'>
            Upload Tour Images
          </h4>
          <div className='grid grid-cols-2 lg:grid-cols-3 gap-4'>
            {/* Upload card */}
            <label className='flex flex-col items-center justify-center border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg h-56 lg:h-72 cursor-pointer hover:border-primary-light transition-colors'>
              <input
                type='file'
                {...register('images')}
                accept='image/*'
                className='hidden'
                multiple
                onChange={handleImageUpload}
              />
              <PhotoIcon className='w-10 h-10 text-gray-400' />
              <span className='mt-2 text-sm text-gray-500'>Upload image</span>
            </label>

            {/* New image previews */}
            {newImages.map((file, index) => (
              <div key={index} className='relative group'>
                <img
                  src={URL.createObjectURL(file)}
                  alt='Preview'
                  className='h-56 lg:h-72 w-full object-cover rounded-lg border border-gray-200 dark:border-gray-700'
                />
                {/* Remove button */}
                <button
                  type='button'
                  onClick={() => handleRemoveNewImage(index)}
                  className='absolute top-2 right-2 p-1.5 bg-white/90 dark:bg-gray-800/90 rounded-full shadow-sm text-red-500 hover:bg-red-100 dark:hover:bg-red-900/50 transition-colors'
                >
                  <XMarkIcon className='w-4 h-4' />
                </button>
              </div>
            ))}
          </div>
          {!tourId && 'images' in errors && errors.images && (
            <p className='form-error'>{errors.images.message}</p>
          )}
        </div>
      )}
      {!tourId && (
        <div className='flex justify-end pt-4'>
          <button
            type='submit'
            form='tour-form'
            className='form-button w-full sm:w-auto px-8'
            disabled={!isDirty || createMutation.isPending || updateMutation.isPending}
          >
            {createMutation.isPending ? 'Creating...' : 'Create Tour'}
          </button>
        </div>
      )}
    </div>
  );
};
