import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Loading from '../components/Loading';

export default function AdminRoute({ checkHomeRedirect = false }) {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) return <Loading fullScreen />;

  // Only check for home redirect if explicitly requested
  if (checkHomeRedirect && user?.role === 'admin' && location.pathname === '/') {
    return <Navigate to="/admin" replace />;
  }

  // Standard admin route protection (only for /admin/* routes)
  if (!checkHomeRedirect) {
    if (!user) {
      return <Navigate to="/login" replace state={{ from: location }} />;
    }
    if (user.role !== 'admin') {
      return <Navigate to="/" replace />;
    }
  }

  return <Outlet />;
}