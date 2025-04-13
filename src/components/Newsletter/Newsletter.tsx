import { NewsletterContent, NewsletterForm } from './components';

export const Newsletter = () => {
  return (
    <div className='py-16 sm:py-24'>
      <div className='mx-auto max-w-7xl sm:px-6 lg:px-8'>
        <div className='relative isolate flex flex-col gap-10 overflow-hidden bg-primary-light dark:bg-primary-dark/40 px-6 py-16 shadow-lg sm:rounded-2xl sm:px-16 xl:flex-row xl:items-center xl:py-24'>
          <NewsletterContent />
          <NewsletterForm />
        </div>
      </div>
    </div>
  );
};
