import React from 'react';
import { Mail, Phone, MapPin, Facebook, Twitter, Instagram, Linkedin, CreditCard, Shield, Truck, Headphones } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-white text-gray-800 border-t border-gray-200">
      {/* Features Section */}
      <div className="bg-orange-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="flex flex-col sm:flex-row items-center text-center sm:text-left gap-4">
              <div className="w-12 h-12 bg-orange-500 rounded-full flex items-center justify-center flex-shrink-0">
                <Truck className="text-white" size={20} />
              </div>
              <div>
                <h4 className="font-bold text-gray-800">Free Shipping</h4>
                <p className="text-gray-600 text-sm">On orders over ₹999</p>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row items-center text-center sm:text-left gap-4">
              <div className="w-12 h-12 bg-orange-500 rounded-full flex items-center justify-center flex-shrink-0">
                <Shield className="text-white" size={20} />
              </div>
              <div>
                <h4 className="font-bold text-gray-800">Warranty</h4>
                <p className="text-gray-600 text-sm">1 Year Protection</p>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row items-center text-center sm:text-left gap-4">
              <div className="w-12 h-12 bg-orange-500 rounded-full flex items-center justify-center flex-shrink-0">
                <Headphones className="text-white" size={20} />
              </div>
              <div>
                <h4 className="font-bold text-gray-800">24/7 Support</h4>
                <p className="text-gray-600 text-sm">Dedicated Support</p>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row items-center text-center sm:text-left gap-4">
              <div className="w-12 h-12 bg-orange-500 rounded-full flex items-center justify-center flex-shrink-0">
                <CreditCard className="text-white" size={20} />
              </div>
              <div>
                <h4 className="font-bold text-gray-800">Secure Payment</h4>
                <p className="text-gray-600 text-sm">100% Protected</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-orange-500 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">M</span>
              </div>
              <span className="text-2xl font-bold text-gray-800">MobileShop</span>
            </div>
            <p className="text-gray-600 mb-6 leading-relaxed">
              Your one-stop shop for the latest smartphones and accessories at unbeatable prices.
            </p>
            
            {/* Contact Info */}
            <div className="space-y-3">
              <div className="flex items-center gap-3 text-gray-600">
                <Phone size={16} className="text-orange-500" />
                <span>+91 98765 43210</span>
              </div>
              <div className="flex items-center gap-3 text-gray-600">
                <Mail size={16} className="text-orange-500" />
                <span>support@mobileshop.com</span>
              </div>
              <div className="flex items-center gap-3 text-gray-600">
                <MapPin size={16} className="text-orange-500" />
                <span>123 Tech Park, Bangalore</span>
              </div>
            </div>
          </div>
          
          {/* Quick Links */}
          <div>
            <h3 className="font-bold text-lg mb-6 text-gray-800">Quick Links</h3>
            <ul className="space-y-3">
              <li>
                <a href="/products" className="text-gray-600 hover:text-orange-500 transition-colors duration-200">
                  All Products
                </a>
              </li>
              <li>
                <a href="/new-arrivals" className="text-gray-600 hover:text-orange-500 transition-colors duration-200">
                  New Arrivals
                </a>
              </li>
              <li>
                <a href="/deals" className="text-gray-600 hover:text-orange-500 transition-colors duration-200">
                  Today's Deals
                </a>
              </li>
              <li>
                <a href="/best-sellers" className="text-gray-600 hover:text-orange-500 transition-colors duration-200">
                  Best Sellers
                </a>
              </li>
              <li>
                <a href="/accessories" className="text-gray-600 hover:text-orange-500 transition-colors duration-200">
                  Accessories
                </a>
              </li>
            </ul>
          </div>
          
          {/* Customer Service */}
          <div>
            <h3 className="font-bold text-lg mb-6 text-gray-800">Customer Service</h3>
            <ul className="space-y-3">
              <li>
                <a href="/contact" className="text-gray-600 hover:text-orange-500 transition-colors duration-200">
                  Contact Us
                </a>
              </li>
              <li>
                <a href="/faq" className="text-gray-600 hover:text-orange-500 transition-colors duration-200">
                  FAQs
                </a>
              </li>
              <li>
                <a href="/shipping" className="text-gray-600 hover:text-orange-500 transition-colors duration-200">
                  Shipping Policy
                </a>
              </li>
              <li>
                <a href="/returns" className="text-gray-600 hover:text-orange-500 transition-colors duration-200">
                  Returns & Refunds
                </a>
              </li>
              <li>
                <a href="/track-order" className="text-gray-600 hover:text-orange-500 transition-colors duration-200">
                  Track Your Order
                </a>
              </li>
            </ul>
          </div>
          
          {/* Newsletter */}
          <div>
            <h3 className="font-bold text-lg mb-6 text-gray-800">Newsletter</h3>
            <p className="text-gray-600 mb-4">Subscribe to get updates on new products and special offers</p>
            <div className="flex flex-col sm:flex-row gap-2">
              <input 
                type="email" 
                placeholder="Your email address"
                className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent flex-1"
              />
              <button className="px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded-lg font-medium transition-colors duration-200">
                Subscribe
              </button>
            </div>
            
            {/* Social Media */}
            <div className="mt-6">
              <h4 className="font-medium text-gray-800 mb-3">Follow Us</h4>
              <div className="flex gap-4">
                <a href="#" className="text-gray-600 hover:text-orange-500 transition-colors duration-200">
                  <Facebook size={20} />
                </a>
                <a href="#" className="text-gray-600 hover:text-orange-500 transition-colors duration-200">
                  <Twitter size={20} />
                </a>
                <a href="#" className="text-gray-600 hover:text-orange-500 transition-colors duration-200">
                  <Instagram size={20} />
                </a>
                <a href="#" className="text-gray-600 hover:text-orange-500 transition-colors duration-200">
                  <Linkedin size={20} />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Copyright Section */}
      <div className="bg-gray-50 border-t border-gray-200 py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="text-gray-500 text-sm text-center md:text-left">
              <p>&copy; {new Date().getFullYear()} MobileShop. All rights reserved.</p>
            </div>
            <div className="flex items-center gap-6">
              <a href="/privacy" className="text-gray-500 hover:text-orange-500 text-sm transition-colors duration-200">
                Privacy Policy
              </a>
              <a href="/terms" className="text-gray-500 hover:text-orange-500 text-sm transition-colors duration-200">
                Terms of Service
              </a>
              <a href="/sitemap" className="text-gray-500 hover:text-orange-500 text-sm transition-colors duration-200">
                Sitemap
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}