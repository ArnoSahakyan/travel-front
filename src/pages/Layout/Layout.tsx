import { Outlet } from 'react-router-dom';
import { Footer, Navbar } from '../../components';

export const Layout = () => {
  return (
    <div className='flex flex-col min-h-screen bg-background-light dark:bg-background-dark'>
      <Navbar />
      <main className='mt-16'>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};
