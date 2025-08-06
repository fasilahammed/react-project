import { createContext, useContext, useState, useEffect } from 'react';
import { toast } from 'react-hot-toast';
import { useAuth } from './AuthContext';

const CartContext = createContext();

export function CartProvider({ children }) {
  const { user, updateUserData } = useAuth();
  const [cart, setCart] = useState([]);
  const [cartCount, setCartCount] = useState(0);
  const [orders, setOrders] = useState([]);

  // Load cart from user data
  useEffect(() => {
    if (user) {
      setCart(user.cart || []);
      setCartCount(user.cart?.reduce((total, item) => total + item.quantity, 0) || 0);
    } else {
      setCart([]);
      setCartCount(0);
    }

    // Load orders from localStorage
    const storedOrders = localStorage.getItem('snapmob-orders');
    if (storedOrders) {
      setOrders(JSON.parse(storedOrders));
    }
  }, [user]);

  const updateCart = async (newCart) => {
    setCart(newCart);
    setCartCount(newCart.reduce((total, item) => total + item.quantity, 0));
    
    if (user) {
      await updateUserData({ ...user, cart: newCart });
    }
  };

  const addToCart = async (product) => {
    if (!user) {
      toast.error('Please login to add items to cart');
      return false;
    }

    const existingItem = cart.find(item => item.id === product.id);
    const maxQuantity = 5;
    
    let updatedCart;
    
    if (existingItem) {
      if (existingItem.quantity >= maxQuantity) {
        toast.error(`You can only add ${maxQuantity} of this item to your cart`);
        return false;
      }
      
      updatedCart = cart.map(item =>
        item.id === product.id 
          ? { ...item, quantity: item.quantity + 1 } 
          : item
      );
    } else {
      updatedCart = [...cart, { ...product, quantity: 1 }];
    }
    
    await updateCart(updatedCart);
    toast.success(`${product.name} added to cart!`);
    return true;
  };

  const removeFromCart = async (productId) => {
    const updatedCart = cart.filter(item => item.id !== productId);
    await updateCart(updatedCart);
  };

  const updateQuantity = async (productId, newQuantity) => {
    if (newQuantity < 1) {
      await removeFromCart(productId);
      return;
    }

    const maxQuantity = 5;
    if (newQuantity > maxQuantity) {
      toast.error(`You can only add ${maxQuantity} of this item to your cart`);
      return;
    }

    const minQuantity = 0;
    if (newQuantity > minQuantity) {
      toast.error(`You can only add ${minQuantity} of this item to your cart`);
      return;
    }

    const updatedCart = cart.map(item =>
      item.id === productId 
        ? { ...item, quantity: newQuantity } 
        : item
    );
    
    await updateCart(updatedCart);
  };

  const clearCart = async () => {
    await updateCart([]);
  };

  const totalPrice = cart.reduce(
    (total, item) => total + (item.price * item.quantity),
    0
  );

  const checkout = async (orderData) => {
    if (cart.length === 0) {
      toast.error('Your cart is empty');
      return null;
    }

    const newOrder = {
      id: Date.now(),
      date: new Date().toISOString(),
      items: [...cart],
      total: totalPrice,
      status: 'processing',
      ...orderData
    };

    const updatedOrders = [...orders, newOrder];
    setOrders(updatedOrders);
    localStorage.setItem('snapmob-orders', JSON.stringify(updatedOrders));
    
    await clearCart();
    
    return newOrder;
  };

  const cancelOrder = async (orderId) => {
    try {
      // In a real app, you would call your API here first
      // await api.cancelOrder(orderId);
      
      // Update local state
      setOrders(prevOrders => 
        prevOrders.map(order => 
          order.id === orderId 
            ? { ...order, status: 'cancelled' } 
            : order
        )
      );
      
      // Update localStorage
      const updatedOrders = orders.map(order => 
        order.id === orderId 
          ? { ...order, status: 'cancelled' } 
          : order
      );
      localStorage.setItem('snapmob-orders', JSON.stringify(updatedOrders));
      
      return true;
    } catch (error) {
      console.error('Error cancelling order:', error);
      throw error;
    }
  };

  const removeOrder = async (orderId) => {
    try {
      // In a real app, you would call your API here first
      // await api.deleteOrder(orderId);
      
      // Update local state
      setOrders(prevOrders => prevOrders.filter(order => order.id !== orderId));
      
      // Update localStorage
      const updatedOrders = orders.filter(order => order.id !== orderId);
      localStorage.setItem('snapmob-orders', JSON.stringify(updatedOrders));
      
      return true;
    } catch (error) {
      console.error('Error deleting order:', error);
      throw error;
    }
  };

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
        checkout,
        cancelOrder,
        removeOrder
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => useContext(CartContext);