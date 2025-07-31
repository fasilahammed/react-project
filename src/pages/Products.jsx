import React from 'react';

export default function Products() {
  const products = [
    { id: 1, name: 'iPhone 15', price: 799 },
    { id: 2, name: 'Samsung Galaxy S23', price: 699 },
    { id: 3, name: 'Nothing Phone 2', price: 599 },
  ];

  return (
    <div className="p-4">
      <h2 className="text-2xl mb-4 font-bold">🛒 Products</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {products.map((p) => (
          <div key={p.id} className="border p-4 rounded-md shadow">
            <h3 className="text-xl font-semibold">{p.name}</h3>
            <p className="text-gray-600">₹{p.price}</p>
            <button className="mt-2 bg-blue-500 text-white px-4 py-1 rounded">Add to Cart</button>
          </div>
        ))}
      </div>
    </div>
  );
}