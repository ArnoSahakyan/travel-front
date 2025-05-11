import { RouterProvider } from 'react-router-dom';
import { router } from './router/routes.tsx';
import { useRehydrateAuth } from './hooks';
import { Bounce, ToastContainer } from 'react-toastify';
import { useThemeStore } from './store';

export default function App() {
  useRehydrateAuth();
  const { theme } = useThemeStore();
  return (
    <>
      <ToastContainer
        position='top-right'
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={true}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme={theme === 'dark' ? 'dark' : 'light'}
        transition={Bounce}
      />
      <RouterProvider router={router} />
    </>
  );
}
