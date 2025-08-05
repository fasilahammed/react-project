// OrderSuccess.js
import React from 'react';
import { FiCheckCircle } from 'react-icons/fi';
import { Link } from 'react-router-dom';

export default function OrderSuccess() {
    return (
        <div className="max-w-4xl mx-auto px-4 py-12 text-center">
            <div className="bg-white rounded-xl shadow-sm p-8 max-w-md mx-auto">
                <div className="flex justify-center text-green-500 mb-4">
                    <FiCheckCircle size={48} />
                </div>
                <h2 className="text-2xl font-bold text-gray-800 mb-4">Order Placed Successfully!</h2>
                <p className="text-gray-600 mb-6">
                    Thank you for your purchase. Your order has been received and is being processed.
                    You'll receive a confirmation email shortly.
                </p>
                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                    <Link
                        to="/orders"
                        className="inline-block bg-orange-500 hover:bg-orange-600 text-white font-medium py-2 px-6 rounded-lg"
                    >
                        View Orders
                    </Link>
                    <Link
                        to="/products"
                        className="inline-block border border-orange-500 text-orange-500 hover:bg-orange-50 font-medium py-2 px-6 rounded-lg"
                    >
                        Continue Shopping
                    </Link>
                </div>
            </div>
        </div>
    );
}