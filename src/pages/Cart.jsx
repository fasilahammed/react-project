import React from 'react';
import { useCart } from '../context/CartContext';
import { FiTrash2, FiPlus, FiMinus } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import emptyCart from '../assets/img/empty-cart.svg';

export default function Cart() {
  const { 
    cart, 
    cartCount, 
    removeFromCart, 
    updateQuantity, 
    totalPrice,
    clearCart 
  } = useCart();

  if (cartCount === 0) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-12 text-center">
        <img 
          src={emptyCart} 
          alt="Empty Cart" 
          className="w-64 h-64 mx-auto mb-8"
        />
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Your cart is empty</h2>
        <p className="text-gray-600 mb-6">
          Looks like you haven't added anything to your cart yet
        </p>
        <Link
          to="/products"
          className="inline-block bg-orange-500 hover:bg-orange-600 text-white font-medium py-2 px-6 rounded-lg transition-colors"
        >
          Browse Products
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Cart Items */}
        <div className="lg:w-2/3">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold text-gray-800">
              Your Cart ({cartCount} {cartCount === 1 ? 'item' : 'items'})
            </h1>
            <button
              onClick={clearCart}
              className="text-sm text-red-500 hover:text-red-700 flex items-center gap-1"
            >
              <FiTrash2 /> Clear All
            </button>
          </div>

          <div className="space-y-4">
            {cart.map((item) => (
              <div 
                key={item.id} 
                className="bg-white rounded-lg shadow-sm p-4 flex flex-col sm:flex-row gap-4"
              >
                <div className="w-full sm:w-32 h-32 bg-gray-100 rounded-lg overflow-hidden">
                  <img
                    src={item.images[0]}
                    alt={item.name}
                    className="w-full h-full object-contain"
                  />
                </div>

                <div className="flex-1">
                  <div className="flex justify-between">
                    <div>
                      <h3 className="font-medium text-gray-900">{item.name}</h3>
                      <p className="text-sm text-gray-500">{item.brand}</p>
                    </div>
                    <p className="font-bold">₹{item.price.toLocaleString()}</p>
                  </div>

                  <div className="mt-4 flex items-center justify-between">
                    <div className="flex items-center border rounded-lg overflow-hidden">
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="px-3 py-1 bg-gray-100 hover:bg-gray-200 transition-colors"
                      >
                        <FiMinus />
                      </button>
                      <span className="px-4">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="px-3 py-1 bg-gray-100 hover:bg-gray-200 transition-colors"
                      >
                        <FiPlus />
                      </button>
                    </div>

                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="text-red-500 hover:text-red-700 p-1"
                    >
                      <FiTrash2 />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Order Summary */}
        <div className="lg:w-1/3">
          <div className="bg-white rounded-lg shadow-sm p-6 sticky top-4">
            <h2 className="text-xl font-bold text-gray-800 mb-4">Order Summary</h2>
            
            <div className="space-y-3 mb-6">
              <div className="flex justify-between">
                <span className="text-gray-600">Subtotal</span>
                <span>₹{totalPrice.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Shipping</span>
                <span className="text-green-500">FREE</span>
              </div>
              <div className="flex justify-between border-t pt-3">
                <span className="font-medium">Total</span>
                <span className="font-bold text-lg">₹{totalPrice.toLocaleString()}</span>
              </div>
            </div>

            <button className="w-full bg-orange-500 hover:bg-orange-600 text-white py-3 rounded-lg font-medium transition-colors">
              Proceed to Checkout
            </button>

            <p className="text-xs text-gray-500 mt-4 text-center">
              Free shipping on all orders
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}