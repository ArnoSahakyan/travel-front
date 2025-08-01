import { Navigate, Outlet } from 'react-router-dom';
import { useAuthStore } from '../../../store';
import { ROUTES } from '../../../shared';

export const AdminRoute = () => {
  const { isAuthenticated, user } = useAuthStore();

  if (!isAuthenticated || !user) {
    return <Navigate to={ROUTES.AUTH + ROUTES.SIGNIN} replace />;
  }

  return user.role === 'admin' ? <Outlet /> : <Navigate to={ROUTES.HOME} replace />;
};
