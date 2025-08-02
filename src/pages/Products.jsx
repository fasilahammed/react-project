import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaHeart, FaRegHeart, FaShoppingCart } from "react-icons/fa";
import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";
import { toast } from "react-hot-toast";

export default function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const { addToCart, cart } = useCart();
  const { wishlist, toggleWishlist } = useWishlist();

  useEffect(() => {
    axios.get("http://localhost:3000/products")
      .then((res) => { 
        setProducts(res.data || []); 
        setLoading(false); 
      })
      .catch(() => setLoading(false));
  }, []);

  const handleAddToCart = (product) => {
    addToCart(product);
    toast.success(`${product.name} added to cart!`, {
      position: "bottom-right",
    });
  };

  if (loading) return <div className="text-center py-20">Loading products...</div>;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {products.map((product) => (
          <div
            key={product.id}
            className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300 ease-in-out relative"
          >
            {/* Wishlist Button */}
            <button
              onClick={() => {
                const added = toggleWishlist(product);
                toast.success(
                  added 
                    ? `${product.name} added to wishlist!` 
                    : `${product.name} removed from wishlist`,
                  { position: "bottom-right" }
                );
              }}
              className="absolute top-3 right-3 z-10 p-2 bg-white/80 rounded-full hover:bg-red-100 transition-colors"
            >
              {wishlist.some(item => item.id === product.id) ? (
                <FaHeart className="text-red-500" />
              ) : (
                <FaRegHeart className="text-gray-400 hover:text-red-500" />
              )}
            </button>

            {/* Product Image */}
            <div className="relative pt-[100%] overflow-hidden group">
              <img
                src={product.images[0]}
                alt={product.name}
                className="absolute top-0 left-0 w-full h-full object-contain group-hover:scale-105 transition-transform duration-500"
              />
              {product.stock <= 0 && (
                <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                  <span className="text-white font-bold bg-red-500 px-3 py-1 rounded-full text-sm">
                    Out of Stock
                  </span>
                </div>
              )}
            </div>

            {/* Product Details */}
            <div className="p-5">
              <div className="flex justify-between items-start">
                <div>
                  <span className="text-sm text-gray-500">{product.brand}</span>
                  <h3 className="text-lg font-bold text-gray-900 mt-1 line-clamp-1">
                    {product.name}
                  </h3>
                </div>
                <span className="text-lg font-bold text-gray-900">
                  ₹{product.price.toLocaleString()}
                </span>
              </div>

              {/* Quick Specs */}
              <div className="mt-3 text-sm text-gray-600 space-y-1">
                <p>Display: {product.specifications.display}</p>
                <p>Storage: {product.specifications.storage}</p>
              </div>

              {/* Action Buttons */}
              <div className="mt-4 flex space-x-3">
                <button
                  onClick={() => handleAddToCart(product)}
                  disabled={product.stock <= 0}
                  className={`flex-1 py-2 px-4 rounded-lg transition-all duration-200 flex items-center justify-center gap-2 ${
                    product.stock <= 0
                      ? 'bg-gray-300 cursor-not-allowed'
                      : 'bg-orange-500 hover:bg-orange-600 text-white'
                  }`}
                >
                  <FaShoppingCart />
                  {cart.some(item => item.id === product.id) ? 'Added' : 'Add to Cart'}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}