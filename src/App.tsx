import { RouterProvider } from 'react-router-dom';
import { router } from './router/routes.tsx';
import useRehydrateAuth from './hooks/useRehydrateAuth.ts';

export default function App() {
  useRehydrateAuth();

  return <RouterProvider router={router} />;
}
