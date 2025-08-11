import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { 
  FiUser, FiMail, FiCalendar, FiShoppingCart, 
  FiPackage, FiArrowLeft, FiEdit, FiTrash2 
} from 'react-icons/fi';
import { toast } from 'react-hot-toast';

const UserDetails = () => {
  const { userId } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Immediately return if no userId
    if (!userId) {
      setError('No user ID provided');
      setLoading(false);
      return;
    }

    const fetchUserData = async () => {
      try {
        setLoading(true);
        setError(null);
        
        // Fetch user data
        const response = await axios.get(`http://localhost:3000/users/${userId}`);
        
        if (!response.data) {
          throw new Error('User not found');
        }
        
        setUser(response.data);
      } catch (err) {
        console.error('Error fetching user:', err);
        setError(err.response?.data?.message || err.message || 'Failed to load user');
        toast.error('Failed to load user data');
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [userId]);

  const handleDelete = async () => {
    if (!window.confirm('Are you sure you want to delete this user?')) return;
    
    try {
      await axios.delete(`http://localhost:3000/users/${userId}`);
      toast.success('User deleted successfully');
      navigate('/admin/users');
    } catch (err) {
      console.error('Error deleting user:', err);
      toast.error(err.response?.data?.message || 'Failed to delete user');
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-900">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-gray-900 text-white p-4">
        <h2 className="text-2xl font-bold mb-4">Error Loading User</h2>
        <p className="mb-6 text-gray-400">{error}</p>
        <Link 
          to="/admin/users" 
          className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded-lg"
        >
          Back to Users
        </Link>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-gray-900 text-white p-4">
        <h2 className="text-2xl font-bold mb-4">User Not Found</h2>
        <p className="mb-6 text-gray-400">The requested user does not exist</p>
        <Link 
          to="/admin/users" 
          className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded-lg"
        >
          Back to Users
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-gray-900 min-h-screen p-6">
      <div className="max-w-6xl mx-auto">
        <Link 
          to="/admin/users" 
          className="flex items-center text-purple-400 hover:text-purple-300 mb-6"
        >
          <FiArrowLeft className="mr-2" /> Back to Users
        </Link>

        <div className="bg-gray-800 rounded-xl shadow-lg overflow-hidden mb-8">
          <div className="p-6">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
              <div className="flex items-center mb-4 md:mb-0">
                <div className="h-16 w-16 rounded-full bg-gray-700 flex items-center justify-center mr-4">
                  <FiUser className="text-2xl text-gray-400" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-white">{user.name}</h1>
                  <p className="text-gray-400">{user.role === 'admin' ? 'Administrator' : 'Customer'}</p>
                </div>
              </div>
              <div className="flex space-x-3">
                
                <button
                  onClick={handleDelete}
                  className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg flex items-center"
                >
                  <FiTrash2 className="mr-2" /> Delete
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-gray-750 rounded-lg p-6">
                <h2 className="text-lg font-semibold text-white mb-4 flex items-center">
                  <FiUser className="mr-2 text-purple-400" /> Personal Information
                </h2>
                <div className="space-y-4">
                  <div>
                    <p className="text-sm text-gray-400">Full Name</p>
                    <p className="text-white">{user.name || 'Not provided'}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-400">Email Address</p>
                    <p className="text-white">{user.email}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-400">Account Type</p>
                    <p className={`px-2 py-1 rounded-full text-xs inline-flex items-center ${
                      user.role === 'admin' 
                        ? 'bg-purple-100 text-purple-800' 
                        : 'bg-blue-100 text-blue-800'
                    }`}>
                      {user.role === 'admin' ? 'Administrator' : 'Standard User'}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-400">Member Since</p>
                    <p className="text-white">
                      {new Date(user.createdAt || Date.now()).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-gray-750 rounded-lg p-6">
                <h2 className="text-lg font-semibold text-white mb-4 flex items-center">
                  <FiShoppingCart className="mr-2 text-purple-400" /> Account Details
                </h2>
                <div className="space-y-4">
                  <div>
                    <p className="text-sm text-gray-400">User ID</p>
                    <p className="text-white font-mono">{user.id}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-400">Last Updated</p>
                    <p className="text-white">
                      {new Date(user.updatedAt || user.createdAt || Date.now()).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDetails;