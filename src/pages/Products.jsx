import React, { useEffect, useState } from "react";
import axios from "axios";
import { 
  FaHeart, 
  FaRegHeart, 
  FaShoppingCart, 
  FaStar,
  FaFilter,
  FaSearch
} from "react-icons/fa";
import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";
import { toast } from "react-hot-toast";

// Filter component
const ProductFilters = ({ brands, onFilterChange }) => {
  const [filters, setFilters] = useState({
    brand: '',
    minPrice: '',
    maxPrice: '',
    warranty: false
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFilters(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  useEffect(() => {
    onFilterChange(filters);
  }, [filters, onFilterChange]);

  return (
    <div className="bg-white p-4 rounded-lg shadow-md mb-8">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-bold text-lg flex items-center">
          <FaFilter className="mr-2" /> Filters
        </h3>
        <button 
          onClick={() => setFilters({
            brand: '',
            minPrice: '',
            maxPrice: '',
            warranty: false
          })}
          className="text-sm text-orange-500 hover:underline"
        >
          Clear All
        </button>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">Brand</label>
          <select
            name="brand"
            value={filters.brand}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          >
            <option value="">All Brands</option>
            {brands.map(brand => (
              <option key={brand} value={brand}>{brand}</option>
            ))}
          </select>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">Min Price</label>
            <input
              type="number"
              name="minPrice"
              placeholder="₹ Min"
              value={filters.minPrice}
              onChange={handleChange}
              className="w-full p-2 border rounded"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Max Price</label>
            <input
              type="number"
              name="maxPrice"
              placeholder="₹ Max"
              value={filters.maxPrice}
              onChange={handleChange}
              className="w-full p-2 border rounded"
            />
          </div>
        </div>

        <div className="flex items-center">
          <input
            type="checkbox"
            id="warranty"
            name="warranty"
            checked={filters.warranty}
            onChange={handleChange}
            className="mr-2"
          />
          <label htmlFor="warranty" className="text-sm">
            With Warranty
          </label>
        </div>
      </div>
    </div>
  );
};

// Rating component
const ProductRating = ({ rating }) => {
  const stars = Array(5).fill(0);
  
  return (
    <div className="flex items-center mt-2">
      {stars.map((_, i) => (
        <FaStar 
          key={i} 
          className={i < rating ? "text-yellow-400" : "text-gray-300"} 
        />
      ))}
      <span className="text-sm text-gray-500 ml-1">({rating})</span>
    </div>
  );
};

export default function Products() {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [brands, setBrands] = useState([]);
  const { addToCart, cart } = useCart();
  const { wishlist, toggleWishlist } = useWishlist();

  useEffect(() => {
    axios.get("http://localhost:3000/products")
      .then((res) => { 
        const productsData = res.data || [];
        setProducts(productsData);
        setFilteredProducts(productsData);
        
        // Extract unique brands
        const uniqueBrands = [...new Set(productsData.map(p => p.brand))];
        setBrands(uniqueBrands);
        
        setLoading(false); 
      })
      .catch(() => setLoading(false));
  }, []);

  const handleFilterChange = (filters) => {
    let results = [...products];
    
    if (filters.brand) {
      results = results.filter(p => p.brand === filters.brand);
    }
    
    if (filters.minPrice) {
      results = results.filter(p => p.price >= Number(filters.minPrice));
    }
    
    if (filters.maxPrice) {
      results = results.filter(p => p.price <= Number(filters.maxPrice));
    }
    
    if (filters.warranty) {
      results = results.filter(p => p.warranty);
    }
    
    if (searchTerm) {
      results = results.filter(p => 
        p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.brand.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    setFilteredProducts(results);
  };

  const handleAddToCart = (product) => {
    addToCart(product);
    toast.success(`${product.name} added to cart!`, {
      position: "bottom-right",
    });
  };

  if (loading) return <div className="text-center py-20">Loading products...</div>;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Search and Filter Section */}
      <div className="mb-8 flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <FaSearch className="text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="Search products..."
            className="pl-10 w-full p-3 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              handleFilterChange({}); // Trigger filter with empty filters
            }}
          />
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-8">
        {/* Filters Sidebar */}
        <div className="md:w-1/4">
          <ProductFilters 
            brands={brands} 
            onFilterChange={handleFilterChange} 
          />
        </div>

        {/* Products Grid */}
        <div className="md:w-3/4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProducts.map((product) => (
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

                {/* Product Image with White Background */}
                <div className="relative pt-[100%] bg-white overflow-hidden group">
                  <img
                    src={product.images[0]}
                    alt={product.name}
                    className="absolute top-0 left-0 w-full h-full object-contain p-4 group-hover:scale-105 transition-transform duration-500"
                    style={{ backgroundColor: 'white' }}
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
                      <ProductRating rating={product.rating || 4} />
                    </div>
                    <div className="text-right">
                      <span className="text-lg font-bold text-gray-900">
                        ₹{product.price.toLocaleString()}
                      </span>
                      {product.warranty && (
                        <p className="text-xs text-green-600 mt-1">1 Year Warranty</p>
                      )}
                    </div>
                  </div>

                  {/* Quick Specs */}
                  <div className="mt-3 text-sm text-gray-600 space-y-1">
                    <p><span className="font-medium">Display:</span> {product.specifications.display}</p>
                    <p><span className="font-medium">Storage:</span> {product.specifications.storage}</p>
                    <p><span className="font-medium">Battery:</span> {product.specifications.battery}</p>
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

          {filteredProducts.length === 0 && (
            <div className="text-center py-12">
              <h3 className="text-xl font-medium text-gray-700">No products found</h3>
              <p className="text-gray-500 mt-2">Try adjusting your filters or search term</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}