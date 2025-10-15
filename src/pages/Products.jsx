import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  FaHeart,
  FaRegHeart,
  FaShoppingCart,
  FaStar,
  FaFilter,
  FaSearch,
  FaTimes,
  FaChevronDown,
  FaChevronUp,
  FaCheck, // ADDED: Check icon for filters
} from "react-icons/fa";
import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import Loading from "../components/Loading";

const ProductCard = ({ product, onAddToCart, onAddToWishlist, onViewDetails, cart, wishlist }) => {
  const navigate = useNavigate();
  const isInCart = cart.some(item => item.id === product.id);
  const isInWishlist = wishlist.some(item => item.id === product.id);

  const handleBuyNow = () => {
    onAddToCart(product);
    navigate('/checkout');
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden flex flex-col hover:shadow-md transition-shadow">
      <div className="relative">
        <button
          onClick={() => onAddToWishlist(product)}
          className="absolute top-3 right-3 z-10 p-2 bg-white/80 rounded-full hover:bg-red-100 transition-colors shadow-sm"
        >
          {isInWishlist ? (
            <FaHeart className="text-red-500 text-lg" />
          ) : (
            <FaRegHeart className="text-gray-400 hover:text-red-500 text-lg" />
          )}
        </button>

        <div
          className="pt-[100%] bg-gray-50 relative cursor-pointer"
          onClick={() => onViewDetails(product)}
        >
          <img
            src={product.images[0]}
            alt={product.name}
            className="absolute top-0 left-0 w-full h-full object-contain p-4 hover:scale-105 transition-transform"
          />
          {product.stock <= 0 && (
            <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
              <span className="text-white font-bold bg-red-500 px-3 py-1 rounded-full text-sm">
                Out of Stock
              </span>
            </div>
          )}
        </div>
      </div>

      <div className="p-4 flex flex-col flex-grow">
        <div className="flex-grow">
          <span className="text-xs font-medium text-orange-600 uppercase tracking-wider">
            {product.brand}
          </span>
          <h3
            className="text-lg font-bold text-gray-900 mt-1 mb-2 line-clamp-2 cursor-pointer hover:text-orange-600"
            onClick={() => onViewDetails(product)}
          >
            {product.name}
          </h3>
        </div>

        <div className="mt-4 flex items-end justify-between">
          <div>
            <span className="text-xl font-bold text-gray-900">
              ₹{product.price.toLocaleString()}
            </span>
            {product.warranty && (
              <p className="text-xs text-green-600 mt-1">1 Year Warranty</p>
            )}
          </div>
        </div>

        <div className="mt-4 grid grid-cols-2 gap-3">
          <button
            onClick={() => onViewDetails(product)}
            className="py-2 px-4 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50 transition-colors text-sm font-medium"
          >
            Details
          </button>
          <button
            onClick={() => onAddToCart(product)}
            disabled={product.stock <= 0}
            className={`py-2 px-4 rounded-lg transition-colors text-sm font-medium flex items-center justify-center gap-2 ${product.stock <= 0
                ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
                : isInCart
                  ? 'bg-green-100 text-green-700 border border-green-200'
                  : 'bg-orange-500 hover:bg-orange-600 text-white'
              }`}
          >
            <FaShoppingCart />
            {isInCart ? 'Added' : 'Add'}
          </button>
        </div>
      </div>
    </div>
  );
};

const FilterSection = ({ title, children, isOpen, onToggle }) => {
  return (
    <div className="py-5 border-b border-gray-200">
      <button className="flex justify-between items-center w-full text-left font-semibold text-gray-800" onClick={onToggle}>
        <span>{title}</span>
        {isOpen ? <FaChevronUp className="text-gray-400" /> : <FaChevronDown className="text-gray-400" />}
      </button>
      {isOpen && (<div className="mt-4 space-y-2 pr-2">{children}</div>)}
    </div>
  );
};

const Filters = ({ brands, priceRanges, categories, onFilterChange, onReset, onClose }) => {
  const [localFilters, setLocalFilters] = useState({ brand: [], price: [], category: [] });
  const [openSections, setOpenSections] = useState({ brand: true, price: true, category: false });

  const toggleSection = (section) => setOpenSections(prev => ({ ...prev, [section]: !prev[section] }));

  const handleFilterToggle = (type, value) => {
    setLocalFilters(prevFilters => {
      const newValues = prevFilters[type].includes(value)
        ? prevFilters[type].filter(item => item !== value)
        : [...prevFilters[type], value];
      return { ...prevFilters, [type]: newValues };
    });
  };
  
  const handleApplyFilters = () => {
    onFilterChange(localFilters);
    onClose();
  };

  const handleReset = () => {
    const freshFilters = { brand: [], price: [], category: [] };
    setLocalFilters(freshFilters);
    onFilterChange(freshFilters); // Apply reset immediately
  };

  return (
    <div className="bg-white h-full flex flex-col">
      {/* Header */}
      <div className="flex justify-between items-center p-5 bg-gray-50 border-b border-gray-200">
        <h3 className="font-bold text-lg flex items-center text-gray-800">
          <FaFilter className="mr-3 text-orange-500" /> Filters
        </h3>
        <button onClick={onClose} className="text-gray-400 hover:text-gray-800">
          <FaTimes size={20} />
        </button>
      </div>

      {/* Filter Options */}
      <div className="flex-grow overflow-y-auto p-5">
        <FilterSection title="Brands" isOpen={openSections.brand} onToggle={() => toggleSection('brand')}>
          {brands.map(brand => {
            const isSelected = localFilters.brand.includes(brand);
            return (
              <div key={brand} className={`flex items-center justify-between px-3 py-2 rounded-lg cursor-pointer transition-colors ${isSelected ? 'bg-orange-50 text-orange-700 font-semibold' : 'hover:bg-gray-100 text-gray-600'}`} onClick={() => handleFilterToggle('brand', brand)}>
                <span>{brand}</span>
                {isSelected && <FaCheck className="text-orange-600" />}
              </div>
            )
          })}
        </FilterSection>
        <FilterSection title="Price Range" isOpen={openSections.price} onToggle={() => toggleSection('price')}>
          {priceRanges.map(range => {
            const isSelected = localFilters.price.includes(range.value);
            return (
              <div key={range.value} className={`flex items-center justify-between px-3 py-2 rounded-lg cursor-pointer transition-colors ${isSelected ? 'bg-orange-50 text-orange-700 font-semibold' : 'hover:bg-gray-100 text-gray-600'}`} onClick={() => handleFilterToggle('price', range.value)}>
                <span>{range.label}</span>
                {isSelected && <FaCheck className="text-orange-600" />}
              </div>
            )
          })}
        </FilterSection>
        {/* You can add the Categories section here following the same pattern */}
      </div>

      {/* Footer */}
      <div className="p-5 bg-white border-t border-gray-200 grid grid-cols-2 gap-3">
          <button onClick={handleReset} className="w-full py-3 px-4 rounded-lg text-sm font-medium bg-gray-200 hover:bg-gray-300 text-gray-800 transition-colors">Reset</button>
          <button onClick={handleApplyFilters} className="w-full py-3 px-4 rounded-lg text-sm font-medium bg-orange-500 hover:bg-orange-600 text-white transition-colors">Apply</button>
      </div>
    </div>
  );
};

const FilterDrawer = ({ isOpen, onClose, ...props }) => {
  return (
    <div
      className={`fixed top-0 left-0 h-full w-96 bg-white z-40 shadow-2xl transform transition-transform duration-300 ease-in-out ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}
    >
      <Filters onClose={onClose} {...props} />
    </div>
  );
};

const SearchBar = ({ value, onChange, onClear }) => {
  return (
    <div className="relative max-w-2xl mx-auto mb-8">
      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
        <FaSearch className="text-gray-400" />
      </div>
      <input
        type="text"
        placeholder="Search products by name, brand or description..."
        className="block w-full pl-10 pr-10 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={(e) => { if (e.key === 'Enter') e.preventDefault(); }}
      />
      {value && (
        <button
          onClick={onClear}
          className="absolute inset-y-0 right-0 pr-3 flex items-center"
          aria-label="Clear search"
        >
          <FaTimes className="text-gray-400 hover:text-gray-500" />
        </button>
      )}
    </div>
  );
};

const ProductDetailsModal = ({ product, onClose, onAddToCart, onAddToWishlist, cart, wishlist }) => {
  if (!product) return null;

  const isInCart = cart.some(item => item.id === product.id);
  const isInWishlist = wishlist.some(item => item.id === product.id);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center border-b p-4 sticky top-0 bg-white z-10">
          <h3 className="text-xl font-bold">{product.name}</h3>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <FaTimes className="h-5 w-5" />
          </button>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <div className="bg-gray-100 rounded-lg p-4 mb-4">
                <img src={product.images[0]} alt={product.name} className="w-full h-64 object-contain" />
              </div>
              <div className="grid grid-cols-4 gap-2">
                {product.images.map((img, index) => (
                  <div key={index} className="bg-gray-100 rounded p-2 cursor-pointer hover:border-orange-500 border border-transparent">
                    <img src={img} alt={`${product.name} ${index + 1}`} className="w-full h-16 object-contain" />
                  </div>
                ))}
              </div>
            </div>
            <div>
              <div className="flex justify-between items-start mb-4">
                <div>
                  <span className="text-sm text-orange-600">{product.brand}</span>
                  <div className="flex items-center mt-1">
                    {[...Array(5)].map((_, i) => (
                      <FaStar key={i} className={i < Math.floor(product.rating || 4) ? "text-yellow-400" : "text-gray-300"} />
                    ))}
                    <span className="text-sm text-gray-500 ml-1">({product.reviews?.length || 0})</span>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold">₹{product.price.toLocaleString()}</p>
                  <p className={`text-sm ${product.stock > 0 ? 'text-green-600' : 'text-red-600'}`}>
                    {product.stock > 0 ? 'In Stock' : 'Out of Stock'}
                  </p>
                </div>
              </div>
              <p className="text-gray-700 mb-6">{product.description}</p>
              <div className="mb-6">
                <h4 className="font-bold mb-3">Specifications</h4>
                <div className="grid grid-cols-2 gap-4">
                  {Object.entries(product.specifications).map(([key, value]) => (
                    <div key={key} className="py-2 border-b">
                      <span className="text-sm text-gray-500 capitalize">{key}</span>
                      <p className="font-medium">{value}</p>
                    </div>
                  ))}
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={() => { onAddToCart(product); onClose(); }}
                  disabled={product.stock <= 0}
                  className={`py-2 px-4 rounded-lg flex items-center justify-center gap-2 ${product.stock <= 0 ? 'bg-gray-200 text-gray-500 cursor-not-allowed' : isInCart ? 'bg-green-100 text-green-700 border border-green-200' : 'bg-orange-500 hover:bg-orange-600 text-white'}`}
                >
                  <FaShoppingCart /> {isInCart ? 'Added to Cart' : 'Add to Cart'}
                </button>
                <button
                  onClick={() => onAddToWishlist(product)}
                  className={`py-2 px-4 rounded-lg border flex items-center justify-center gap-2 ${isInWishlist ? 'border-red-200 bg-red-50 text-red-600' : 'border-gray-300 hover:bg-gray-50 text-gray-700'}`}
                >
                  {isInWishlist ? (<FaHeart className="text-red-500" />) : (<FaRegHeart />)}
                  {isInWishlist ? 'In Wishlist' : 'Wishlist'}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  if (totalPages <= 1) return null;
  const maxVisiblePages = 5;
  let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
  let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);
  if (endPage - startPage + 1 < maxVisiblePages) {
    startPage = Math.max(1, endPage - maxVisiblePages + 1);
  }
  const pages = Array.from({ length: (endPage - startPage) + 1 }, (_, i) => startPage + i);

  return (
    <div className="flex justify-center mt-12">
      <nav className="flex items-center gap-2">
        <button onClick={() => onPageChange(currentPage - 1)} disabled={currentPage === 1} className="px-3 py-1 rounded border disabled:text-gray-400 disabled:cursor-not-allowed hover:bg-gray-100">
          &laquo;
        </button>
        {startPage > 1 && (
          <>
            <button onClick={() => onPageChange(1)} className="px-3 py-1 rounded border hover:bg-gray-100">1</button>
            {startPage > 2 && <span className="px-2">...</span>}
          </>
        )}
        {pages.map(page => (
          <button key={page} onClick={() => onPageChange(page)} className={`px-3 py-1 rounded border ${page === currentPage ? 'bg-orange-500 text-white' : 'hover:bg-gray-100'}`}>
            {page}
          </button>
        ))}
        {endPage < totalPages && (
          <>
            {endPage < totalPages - 1 && <span className="px-2">...</span>}
            <button onClick={() => onPageChange(totalPages)} className="px-3 py-1 rounded border hover:bg-gray-100">{totalPages}</button>
          </>
        )}
        <button onClick={() => onPageChange(currentPage + 1)} disabled={currentPage === totalPages} className="px-3 py-1 rounded border disabled:text-gray-400 disabled:cursor-not-allowed hover:bg-gray-100">
          &raquo;
        </button>
      </nav>
    </div>
  );
};


export default function Products() {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [brands, setBrands] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const { addToCart, cart } = useCart();
  const { wishlist, toggleWishlist } = useWishlist();
  
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(12);

  const priceRanges = [
    { label: "Under ₹10,000", value: "0-10000" },
    { label: "₹10,000 - ₹20,000", value: "10000-20000" },
    { label: "₹20,000 - ₹40,000", value: "20000-40000" },
    { label: "₹40,000 - ₹80,000", value: "40000-80000" },
    { label: "Over ₹80,000", value: "80000-1000000" }
  ];

  useEffect(() => {
    setLoading(true);
    axios.get("https://snapmobdb-1.onrender.com/products")
      .then((res) => {
        const productsData = res.data || [];
        setProducts(productsData);
        setFilteredProducts(productsData);
        const uniqueBrands = [...new Set(productsData.map(p => p.brand))];
        const uniqueCategories = [...new Set(productsData.map(p => p.category))];
        setBrands(uniqueBrands);
        setCategories(uniqueCategories);
      })
      .catch(error => console.error("Failed to fetch products:", error))
      .finally(() => setLoading(false));
  }, []);
  
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

  const applyFilters = (filters) => {
    let results = [...products];
    if (filters.brand.length > 0) {
      results = results.filter(p => filters.brand.includes(p.brand));
    }
    if (filters.price.length > 0) {
      results = results.filter(p => filters.price.some(range => {
        const [min, max] = range.split('-').map(Number);
        return p.price >= min && p.price <= max;
      }));
    }
    if (filters.category.length > 0) {
      results = results.filter(p => filters.category.includes(p.category));
    }
    setFilteredProducts(results);
    setCurrentPage(1);
  };
  
  const handleFilterChange = (filters) => {
    if (searchTerm) {
      // This logic seems complex, let's simplify for now. The search should be independent.
      // We will handle search separately.
    }
    applyFilters(filters);
  };
  
  useEffect(() => {
    const searchTermLower = searchTerm.toLowerCase();
    const results = products.filter(p =>
        p.name.toLowerCase().includes(searchTermLower) ||
        p.brand.toLowerCase().includes(searchTermLower) ||
        (p.description && p.description.toLowerCase().includes(searchTermLower))
    );
    setFilteredProducts(results);
    setCurrentPage(1);
  }, [searchTerm, products]);


  const handleResetFilters = () => {
    setFilteredProducts(products);
    setCurrentPage(1);
  };

  const handleAddToCart = (product) => addToCart(product);
  const handleAddToWishlist = (product) => toggleWishlist(product);
  const handleViewDetails = (product) => { setSelectedProduct(product); setShowModal(true); };
  const handlePageChange = (pageNumber) => { setCurrentPage(pageNumber); window.scrollTo({ top: 0, behavior: 'smooth' }); };

  if (loading) return <Loading />;

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="relative overflow-x-hidden"> {/* Prevent horizontal scroll during transition */}
        <FilterDrawer
          isOpen={showFilters}
          onClose={() => setShowFilters(false)}
          brands={brands}
          priceRanges={priceRanges}
          categories={categories}
          onFilterChange={handleFilterChange} // This will be the "Apply" button's action
          onReset={handleResetFilters} // This will be the "Reset" button's action
        />
        
        <main className={`transition-all duration-300 ease-in-out ${showFilters ? 'lg:ml-96' : ''}`}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <SearchBar value={searchTerm} onChange={setSearchTerm} onClear={() => setSearchTerm('')} />
            
            <div className="mb-6 flex justify-between items-center">
              <div>
                <h2 className="text-xl font-bold text-gray-800">
                  {filteredProducts.length} {filteredProducts.length === 1 ? 'Product' : 'Products'} Found
                </h2>
                <p className="text-sm text-gray-500 mt-1">
                  Showing {indexOfFirstProduct + 1}-{Math.min(indexOfLastProduct, filteredProducts.length)} of {filteredProducts.length}
                </p>
              </div>
              <button
                onClick={() => setShowFilters(true)}
                className="flex items-center justify-center gap-2 py-2 px-4 bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-100 transition-colors shadow-sm"
              >
                <FaFilter />
                <span className="font-medium">Filters</span>
              </button>
            </div>

            {currentProducts.length > 0 ? (
              <>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {currentProducts.map((product) => (
                    <ProductCard
                      key={product.id} product={product} onAddToCart={handleAddToCart}
                      onAddToWishlist={handleAddToWishlist} onViewDetails={handleViewDetails}
                      cart={cart} wishlist={wishlist}
                    />
                  ))}
                </div>
                <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
              </>
            ) : (
              <div className="text-center py-16 bg-white rounded-lg border border-gray-200">
                <FaSearch className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                <h3 className="text-lg font-medium text-gray-800 mb-2">No products found for your search</h3>
                <p className="text-sm text-gray-500">Try adjusting your search or filters.</p>
              </div>
            )}
          </div>
        </main>
      </div>

      {showModal && (
        <ProductDetailsModal
          product={selectedProduct}
          onClose={() => setShowModal(false)}
          onAddToCart={handleAddToCart}
          onAddToWishlist={handleAddToWishlist}
          cart={cart}
          wishlist={wishlist}
        />
      )}
    </div>
  );
}