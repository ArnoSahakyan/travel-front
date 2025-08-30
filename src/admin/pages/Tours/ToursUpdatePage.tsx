import { TourForm } from './components';
import { useParams } from 'react-router-dom';

const UpdateDestinationPage = () => {
  const { tourId } = useParams<{ tourId: string }>();

  if (!tourId) return null;

  return (
    <div className='p-6'>
      <TourForm tourId={Number(tourId)} />
    </div>
  );
};

export default UpdateDestinationPage;
