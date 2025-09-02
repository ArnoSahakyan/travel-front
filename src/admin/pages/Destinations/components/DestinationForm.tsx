import { ChangeEvent, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  useCreateDestination,
  useUpdateDestination,
  useDestination,
  useDeleteDestination,
} from '../../../../hooks';
import {
  CreateDestinationFormData,
  UpdateDestinationFormData,
  createDestinationSchema,
  updateDestinationSchema,
  DestinationPayload,
  ROUTES,
} from '../../../../shared';
import { CameraIcon, ChevronLeftIcon, TrashIcon, XMarkIcon } from '@heroicons/react/24/outline';
import NotFoundPage from '../../../../pages/NotFound/NotFoundPage.tsx';
import { LoadingState } from '../../../../components';
import { Link } from 'react-router-dom';

interface DestinationFormProps {
  destinationId?: number;
}

export const DestinationForm = ({ destinationId }: DestinationFormProps) => {
  const createMutation = useCreateDestination();
  const updateMutation = useUpdateDestination(destinationId || 0);
  const deleteMutation = useDeleteDestination();
  const { data: destinationData, isPending } = useDestination(destinationId || 0);

  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const { register, handleSubmit, formState, reset, setValue } = useForm<DestinationPayload>({
    resolver: zodResolver(destinationId ? updateDestinationSchema : createDestinationSchema),
    defaultValues: {
      name: '',
      description: '',
      images: [],
    },
  });

  const { errors, isDirty } = formState;

  // Prefill form when editing
  useEffect(() => {
    if (destinationData) {
      reset({
        name: destinationData.name,
        description: destinationData.description || '',
        images: [],
      });
      if (destinationData.image) {
        setImagePreview(destinationData.image);
      }
    }
  }, [destinationData, reset]);

  const onSubmit = (data: CreateDestinationFormData | UpdateDestinationFormData) => {
    if (destinationId) {
      updateMutation.mutate(data);
    } else {
      createMutation.mutate(data);
    }
  };

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files ? Array.from(e.target.files) : [];
    setValue('images', files, { shouldDirty: true });
    if (files[0]) {
      setImagePreview(URL.createObjectURL(files[0]));
    }
  };

  const removeImage = () => {
    setImagePreview(null);
    setValue('images', [], { shouldDirty: true });
  };

  if (
    (destinationId && isPending) ||
    createMutation.isPending ||
    updateMutation.isPending ||
    deleteMutation.isPending
  ) {
    return (
      <div className='space-y-6 bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm'>
        <LoadingState fullPage={true} />
      </div>
    );
  }

  if (destinationId && !destinationData) return <NotFoundPage />;

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className='space-y-6 bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm'
    >
      <div className='flex flex-col sm:flex-row items-center sm:items-center sm:justify-between gap-4 sm:gap-0 border-b border-gray-200 dark:border-gray-700 pb-4'>
        <div className='w-full sm:w-auto flex justify-start'>
          <Link
            to={ROUTES.ADMIN_DESTINATIONS}
            className='inline-flex justify-center rounded-md border border-text-light dark:border-text-dark px-4 py-2 text-sm font-medium text-text-light dark:text-text-dark'
          >
            <ChevronLeftIcon className='w-5 h-5 mr-2' />
            Back to Destinations
          </Link>
        </div>

        <div className='w-full sm:flex-1 flex justify-center'>
          <h3 className='text-xl font-bold text-primary-light dark:text-text-dark text-center'>
            {destinationId ? 'Edit Destination' : 'Create Destination'}
          </h3>
        </div>

        <div className='w-full sm:w-auto flex justify-center'>
          {destinationId && (
            <button
              type='button'
              onClick={() => deleteMutation.mutate(destinationId)}
              className='flex items-center gap-1 px-3 py-1.5 text-sm rounded-md bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400 hover:bg-red-200 dark:hover:bg-red-800/50 transition-colors'
            >
              <TrashIcon className='w-4 h-4' />
              Delete Destination
            </button>
          )}
        </div>
      </div>

      <div className='grid grid-cols-1 gap-6'>
        <div>
          <label htmlFor='name' className='form-label mb-2'>
            Destination Name
          </label>
          <input
            {...register('name')}
            className='form-input'
            placeholder='Enter destination name'
          />
          {errors.name && <p className='form-error'>{errors.name.message}</p>}
        </div>

        <div>
          <label htmlFor='description' className='form-label mb-2'>
            Description
          </label>
          <textarea
            {...register('description')}
            className='form-input min-h-[120px]'
            placeholder='Tell travelers about this destination...'
            rows={4}
          />
          {errors.description && <p className='form-error'>{errors.description.message}</p>}
        </div>

        {/* Image upload */}
        <div>
          <label className='form-label mb-2'>Destination Image</label>
          <div className='flex flex-col gap-4'>
            <div className='flex-1'>
              <div className='relative'>
                <input
                  type='file'
                  id='image-upload'
                  accept='image/*'
                  onChange={handleImageChange}
                  className='absolute inset-0 w-full h-full opacity-0 cursor-pointer'
                />
                <div className='form-input flex items-center justify-between cursor-pointer'>
                  <span className='text-gray-500 dark:text-gray-400 truncate'>
                    {imagePreview ? 'Change image' : 'Select an image'}
                  </span>
                  <CameraIcon className='h-5 w-5 text-secondary-light dark:text-secondary-dark' />
                </div>
              </div>
              {errors.images && <p className='form-error'>{errors.images.message as string}</p>}
            </div>
            {imagePreview && (
              <div className='relative group'>
                <img
                  src={imagePreview}
                  alt='Preview'
                  className='h-64 w-full sm:h-96 2xl:h-[600px] object-cover rounded-lg border border-gray-200 dark:border-gray-700'
                />
                <button
                  type='button'
                  onClick={removeImage}
                  className='absolute top-2 right-2 p-1.5 bg-white/90 dark:bg-gray-800/90 rounded-full shadow-sm text-red-500 hover:bg-red-100 dark:hover:bg-red-900/50 transition-colors'
                  aria-label='Remove image'
                >
                  <XMarkIcon className='w-4 h-4' />
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className='flex justify-end pt-4 border-t border-gray-200 dark:border-gray-700'>
        <button
          type='submit'
          className='form-button w-full sm:w-auto px-8'
          disabled={!isDirty || createMutation.isPending || updateMutation.isPending}
        >
          {destinationId
            ? updateMutation.isPending
              ? 'Saving...'
              : 'Save Changes'
            : createMutation.isPending
              ? 'Creating...'
              : 'Create Destination'}
        </button>
      </div>
    </form>
  );
};
