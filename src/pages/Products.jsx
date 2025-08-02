import React, { useEffect, useState } from "react";
import axios from "axios";

export default function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get("http://localhost:3000/products")
      .then((res) => { setProducts(res.data || []); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  if (loading) return <div className="text-center py-10">Loading...</div>;

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
        {products.map((product) => (
          <div 
            key={product.id}
            className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow overflow-hidden border border-gray-100"
          >
            {/* Compact Image (Fixed Height) */}
            <div className="h-40 overflow-hidden">
              <img
                src={product.images[0]}
                alt={product.name}
                className="w-full h-full object-cover hover:scale-105 transition-transform"
              />
            </div>

            {/* Compact Details */}
            <div className="p-3">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-xs text-gray-500">{product.brand}</p>
                  <h3 className="text-sm font-semibold line-clamp-1">{product.name}</h3>
                </div>
                <span className={`text-xs px-1.5 py-0.5 rounded ${product.stock > 0 ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                  {product.stock > 0 ? 'In Stock' : 'Sold Out'}
                </span>
              </div>

              <p className="text-lg font-bold mt-1">₹{product.price.toLocaleString()}</p>

              {/* Mini Specs (Always Visible) */}
              <div className="mt-2 text-xs text-gray-600 space-y-0.5">
                <p className="line-clamp-1">Display: {product.specifications.display}</p>
                <p className="line-clamp-1">Storage: {product.specifications.storage}</p>
              </div>

              {/* Compact Buttons */}
              <div className="mt-3 flex gap-2">
                <button className="text-xs bg-orange-500 hover:bg-orange-600 text-white px-3 py-1.5 rounded flex-1 transition-colors">
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}