import { Navigate, Outlet } from 'react-router-dom';
import { useAuthStore } from '../../store';
import { ROUTES } from '../../shared';

export const ProtectedRoute = () => {
  const { isAuthenticated } = useAuthStore();

  return isAuthenticated ? <Outlet /> : <Navigate to={ROUTES.AUTH + ROUTES.SIGNIN} replace />;
};
