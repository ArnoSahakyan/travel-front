import { Outlet } from 'react-router-dom';
import { AuthNavbar } from './components';

const AuthLayout = () => {
  return (
    <div className='flex flex-col min-h-screen'>
      <AuthNavbar />
      <main className='flex flex-1 items-center justify-center bg-background-light dark:bg-background-dark'>
        <Outlet />
      </main>
    </div>
  );
};

export default AuthLayout;
