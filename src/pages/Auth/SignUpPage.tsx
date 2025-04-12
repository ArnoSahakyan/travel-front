import { Link } from 'react-router-dom';
import { ROUTES } from '../../shared';

export const SignUpPage = () => {
  return (
    <div className='flex min-h-screen items-center justify-center bg-background-light dark:bg-background-dark px-4 py-12 sm:px-6 lg:px-8'>
      <div className='w-full max-w-md space-y-8 rounded-xl bg-white dark:bg-gray-800/50 p-8 shadow-lg'>
        <div className='text-center'>
          <h2 className='text-3xl font-bold tracking-tight text-primary-light dark:text-text-dark'>
            Start your adventure
          </h2>
          <p className='mt-2 text-sm text-secondary-light dark:text-secondary-dark'>
            Create your WanderLuxe account to book your next journey
          </p>
        </div>

        <form className='mt-8 space-y-6'>
          <div className='space-y-4'>
            <div>
              <label htmlFor='fullName' className='form-label'>
                Full name
              </label>
              <div className='mt-1'>
                <input
                  id='fullName'
                  name='fullName'
                  type='text'
                  autoComplete='name'
                  required
                  className='form-input'
                />
              </div>
            </div>

            <div>
              <label htmlFor='email' className='form-label'>
                Email address
              </label>
              <div className='mt-1'>
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
              <label htmlFor='password' className='form-label'>
                Password
              </label>
              <div className='mt-1'>
                <input
                  id='password'
                  name='password'
                  type='password'
                  autoComplete='new-password'
                  required
                  className='form-input'
                />
              </div>
              <p className='mt-1 text-xs text-secondary-light dark:text-secondary-dark'>
                Password must be at least 8 characters
              </p>
            </div>

            <div>
              <label htmlFor='confirmPassword' className='form-label'>
                Confirm password
              </label>
              <div className='mt-1'>
                <input
                  id='confirmPassword'
                  name='confirmPassword'
                  type='password'
                  autoComplete='new-password'
                  required
                  className='form-input'
                />
              </div>
            </div>

            <div className='flex items-center gap-2'>
              <input id='terms' name='terms' type='checkbox' required className='form-checkbox' />
              <label htmlFor='terms' className='form-label'>
                I agree to the{' '}
                <Link
                  to={ROUTES.LEGAL}
                  className='font-medium text-primary-light dark:text-primary-dark hover:text-opacity-80'
                >
                  Terms of Service & Privacy Policy
                </Link>
              </label>
            </div>
          </div>

          <div>
            <button type='submit' className='form-button w-full'>
              Create account
            </button>
          </div>
        </form>

        <div className='text-center text-sm text-secondary-light dark:text-secondary-dark'>
          <p>
            Already have an account?{' '}
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
