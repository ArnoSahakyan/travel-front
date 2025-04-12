import { Link } from 'react-router-dom';
import { ROUTES } from '../../shared';

export const ForgotPasswordPage = () => {
  return (
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
        <form className='space-y-6'>
          <div>
            <label htmlFor='email' className='form-label'>
              Email address
            </label>
            <div className='mt-2'>
              <input
                id='email'
                name='email'
                type='email'
                autoComplete='email'
                required
                className='form-input'
              />
            </div>
          </div>

          <div>
            <button type='submit' className='form-button w-full'>
              Send Reset Link
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
  );
};
