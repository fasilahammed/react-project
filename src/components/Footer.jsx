import React from 'react';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="bg-gray-800 text-white py-12 px-6">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
        <div>
          <img src="/logo-white.png" alt="SnapMob" className="h-10 mb-4" />
          <p className="text-gray-400">Your trusted mobile retailer since 2023</p>
        </div>
        
        <div>
          <h3 className="font-bold mb-4">Shop</h3>
          <ul className="space-y-2 text-gray-400">
            <li><Link to="/products">All Phones</Link></li>
            <li><Link to="/deals">Special Deals</Link></li>
          </ul>
        </div>
        
        <div>
          <h3 className="font-bold mb-4">Support</h3>
          <ul className="space-y-2 text-gray-400">
            <li><Link to="/contact">Contact Us</Link></li>
            <li><Link to="/faq">FAQs</Link></li>
          </ul>
        </div>
        
        <div>
          <h3 className="font-bold mb-4">Legal</h3>
          <ul className="space-y-2 text-gray-400">
            <li><Link to="/privacy">Privacy Policy</Link></li>
            <li><Link to="/terms">Terms of Service</Link></li>
          </ul>
        </div>
      </div>
    </footer>
  );
}