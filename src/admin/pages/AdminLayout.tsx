import { useEffect, useState } from 'react';
import { Dialog, DialogBackdrop, DialogPanel, TransitionChild } from '@headlessui/react';
import {
  Bars3Icon,
  TagIcon,
  XMarkIcon,
  MapPinIcon,
  PaperAirplaneIcon,
  NewspaperIcon,
  ChatBubbleBottomCenterTextIcon,
} from '@heroicons/react/24/outline';
import { Outlet, useNavigate } from 'react-router-dom';
import { ROUTES } from '../../shared';
import { useAuthStore } from '../../store';
import { SidebarContent } from '../../pages/Profile/components';
import { useRehydrateAuth } from '../../hooks';

const adminNavigation = [
  { name: 'Categories', href: ROUTES.ADMIN_CATEGORIES, icon: TagIcon },
  { name: 'Destinations', href: ROUTES.ADMIN_DESTINATIONS, icon: MapPinIcon },
  { name: 'Tours', href: ROUTES.ADMIN_TOURS, icon: PaperAirplaneIcon },
  { name: 'Newsletter', href: ROUTES.ADMIN_NEWSLETTER, icon: NewspaperIcon },
  { name: 'Blog', href: ROUTES.ADMIN_BLOG, icon: ChatBubbleBottomCenterTextIcon },
];

const AdminLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { user, logout } = useAuthStore();
  useRehydrateAuth(true);
  const navigate = useNavigate();

  useEffect(() => {
    if (user && user.role !== 'admin') {
      navigate('/', { replace: true });
    }
  }, [user, navigate]);

  return (
    <div className='min-h-full'>
      <Dialog open={sidebarOpen} onClose={setSidebarOpen} className='relative z-50 lg:hidden'>
        <DialogBackdrop className='fixed inset-0 bg-gray-900/80' />
        <div className='fixed inset-0 flex'>
          <DialogPanel className='relative mr-16 flex w-full max-w-xs flex-1'>
            <TransitionChild>
              <div className='absolute left-full top-0 flex w-16 justify-center pt-5'>
                <button
                  type='button'
                  onClick={() => setSidebarOpen(false)}
                  className='-m-2.5 p-2.5'
                >
                  <XMarkIcon className='size-6 text-white' />
                </button>
              </div>
            </TransitionChild>
            <SidebarContent
              homePage={ROUTES.ADMIN}
              logout={logout}
              navigation={adminNavigation}
              onLinkClick={() => setSidebarOpen(false)}
              title='WanderLuxe Admin'
            />
          </DialogPanel>
        </div>
      </Dialog>

      {/* Desktop sidebar */}
      <div className='hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-72 lg:flex-col'>
        <SidebarContent
          homePage={ROUTES.ADMIN}
          logout={logout}
          navigation={adminNavigation}
          title='WanderLuxe Admin'
        />
      </div>

      {/* Top bar */}
      <div className='sticky top-0 z-40 flex justify-between items-center gap-x-6 bg-primary-light dark:bg-background-dark px-4 py-4 shadow-sm sm:px-6 lg:hidden'>
        <div className='text-sm/6 font-semibold text-background-light dark:text-text-dark'>
          Admin Panel
        </div>
        <button onClick={() => setSidebarOpen(true)} className='-m-2.5 p-2.5'>
          <Bars3Icon className='size-6 text-white' />
        </button>
      </div>

      <main className=' lg:pl-72 bg-background-light dark:bg-background-dark min-h-screen'>
        <div className='px-4 sm:px-6 lg:px-8'>
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default AdminLayout;
