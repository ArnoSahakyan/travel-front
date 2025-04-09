import { Link } from 'react-router-dom';
import { ROUTES } from '../../shared';

export const SignUpPage = () => {
  return (
    <div className='flex min-h-screen flex-col justify-center bg-background-light dark:bg-background-dark px-6 py-12 lg:px-8'>
      <div className='sm:mx-auto sm:w-full sm:max-w-sm'>
        <h2 className='mt-10 text-center text-3xl font-semibold tracking-tight text-primary-light dark:text-text-dark'>
          Start your adventure
        </h2>
        <p className='mt-2 text-center text-sm text-secondary-light dark:text-secondary-dark'>
          Create your WanderLuxe account to book your next journey
        </p>
      </div>

      <div className='mt-10 sm:mx-auto sm:w-full sm:max-w-sm'>
        <form className='space-y-6'>
          <div>
            <label
              htmlFor='fullName'
              className='block text-sm font-medium text-primary-light dark:text-text-dark'
            >
              Full name
            </label>
            <div className='mt-2'>
              <input
                id='fullName'
                name='fullName'
                type='text'
                autoComplete='name'
                required
                className='block w-full rounded-md bg-white dark:bg-gray-800 px-3.5 py-2 text-base text-primary-light dark:text-text-dark outline outline-1 -outline-offset-1 outline-gray-300 dark:outline-gray-600 placeholder:text-gray-400 dark:placeholder:text-gray-500 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-primary-light dark:focus:outline-primary-dark'
              />
            </div>
          </div>

          <div>
            <label
              htmlFor='email'
              className='block text-sm font-medium text-primary-light dark:text-text-dark'
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
                className='block w-full rounded-md bg-white dark:bg-gray-800 px-3.5 py-2 text-base text-primary-light dark:text-text-dark outline outline-1 -outline-offset-1 outline-gray-300 dark:outline-gray-600 placeholder:text-gray-400 dark:placeholder:text-gray-500 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-primary-light dark:focus:outline-primary-dark'
              />
            </div>
          </div>

          <div>
            <label
              htmlFor='password'
              className='block text-sm font-medium text-primary-light dark:text-text-dark'
            >
              Password
            </label>
            <div className='mt-2'>
              <input
                id='password'
                name='password'
                type='password'
                autoComplete='new-password'
                required
                className='block w-full rounded-md bg-white dark:bg-gray-800 px-3.5 py-2 text-base text-primary-light dark:text-text-dark outline outline-1 -outline-offset-1 outline-gray-300 dark:outline-gray-600 placeholder:text-gray-400 dark:placeholder:text-gray-500 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-primary-light dark:focus:outline-primary-dark'
              />
            </div>
            <p className='mt-2 text-xs text-secondary-light dark:text-secondary-dark'>
              Password must be at least 8 characters
            </p>
          </div>

          <div>
            <label
              htmlFor='confirmPassword'
              className='block text-sm font-medium text-primary-light dark:text-text-dark'
            >
              Confirm password
            </label>
            <div className='mt-2'>
              <input
                id='confirmPassword'
                name='confirmPassword'
                type='password'
                autoComplete='new-password'
                required
                className='block w-full rounded-md bg-white dark:bg-gray-800 px-3.5 py-2 text-base text-primary-light dark:text-text-dark outline outline-1 -outline-offset-1 outline-gray-300 dark:outline-gray-600 placeholder:text-gray-400 dark:placeholder:text-gray-500 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-primary-light dark:focus:outline-primary-dark'
              />
            </div>
          </div>

          <div className='flex items-center'>
            <input
              id='terms'
              name='terms'
              type='checkbox'
              required
              className='h-4 w-4 rounded border-gray-300 dark:border-gray-600 text-primary-light dark:text-primary-dark focus:ring-primary-light dark:focus:ring-primary-dark'
            />
            <label
              htmlFor='terms'
              className='ml-3 block text-sm text-secondary-light dark:text-secondary-dark'
            >
              I agree to the{' '}
              <Link
                to={ROUTES.LEGAL}
                className='font-medium text-primary-light dark:text-primary-dark hover:text-opacity-80'
              >
                Terms of Service & Privacy Policy
              </Link>
            </label>
          </div>

          <div>
            <button
              type='submit'
              className='flex w-full justify-center rounded-md bg-primary-light dark:bg-primary-dark px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-opacity-90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-light dark:focus-visible:outline-primary-dark transition-colors'
            >
              Create account
            </button>
          </div>
        </form>

        <p className='mt-8 text-center text-sm text-secondary-light dark:text-secondary-dark'>
          Already have an account?{' '}
          <Link
            to={ROUTES.SIGNIN}
            className='font-semibold text-primary-light dark:text-primary-dark hover:text-opacity-80 transition-colors'
          >
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
};
