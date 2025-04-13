import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Link } from 'react-router-dom';
import { ForgotPasswordFormData, forgotPasswordSchema, ROUTES } from '../../shared';

export const ForgotPasswordPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ForgotPasswordFormData>({
    resolver: zodResolver(forgotPasswordSchema),
  });

  const onSubmit = (data: ForgotPasswordFormData) => {
    console.log('Password reset requested for:', data.email);
    // TODO: Add your password reset logic here
  };

  return (
    <div className='flex min-h-screen items-center justify-center bg-background-light dark:bg-background-dark px-4 py-12 sm:px-6 lg:px-8'>
      <div className='w-full max-w-md space-y-8 rounded-xl bg-white dark:bg-gray-800/50 p-8 shadow-lg'>
        <div className='sm:mx-auto sm:w-full sm:max-w-sm'>
          <h2 className='text-center text-3xl font-semibold tracking-tight text-primary-light dark:text-text-dark'>
            Reset Password
          </h2>
          <p className='mt-2 text-center text-sm text-secondary-light dark:text-secondary-dark'>
            Enter your email to receive a password reset link
          </p>
        </div>

        <div className='mt-10 sm:mx-auto sm:w-full sm:max-w-sm'>
          <form onSubmit={handleSubmit(onSubmit)} className='space-y-6'>
            <div>
              <label htmlFor='email' className='form-label'>
                Email address
              </label>
              <div className='mt-2'>
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

            <div>
              <button type='submit' className='form-button w-full' disabled={isSubmitting}>
                {isSubmitting ? 'Sending...' : 'Send Reset Link'}
              </button>
            </div>
          </form>

          <p className='mt-8 text-center text-sm text-secondary-light dark:text-secondary-dark'>
            Remember your password?{' '}
            <Link
              to={ROUTES.AUTH + ROUTES.SIGNIN}
              className='font-semibold text-primary-light dark:text-primary-dark hover:text-opacity-80 transition-colors'
            >
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};
