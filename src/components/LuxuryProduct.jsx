import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FiArrowRight, FiArrowLeft, FiShoppingBag, FiHeart } from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { toast } from 'react-hot-toast';

const LuxuryProduct = () => {
  const [products, setProducts] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const { addToCart, cart } = useCart();
  const { wishlist, toggleWishlist } = useWishlist();

  useEffect(() => {
    // Fetch luxury products from your API
    fetch('http://localhost:3000/products?category=premium&_limit=6')
      .then(res => res.json())
      .then(data => setProducts(data))
      .catch(err => console.error('Error fetching products:', err));
  }, []);

  const nextSlide = () => {
    setDirection(1);
    setCurrentIndex((prevIndex) => 
      prevIndex === products.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevSlide = () => {
    setDirection(-1);
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? products.length - 1 : prevIndex - 1
    );
  };

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

  if (products.length === 0) return null;

  return (
    <section className="py-20 bg-gradient-to-b from-gray-50 to-white px-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center mb-12">
          <div className="mb-6 md:mb-0">
            <h2 className="text-3xl font-bold text-gray-900 mb-2">Luxury Collection</h2>
            <p className="text-gray-600 max-w-lg">
              Discover our exclusive range of premium smartphones with cutting-edge technology and exquisite design.
            </p>
          </div>
          <Link 
            to="/products?category=premium" 
            className="flex items-center text-orange-500 hover:text-orange-600 font-medium"
          >
            View all luxury products <FiArrowRight className="ml-2" />
          </Link>
        </div>

        <div className="relative">
          <div className="overflow-hidden">
            <div className="relative h-[500px]">
              <AnimatePresence custom={direction}>
                <motion.div
                  key={currentIndex}
                  custom={direction}
                  initial={{ opacity: 0, x: direction > 0 ? 100 : -100 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: direction > 0 ? -100 : 100 }}
                  transition={{ duration: 0.5 }}
                  className="absolute inset-0 flex items-center"
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                    <div className="relative h-96 bg-gradient-to-br from-gray-100 to-gray-50 rounded-2xl shadow-xl overflow-hidden">
                      <img
                        src={products[currentIndex]?.images[0]}
                        alt={products[currentIndex]?.name}
                        className="absolute inset-0 w-full h-full object-contain p-8"
                      />
                      <div className="absolute bottom-4 left-4 right-4 flex justify-between items-center">
                        <button 
                          onClick={() => handleAddToWishlist(products[currentIndex])}
                          className="p-3 bg-white/80 backdrop-blur-sm rounded-full shadow-md hover:bg-gray-100 transition-colors"
                        >
                          <FiHeart 
                            className={`text-lg ${wishlist.some(item => item.id === products[currentIndex]?.id) ? 'text-red-500 fill-red-500' : 'text-gray-600'}`} 
                          />
                        </button>
                        <button 
                          onClick={() => handleAddToCart(products[currentIndex])}
                          className="p-3 bg-white/80 backdrop-blur-sm rounded-full shadow-md hover:bg-gray-100 transition-colors"
                        >
                          <FiShoppingBag className="text-lg text-gray-600" />
                        </button>
                      </div>
                    </div>
                    <div className="space-y-6">
                      <div>
                        <span className="text-sm font-medium text-orange-600 uppercase tracking-wider">
                          {products[currentIndex]?.brand}
                        </span>
                        <h3 className="text-3xl font-bold text-gray-900 mt-2 mb-4">
                          {products[currentIndex]?.name}
                        </h3>
                        <p className="text-gray-600 mb-6">
                          {products[currentIndex]?.description}
                        </p>
                      </div>
                      <div className="flex items-center space-x-4">
                        <span className="text-3xl font-bold text-gray-900">
                          ₹{products[currentIndex]?.price.toLocaleString()}
                        </span>
                        {products[currentIndex]?.originalPrice && (
                          <span className="text-lg text-gray-400 line-through">
                            ₹{products[currentIndex]?.originalPrice.toLocaleString()}
                          </span>
                        )}
                      </div>
                      <div className="flex space-x-4">
                        <button
                          onClick={() => handleAddToCart(products[currentIndex])}
                          className="px-6 py-3 bg-orange-500 hover:bg-orange-600 text-white rounded-lg font-medium transition-colors flex items-center"
                        >
                          <FiShoppingBag className="mr-2" /> Add to Cart
                        </button>
                        <Link
                          to={`/products/${products[currentIndex]?.id}`}
                          className="px-6 py-3 border border-gray-300 hover:bg-gray-50 text-gray-700 rounded-lg font-medium transition-colors"
                        >
                          View Details
                        </Link>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          <button
            onClick={prevSlide}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 bg-white p-3 rounded-full shadow-lg hover:bg-gray-100 transition-colors z-10"
          >
            <FiArrowLeft className="text-gray-700" />
          </button>
          <button
            onClick={nextSlide}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 bg-white p-3 rounded-full shadow-lg hover:bg-gray-100 transition-colors z-10"
          >
            <FiArrowRight className="text-gray-700" />
          </button>

          <div className="flex justify-center mt-8 space-x-2">
            {products.map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  setDirection(index > currentIndex ? 1 : -1);
                  setCurrentIndex(index);
                }}
                className={`w-3 h-3 rounded-full transition-colors ${index === currentIndex ? 'bg-orange-500' : 'bg-gray-300'}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default LuxuryProduct;