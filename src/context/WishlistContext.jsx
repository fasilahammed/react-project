import { createContext, useContext, useState, useEffect } from 'react';

const WishlistContext = createContext();

export function WishlistProvider({ children }) {
  const [wishlist, setWishlist] = useState([]);
  const [wishlistCount, setWishlistCount] = useState(0);

  useEffect(() => {
    const storedWishlist = localStorage.getItem('snapmob-wishlist');
    if (storedWishlist) {
      setWishlist(JSON.parse(storedWishlist));
      setWishlistCount(JSON.parse(storedWishlist).length);
    }
  }, []);

  const toggleWishlist = (product) => {
    const isInWishlist = wishlist.some(item => item.id === product.id);
    
    let updatedWishlist;
    if (isInWishlist) {
      updatedWishlist = wishlist.filter(item => item.id !== product.id);
    } else {
      updatedWishlist = [...wishlist, product];
    }
    
    setWishlist(updatedWishlist);
    setWishlistCount(updatedWishlist.length);
    localStorage.setItem('snapmob-wishlist', JSON.stringify(updatedWishlist));
    
    return !isInWishlist;
  };

  const removeFromWishlist = (productId) => {
    const updatedWishlist = wishlist.filter(item => item.id !== productId);
    setWishlist(updatedWishlist);
    setWishlistCount(updatedWishlist.length);
    localStorage.setItem('snapmob-wishlist', JSON.stringify(updatedWishlist));
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