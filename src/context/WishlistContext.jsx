import { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from './AuthContext';
import { toast } from 'react-hot-toast';

const WishlistContext = createContext();

export function WishlistProvider({ children }) {
  const { user, updateUserData } = useAuth();
  const [wishlist, setWishlist] = useState([]);
  const [wishlistCount, setWishlistCount] = useState(0);

  useEffect(() => {
    if (user) {
      setWishlist(user.wishlist || []);
      setWishlistCount(user.wishlist?.length || 0);
    } else {
      setWishlist([]);
      setWishlistCount(0);
    }
  }, [user]);

  const updateWishlist = async (newWishlist) => {
    setWishlist(newWishlist);
    setWishlistCount(newWishlist.length);
    
    if (user) {
      await updateUserData({ ...user, wishlist: newWishlist });
    }
  };

  const toggleWishlist = async (product) => {
    if (!user) {
      toast.error('Please login to manage wishlist');
      return false;
    }

    const isInWishlist = wishlist.some(item => item.id === product.id);
    
    let updatedWishlist;
    if (isInWishlist) {
      updatedWishlist = wishlist.filter(item => item.id !== product.id);
    } else {
      updatedWishlist = [...wishlist, product];
    }
    
    await updateWishlist(updatedWishlist);
    toast.success(
      isInWishlist 
        ? `${product.name} removed from wishlist` 
        : `${product.name} added to wishlist`
    );
    return !isInWishlist;
  };

  const removeFromWishlist = async (productId) => {
    if (!user) {
      toast.error('Please login to manage wishlist');
      return false;
    }

    const updatedWishlist = wishlist.filter(item => item.id !== productId);
    await updateWishlist(updatedWishlist);
    toast.success('Item removed from wishlist');
    return true;
  };

  const isInWishlist = (productId) => {
    return wishlist.some(item => item.id === productId);
  };

  const clearWishlist = async () => {
    if (!user) {
      toast.error('Please login to manage wishlist');
      return false;
    }

    await updateWishlist([]);
    toast.success('Wishlist cleared');
    return true;
  };

  return (
    <WishlistContext.Provider 
      value={{ 
        wishlist, 
        wishlistCount,
        toggleWishlist, 
        removeFromWishlist,
        isInWishlist,
        clearWishlist
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
}

export const useWishlist = () => useContext(WishlistContext);