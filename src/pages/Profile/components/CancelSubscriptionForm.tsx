import {
  useNewsletterStatus,
  useSubscribeNewsletter,
  useToast,
  useUnsubscribeNewsletter,
} from '../../../hooks';
import { useAuthStore } from '../../../store';

export const CancelSubscriptionForm = () => {
  const { data, isLoading: isNewsletterLoading } = useNewsletterStatus();
  const { mutate: unsubscribe, isPending: isUnsubscribing } = useUnsubscribeNewsletter();
  const { mutate: subscribe, isPending: isSubscribing } = useSubscribeNewsletter();
  const user = useAuthStore((state) => state.user);
  const { showError } = useToast();

  const handleSubscribe = () => {
    if (!user?.email) {
      showError('No email found to subscribe with.');
      return;
    }

    subscribe(user.email);
  };

  return (
    <div className='pt-8 border-t border-gray-200 dark:border-gray-700 space-y-4'>
      <h3 className='text-lg font-semibold text-primary-light dark:text-text-dark'>Newsletter</h3>

      {isNewsletterLoading ? (
        <p className='text-gray-500 dark:text-gray-400'>Checking subscription status...</p>
      ) : data?.subscribed ? (
        <div className='flex flex-col justify-between sm:flex-row sm:items-center gap-4'>
          <p className='text-text-light dark:text-text-dark'>
            You are subscribed to our newsletter.
          </p>
          <button
            onClick={() => unsubscribe()}
            disabled={isUnsubscribing}
            className='form-button w-1/2 bg-red-100 text-red-700 hover:bg-red-200 dark:bg-red-800 dark:text-white dark:hover:bg-red-700'
          >
            {isUnsubscribing ? 'Unsubscribing...' : 'Unsubscribe'}
          </button>
        </div>
      ) : (
        <div className='flex flex-col justify-between sm:flex-row sm:items-center gap-4'>
          <p className='text-text-light dark:text-text-dark'>
            You are not subscribed to the newsletter.
          </p>
          <button
            onClick={handleSubscribe}
            disabled={isSubscribing}
            className='form-button w-1/2 bg-green-100 text-green-700 hover:bg-green-200 dark:bg-green-800 dark:text-white dark:hover:bg-green-700'
          >
            {isSubscribing ? 'Subscribing...' : 'Subscribe'}
          </button>
        </div>
      )}
    </div>
  );
};
