import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { ContactFormData, contactSchema } from '../../../shared';

export const ContactForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = async (data: ContactFormData) => {
    try {
      console.log('Form submitted:', data);
      reset();
    } catch (error) {
      console.error('Submission error:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className='px-6 pb-24 pt-20 sm:pb-32 lg:px-8 lg:py-48'>
      <div className='mx-auto max-w-xl lg:mr-0 lg:max-w-lg'>
        <div className='flex flex-col gap-y-6'>
          <div>
            <label htmlFor='fullName' className='form-label'>
              Full name
            </label>
            <div className='mt-2.5'>
              <input
                id='fullName'
                type='text'
                autoComplete='given-name'
                className='form-input'
                {...register('fullName')}
              />
              {errors.fullName && <p className='form-error'>{errors.fullName.message}</p>}
            </div>
          </div>

          <div className='sm:col-span-2'>
            <label htmlFor='email' className='form-label'>
              Email
            </label>
            <div className='mt-2.5'>
              <input
                id='email'
                type='email'
                autoComplete='email'
                className='form-input'
                {...register('email')}
              />
              {errors.email && <p className='form-error'>{errors.email.message}</p>}
            </div>
          </div>

          <div className='sm:col-span-2'>
            <label htmlFor='phone' className='form-label'>
              Phone number
            </label>
            <div className='mt-2.5'>
              <input
                id='phone'
                type='tel'
                autoComplete='tel'
                className='form-input'
                {...register('phone')}
              />
              {errors.phone && <p className='form-error'>{errors.phone.message}</p>}
            </div>
          </div>

          <div className='sm:col-span-2'>
            <label htmlFor='message' className='form-label'>
              Message
            </label>
            <div className='mt-2.5'>
              <textarea
                id='message'
                rows={4}
                className='form-input resize-none'
                placeholder='Tell us about your travel plans...'
                {...register('message')}
              />
              {errors.message && <p className='form-error'>{errors.message.message}</p>}
            </div>
          </div>
        </div>

        <div className='mt-8 flex justify-end'>
          <button type='submit' className='form-button' disabled={isSubmitting}>
            {isSubmitting ? 'Sending...' : 'Send Message'}
          </button>
        </div>
      </div>
    </form>
  );
};
