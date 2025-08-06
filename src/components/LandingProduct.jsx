import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FiArrowRight, FiShoppingBag, FiHeart } from 'react-icons/fi';
import { FaStar, FaRegHeart, FaHeart as FaSolidHeart } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';
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
        const response = await axios.get("http://localhost:3000/products?premium=true&_limit=6");
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
        }
      }
    );
  };

  if (loading) {
    return (
      <div className="py-20 flex justify-center">
        <div className="animate-pulse flex space-x-4">
          <div className="flex-1 space-y-6 py-1">
            <div className="h-8 bg-gray-200 rounded w-3/4"></div>
            <div className="space-y-3">
              <div className="grid grid-cols-3 gap-4">
                <div className="h-40 bg-gray-200 rounded"></div>
                <div className="h-40 bg-gray-200 rounded"></div>
                <div className="h-40 bg-gray-200 rounded"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <section className="py-20 bg-gradient-to-b from-gray-50 to-white px-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center mb-12">
          <div className="mb-6 md:mb-0">
            <h2 className="text-3xl font-bold text-gray-900 mb-2">Premium Collection</h2>
            <p className="text-gray-600 max-w-lg">
              Discover our exclusive range of premium smartphones with cutting-edge technology and exquisite design.
            </p>
          </div>
          <Link 
            to="/products" 
            className="flex items-center text-orange-500 hover:text-orange-600 font-medium"
          >
            View all products <FiArrowRight className="ml-2" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product) => {
            const isInCart = cart.some(item => item.id === product.id);
            const isInWishlist = wishlist.some(item => item.id === product.id);

            return (
              <motion.div 
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
                className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100 hover:shadow-lg transition-all duration-300"
              >
                <div className="relative">
                  <button
                    onClick={() => handleAddToWishlist(product)}
                    className="absolute top-4 right-4 z-10 p-2 bg-white rounded-full shadow-md hover:bg-gray-100 transition-colors"
                  >
                    {isInWishlist ? (
                      <FaSolidHeart className="text-red-500 text-lg" />
                    ) : (
                      <FaRegHeart className="text-gray-600 hover:text-red-500 text-lg" />
                    )}
                  </button>

                  <Link to={`/products/${product.id}`} className="block">
                    <div className="pt-[100%] bg-gray-50 relative">
                      <img
                        src={product.images[0]}
                        alt={product.name}
                        className="absolute top-0 left-0 w-full h-full object-contain p-6 hover:scale-105 transition-transform"
                      />
                      {product.stock <= 0 && (
                        <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                          <span className="text-white font-bold bg-red-500 px-3 py-1 rounded-full text-sm">
                            Out of Stock
                          </span>
                        </div>
                      )}
                    </div>
                  </Link>
                </div>

                <div className="p-6">
                  <div className="mb-4">
                    <span className="text-xs font-medium text-orange-600 uppercase tracking-wider">
                      {product.brand}
                    </span>
                    <Link to={`/products/${product.id}`}>
                      <h3 className="text-xl font-bold text-gray-900 mt-1 mb-2 hover:text-orange-600 transition-colors">
                        {product.name}
                      </h3>
                    </Link>
                    {/* <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <FaStar
                          key={i}
                          className={i < Math.floor(product.rating || 4) ? "text-yellow-400" : "text-gray-300"}
                          size={14}
                        />
                      ))}
                      <span className="text-sm text-gray-500 ml-1">({product.reviews?.length || 0})</span>
                    </div> */}
                  </div>

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
                      <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">
                        2 Year Warranty
                      </span>
                    )}
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <button
                      onClick={() => handleAddToCart(product)}
                      disabled={product.stock <= 0}
                      className={`py-2 px-4 rounded-lg transition-colors text-sm font-medium flex items-center justify-center gap-2 ${
                        product.stock <= 0
                          ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
                          : isInCart
                            ? 'bg-green-100 text-green-700 border border-green-200'
                            : 'bg-orange-500 hover:bg-orange-600 text-white'
                      }`}
                    >
                      <FiShoppingBag />
                      {isInCart ? 'Added' : 'Add'}
                    </button>
                    <Link
                      to={`/products/${product.id}`}
                      className="py-2 px-4 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50 transition-colors text-sm font-medium flex items-center justify-center"
                    >
                      Details
                    </Link>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {products.length === 0 && (
          <div className="text-center py-16 bg-white rounded-lg border border-gray-200">
            <div className="mx-auto h-12 w-12 text-gray-400 mb-4">📱</div>
            <h3 className="text-lg font-medium mb-2">No premium products available</h3>
            <Link
              to="/products"
              className="mt-4 inline-block px-4 py-2 bg-orange-500 text-white rounded hover:bg-orange-600"
            >
              Browse all products
            </Link>
          </div>
        )}
      </div>
    </section>
  );
};

export default LandingProduct;