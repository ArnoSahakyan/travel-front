import { useEffect, useState } from 'react';
import { getAdminStats, AdminStats } from '../../../api';
import { Loader } from '../../../components';
import { format } from 'date-fns';
import {
  UsersIcon,
  TagIcon,
  MapPinIcon,
  PaperAirplaneIcon,
  ChatBubbleBottomCenterTextIcon,
  EnvelopeIcon,
  CurrencyDollarIcon,
  BriefcaseIcon,
} from '@heroicons/react/24/outline';

const AdminHomePage = () => {
  const [stats, setStats] = useState<AdminStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const data = await getAdminStats();
        setStats(data);
      } catch (err) {
        setError('Failed to load dashboard statistics.');
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  if (loading) return <Loader />;
  if (error || !stats) return <div className='text-red-500 text-center py-10'>{error}</div>;

  const cards = [
    { name: 'Total Users', stat: stats.metrics.totalUsers, icon: UsersIcon },
    { name: 'Total Bookings', stat: stats.metrics.totalBookings, icon: BriefcaseIcon },
    {
      name: 'Total Revenue',
      stat: `$${Number(stats.metrics.totalRevenue || 0).toFixed(2)}`,
      icon: CurrencyDollarIcon,
    },
    { name: 'Total Tours', stat: stats.metrics.totalTours, icon: PaperAirplaneIcon },
    { name: 'Total Destinations', stat: stats.metrics.totalDestinations, icon: MapPinIcon },
    { name: 'Total Categories', stat: stats.metrics.totalCategories, icon: TagIcon },
    {
      name: 'Total Reviews',
      stat: stats.metrics.totalReviews,
      icon: ChatBubbleBottomCenterTextIcon,
    },
    {
      name: 'Unread Messages',
      stat: stats.metrics.unreadMessages,
      icon: EnvelopeIcon,
      highlight: stats.metrics.unreadMessages > 0,
    },
  ];

  return (
    <div className='py-8'>
      <div className='sm:flex sm:items-center'>
        <div className='sm:flex-auto'>
          <h1 className='text-3xl font-semibold leading-6 text-primary-light dark:text-text-dark'>
            Dashboard
          </h1>
          <p className='mt-2 text-sm text-secondary-light dark:text-secondary-dark'>
            Overview of WanderLuxe key metrics and recent activities.
          </p>
        </div>
      </div>

      <dl className='mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4'>
        {cards.map((item) => (
          <div
            key={item.name}
            className={`relative overflow-hidden rounded-lg bg-background-light dark:bg-background-dark/50 px-4 py-5 shadow sm:px-6 sm:pt-6 border ${item.highlight ? 'border-primary-light ring-1 ring-primary-light' : 'border-gray-200 dark:border-gray-700'}`}
          >
            <dt>
              <div className='absolute rounded-md bg-primary-light p-3'>
                <item.icon className='h-6 w-6 text-white' aria-hidden='true' />
              </div>
              <p className='ml-16 truncate text-sm font-medium text-secondary-light dark:text-secondary-dark'>
                {item.name}
              </p>
            </dt>
            <dd className='ml-16 flex items-baseline pb-1 sm:pb-2'>
              <p className='text-2xl font-semibold text-primary-light dark:text-text-dark'>
                {item.stat}
              </p>
            </dd>
          </div>
        ))}
      </dl>

      <div className='mt-12'>
        <h2 className='text-lg font-medium leading-6 text-primary-light dark:text-text-dark'>
          Recent Bookings
        </h2>
        <div className='mt-4 overflow-hidden shadow ring-1 ring-black ring-opacity-5 sm:rounded-lg'>
          <table className='min-w-full divide-y divide-gray-300 dark:divide-gray-700'>
            <thead className='bg-gray-50 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700'>
              <tr>
                <th
                  scope='col'
                  className='py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-primary-light dark:text-text-dark sm:pl-6'
                >
                  Client
                </th>
                <th
                  scope='col'
                  className='px-3 py-3.5 text-left text-sm font-semibold text-primary-light dark:text-text-dark'
                >
                  Tour
                </th>
                <th
                  scope='col'
                  className='px-3 py-3.5 text-left text-sm font-semibold text-primary-light dark:text-text-dark'
                >
                  Date
                </th>
                <th
                  scope='col'
                  className='px-3 py-3.5 text-left text-sm font-semibold text-primary-light dark:text-text-dark'
                >
                  Price
                </th>
                <th
                  scope='col'
                  className='px-3 py-3.5 text-left text-sm font-semibold text-primary-light dark:text-text-dark'
                >
                  Status
                </th>
              </tr>
            </thead>
            <tbody className='divide-y divide-gray-200 dark:divide-gray-700 bg-background-light dark:bg-background-dark'>
              {stats.recentBookings.map((booking) => (
                <tr key={booking.booking_id}>
                  <td className='whitespace-nowrap py-4 pl-4 pr-3 text-sm sm:pl-6'>
                    <div className='font-medium text-primary-light dark:text-text-dark'>
                      {booking.User.full_name}
                    </div>
                    <div className='text-secondary-light dark:text-secondary-dark'>
                      {booking.User.email}
                    </div>
                  </td>
                  <td className='whitespace-nowrap px-3 py-4 text-sm text-secondary-light dark:text-secondary-dark'>
                    {booking.Tour.name}
                  </td>
                  <td className='whitespace-nowrap px-3 py-4 text-sm text-secondary-light dark:text-secondary-dark'>
                    {format(new Date(booking.booking_date), 'MMM dd, yyyy')}
                  </td>
                  <td className='whitespace-nowrap px-3 py-4 text-sm text-secondary-light dark:text-secondary-dark'>
                    ${booking.total_price}
                  </td>
                  <td className='whitespace-nowrap px-3 py-4 text-sm text-secondary-light dark:text-secondary-dark'>
                    <span
                      className={`inline-flex items-center rounded-md px-2 py-1 text-xs font-medium ring-1 ring-inset ${
                        booking.status === 'confirmed'
                          ? 'bg-green-50 text-green-700 ring-green-600/20'
                          : booking.status === 'pending'
                            ? 'bg-yellow-50 text-yellow-800 ring-yellow-600/20'
                            : 'bg-gray-50 text-gray-600 ring-gray-500/10'
                      }`}
                    >
                      {booking.status.toUpperCase()}
                    </span>
                  </td>
                </tr>
              ))}
              {stats.recentBookings.length === 0 && (
                <tr>
                  <td colSpan={5} className='py-4 text-center text-sm text-gray-500'>
                    No recent bookings found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminHomePage;
