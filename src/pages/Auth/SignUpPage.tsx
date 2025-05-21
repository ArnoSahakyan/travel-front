import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Link, useNavigate } from 'react-router-dom';
import { ROUTES, SignUpFormData, signUpSchema } from '../../shared';
import { useSignUp } from '../../hooks';
import { toast } from 'react-toastify';
import { AxiosError } from 'axios';

const SignUpPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignUpFormData>({
    resolver: zodResolver(signUpSchema),
  });

  const navigate = useNavigate();

  const { mutate: signUp, isPending } = useSignUp();

  const onSubmit = (data: SignUpFormData) => {
    signUp(data, {
      onSuccess: () => {
        toast.success('Successfully signed in!');
        navigate(ROUTES.AUTH + ROUTES.SIGNIN);
      },
      onError: (error: Error) => {
        const message = error instanceof AxiosError ? error.response?.data?.message : error.message;
        toast.error(message);
      },
    });
  };

  return (
    <div className='w-full max-w-md space-y-8 rounded-xl bg-white dark:bg-gray-800/50 p-8 shadow-lg'>
      <div className='text-center'>
        <h2 className='text-3xl font-bold tracking-tight text-primary-light dark:text-text-dark'>
          Start your adventure
        </h2>
        <p className='mt-2 text-sm text-secondary-light dark:text-secondary-dark'>
          Create your WanderLuxe account to book your next journey
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className='mt-8 space-y-6'>
        <div className='space-y-4'>
          <div>
            <label htmlFor='full_name' className='form-label'>
              Full name
            </label>
            <div className='mt-1'>
              <input
                id='full_name'
                type='text'
                autoComplete='name'
                className='form-input'
                {...register('full_name')}
              />
              {errors.full_name && <p className='form-error'>{errors.full_name.message}</p>}
            </div>
          </div>

          <div>
            <label htmlFor='email' className='form-label'>
              Email address
            </label>
            <div className='mt-1'>
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
            <label htmlFor='password' className='form-label'>
              Password
            </label>
            <div className='mt-1'>
              <input
                id='password'
                type='password'
                autoComplete='new-password'
                className='form-input'
                {...register('password')}
              />
              {errors.password ? (
                <p className='form-error'>{errors.password.message}</p>
              ) : (
                <p className='mt-1 text-xs text-secondary-light dark:text-secondary-dark'>
                  Password must be at least 8 characters
                </p>
              )}
            </div>
          </div>

          <div>
            <label htmlFor='confirmPassword' className='form-label'>
              Confirm password
            </label>
            <div className='mt-1'>
              <input
                id='confirmPassword'
                type='password'
                autoComplete='new-password'
                className='form-input'
                {...register('confirm_password')}
              />
              {errors.confirm_password && (
                <p className='form-error'>{errors.confirm_password.message}</p>
              )}
            </div>
          </div>

          <div className='flex items-start gap-2'>
            <input
              id='terms'
              type='checkbox'
              className='form-checkbox mt-1'
              {...register('terms')}
            />
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
          {errors.terms && <p className='form-error'>{errors.terms.message}</p>}
        </div>

        <div>
          <button type='submit' className='form-button w-full' disabled={isPending}>
            {isPending ? 'Creating account...' : 'Create account'}
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
  );
};

export default SignUpPage;
