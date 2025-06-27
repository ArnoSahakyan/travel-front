import { useParams, Link } from 'react-router-dom';
import { useEffect } from 'react';
import { PhotoProvider, PhotoView } from 'react-photo-view';
import { formatDate } from '../../utils';
import { ArrowLeftIcon } from '@heroicons/react/24/outline';
import { LoadingState, ErrorState } from '../../components';
import { useTours, useBlog } from '../../hooks';
import ReactMarkdown from 'react-markdown';
import { MarkdownComponents } from './MarkdownComponents.tsx';
import { CalendarIcon, CurrencyDollarIcon, InformationCircleIcon } from '@heroicons/react/24/solid';

const BlogDetailsPage = () => {
  const { slug } = useParams<{ slug: string }>();

  const { data: post, isLoading, isError, error } = useBlog(slug || '');
  const { data: toursData } = useTours({ page: 1, limit: 2 });

  useEffect(() => {
    if (post?.title) {
      document.title = `${post.title} | Wanderluxe`;
    }
  }, [post]);

  if (isLoading) {
    return (
      <section className='py-12 bg-background-light dark:bg-background-dark min-h-screen'>
        <LoadingState message='Loading blog post...' fullPage />
      </section>
    );
  }

  if (isError || !post) {
    return (
      <div className='min-h-screen bg-background-light dark:bg-background-dark flex items-center justify-center'>
        <ErrorState
          title='Post not found'
          description={error?.message || "We couldn't load this blog post"}
          action={
            <Link to='/blog' className='form-button mt-4'>
              Browse All Posts
            </Link>
          }
          fullPage
        />
      </div>
    );
  }

  return (
    <section className='bg-background-light dark:bg-background-dark'>
      {/* Hero Section */}
      <div className='relative w-full'>
        <div className='relative w-full' style={{ height: 'clamp(400px, 50vh, 600px)' }}>
          <PhotoProvider>
            <PhotoView src={post.image}>
              <img
                src={post.image}
                alt={post.title}
                className='w-full h-full object-cover cursor-zoom-in'
              />
            </PhotoView>
          </PhotoProvider>
          <div className='absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent flex items-end pb-8'>
            <div className='container mx-auto px-4 lg:px-8 text-white'>
              <div className='max-w-4xl'>
                <Link
                  to='/blog'
                  className='inline-flex items-center text-white/80 hover:text-white mb-4 transition-colors'
                >
                  <ArrowLeftIcon className='mr-2 size-5' />
                  Back to Blog
                </Link>
                <h1 className='text-3xl md:text-4xl lg:text-5xl font-bold mb-4'>{post.title}</h1>
                <div className='flex items-center space-x-4 text-sm'>
                  <span className='flex items-center'>
                    <CalendarIcon className='size-4 mr-1' />
                    {formatDate(post.createdAt)}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className='container mx-auto px-4 lg:px-8 py-12'>
        <div className='flex flex-col lg:flex-row gap-12'>
          <article className='lg:w-2/3'>
            <div className='prose dark:prose-invert max-w-none'>
              <ReactMarkdown components={MarkdownComponents}>{post.content}</ReactMarkdown>
            </div>
          </article>
          {/* Sidebar */}
          <aside className='lg:w-1/3 space-y-8'>
            {/* Travel Tips Card */}
            <div className='bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6'>
              <h3 className='text-xl font-bold text-primary-light dark:text-primary-dark mb-4'>
                Travel Tips
              </h3>
              <div className='space-y-4'>
                <div className='flex gap-3 items-start'>
                  <div className='bg-primary-light/10 dark:bg-primary-dark/10 p-2 rounded-lg'>
                    <CalendarIcon className='h-5 w-5 text-primary-light dark:text-primary-dark' />
                  </div>
                  <div>
                    <h4 className='font-medium text-text-light dark:text-text-dark'>
                      Best Time to Visit
                    </h4>
                    <p className='text-sm text-secondary-light dark:text-secondary-dark'>
                      Research seasonal weather patterns for your destination
                    </p>
                  </div>
                </div>
                <div className='flex gap-3 items-start'>
                  <div className='bg-primary-light/10 dark:bg-primary-dark/10 p-2 rounded-lg'>
                    <InformationCircleIcon className='h-5 w-5 text-primary-light dark:text-primary-dark' />
                  </div>
                  <div>
                    <h4 className='font-medium text-text-light dark:text-text-dark'>
                      Local Customs
                    </h4>
                    <p className='text-sm text-secondary-light dark:text-secondary-dark'>
                      Learn basic etiquette to respect local culture
                    </p>
                  </div>
                </div>
                <div className='flex gap-3 items-start'>
                  <div className='bg-primary-light/10 dark:bg-primary-dark/10 p-2 rounded-lg'>
                    <CurrencyDollarIcon className='h-5 w-5 text-primary-light dark:text-primary-dark' />
                  </div>
                  <div>
                    <h4 className='font-medium text-text-light dark:text-text-dark'>
                      Budget Planning
                    </h4>
                    <p className='text-sm text-secondary-light dark:text-secondary-dark'>
                      Allocate funds for experiences, not just accommodations
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Popular Tours Card */}
            <div className='bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6'>
              <h3 className='text-xl font-bold text-primary-light dark:text-primary-dark mb-4'>
                Popular Tours
              </h3>
              <div className='space-y-4'>
                {toursData?.tours?.map((tour) => (
                  <div key={tour.tour_id} className='flex gap-4'>
                    <img
                      src={tour.image}
                      alt={tour.name}
                      className='w-20 h-20 rounded-lg object-cover'
                    />
                    <div className='flex flex-col justify-between'>
                      <h4 className='font-medium text-text-light dark:text-text-dark'>
                        {tour.name}
                      </h4>
                      <p className='text-sm text-secondary-light dark:text-secondary-dark'>
                        {formatDate(tour.start_date)} - {formatDate(tour.end_date)}
                      </p>
                      <Link
                        to={`/tours/${tour.tour_id}`}
                        className='text-sm text-primary-light dark:text-primary-dark hover:underline mt-1 inline-block'
                      >
                        View Tour
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
};

export default BlogDetailsPage;
