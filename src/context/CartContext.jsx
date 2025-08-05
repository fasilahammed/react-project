import { createContext, useContext, useState, useEffect } from 'react';
import { toast } from 'react-hot-toast';
import { useAuth } from './AuthContext';

const CartContext = createContext();

export function CartProvider({ children }) {
  const { user } = useAuth();
  const [cart, setCart] = useState([]);
  const [cartCount, setCartCount] = useState(0);
  const [orders, setOrders] = useState([]);

  // Load cart and orders from localStorage
  useEffect(() => {
    const loadCartData = () => {
      if (user) {
        // For logged-in users, use their cart from user data
        setCart(user.cart || []);
        setCartCount(user.cart?.reduce((total, item) => total + item.quantity, 0) || 0);
      } else {
        // For guests, use localStorage
        const storedCart = localStorage.getItem('snapmob-cart');
        if (storedCart) {
          setCart(JSON.parse(storedCart));
          setCartCount(JSON.parse(storedCart).reduce((total, item) => total + item.quantity, 0));
        }
      }
      
      const storedOrders = localStorage.getItem('snapmob-orders');
      if (storedOrders) {
        setOrders(JSON.parse(storedOrders));
      }
    };

    loadCartData();
  }, [user]);

  const updateCart = (newCart) => {
    setCart(newCart);
    setCartCount(newCart.reduce((total, item) => total + item.quantity, 0));
    
    if (user) {
      // Update user's cart in localStorage
      const updatedUser = { ...user, cart: newCart };
      localStorage.setItem('snapmob-user', JSON.stringify(updatedUser));
    } else {
      // For guests, store in separate localStorage key
      localStorage.setItem('snapmob-cart', JSON.stringify(newCart));
    }
  };

  const addToCart = (product) => {
    const existingItem = cart.find(item => item.id === product.id);
    const maxQuantity = 5;
    
    let updatedCart;
    
    if (existingItem) {
      if (existingItem.quantity >= maxQuantity) {
        toast.error(`You can only add ${maxQuantity} of this item to your cart`);
        return;
      }
      
      updatedCart = cart.map(item =>
        item.id === product.id 
          ? { ...item, quantity: item.quantity + 1 } 
          : item
      );
    } else {
      updatedCart = [...cart, { ...product, quantity: 1 }];
    }
    
    updateCart(updatedCart);
    toast.success(`${product.name} added to cart!`);
  };

  const removeFromCart = (productId) => {
    const updatedCart = cart.filter(item => item.id !== productId);
    updateCart(updatedCart);
    toast.success('Item removed from cart');
  };

  const updateQuantity = (productId, newQuantity) => {
    if (newQuantity < 1) return;
    if (newQuantity > 5) {
      toast.error('Maximum 5 items per product');
      return;
    }
    
    const updatedCart = cart.map(item =>
      item.id === productId 
        ? { ...item, quantity: newQuantity } 
        : item
    );
    
    updateCart(updatedCart);
  };

  const clearCart = () => {
    updateCart([]);
    toast.success('Cart cleared');
  };

  const checkout = (orderDetails) => {
    const newOrder = {
      id: Date.now(),
      date: new Date().toISOString(),
      items: [...cart],
      total: totalPrice,
      status: 'processing',
      ...orderDetails
    };
    
    const updatedOrders = [...orders, newOrder];
    setOrders(updatedOrders);
    localStorage.setItem('snapmob-orders', JSON.stringify(updatedOrders));
    clearCart();
    
    return newOrder;
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
        orders,
        addToCart, 
        removeFromCart, 
        updateQuantity,
        clearCart,
        totalPrice,
        checkout
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => useContext(CartContext);