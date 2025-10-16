import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FiShoppingBag, FiChevronRight } from 'react-icons/fi';
import { FaStar, FaRegHeart, FaHeart as FaSolidHeart } from 'react-icons/fa';
import { motion } from 'framer-motion';

import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { toast } from 'react-hot-toast';
import axios from 'axios';

const LandingProduct = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const { addToCart, cart } = useCart();
  const { wishlist, toggleWishlist } = useWishlist();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("https://snapmobdb-1.onrender.com/products?premium=true&_limit=6");
        setProducts(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching products:", error);
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const handleAddToCart = (product) => {
    addToCart(product);
    toast.success(`${product.name} added to cart!`, {
      position: "bottom-right",
      icon: '🛒',
      style: {
        background: '#333',
        color: '#fff',
        borderRadius: '12px'
      }
    });
  };

  const handleAddToWishlist = (product) => {
    const added = toggleWishlist(product);
    toast.success(
      added ? `${product.name} added to wishlist!` : `${product.name} removed from wishlist`,
      {
        position: "bottom-right",
        icon: added ? '❤️' : '💔',
        style: {
          background: '#333',
          color: '#fff',
          borderRadius: '12px'
        }
      }
    );
  };

  if (loading) {
    return (
      <div className="py-20 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="animate-pulse space-y-8">
            <div className="h-10 bg-gray-200 rounded w-1/3"></div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="space-y-4">
                  <div className="h-64 bg-gray-200 rounded-xl"></div>
                  <div className="h-6 bg-gray-200 rounded w-3/4"></div>
                  <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                  <div className="h-10 bg-gray-200 rounded"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-16">
          <div className="mb-6 md:mb-0 text-center md:text-left">
            <span className="text-sm font-semibold text-orange-500 tracking-widest uppercase">
              Premium Selection
            </span>
            <h2 className="text-4xl font-bold text-gray-900 mt-2 mb-4">
              Luxury <span className="text-orange-500">Smartphones</span>
            </h2>
            <p className="text-gray-600 max-w-xl">
              Experience unparalleled craftsmanship with our handpicked collection of premium devices
            </p>
          </div>
          <Link 
            to="/products" 
            className="group flex items-center text-orange-500 hover:text-orange-600 font-medium transition-colors"
          >
            <span className="mr-2 group-hover:mr-3 transition-all">Explore Collection</span>
            <FiChevronRight className="transform group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product) => {
            const isInCart = cart.some(item => item.id === product.id);
            const isInWishlist = wishlist.some(item => item.id === product.id);

            return (
              <motion.div 
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                viewport={{ once: true, margin: "0px 0px -100px 0px" }}
                className="group relative bg-white rounded-2xl shadow-sm overflow-hidden border border-gray-100 hover:shadow-xl transition-all duration-300"
              >
                {/* Premium Badge */}
                <div className="absolute top-4 left-4 bg-gradient-to-r from-orange-500 to-amber-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-md z-10">
                  PREMIUM
                </div>

                {/* Wishlist Button */}
                <button
                  onClick={() => handleAddToWishlist(product)}
                  className="absolute top-4 right-4 z-20 p-2 bg-white rounded-full shadow-lg hover:bg-gray-50 transition-colors"
                  aria-label={isInWishlist ? "Remove from wishlist" : "Add to wishlist"}
                >
                  {isInWishlist ? (
                    <FaSolidHeart className="text-red-500 text-lg" />
                  ) : (
                    <FaRegHeart className="text-gray-500 group-hover:text-red-500 text-lg transition-colors" />
                  )}
                </button>

                {/* Product Image */}
                <Link to={`/products/${product.id}`} className="block">
                  <div className="pt-[100%] bg-gradient-to-br from-gray-50 to-gray-100 relative overflow-hidden">
                    <img
                      src={product.images[0]}
                      alt={product.name}
                      className="absolute top-0 left-0 w-full h-full object-contain p-8 group-hover:scale-105 transition-transform duration-500"
                    />
                    {product.stock <= 0 && (
                      <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                        <span className="text-white font-bold bg-red-500/90 px-4 py-2 rounded-full text-sm backdrop-blur-sm">
                          Out of Stock
                        </span>
                      </div>
                    )}
                  </div>
                </Link>

                {/* Product Details */}
                <div className="p-6">
                  <div className="mb-5">
                    <span className="text-xs font-medium text-orange-600 uppercase tracking-wider">
                      {product.brand}
                    </span>
                    <Link to={`/products/${product.id}`}>
                      <h3 className="text-xl font-bold text-gray-900 mt-2 mb-3 group-hover:text-orange-600 transition-colors line-clamp-2">
                        {product.name}
                      </h3>
                    </Link>
                    
                    {/* Key Features (replace with your actual product features) */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      {product.keyFeatures?.slice(0, 3).map((feature, index) => (
                        <span key={index} className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded">
                          {feature}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Price and Warranty */}
                  <div className="flex justify-between items-center mb-6">
                    <div>
                      <span className="text-xl font-bold text-gray-900">
                        ₹{product.price.toLocaleString()}
                      </span>
                      {product.originalPrice && (
                        <span className="text-sm text-gray-400 line-through ml-2">
                          ₹{product.originalPrice.toLocaleString()}
                        </span>
                      )}
                    </div>
                    {product.warranty && (
                      <span className="text-xs font-medium bg-green-100/80 text-green-800 px-3 py-1.5 rounded-full backdrop-blur-sm">
                        Warranty Included
                      </span>
                    )}
                  </div>

                  {/* Single Add to Cart Button */}
                  <button
                    onClick={() => handleAddToCart(product)}
                    disabled={product.stock <= 0}
                    className={`w-full py-3 px-4 rounded-xl transition-all duration-300 text-sm font-medium flex items-center justify-center gap-2 ${
                      product.stock <= 0
                        ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
                        : isInCart
                          ? 'bg-green-100 text-green-700 border border-green-200 hover:bg-green-200'
                          : 'bg-orange-500 hover:bg-orange-600 text-white shadow-md hover:shadow-lg'
                    }`}
                  >
                    <FiShoppingBag />
                    {isInCart ? 'Added to Cart' : 'Add to Cart'}
                  </button>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Empty State */}
        {products.length === 0 && !loading && (
          <div className="text-center py-16 bg-white rounded-2xl border border-gray-200 max-w-2xl mx-auto">
            <div className="mx-auto h-16 w-16 text-gray-400 mb-4 flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-full w-full" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round"  strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">No Premium Products Available</h3>
            <p className="text-gray-600 mb-6 max-w-md mx-auto">
              Our premium collection is currently being updated. Check back soon for our latest luxury devices.
            </p>
            <Link
              to="/products"
              className="inline-flex items-center px-6 py-3 bg-orange-500 hover:bg-orange-600 text-white font-medium rounded-lg shadow-md hover:shadow-lg transition-all"
            >
              Browse All Products
              <FiChevronRight className="ml-2" />
            </Link>
          </div>
        )}
      </div>
    </section>
  );
};

export default LandingProduct;