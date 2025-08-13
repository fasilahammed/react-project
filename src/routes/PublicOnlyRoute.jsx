import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Loading from '../components/Loading';

export default function PublicOnlyRoute({ children }) {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) return <Loading fullScreen />;

  if (user) {
    // Redirect to appropriate dashboard based on role
    return <Navigate 
      to={user.role === 'admin' ? '/admin' : '/'} 
      replace 
      state={{ from: location }} 
    />;
  }

  return children;
}