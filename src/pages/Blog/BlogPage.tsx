import { useEffect } from 'react';
import { BlogCard, EmptyState, ErrorState, LoadingState, Pagination } from '../../components';
import { usePagination } from '../../hooks';
import { useBlogs } from '../../hooks/useBlogs.ts';

const BlogPage = () => {
  const { page, goToNextPage, goToPrevPage } = usePagination();
  const { data, isLoading, isError, error } = useBlogs();
  const totalPages = data?.totalPages || 1;

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [page]);

  return (
    <div className='bg-background-light dark:bg-background-dark py-12'>
      <div className='container mx-auto px-4 lg:px-8'>
        {/* Page Header */}
        <div className='mx-auto max-w-2xl text-center mb-12'>
          <h1 className='text-4xl font-bold tracking-tight text-primary-light dark:text-text-dark sm:text-5xl'>
            WanderLuxe Journal
          </h1>
          <p className='mt-4 text-lg text-secondary-light dark:text-secondary-dark'>
            Travel stories, tips, and inspiration from our team and community
          </p>
        </div>

        {/* Loading/Error/Empty States */}
        {isLoading ? (
          <LoadingState message='Loading blog posts...' />
        ) : isError ? (
          <ErrorState description={error && (error as Error).message} />
        ) : data?.posts?.length === 0 ? (
          <EmptyState
            title='No blog posts found'
            description='Check back later for more travel stories and insights.'
          />
        ) : (
          <>
            {/* Blog Cards */}
            <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8'>
              {data?.posts.map((post) => <BlogCard key={post.post_id} post={post} />)}
            </div>

            {totalPages > 1 && (
              <Pagination
                page={page}
                totalPages={totalPages}
                goToPrevPage={goToPrevPage}
                goToNextPage={goToNextPage}
              />
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default BlogPage;
