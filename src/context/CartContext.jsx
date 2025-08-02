import { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cart, setCart] = useState([]);
  const [cartCount, setCartCount] = useState(0);

  useEffect(() => {
    const storedCart = localStorage.getItem('snapmob-cart');
    if (storedCart) {
      setCart(JSON.parse(storedCart));
      setCartCount(JSON.parse(storedCart).length);
    }
  }, []);

  const addToCart = (product) => {
    const existingItem = cart.find(item => item.id === product.id);
    
    let updatedCart;
    if (existingItem) {
      updatedCart = cart.map(item =>
        item.id === product.id 
          ? { ...item, quantity: item.quantity + 1 } 
          : item
      );
    } else {
      updatedCart = [...cart, { ...product, quantity: 1 }];
    }
    
    setCart(updatedCart);
    setCartCount(updatedCart.length);
    localStorage.setItem('snapmob-cart', JSON.stringify(updatedCart));
  };

  const removeFromCart = (productId) => {
    const updatedCart = cart.filter(item => item.id !== productId);
    setCart(updatedCart);
    setCartCount(updatedCart.length);
    localStorage.setItem('snapmob-cart', JSON.stringify(updatedCart));
  };

  const updateQuantity = (productId, newQuantity) => {
    if (newQuantity < 1) return;
    
    const updatedCart = cart.map(item =>
      item.id === productId 
        ? { ...item, quantity: newQuantity } 
        : item
    );
    
    setCart(updatedCart);
    localStorage.setItem('snapmob-cart', JSON.stringify(updatedCart));
  };

  const clearCart = () => {
    setCart([]);
    setCartCount(0);
    localStorage.removeItem('snapmob-cart');
  };

  const totalPrice = cart.reduce(
    (total, item) => total + (item.price * item.quantity), 
    0
  );

  return (
    <CartContext.Provider 
      value={{ 
        cart, 
        cartCount,
        addToCart, 
        removeFromCart, 
        updateQuantity,
        clearCart,
        totalPrice
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => useContext(CartContext);