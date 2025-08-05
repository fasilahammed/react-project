import { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from './AuthContext';

const WishlistContext = createContext();

export function WishlistProvider({ children }) {
  const { user } = useAuth();
  const [wishlist, setWishlist] = useState([]);
  const [wishlistCount, setWishlistCount] = useState(0);

  useEffect(() => {
    const loadWishlistData = () => {
      if (user) {
        // For logged-in users, use their wishlist from user data
        setWishlist(user.wishlist || []);
        setWishlistCount(user.wishlist?.length || 0);
      } else {
        // For guests, use localStorage
        const storedWishlist = localStorage.getItem('snapmob-wishlist');
        if (storedWishlist) {
          setWishlist(JSON.parse(storedWishlist));
          setWishlistCount(JSON.parse(storedWishlist).length);
        }
      }
    };

    loadWishlistData();
  }, [user]);

  const updateWishlist = (newWishlist) => {
    setWishlist(newWishlist);
    setWishlistCount(newWishlist.length);
    
    if (user) {
      // Update user's wishlist in localStorage
      const updatedUser = { ...user, wishlist: newWishlist };
      localStorage.setItem('snapmob-user', JSON.stringify(updatedUser));
    } else {
      // For guests, store in separate localStorage key
      localStorage.setItem('snapmob-wishlist', JSON.stringify(newWishlist));
    }
  };

  const toggleWishlist = (product) => {
    const isInWishlist = wishlist.some(item => item.id === product.id);
    
    let updatedWishlist;
    if (isInWishlist) {
      updatedWishlist = wishlist.filter(item => item.id !== product.id);
    } else {
      updatedWishlist = [...wishlist, product];
    }
    
    updateWishlist(updatedWishlist);
    return !isInWishlist;
  };

  const removeFromWishlist = (productId) => {
    const updatedWishlist = wishlist.filter(item => item.id !== productId);
    updateWishlist(updatedWishlist);
  };

  return (
    <WishlistContext.Provider 
      value={{ 
        wishlist, 
        wishlistCount,
        toggleWishlist, 
        removeFromWishlist 
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
}

export const useWishlist = () => useContext(WishlistContext);