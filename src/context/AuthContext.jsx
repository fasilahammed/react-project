import { createContext, useContext, useState, useEffect } from 'react';
import { loginUser, registerUser, updateUser } from '../services/api';
import { toast } from 'react-hot-toast';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    try {
      const storedUser = localStorage.getItem('snapmob-user');
      if (storedUser && storedUser !== 'undefined') {
        setUser(JSON.parse(storedUser));
      }
    } catch (error) {
      console.error('Failed to parse user data:', error);
      localStorage.removeItem('snapmob-user');
    } finally {
      setLoading(false);
    }
  }, []);

  const login = async (email, password) => {
    try {
      const response = await loginUser(email, password);
      
      if (response.data && response.data.length > 0) {
        const userData = response.data[0];
        setUser(userData);
        localStorage.setItem('snapmob-user', JSON.stringify(userData));
        toast.success('Login successful!');
        return true;
      }
      toast.error('Invalid email or password');
      return false;
    } catch (error) {
      toast.error('Login failed. Please try again.');
      return false;
    }
  };

  const register = async (userData) => {
    try {
      const existingUsers = await loginUser(userData.email, '');
      if (existingUsers.data.length > 0) {
        toast.error('Email already registered');
        return false;
      }

      const newUser = {
        ...userData,
        role: 'user',
        cart: [],
        wishlist: [],
        createdAt: new Date().toISOString()
      };

      const response = await registerUser(newUser);
      setUser(response.data);
      localStorage.setItem('snapmob-user', JSON.stringify(response.data));
      toast.success('Registration successful!');
      return true;
    } catch (error) {
      toast.error('Registration failed');
      return false;
    }
  };

  const updateUserData = async (updatedData) => {
    if (!user) return false;
    
    try {
      const response = await updateUser(user.id, updatedData);
      setUser(response.data);
      localStorage.setItem('snapmob-user', JSON.stringify(response.data));
      return true;
    } catch (error) {
      toast.error('Failed to update user data');
      return false;
    }
  };

  const logout = () => {
    localStorage.removeItem("snapmob-user")
    setUser(null);
   
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      loading, 
      login, 
      register, 
      logout,
      updateUserData
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);