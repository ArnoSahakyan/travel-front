import { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useConfirmNewsletter } from '../../hooks';

const ConfirmNewsletter = () => {
  const [params] = useSearchParams();
  const token = params.get('token');
  const { mutate: confirm, isPending, isSuccess, isError } = useConfirmNewsletter();

  useEffect(() => {
    if (token) {
      confirm(token);
    }
  }, [token]);

  return (
    <div className='max-w-lg mx-auto py-20 text-center text-white'>
      <h1 className='text-2xl font-semibold mb-4'>Confirming your subscription...</h1>
      {isPending && <p>Verifying your email. Please wait...</p>}
      {isSuccess && <p className='text-green-400 mt-4'>✅ Subscription confirmed. Thank you!</p>}
      {isError && (
        <p className='text-red-400 mt-4'>
          ❌ Confirmation failed. Token might be invalid or expired.
        </p>
      )}
    </div>
  );
};

export default ConfirmNewsletter;
