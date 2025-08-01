import { createContext, useContext, useState, useEffect } from 'react';
import { loginUser, registerUser } from '../services/api';
import { toast } from 'react-hot-toast';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedUser = localStorage.getItem('snapmob-user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    try {
      const { data } = await loginUser(email, password);
      
      if (data.length > 0) {
        setUser(data[0]);
        localStorage.setItem('snapmob-user', JSON.stringify(data[0]));
        toast.success('Login successful!');
        return true;
      } else {
        toast.error('Invalid credentials');
        return false;
      }
    } catch (error) {
      toast.error('Login failed. Please try again.');
      return false;
    }
  };

  const register = async (userData) => {
    try {
      // Check if email already exists
      const { data: existingUsers } = await loginUser(userData.email, '');
      if (existingUsers.length > 0) {
        toast.error('Email already registered');
        return false;
      }

      const { data } = await registerUser({
        ...userData,
        role: 'user',
        cart: [],
        wishlist: [],
        createdAt: new Date().toISOString()
      });
      
      setUser(data);
      localStorage.setItem('snapmob-user', JSON.stringify(data));
      toast.success('Registration successful!');
      return true;
    } catch (error) {
      toast.error('Registration failed');
      return false;
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('snapmob-user');
    toast.success('Logged out successfully');
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);