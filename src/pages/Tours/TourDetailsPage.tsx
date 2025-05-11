import { useParams } from 'react-router-dom';
import { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Swiper as SwiperClass } from 'swiper/types';
import { FreeMode, Thumbs } from 'swiper/modules';
import { PhotoProvider, PhotoView } from 'react-photo-view';
import { useTour, useWishlist } from '../../hooks';
import { getDuration, addSupabaseUrl } from '../../utils';
import { HeartIcon } from '@heroicons/react/24/outline';
import { HeartIcon as HeartIconSolid } from '@heroicons/react/24/solid';

const TourDetailsPage = () => {
  const { tourId } = useParams<{ tourId: string }>();
  const id = parseInt(tourId || '', 10);

  const { data: tour, isLoading, isError } = useTour(id);
  const [thumbsSwiper, setThumbsSwiper] = useState<SwiperClass | null>(null);
  const {
    inWishlist,
    isLoading: wishlistLoading,
    handleAddToWishlist,
    handleRemoveFromWishlist,
  } = useWishlist(id);

  if (isLoading) return <div>Loading...</div>;
  if (isError || !tour) return <div>Tour not found</div>;

  const images = tour.TourImages.map((img) => addSupabaseUrl(img.image_url, 'tour-images'));

  return (
    <section className='py-12 bg-background-light dark:bg-background-dark'>
      <div className='container mx-auto px-4 lg:px-8 grid grid-cols-1 md:grid-cols-2 gap-12'>
        {/* IMAGE GALLERY */}
        <PhotoProvider>
          <div>
            <Swiper
              spaceBetween={10}
              thumbs={{ swiper: thumbsSwiper }}
              modules={[FreeMode, Thumbs]}
              className='mb-4 rounded-lg overflow-hidden'
            >
              {images.map((src, index) => (
                <SwiperSlide key={index}>
                  <PhotoView src={src}>
                    <img
                      src={src}
                      alt={`Tour ${index + 1}`}
                      className='h-[400px] w-full object-cover rounded-lg cursor-zoom-in'
                    />
                  </PhotoView>
                </SwiperSlide>
              ))}
            </Swiper>

            <Swiper
              onSwiper={setThumbsSwiper}
              spaceBetween={10}
              slidesPerView={4}
              freeMode={true}
              watchSlidesProgress
              modules={[FreeMode, Thumbs]}
              className='rounded-lg'
            >
              {images.map((src, index) => (
                <SwiperSlide key={index}>
                  <img
                    src={src}
                    alt={`Thumb ${index + 1}`}
                    className='h-20 w-full object-cover rounded-md cursor-pointer border'
                  />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </PhotoProvider>

        {/* TOUR DETAILS */}
        <div className='space-y-5'>
          <h1 className='text-3xl font-bold text-primary-light dark:text-text-dark'>{tour.name}</h1>

          <p className='text-secondary-light dark:text-secondary-dark text-lg'>
            {tour.description}
          </p>

          <div className='grid grid-cols-1 sm:grid-cols-2 gap-4 text-secondary-light dark:text-secondary-dark text-sm'>
            <div>
              <span className='font-semibold text-text-light dark:text-text-dark'>Start Date:</span>{' '}
              {new Date(tour.start_date).toLocaleDateString()}
            </div>
            <div>
              <span className='font-semibold text-text-light dark:text-text-dark'>End Date:</span>{' '}
              {new Date(tour.end_date).toLocaleDateString()}
            </div>
            <div>
              <span className='font-semibold text-text-light dark:text-text-dark'>Duration:</span>{' '}
              {getDuration(tour.start_date, tour.end_date)} days
            </div>
            <div>
              <span className='font-semibold text-text-light dark:text-text-dark'>
                Available Spots:
              </span>{' '}
              {tour.available_spots}
            </div>
            <div>
              <span className='font-semibold text-text-light dark:text-text-dark'>
                Destination:
              </span>{' '}
              {tour.Destination?.name}
            </div>
            <div>
              <span className='font-semibold text-text-light dark:text-text-dark'>Category:</span>{' '}
              {tour.TourCategory?.name || 'N/A'}
            </div>
          </div>

          <p className='text-xl font-semibold text-primary-light dark:text-text-dark mt-4'>
            Price: <span className='text-primary-light dark:text-primary-dark'>${tour.price}</span>
          </p>

          <div className='mt-6 flex flex-wrap justify-between items-center gap-4'>
            <button className='px-6 py-3 bg-primary-light text-white rounded-md hover:bg-primary-dark transition'>
              Book Now
            </button>

            <button
              onClick={inWishlist ? handleRemoveFromWishlist : handleAddToWishlist}
              disabled={wishlistLoading}
              className={`flex items-center gap-2 px-4 py-2 border ${
                inWishlist
                  ? 'border-red-500 text-red-500 hover:bg-red-500 hover:text-white'
                  : 'border-gray-500 text-gray-700 hover:bg-gray-100'
              } rounded-md transition`}
            >
              {inWishlist ? (
                <HeartIconSolid className='w-5 h-5' />
              ) : (
                <HeartIcon className='w-5 h-5' />
              )}
              {inWishlist ? 'Wishlisted' : 'Add to Wishlist'}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TourDetailsPage;
