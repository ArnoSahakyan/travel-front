import { Navigate, Outlet } from 'react-router-dom';
import { useAuthStore } from '../../store';
import { ROUTES } from '../../shared';

export const UnprotectedRoute = () => {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  return !isAuthenticated ? <Outlet /> : <Navigate to={ROUTES.PROFILE_INFO} replace />;
};
