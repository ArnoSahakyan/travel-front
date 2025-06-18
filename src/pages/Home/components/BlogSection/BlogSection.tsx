import { BlogCard, ErrorState, LoadingState } from '../../../../components';
import { Link } from 'react-router-dom';
import { ROUTES } from '../../../../shared';
import { useBlogs } from '../../../../hooks/useBlogs.ts';

export const BlogSection = () => {
  const { data, isLoading, isError, error } = useBlogs({ limit: 3 });

  if (data?.posts.length === 0) return;
  return (
    <div className='bg-background-light dark:bg-background-dark py-10 sm:py-20'>
      <div className='mx-auto max-w-7xl px-6 lg:px-8'>
        <div className='mx-auto max-w-2xl text-center'>
          <h2 className='text-balance text-4xl font-semibold tracking-tight text-primary-light dark:text-text-dark sm:text-5xl'>
            Travel Insights
          </h2>
          <p className='mt-4 text-lg/8 text-secondary-light dark:text-secondary-dark'>
            Expert tips and stories to inspire your next adventure
          </p>
        </div>

        {isLoading ? (
          <LoadingState message='Loading blog posts...' />
        ) : isError ? (
          <ErrorState description={error && (error as Error).message} />
        ) : (
          <div className='mx-auto mt-16 grid max-w-2xl auto-rows-fr grid-cols-1 gap-8 sm:mt-20 lg:mx-0 lg:max-w-none lg:grid-cols-3'>
            {data?.posts.map((post) => <BlogCard key={post.post_id} post={post} />)}
          </div>
        )}

        <div className='mt-12 text-center'>
          <Link
            to={ROUTES.BLOG}
            className='inline-flex items-center rounded-md bg-primary-light dark:bg-primary-dark px-4 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-opacity-90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-light dark:focus-visible:outline-primary-dark transition-colors'
          >
            View all articles
          </Link>
        </div>
      </div>
    </div>
  );
};
