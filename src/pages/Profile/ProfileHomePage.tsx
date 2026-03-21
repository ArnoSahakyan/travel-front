import { useEffect, useState } from 'react';
import { getUserStats, UserStats } from '../../api';
import { Loader } from '../../components';
import {
  TicketIcon,
  StarIcon,
  HeartIcon,
  UserCircleIcon,
  ChevronRightIcon,
} from '@heroicons/react/24/outline';
import { Link } from 'react-router-dom';
import { ROUTES } from '../../shared';
import { useAuthStore } from '../../store';

const ProfileHomePage = () => {
  const [data, setData] = useState<UserStats | null>(null);
  const [loading, setLoading] = useState(true);
  const { user } = useAuthStore();

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const statsData = await getUserStats();
        setData(statsData);
      } catch (error) {
        console.error('Failed to fetch profile stats:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  if (loading) return <Loader />;

  const stats = data?.stats;
  const recentBookings = data?.recentBookings || [];

  return (
    <div className='max-w-7xl mx-auto pb-12'>
      <div className='mb-8'>
        <h1 className='text-3xl font-bold text-primary-light dark:text-text-dark'>
          Welcome back, {user?.full_name?.split(' ')[0] || 'Traveler'}!
        </h1>
        <p className='mt-2 text-secondary-light dark:text-secondary-dark font-normal'>
          Track your adventures and manage your travel profile.
        </p>
      </div>

      {/* Stats Grid */}
      <div className='grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 mb-10'>
        <div className='bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 flex items-center gap-4'>
          <div className='p-3 bg-blue-50 dark:bg-blue-900/20 rounded-xl text-blue-600 dark:text-blue-400'>
            <TicketIcon className='w-6 h-6' />
          </div>
          <div>
            <p className='text-sm text-secondary-light dark:text-secondary-dark font-medium'>
              Bookings
            </p>
            <p className='text-2xl font-bold text-primary-light dark:text-text-dark'>
              {stats?.totalBookings || 0}
            </p>
          </div>
        </div>

        <div className='bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 flex items-center gap-4'>
          <div className='p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded-xl text-yellow-600 dark:text-yellow-400'>
            <StarIcon className='w-6 h-6' />
          </div>
          <div>
            <p className='text-sm text-secondary-light dark:text-secondary-dark font-medium'>
              Reviews
            </p>
            <p className='text-2xl font-bold text-primary-light dark:text-text-dark'>
              {stats?.totalReviews || 0}
            </p>
          </div>
        </div>

        <div className='bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 flex items-center gap-4'>
          <div className='p-3 bg-red-50 dark:bg-red-900/20 rounded-xl text-red-600 dark:text-red-400'>
            <HeartIcon className='w-6 h-6' />
          </div>
          <div>
            <p className='text-sm text-secondary-light dark:text-secondary-dark font-medium'>
              Favorites
            </p>
            <p className='text-2xl font-bold text-primary-light dark:text-text-dark'>
              {stats?.totalFavorites || 0}
            </p>
          </div>
        </div>

        <div className='bg-primary-light text-white p-6 rounded-2xl shadow-lg flex items-center gap-4'>
          <div className='p-3 bg-white/10 rounded-xl'>
            <UserCircleIcon className='w-6 h-6 text-white' />
          </div>
          <div>
            <p className='text-sm opacity-80 font-medium'>Member Rank</p>
            <p className='text-2xl font-bold'>{stats?.rank || 'Explorer'}</p>
          </div>
        </div>
      </div>

      <div className='grid grid-cols-1 lg:grid-cols-3 gap-8'>
        {/* Recent Bookings */}
        <div className='lg:col-span-2'>
          <div className='bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden'>
            <div className='p-6 border-b border-gray-50 dark:border-gray-700 flex justify-between items-center'>
              <h2 className='text-lg font-bold text-primary-light dark:text-text-dark'>
                Recent Activity
              </h2>
              <Link
                to={ROUTES.PROFILE_BOOKINGS}
                className='text-sm font-semibold text-primary-light dark:text-primary-dark hover:underline'
              >
                View all
              </Link>
            </div>
            <div className='p-6'>
              {recentBookings.length === 0 ? (
                <p className='text-center py-4 text-secondary-light dark:text-secondary-dark'>
                  No recent activity found.
                </p>
              ) : (
                <ul className='divide-y divide-gray-100 dark:divide-gray-700'>
                  {recentBookings.map((booking: any) => (
                    <li key={booking.booking_id} className='py-4 first:pt-0 last:pb-0'>
                      <div className='flex items-center justify-between'>
                        <div className='flex items-center gap-4'>
                          <div className='bg-primary-light/5 dark:bg-primary-dark/5 p-2 rounded-lg'>
                            <TicketIcon className='w-5 h-5 text-primary-light dark:text-primary-dark' />
                          </div>
                          <div>
                            <p className='font-bold text-primary-light dark:text-text-dark'>
                              {booking.Tour?.name}
                            </p>
                            <p className='text-xs text-secondary-light dark:text-secondary-dark'>
                              Booked on {new Date(booking.created_at).toLocaleDateString()}
                            </p>
                          </div>
                        </div>
                        <Link
                          to={`${ROUTES.PROFILE_BOOKINGS}/${booking.booking_id}`}
                          className='p-2 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg transition-colors'
                        >
                          <ChevronRightIcon className='w-5 h-5 text-gray-400' />
                        </Link>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </div>

        {/* Quick Links / Tips */}
        <div className='space-y-6'>
          <div className='bg-gradient-to-br from-primary-light to-primary-dark p-6 rounded-2xl text-white shadow-xl'>
            <h3 className='font-bold text-lg mb-2'>Plan Your Next Adventure</h3>
            <p className='text-sm opacity-90 mb-4'>
              Discover unique destinations and handcrafted tours around the world.
            </p>
            <Link
              to={ROUTES.TOURS}
              className='inline-block w-full text-center bg-white text-primary-light py-2 rounded-xl font-bold text-sm shadow-md hover:bg-gray-50 transition-colors'
            >
              Browse Tours
            </Link>
          </div>

          <div className='bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700'>
            <h3 className='font-bold text-primary-light dark:text-text-dark mb-4'>
              Profile Completion
            </h3>
            <div className='w-full bg-gray-100 dark:bg-gray-700 h-2 rounded-full mb-2 overflow-hidden'>
              <div className='bg-green-500 h-full w-[85%]'></div>
            </div>
            <p className='text-xs text-secondary-light dark:text-secondary-dark'>
              Your profile is almost complete! Add a phone number to reach 100%.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileHomePage;
