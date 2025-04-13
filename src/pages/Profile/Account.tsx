import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  PasswordChangeFormData,
  passwordChangeSchema,
  PersonalFormData,
  personalInfoSchema,
} from '../../shared';

export const Account = () => {
  // Personal Info Form
  const {
    register: registerPersonalInfo,
    handleSubmit: handlePersonalInfoSubmit,
    formState: { errors: personalInfoErrors, isDirty: isPersonalInfoDirty },
  } = useForm({
    resolver: zodResolver(personalInfoSchema),
    defaultValues: {
      fullName: '',
      email: '',
      phone: '',
    },
  });

  // Password Change Form
  const {
    register: registerPassword,
    handleSubmit: handlePasswordSubmit,
    formState: { errors: passwordErrors, isDirty: isPasswordDirty },
    reset: resetPasswordForm,
    watch,
  } = useForm({
    resolver: zodResolver(passwordChangeSchema),
    defaultValues: {
      currentPassword: '',
      newPassword: '',
      confirmPassword: '',
    },
  });

  const showPasswordFields =
    watch('currentPassword') || watch('newPassword') || watch('confirmPassword');

  const onPersonalInfoSubmit = (data: PersonalFormData) => {
    console.log('Personal info submitted:', data);
  };

  const onPasswordSubmit = (data: PasswordChangeFormData) => {
    console.log('Password change submitted:', data);
    resetPasswordForm();
  };

  return (
    <div className='w-full p-6 max-w-7xl space-y-8'>
      <h2 className='text-2xl font-bold text-primary-light dark:text-text-dark'>
        Account Settings
      </h2>

      {/* Personal Information Form */}
      <form onSubmit={handlePersonalInfoSubmit(onPersonalInfoSubmit)} className='space-y-6'>
        <h3 className='text-lg font-semibold text-primary-light dark:text-text-dark'>
          Personal Information
        </h3>

        <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
          <div>
            <label htmlFor='fullName' className='form-label mb-2'>
              Full Name
            </label>
            <input
              {...registerPersonalInfo('fullName')}
              className='form-input'
              placeholder='Enter your full name'
            />
            {personalInfoErrors.fullName && (
              <p className='form-error'>{personalInfoErrors.fullName.message}</p>
            )}
          </div>

          <div>
            <label htmlFor='email' className='form-label mb-2'>
              Email
            </label>
            <input
              {...registerPersonalInfo('email')}
              type='email'
              className='form-input'
              placeholder='Enter your email'
            />
            {personalInfoErrors.email && (
              <p className='form-error'>{personalInfoErrors.email.message}</p>
            )}
          </div>

          <div>
            <label htmlFor='phone' className='form-label mb-2'>
              Phone Number (Optional)
            </label>
            <input
              {...registerPersonalInfo('phone')}
              type='tel'
              className='form-input'
              placeholder='Enter your phone number'
            />
            {personalInfoErrors.phone && (
              <p className='form-error'>{personalInfoErrors.phone.message}</p>
            )}
          </div>
        </div>

        <div className='flex justify-end pt-2'>
          <button type='submit' className='form-button' disabled={!isPersonalInfoDirty}>
            Save Personal Info
          </button>
        </div>
      </form>

      {/* Password Change Form */}
      <form
        onSubmit={handlePasswordSubmit(onPasswordSubmit)}
        className='space-y-6 pt-8 border-t border-gray-200 dark:border-gray-700'
      >
        <h3 className='text-lg font-semibold text-primary-light dark:text-text-dark'>
          Change Password
        </h3>

        <div className='space-y-6'>
          <div>
            <label htmlFor='currentPassword' className='form-label mb-2'>
              Current Password
            </label>
            <input
              {...registerPassword('currentPassword')}
              type='password'
              className='form-input'
              placeholder='Enter current password'
            />
            {passwordErrors.currentPassword && (
              <p className='form-error'>{passwordErrors.currentPassword.message}</p>
            )}
          </div>

          <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
            <div>
              <label htmlFor='newPassword' className='form-label mb-2'>
                New Password
              </label>
              <input
                {...registerPassword('newPassword')}
                type='password'
                className='form-input'
                placeholder='Enter new password'
              />
              {passwordErrors.newPassword && (
                <p className='form-error'>{passwordErrors.newPassword.message}</p>
              )}
            </div>

            <div>
              <label htmlFor='confirmPassword' className='form-label mb-2'>
                Confirm New Password
              </label>
              <input
                {...registerPassword('confirmPassword')}
                type='password'
                className='form-input'
                placeholder='Confirm new password'
              />
              {passwordErrors.confirmPassword && (
                <p className='form-error'>{passwordErrors.confirmPassword.message}</p>
              )}
            </div>
          </div>
        </div>

        <div className='flex justify-end gap-4 pt-2'>
          {showPasswordFields && (
            <button
              type='button'
              onClick={() => resetPasswordForm()}
              className='form-button bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-600'
            >
              Cancel
            </button>
          )}
          <button type='submit' className='form-button' disabled={!isPasswordDirty}>
            Change Password
          </button>
        </div>
      </form>
    </div>
  );
};
