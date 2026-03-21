import { PasswordChangeForm, ProfileSubscriptionForm } from './components';

const SecurityPage = () => {
  return (
    <div className='w-full p-6 max-w-7xl space-y-12'>
      <div>
        <h2 className='text-2xl font-bold text-primary-light dark:text-text-dark'>
          Security & Privacy
        </h2>
        <p className='mt-1 text-sm text-secondary-light dark:text-secondary-dark'>
          Manage your account security and communication preferences.
        </p>
      </div>

      <section>
        <div className='mb-6'>
          <h3 className='text-lg font-medium text-primary-light dark:text-text-dark'>
            Change Password
          </h3>
          <p className='text-sm text-secondary-light dark:text-secondary-dark font-normal'>
            Update your password to keep your account secure.
          </p>
        </div>
        <PasswordChangeForm />
      </section>

      <section className='pt-8 border-t border-gray-100 dark:border-gray-800'>
        <div className='mb-6'>
          <h3 className='text-lg font-medium text-primary-light dark:text-text-dark'>
            Newsletter & Notifications
          </h3>
          <p className='text-sm text-secondary-light dark:text-secondary-dark font-normal'>
            Manage how we contact you about new tours and offers.
          </p>
        </div>
        <ProfileSubscriptionForm />
      </section>
    </div>
  );
};

export default SecurityPage;
