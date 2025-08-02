import React from 'react';
import { useWishlist } from '../context/WishlistContext';
import { useCart } from '../context/CartContext';
import { FaHeart, FaTrash, FaShoppingCart } from 'react-icons/fa';
import { Link } from 'react-router-dom';

export default function WishList() {
  const { wishlistItems, toggleWishlist } = useWishlist();
  const { addToCart } = useCart();

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Your Wishlist</h1>
      
      {wishlistItems.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500 mb-4">Your wishlist is empty</p>
          <Link 
            to="/products" 
            className="inline-block bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded-lg transition-colors"
          >
            Browse Products
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
          {wishlistItems.map(product => (
            <div 
              key={product.id}
              className="bg-white rounded-xl shadow-sm hover:shadow-lg transition-shadow overflow-hidden border border-gray-100 relative group"
            >
              <button 
                onClick={() => toggleWishlist(product)}
                className="absolute top-3 right-3 z-10 p-2 bg-white/90 rounded-full hover:bg-red-100 transition-all"
                aria-label="Remove from wishlist"
              >
                <FaHeart className="text-red-500 text-lg" />
              </button>

              <Link to={`/products/${product.id}`} className="block">
                <div className="w-full h-56 overflow-hidden bg-gray-50">
                  <img
                    src={product.images[0]}
                    alt={product.name}
                    className="w-full h-full object-contain transition-transform duration-500 group-hover:scale-110"
                    loading="lazy"
                  />
                </div>
              </Link>

              <div className="p-4">
                <div className="flex justify-between items-start mb-1">
                  <div className="w-4/5">
                    <p className="text-xs text-gray-500 truncate">{product.brand}</p>
                    <h3 className="text-sm font-semibold text-gray-900 truncate">{product.name}</h3>
                  </div>
                  <span className={`text-xs px-2 py-1 rounded-full ${product.stock > 0 ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                    {product.stock > 0 ? 'In Stock' : 'Sold Out'}
                  </span>
                </div>

                <p className="text-lg font-bold text-gray-900 mt-2">
                  ₹{product.price.toLocaleString()}
                </p>

                <div className="mt-4">
                  <button 
                    onClick={() => {
                      addToCart(product);
                      toggleWishlist(product);
                    }}
                    disabled={product.stock <= 0}
                    className={`w-full flex items-center justify-center gap-2 py-2 px-4 rounded-lg transition-colors ${product.stock > 0 ? 'bg-orange-500 hover:bg-orange-600 text-white' : 'bg-gray-200 text-gray-500 cursor-not-allowed'}`}
                  >
                    <FaShoppingCart />
                    <span className="text-sm">Move to Cart</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}