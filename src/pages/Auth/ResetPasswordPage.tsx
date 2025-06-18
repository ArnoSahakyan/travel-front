import { useSearchParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { ResetPasswordFormData, resetPasswordSchema } from '../../shared';
import { useResetPassword } from '../../hooks';

const ResetPasswordPage = () => {
  const [params] = useSearchParams();
  const token = params.get('token');

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ResetPasswordFormData>({
    resolver: zodResolver(resetPasswordSchema),
  });

  const { mutate: resetPassword, isPending } = useResetPassword();

  const onSubmit = (data: ResetPasswordFormData) => {
    if (!token) return;
    resetPassword({ ...data, token });
  };

  return (
    <div className='flex min-h-screen items-center justify-center bg-background-light dark:bg-background-dark px-4 py-12 sm:px-6 lg:px-8'>
      <div className='w-full max-w-md space-y-8 rounded-xl bg-white dark:bg-gray-800/50 p-8 shadow-lg'>
        <div className='sm:mx-auto sm:w-full sm:max-w-sm'>
          <h2 className='text-center text-3xl font-semibold tracking-tight text-primary-light dark:text-text-dark'>
            Set New Password
          </h2>
          <p className='mt-2 text-center text-sm text-secondary-light dark:text-secondary-dark'>
            Enter your new password to reset your account
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className='space-y-6'>
          <div>
            <label htmlFor='new_password' className='form-label'>
              New Password
            </label>
            <input
              id='new_password'
              type='password'
              className='form-input'
              {...register('new_password')}
            />
            {errors.new_password && <p className='form-error'>{errors.new_password.message}</p>}
          </div>

          <div>
            <label htmlFor='confirm_password' className='form-label'>
              Confirm Password
            </label>
            <input
              id='confirm_password'
              type='password'
              className='form-input'
              {...register('confirm_password')}
            />
            {errors.confirm_password && (
              <p className='form-error'>{errors.confirm_password.message}</p>
            )}
          </div>

          <div>
            <button type='submit' className='form-button w-full' disabled={isPending || !token}>
              {isPending ? 'Resetting...' : 'Reset Password'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ResetPasswordPage;
