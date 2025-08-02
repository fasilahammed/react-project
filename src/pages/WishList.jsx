import React from 'react';
import { useWishlist } from '../context/WishlistContext';
import { useCart } from '../context/CartContext';
import { FiHeart, FiShoppingCart, FiTrash2 } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import emptyWishlist from '../assets/img/empty-wishlist.svg';

export default function WishList() {
  const { wishlist, wishlistCount, removeFromWishlist } = useWishlist();
  const { addToCart } = useCart();

  if (wishlistCount === 0) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-12 text-center">
        <img 
          src={emptyWishlist} 
          alt="Empty Wishlist" 
          className="w-64 h-64 mx-auto mb-8"
        />
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Your wishlist is empty</h2>
        <p className="text-gray-600 mb-6">
          Save items you love to buy them later
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
      <h1 className="text-2xl font-bold text-gray-800 mb-8">
        Your Wishlist ({wishlistCount} {wishlistCount === 1 ? 'item' : 'items'})
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {wishlist.map((product) => (
          <div 
            key={product.id} 
            className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-md transition-shadow"
          >
            <div className="relative pt-[100%] overflow-hidden">
              <img
                src={product.images[0]}
                alt={product.name}
                className="absolute top-0 left-0 w-full h-full object-contain"
              />
            </div>

            <div className="p-4">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h3 className="font-medium text-gray-900 line-clamp-1">{product.name}</h3>
                  <p className="text-sm text-gray-500">{product.brand}</p>
                </div>
                <button
                  onClick={() => removeFromWishlist(product.id)}
                  className="text-red-500 hover:text-red-700 p-1"
                >
                  <FiTrash2 />
                </button>
              </div>

              <p className="text-lg font-bold mb-4">₹{product.price.toLocaleString()}</p>

              <div className="flex space-x-2">
                <button
                  onClick={() => {
                    addToCart(product);
                    removeFromWishlist(product.id);
                  }}
                  className="flex-1 bg-orange-500 hover:bg-orange-600 text-white py-2 px-3 rounded-lg text-sm flex items-center justify-center gap-1"
                >
                  <FiShoppingCart /> Add to Cart
                </button>
                <button onClick={() => {
                    addToCart(product);
                    removeFromWishlist(product.id);
                  }} className="p-2 text-red-500 border border-red-500 hover:bg-red-50 rounded-lg">
                  <FiHeart />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}