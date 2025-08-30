import { DestinationForm } from './components';
import { useParams } from 'react-router-dom';

const UpdateDestinationPage = () => {
  const { destinationId } = useParams<{ destinationId: string }>();

  if (!destinationId) return null;

  return (
    <div className='p-6'>
      <DestinationForm destinationId={Number(destinationId)} />
    </div>
  );
};

export default UpdateDestinationPage;
