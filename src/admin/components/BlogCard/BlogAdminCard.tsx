import { FC } from 'react';
import { formatDate } from '../../../utils';
import { IBlog, ROUTES } from '../../../shared';
import { Link } from 'react-router-dom';

interface BlogAdminCardProps {
  post: IBlog;
}

export const BlogAdminCard: FC<BlogAdminCardProps> = ({ post }) => {
  return (
    <div className='relative flex flex-col rounded-xl bg-background-light dark:bg-background-dark shadow-md overflow-hidden border border-gray-200 dark:border-gray-700 transition-transform hover:scale-[1.02] hover:shadow-lg'>
      {/* Image */}
      {post.image && (
        <div className='relative h-40 overflow-hidden'>
          <img src={post.image} alt={post.title} className='w-full h-full object-cover' />
          <div className='absolute top-4 right-4 bg-primary-light dark:bg-primary-dark text-background-light px-3 py-1 rounded-full font-bold text-sm shadow-md'>
            {post.is_published ? 'Published' : 'Draft'}
          </div>
        </div>
      )}

      {/* Content */}
      <div className='p-4 flex flex-col flex-grow'>
        <h3 className='text-lg font-semibold text-primary-light dark:text-text-dark mb-1 line-clamp-2'>
          {post.title}
        </h3>
        <p className='text-sm text-secondary-light dark:text-secondary-dark mb-2 line-clamp-3'>
          {post.excerpt}
        </p>
        <p className='text-xs text-gray-400 dark:text-gray-500 mb-4'>
          {formatDate(post.createdAt)}
        </p>

        {/* Button */}
        <div className='mt-auto'>
          <Link
            to={`${ROUTES.ADMIN_BLOG}/${post.slug}`}
            className='w-full inline-flex justify-center rounded-md bg-primary-light dark:bg-primary-dark px-4 py-2 text-sm font-medium text-background-light hover:bg-opacity-90 focus:outline-none focus-visible:ring-2 focus-visible:ring-background-light focus-visible:ring-opacity-75 transition-colors'
          >
            Edit Post
          </Link>
        </div>
      </div>
    </div>
  );
};
