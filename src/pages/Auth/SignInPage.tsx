import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Link, useNavigate } from 'react-router-dom';
import { AuthErrorResponse, ROUTES } from '../../shared';
import { SignInFormData, signInSchema } from '../../shared';
import { Bounce, toast, ToastContainer } from 'react-toastify';
import { useSignIn } from '../../hooks';
import { isAxiosError } from 'axios';

const SignInPage = () => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignInFormData>({
    resolver: zodResolver(signInSchema),
  });

  const { mutate: signIn, isPending } = useSignIn();

  const onSubmit = (data: SignInFormData) => {
    signIn(data, {
      onSuccess: () => {
        toast.success('Successfully signed in!');
        navigate(ROUTES.HOME);
      },
      onError: (error: unknown) => {
        let message = 'Invalid credentials. Please try again.';

        if (isAxiosError<AuthErrorResponse>(error)) {
          message = error.response?.data?.message ?? message;
        }

        toast.error(message);
      },
    });
  };

  return (
    <>
      <ToastContainer
        position='top-right'
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={true}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme='light'
        transition={Bounce}
      />
      <div className='max-w-md space-y-8 rounded-xl bg-white dark:bg-gray-800/50 p-8 shadow-lg'>
        <div className='sm:mx-auto sm:w-full sm:max-w-sm'>
          <h2 className='text-center text-3xl font-semibold tracking-tight text-primary-light dark:text-text-dark'>
            Welcome back
          </h2>
          <p className='mt-2 text-center text-sm text-secondary-light dark:text-secondary-dark'>
            Sign in to access your WanderLuxe account
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
              <div className='flex items-center justify-between'>
                <label htmlFor='password' className='form-label'>
                  Password
                </label>
                <div className='text-sm'>
                  <Link
                    to={ROUTES.AUTH + ROUTES.FORGOT_PASSWORD}
                    className='font-medium text-primary-light dark:text-primary-dark hover:text-opacity-80'
                  >
                    Forgot password?
                  </Link>
                </div>
              </div>
              <div className='mt-2'>
                <input
                  id='password'
                  type='password'
                  autoComplete='current-password'
                  className='form-input'
                  {...register('password')}
                />
                {errors.password && <p className='form-error'>{errors.password.message}</p>}
              </div>
            </div>

            <div>
              <button type='submit' className='form-button w-full' disabled={isPending}>
                {isPending ? 'Signing in...' : 'Sign in'}
              </button>
            </div>
          </form>

          <p className='mt-8 text-center text-sm text-secondary-light dark:text-secondary-dark'>
            Don't have an account?{' '}
            <Link
              to={ROUTES.AUTH + ROUTES.SIGNUP}
              className='font-semibold text-primary-light dark:text-primary-dark hover:text-opacity-80 transition-colors'
            >
              Create now
            </Link>
          </p>
        </div>
      </div>
    </>
  );
};

export default SignInPage;
