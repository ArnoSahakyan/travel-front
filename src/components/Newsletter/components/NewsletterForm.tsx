import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { NewsletterFormData, newsletterSchema } from '../../../shared';
import { useSubscribeNewsletter } from '../../../hooks';

export const NewsletterForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<NewsletterFormData>({
    resolver: zodResolver(newsletterSchema),
  });

  const { mutate: subscribe, isPending } = useSubscribeNewsletter();

  const onSubmit = (data: NewsletterFormData) => {
    subscribe(data.email, {
      onSuccess: () => reset(),
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className='w-full max-w-md'>
      <div className='flex gap-x-4'>
        <label htmlFor='email' className='sr-only'>
          Email address
        </label>
        <div className='flex-1'>
          <input
            id='email'
            type='email'
            placeholder='Enter your email'
            autoComplete='email'
            className='w-full flex-auto rounded-md bg-background-light/10 px-3.5 py-2.5 text-base text-white outline outline-1 -outline-offset-1 outline-white/20 placeholder:text-white/70 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-white sm:text-sm/6'
            {...register('email')}
          />
        </div>
        <button
          type='submit'
          className='flex-none rounded-md bg-background-light px-3.5 py-2.5 text-sm font-semibold text-primary-light shadow-sm hover:bg-opacity-90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white transition-colors'
          disabled={isPending}
        >
          {isPending ? 'Subscribing...' : 'Subscribe'}
        </button>
      </div>
      {errors.email && <p className='text-sm form-error'>{errors.email.message}</p>}
      <p className='mt-6 text-sm text-white/80'>
        We respect your privacy. Unsubscribe at any time.
      </p>
    </form>
  );
};
