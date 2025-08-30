import { ChangeEvent, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useCreateBlog, useUpdateBlog, useBlog, useDeleteBlog } from '../../../../hooks';
import {
  CreateBlogFormData,
  UpdateBlogFormData,
  createBlogSchema,
  updateBlogSchema,
  BlogPayload,
} from '../../../../shared';
import { CameraIcon, TrashIcon, XMarkIcon } from '@heroicons/react/24/outline';
import NotFoundPage from '../../../../pages/NotFound/NotFoundPage';
import { LoadingState } from '../../../../components';
import MdEditor from 'react-markdown-editor-lite';
import ReactMarkdown from 'react-markdown';
import 'react-markdown-editor-lite/lib/index.css';

interface BlogFormProps {
  blogSlug?: string;
}

export const BlogForm = ({ blogSlug }: BlogFormProps) => {
  const createMutation = useCreateBlog();
  const updateMutation = useUpdateBlog(blogSlug || '');
  const deleteMutation = useDeleteBlog();
  const { data: blogData } = useBlog(blogSlug || '', true);

  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const { register, handleSubmit, formState, reset, setValue, watch } = useForm<BlogPayload>({
    resolver: zodResolver(blogSlug ? updateBlogSchema : createBlogSchema),
    defaultValues: {
      title: '',
      excerpt: '',
      content: '',
      slug: '',
      is_published: false,
      image: undefined,
    },
  });

  const { errors, isDirty } = formState;

  // Prefill form when editing
  useEffect(() => {
    if (blogData) {
      reset({
        title: blogData.title,
        excerpt: blogData.excerpt,
        content: blogData.content || '',
        slug: blogData.slug,
        is_published: blogData.is_published,
        image: undefined,
      });
      if (blogData.image) {
        setImagePreview(blogData.image);
      }
    }
  }, [blogData, reset]);

  const onSubmit = (data: CreateBlogFormData | UpdateBlogFormData) => {
    if (blogSlug) {
      updateMutation.mutate(data);
    } else {
      createMutation.mutate(data);
    }
  };

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    setValue('image', file, { shouldDirty: true });
    if (file) {
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const removeImage = () => {
    setImagePreview(null);
    setValue('image', undefined, { shouldDirty: true });
  };

  if (blogSlug && !blogData) return <NotFoundPage />;

  if (createMutation.isPending || updateMutation.isPending || deleteMutation.isPending) {
    return (
      <div className='space-y-6 bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm'>
        <LoadingState fullPage={true} />
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className='space-y-6 bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm'
    >
      <div className='flex flex-col gap-4 sm:flex-row justify-between items-center border-b border-gray-200 dark:border-gray-700 pb-4'>
        <h3 className='text-xl font-bold text-primary-light dark:text-text-dark'>
          {blogSlug ? 'Edit Blog' : 'Create Blog'}
        </h3>
        {blogSlug && (
          <button
            type='button'
            onClick={() => deleteMutation.mutate(blogData?.post_id || 0)}
            className='flex items-center gap-1 px-3 py-1.5 text-sm rounded-md bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400 hover:bg-red-200 dark:hover:bg-red-800/50 transition-colors'
          >
            <TrashIcon className='w-4 h-4' />
            Delete Blog
          </button>
        )}
      </div>

      <div className='grid grid-cols-1 gap-6'>
        {/* Title */}
        <div>
          <label htmlFor='title' className='form-label mb-2'>
            Blog Title
          </label>
          <input {...register('title')} className='form-input' placeholder='Enter blog title' />
          {errors.title && <p className='form-error'>{errors.title.message}</p>}
        </div>

        {/* Excerpt */}
        <div>
          <label htmlFor='excerpt' className='form-label mb-2'>
            Excerpt
          </label>
          <textarea
            {...register('excerpt')}
            className='form-input min-h-[100px]'
            placeholder='Short summary of your blog...'
            rows={3}
          />
          {errors.excerpt && <p className='form-error'>{errors.excerpt.message}</p>}
        </div>

        {/* Content */}
        <div>
          <label htmlFor='content' className='form-label mb-2'>
            Content
          </label>

          <MdEditor
            value={watch('content') || ''}
            style={{ height: '400px' }}
            renderHTML={(text) => <ReactMarkdown>{text}</ReactMarkdown>}
            onChange={({ text }) => setValue('content', text, { shouldDirty: true })}
          />

          {errors.content && <p className='form-error'>{errors.content.message}</p>}
        </div>

        {/* Slug */}
        <div>
          <label htmlFor='slug' className='form-label mb-2'>
            Slug (optional)
          </label>
          <input {...register('slug')} className='form-input' placeholder='blog-title-slug' />
          {errors.slug && <p className='form-error'>{errors.slug.message}</p>}
        </div>

        {/* Published Toggle */}
        <div className='flex items-center gap-2'>
          <input type='checkbox' {...register('is_published')} id='is_published' />
          <label htmlFor='is_published' className='form-label'>
            Publish immediately
          </label>
        </div>

        {/* Image upload */}
        <div>
          <label className='form-label mb-2'>Cover Image</label>
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
              {errors.image && <p className='form-error'>{errors.image.message as string}</p>}
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
          {blogSlug
            ? updateMutation.isPending
              ? 'Saving...'
              : 'Save Changes'
            : createMutation.isPending
              ? 'Creating...'
              : 'Create Blog'}
        </button>
      </div>
    </form>
  );
};
