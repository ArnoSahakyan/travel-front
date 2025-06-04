import { useForm } from 'react-hook-form';
import { PersonalFormData, personalInfoSchema } from '../../../shared';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect } from 'react';
import { useAuthStore } from '../../../store';
import { useAccount } from '../../../hooks';

export const InfoForm = () => {
  const user = useAuthStore((state) => state.user);
  const { updatePersonalInfo } = useAccount();

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
      phone_number: '',
    },
  });

  const onPersonalInfoSubmit = (data: PersonalFormData) => {
    updatePersonalInfo(data);
  };

  useEffect(() => {
    if (user) {
      resetPersonalInfoForm({
        full_name: user.full_name || '',
        email: user.email || '',
        phone_number: user.phone_number || '',
      });
    }
  }, [user, resetPersonalInfoForm]);

  return (
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
          <label htmlFor='phone_number' className='form-label mb-2'>
            Phone Number (Optional)
          </label>
          <input
            {...registerPersonalInfo('phone_number')}
            type='tel'
            className='form-input'
            placeholder='Enter your phone_number number'
          />
          {personalInfoErrors.phone_number && (
            <p className='form-error'>{personalInfoErrors.phone_number.message}</p>
          )}
        </div>
      </div>

      <div className='flex justify-end pt-2'>
        <button type='submit' className='form-button' disabled={!isPersonalInfoDirty}>
          Save Personal Info
        </button>
      </div>
    </form>
  );
};
