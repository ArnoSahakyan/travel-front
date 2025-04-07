import { Link } from 'react-router-dom';
import { ROUTES } from '../../shared';

export const SingInPage = () => {
  return (
    <div className='flex min-h-screen flex-col justify-center bg-background-light dark:bg-background-dark px-6 py-12 lg:px-8'>
      <div className='sm:mx-auto sm:w-full sm:max-w-sm'>
        <h2 className='mt-10 text-center text-3xl font-semibold tracking-tight text-text-light dark:text-text-dark'>
          Welcome back
        </h2>
        <p className='mt-2 text-center text-sm text-secondary-light dark:text-secondary-dark'>
          Sign in to access your WanderLuxe account
        </p>
      </div>

      <div className='mt-10 sm:mx-auto sm:w-full sm:max-w-sm'>
        <form className='space-y-6'>
          <div>
            <label
              htmlFor='email'
              className='block text-sm font-medium text-text-light dark:text-text-dark'
            >
              Email address
            </label>
            <div className='mt-2'>
              <input
                id='email'
                name='email'
                type='email'
                autoComplete='email'
                required
                className='block w-full rounded-md bg-white dark:bg-gray-800 px-3.5 py-2 text-base text-text-light dark:text-text-dark outline outline-1 -outline-offset-1 outline-gray-300 dark:outline-gray-600 placeholder:text-gray-400 dark:placeholder:text-gray-500 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-primary-light dark:focus:outline-primary-dark'
              />
            </div>
          </div>

          <div>
            <div className='flex items-center justify-between'>
              <label
                htmlFor='password'
                className='block text-sm font-medium text-text-light dark:text-text-dark'
              >
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
                className='block w-full rounded-md bg-white dark:bg-gray-800 px-3.5 py-2 text-base text-text-light dark:text-text-dark outline outline-1 -outline-offset-1 outline-gray-300 dark:outline-gray-600 placeholder:text-gray-400 dark:placeholder:text-gray-500 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-primary-light dark:focus:outline-primary-dark'
              />
            </div>
          </div>

          <div>
            <button
              type='submit'
              className='flex w-full justify-center rounded-md bg-primary-light dark:bg-primary-dark px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-opacity-90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-light dark:focus-visible:outline-primary-dark transition-colors'
            >
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
  );
};
