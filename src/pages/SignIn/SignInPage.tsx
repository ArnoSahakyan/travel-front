import { Link } from 'react-router-dom';
import { ROUTES } from '../../shared';

export const SingInPage = () => {
  return (
    <div className='flex justify-center items-center min-h-screen flex-col bg-background-light dark:bg-background-dark px-6 py-12 lg:px-8'>
      <div className='w-full max-w-md space-y-8 rounded-xl bg-white dark:bg-gray-800/50 p-8 shadow-lg'>
        <div className='sm:mx-auto sm:w-full sm:max-w-sm'>
          <h2 className='text-center text-3xl font-semibold tracking-tight text-primary-light dark:text-text-dark'>
            Welcome back
          </h2>
          <p className='mt-2 text-center text-sm text-secondary-light dark:text-secondary-dark'>
            Sign in to access your WanderLuxe account
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
              <div className='flex items-center justify-between'>
                <label htmlFor='password' className='form-label'>
                  Password
                </label>
                <div className='text-sm'>
                  <Link
                    to={ROUTES.HOME}
                    className='font-medium text-primary-light dark:text-primary-dark hover:text-opacity-80'
                  >
                    Forgot password?
                  </Link>
                </div>
              </div>
              <div className='mt-2'>
                <input
                  id='password'
                  name='password'
                  type='password'
                  autoComplete='current-password'
                  required
                  className='form-input'
                />
              </div>
            </div>

            <div>
              <button type='submit' className='form-button w-full'>
                Sign in
              </button>
            </div>
          </form>

          <p className='mt-8 text-center text-sm text-secondary-light dark:text-secondary-dark'>
            Don't have an account?{' '}
            <Link
              to={ROUTES.SIGNUP}
              className='font-semibold text-primary-light dark:text-primary-dark hover:text-opacity-80 transition-colors'
            >
              Create now
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};
