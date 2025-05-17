import { useWishlistList } from '../../hooks';
import { TourCard } from '../../components';
import { getDuration } from '../../utils';

const WishlistsPage = () => {
  const { data, isLoading, isError } = useWishlistList();

  if (isLoading) return <p>Loading wishlist...</p>;
  if (isError) return <p>Failed to load wishlist.</p>;

  return (
    <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'>
      {data?.wishlists?.map((item) => (
        <TourCard
          key={item.tour.tour_id}
          id={item.tour.tour_id}
          title={item.tour.name}
          description={item.tour.description}
          imageUrl={item.tour.image}
          price={item.tour.price}
          duration={getDuration(item.tour.start_date, item.tour.end_date)}
        />
      ))}
    </div>
  );
};

export default WishlistsPage;
