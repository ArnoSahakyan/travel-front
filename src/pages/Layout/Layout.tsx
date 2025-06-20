import { Outlet } from 'react-router-dom';
import { Footer, Navbar } from '../../components';

const Layout = () => {
  return (
    <div className='flex flex-col min-h-screen bg-background-light dark:bg-background-dark'>
      <Navbar />
      <main className='flex-1 my-16'>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
