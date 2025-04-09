import { BlogCard } from '../../components';
import { blogs } from '../../assets';

export const BlogPage = () => {
  return (
    <div className='bg-background-light dark:bg-background-dark py-12 sm:py-16'>
      <div className='mx-auto max-w-7xl px-6 lg:px-8'>
        <div className='mx-auto max-w-2xl text-center mb-16'>
          <h1 className='text-balance text-4xl font-semibold tracking-tight text-primary-light dark:text-text-dark sm:text-5xl'>
            WanderLuxe Journal
          </h1>
          <p className='mt-4 text-lg text-secondary-light dark:text-secondary-dark'>
            Travel stories, tips, and inspiration from our team and community
          </p>
        </div>

        <div className='mx-auto grid max-w-2xl grid-cols-1 gap-8 sm:gap-10 sm:grid-cols-2 lg:mx-0 lg:max-w-none lg:grid-cols-3'>
          {blogs.map((post) => (
            <BlogCard key={post.id} post={post} />
          ))}
        </div>

        <div className='mt-16 flex justify-center'>
          <nav className='flex gap-4'>
            <button className='px-4 py-2 rounded-md bg-primary-light dark:bg-primary-dark text-white hover:bg-opacity-90 transition-colors'>
              Previous
            </button>
            <button className='px-4 py-2 rounded-md bg-primary-light dark:bg-primary-dark text-white hover:bg-opacity-90 transition-colors'>
              Next
            </button>
          </nav>
        </div>
      </div>
    </div>
  );
};
