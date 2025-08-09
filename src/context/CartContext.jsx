import { createContext, useContext, useState, useEffect } from 'react';
import { toast } from 'react-hot-toast';
import { useAuth } from './AuthContext';
import { 
  fetchOrdersByUser, 
  createOrder, 
  updateOrder, 
  deleteOrder 
} from '../services/api';

const CartContext = createContext();

export function CartProvider({ children }) {
  const { user, updateUserData } = useAuth();
  const [cart, setCart] = useState([]);
  const [cartCount, setCartCount] = useState(0);
  const [orders, setOrders] = useState([]);
  const [loadingOrders, setLoadingOrders] = useState(false);

  useEffect(() => {
    if (user) {
      setCart(user.cart || []);
      setCartCount(user.cart?.reduce((total, item) => total + item.quantity, 0) || 0);
      loadUserOrders();
    } else {
      setCart([]);
      setCartCount(0);
      setOrders([]);
    }
  }, [user]);

  const loadUserOrders = async () => {
    if (!user?.id) return;
    try {
      setLoadingOrders(true);
      const userOrders = await fetchOrdersByUser(user.id);
      setOrders(Array.isArray(userOrders) ? userOrders : []);
    } catch (error) {
      toast.error('Failed to load orders');
      console.error('Error loading orders:', error);
    } finally {
      setLoadingOrders(false);
    }
  };

  const updateCart = async (newCart) => {
    const updatedCart = Array.isArray(newCart) ? newCart : [];
    setCart(updatedCart);
    setCartCount(updatedCart.reduce((total, item) => total + (item.quantity || 0), 0));
    
    if (user) {
      await updateUserData({ ...user, cart: updatedCart });
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
      updatedCart = [...cart, { 
        ...product, 
        quantity: 1 
      }];
    }
    
    await updateCart(updatedCart);
    return true;
  };

  const removeFromCart = async (productId) => {
    const updatedCart = cart.filter(item => item.id !== productId);
    await updateCart(updatedCart);
  };

  const updateQuantity = async (productId, newQuantity) => {
    if (newQuantity < 1) return;
    
    const maxQuantity = 5;
    if (newQuantity > maxQuantity) {
      toast.error(`Maximum ${maxQuantity} items allowed`);
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
    (total, item) => total + ((item.price || 0) * (item.quantity || 0)),
    0
  );

  const checkout = async (orderData) => {
    if (!user || cart.length === 0) {
      toast.error('Your cart is empty');
      return null;
    }

    const newOrder = {
      userId: user.id,
      date: new Date().toISOString(),
      items: [...cart],
      total: totalPrice,
      status: 'processing',
      ...orderData
    };

    try {
      const createdOrder = await createOrder(newOrder);
      setOrders(prev => [createdOrder, ...prev]);
      await clearCart();
      return createdOrder;
    } catch (error) {
      toast.error('Failed to create order');
      console.error('Checkout error:', error);
      throw error;
    }
  };

  const cancelOrder = async (orderId) => {
    try {
      await updateOrder(orderId, { status: 'cancelled' });
      setOrders(prev => 
        prev.map(order => 
          order.id === orderId 
            ? { ...order, status: 'cancelled' } 
            : order
        )
      );
      return true;
    } catch (error) {
      console.error('Cancel order error:', error);
      throw error;
    }
  };

  const removeOrder = async (orderId) => {
    try {
      await deleteOrder(orderId);
      setOrders(prev => prev.filter(order => order.id !== orderId));
      return true;
    } catch (error) {
      console.error('Delete order error:', error);
      throw error;
    }
  };

  return (
    <CartContext.Provider 
      value={{ 
        cart, 
        cartCount,
        orders,
        loadingOrders,
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