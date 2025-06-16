import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { ContactFormData, contactSchema } from '../../../shared';
import { useSendContactMessage } from '../../../hooks';

export const ContactForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  });

  const { mutate: sendMessage, isPending } = useSendContactMessage();

  const onSubmit = (data: ContactFormData) => {
    sendMessage(data, {
      onSuccess: () => reset(),
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className='px-6 pb-24 pt-20 sm:pb-32 lg:px-8 lg:py-48'>
      <div className='mx-auto max-w-xl lg:mr-0 lg:max-w-lg'>
        <div className='flex flex-col gap-y-6'>
          <div>
            <label htmlFor='full_name' className='form-label'>
              Full name
            </label>
            <div className='mt-2.5'>
              <input
                id='full_name'
                type='text'
                autoComplete='given-name'
                className='form-input'
                {...register('full_name')}
              />
              {errors.full_name && <p className='form-error'>{errors.full_name.message}</p>}
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
            <label htmlFor='phone_number' className='form-label'>
              Phone number
            </label>
            <div className='mt-2.5'>
              <input
                id='phone_number'
                type='tel'
                autoComplete='tel'
                className='form-input'
                {...register('phone_number')}
              />
              {errors.phone_number && <p className='form-error'>{errors.phone_number.message}</p>}
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
          <button type='submit' className='form-button' disabled={isPending}>
            {isPending ? 'Sending...' : 'Send Message'}
          </button>
        </div>
      </div>
    </form>
  );
};
