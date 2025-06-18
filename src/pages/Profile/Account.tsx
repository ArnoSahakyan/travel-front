import { ProfileSubscriptionForm, InfoForm, PasswordChangeForm } from './components';

const Account = () => {
  return (
    <div className='w-full p-6 max-w-7xl space-y-8'>
      <h2 className='text-2xl font-bold text-primary-light dark:text-text-dark'>
        Account Settings
      </h2>

      <InfoForm />

      <ProfileSubscriptionForm />

      <PasswordChangeForm />
    </div>
  );
};

export default Account;
