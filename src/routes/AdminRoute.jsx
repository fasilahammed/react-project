import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function AdminRoute() {
  const { user, loading } = useAuth();

  if (loading) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
  }

  
  if (!user || user.role !== 'admin') {
    return <Navigate to="/" />;
  }

 
  return <Outlet />;
}
