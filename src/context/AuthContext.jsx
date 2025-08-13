import { createContext, useContext, useState, useEffect } from 'react';
import { loginUser, registerUser, updateUser } from '../services/api';
import { toast } from 'react-hot-toast';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadUser = async () => {
      try {
        const storedUser = localStorage.getItem('user') || sessionStorage.getItem('user');
        if (storedUser) {
          setUser(JSON.parse(storedUser));
        }
      } catch (error) {
        console.error('Failed to load user:', error);
        localStorage.removeItem('user');
        sessionStorage.removeItem('user');
      } finally {
        setLoading(false);
      }
    };
    loadUser();
  }, []);

const login = async (email, password, rememberMe = false) => {
  try {
    const userData = await loginUser(email, password);
    
    if (!userData) {
      toast.error('Invalid email or password');
      return { success: false };
    }

    // Blocked user check
    if (userData.isBlocked) {
      toast.error('Your account is blocked. Please contact support.');
      return { success: false };
    }

    // Existing status check (optional if both are used)
    if (userData.status === 'blocked') {
      toast.error('Your account has been blocked. Please contact support.');
      return { success: false };
    }

    setUser(userData);
    if (rememberMe) {
      localStorage.setItem('user', JSON.stringify(userData));
    } else {
      sessionStorage.setItem('user', JSON.stringify(userData));
    }

    toast.success('Login successful!');
    return { success: true, role: userData.role || 'user' };
  } catch (error) {
    console.error('Login error:', error);
    toast.error(error.message || 'Login failed');
    return { success: false };
  }
};

  

  const register = async (userData) => {
    try {
      const newUser = {
        ...userData,
        role: 'user',
        cart: [],
        wishlist: [],
        createdAt: new Date().toISOString()
      };

      const createdUser = await registerUser(newUser);
      setUser(createdUser);
      localStorage.setItem('user', JSON.stringify(createdUser));
      toast.success('Registration successful!');
      return true;
    } catch (error) {
      console.error('Registration error:', error);
      toast.error(error.message || 'Registration failed');
      return false;
    }
  };

  const updateUserData = async (updatedData) => {
    if (!user) return false;

    try {
      const updatedUser = await updateUser(user.id, updatedData);
      setUser(updatedUser);
      localStorage.setItem('user', JSON.stringify(updatedUser));
      return true;
    } catch (error) {
      console.error('Update error:', error);
      toast.error('Failed to update profile');
      return false;
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
    sessionStorage.removeItem('user');
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        login,
        register,
        logout,
        updateUserData
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);