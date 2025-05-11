import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  PasswordChangeFormData,
  passwordChangeSchema,
  PersonalFormData,
  personalInfoSchema,
} from '../../shared';
import { useAuthStore } from '../../store';
import { useEffect } from 'react';
import { useAccount } from '../../hooks';

const Account = () => {
  const user = useAuthStore((state) => state.user);
  const { updatePersonalInfo, changePassword } = useAccount();

  // Personal Info Form
  const {
    register: registerPersonalInfo,
    handleSubmit: handlePersonalInfoSubmit,
    formState: { errors: personalInfoErrors, isDirty: isPersonalInfoDirty },
    reset: resetPersonalInfoForm,
  } = useForm<PersonalFormData>({
    resolver: zodResolver(personalInfoSchema),
    defaultValues: {
      full_name: '',
      email: '',
      phone: '',
    },
  });

  useEffect(() => {
    if (user) {
      resetPersonalInfoForm({
        full_name: user.full_name || '',
        email: user.email || '',
        phone: user.phone || '',
      });
    }
  }, [user, resetPersonalInfoForm]);

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
      current_password: '',
      new_password: '',
      confirm_password: '',
    },
  });

  const showPasswordFields =
    watch('current_password') || watch('new_password') || watch('confirm_password');

  const onPersonalInfoSubmit = (data: PersonalFormData) => {
    updatePersonalInfo(data);
  };

  const onPasswordSubmit = (data: PasswordChangeFormData) => {
    const { current_password, new_password } = data;
    changePassword({ current_password, new_password });
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
            <label htmlFor='full_name' className='form-label mb-2'>
              Full Name
            </label>
            <input
              {...registerPersonalInfo('full_name')}
              className='form-input'
              placeholder='Enter your full name'
            />
            {personalInfoErrors.full_name && (
              <p className='form-error'>{personalInfoErrors.full_name.message}</p>
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
            <label htmlFor='current_password' className='form-label mb-2'>
              Current Password
            </label>
            <input
              {...registerPassword('current_password')}
              type='password'
              className='form-input'
              placeholder='Enter current password'
            />
            {passwordErrors.current_password && (
              <p className='form-error'>{passwordErrors.current_password.message}</p>
            )}
          </div>

          <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
            <div>
              <label htmlFor='new_password' className='form-label mb-2'>
                New Password
              </label>
              <input
                {...registerPassword('new_password')}
                type='password'
                className='form-input'
                placeholder='Enter new password'
              />
              {passwordErrors.new_password && (
                <p className='form-error'>{passwordErrors.new_password.message}</p>
              )}
            </div>

            <div>
              <label htmlFor='confirm_password' className='form-label mb-2'>
                Confirm New Password
              </label>
              <input
                {...registerPassword('confirm_password')}
                type='password'
                className='form-input'
                placeholder='Confirm new password'
              />
              {passwordErrors.confirm_password && (
                <p className='form-error'>{passwordErrors.confirm_password.message}</p>
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

export default Account;
