import { createContext, useContext, useState, useEffect } from 'react';
import { loginUser, registerUser, updateUser } from '../services/api';
import { toast } from 'react-hot-toast';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Load user from localStorage or sessionStorage on mount
  useEffect(() => {
    try {
      let storedUser = localStorage.getItem('user') || sessionStorage.getItem('user');
      if (storedUser && storedUser !== 'undefined') {
        setUser(JSON.parse(storedUser));
      }
    } catch (error) {
      console.error('Failed to parse stored user:', error);
      localStorage.removeItem('user');
      sessionStorage.removeItem('user');
    } finally {
      setLoading(false);
    }
  }, []);

  // LOGIN
  const login = async (email, password, rememberMe = false) => {
    try {
      const response = await loginUser(email, password);

      if (response?.data?.length > 0) {
        const userData = response.data[0];

        setUser(userData);
        if (rememberMe) {
          localStorage.setItem('user', JSON.stringify(userData));
        } else {
          sessionStorage.setItem('user', JSON.stringify(userData));
        }

        toast.success('Login successful!');
        return { success: true, role: userData.role || 'user' };
      }

      toast.error('Invalid email or password');
      return { success: false };
    } catch (error) {
      console.error('Login error:', error);
      toast.error('Login failed. Please try again.');
      return { success: false };
    }
  };

  // REGISTER
  const register = async (userData) => {
    try {
      const newUser = {
        ...userData,
        role: 'user',
        cart: [],
        wishlist: [],
        createdAt: new Date().toISOString(),
      };

      const response = await registerUser(newUser);
      if (response?.data) {
        setUser(response.data);
        localStorage.setItem('user', JSON.stringify(response.data));
        toast.success('Registration successful!');
        return true;
      }

      toast.error('Registration failed');
      return false;
    } catch (error) {
      console.error('Register error:', error);
      toast.error('Registration failed');
      return false;
    }
  };

  // UPDATE USER
  const updateUserData = async (updatedData) => {
    if (!user) return false;

    try {
      const response = await updateUser(user.id, updatedData);
      if (response?.data) {
        setUser(response.data);
        localStorage.setItem('user', JSON.stringify(response.data));
        return true;
      }

      toast.error('Failed to update user');
      return false;
    } catch (error) {
      console.error('Update user error:', error);
      toast.error('Failed to update user data');
      return false;
    }
  };

  // LOGOUT
  const logout = () => {
    localStorage.removeItem('user');
    sessionStorage.removeItem('user');
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        login,
        register,
        logout,
        updateUserData,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
