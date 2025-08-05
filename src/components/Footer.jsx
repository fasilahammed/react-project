import React from 'react';
import { Mail, Phone, MapPin, Facebook, Twitter, Instagram, Linkedin, ArrowRight, CreditCard, Shield, Truck, Headphones } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-white text-gray-800">
      {/* Features Section */}
      <div className="bg-gradient-to-r from-orange-50 to-orange-100 border-b border-orange-200">
        <div className="max-w-6xl mx-auto px-6 py-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="flex items-center gap-3 text-center md:text-left">
              <div className="w-12 h-12 bg-orange-500 rounded-full flex items-center justify-center">
                <Truck className="text-white" size={24} />
              </div>
              <div>
                <h4 className="font-bold text-gray-800">Free Shipping</h4>
                <p className="text-gray-600 text-sm">On orders over $99</p>
              </div>
            </div>
            <div className="flex items-center gap-3 text-center md:text-left">
              <div className="w-12 h-12 bg-orange-500 rounded-full flex items-center justify-center">
                <Shield className="text-white" size={24} />
              </div>
              <div>
                <h4 className="font-bold text-gray-800">Warranty</h4>
                <p className="text-gray-600 text-sm">2-year protection</p>
              </div>
            </div>
            <div className="flex items-center gap-3 text-center md:text-left">
              <div className="w-12 h-12 bg-orange-500 rounded-full flex items-center justify-center">
                <Headphones className="text-white" size={24} />
              </div>
              <div>
                <h4 className="font-bold text-gray-800">24/7 Support</h4>
                <p className="text-gray-600 text-sm">Expert assistance</p>
              </div>
            </div>
            <div className="flex items-center gap-3 text-center md:text-left">
              <div className="w-12 h-12 bg-orange-500 rounded-full flex items-center justify-center">
                <CreditCard className="text-white" size={24} />
              </div>
              <div>
                <h4 className="font-bold text-gray-800">Secure Payment</h4>
                <p className="text-gray-600 text-sm">100% protected</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Newsletter Section */}
      <div className="bg-gradient-to-r from-orange-500 to-orange-600 text-white">
        <div className="max-w-6xl mx-auto px-6 py-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <h3 className="text-2xl font-bold mb-2">Stay Connected</h3>
              <p className="text-orange-100">Get the latest deals and mobile tech updates delivered to your inbox</p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
              <input 
                type="email" 
                placeholder="Enter your email"
                className="px-4 py-3 bg-white text-gray-800 border border-orange-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-300 focus:border-transparent flex-1 md:w-80"
              />
              <button className="px-6 py-3 bg-white text-orange-600 hover:bg-orange-50 rounded-lg font-medium transition-colors duration-200 flex items-center gap-2 justify-center">
                Subscribe
                <ArrowRight size={16} />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="max-w-6xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-gradient-to-r from-orange-500 to-orange-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">S</span>
              </div>
              <span className="text-2xl font-bold text-gray-800">SnapMob</span>
            </div>
            <p className="text-gray-600 mb-6 leading-relaxed">
              Your trusted mobile retailer since 2023. We bring you the latest smartphones with unbeatable prices and exceptional service.
            </p>
            
            {/* Contact Info */}
            <div className="space-y-3">
              <div className="flex items-center gap-3 text-gray-600">
                <Phone size={16} className="text-orange-500" />
                <span>+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center gap-3 text-gray-600">
                <Mail size={16} className="text-orange-500" />
                <span>hello@snapmob.com</span>
              </div>
              <div className="flex items-center gap-3 text-gray-600">
                <MapPin size={16} className="text-orange-500" />
                <span>123 Tech Street, Mobile City</span>
              </div>
            </div>
          </div>
          
          {/* Shop Links */}
          <div>
            <h3 className="font-bold text-lg mb-6 text-gray-800">Shop</h3>
            <ul className="space-y-3">
              <li>
                <a href="/products" className="text-gray-600 hover:text-orange-500 transition-colors duration-200 flex items-center gap-2 group">
                  <ArrowRight size={14} className="opacity-0 group-hover:opacity-100 transition-opacity text-orange-500" />
                  All Phones
                </a>
              </li>
              <li>
                <a href="/deals" className="text-gray-600 hover:text-orange-500 transition-colors duration-200 flex items-center gap-2 group">
                  <ArrowRight size={14} className="opacity-0 group-hover:opacity-100 transition-opacity text-orange-500" />
                  Special Deals
                </a>
              </li>
              <li>
                <a href="/brands" className="text-gray-600 hover:text-orange-500 transition-colors duration-200 flex items-center gap-2 group">
                  <ArrowRight size={14} className="opacity-0 group-hover:opacity-100 transition-opacity text-orange-500" />
                  Top Brands
                </a>
              </li>
              <li>
                <a href="/accessories" className="text-gray-600 hover:text-orange-500 transition-colors duration-200 flex items-center gap-2 group">
                  <ArrowRight size={14} className="opacity-0 group-hover:opacity-100 transition-opacity text-orange-500" />
                  Accessories
                </a>
              </li>
              <li>
                <a href="/trade-in" className="text-gray-600 hover:text-orange-500 transition-colors duration-200 flex items-center gap-2 group">
                  <ArrowRight size={14} className="opacity-0 group-hover:opacity-100 transition-opacity text-orange-500" />
                  Trade-In Program
                </a>
              </li>
            </ul>
          </div>
          
          {/* Support Links */}
          <div>
            <h3 className="font-bold text-lg mb-6 text-gray-800">Support</h3>
            <ul className="space-y-3">
              <li>
                <a href="/contact" className="text-gray-600 hover:text-orange-500 transition-colors duration-200 flex items-center gap-2 group">
                  <ArrowRight size={14} className="opacity-0 group-hover:opacity-100 transition-opacity text-orange-500" />
                  Contact Us
                </a>
              </li>
              <li>
                <a href="/faq" className="text-gray-600 hover:text-orange-500 transition-colors duration-200 flex items-center gap-2 group">
                  <ArrowRight size={14} className="opacity-0 group-hover:opacity-100 transition-opacity text-orange-500" />
                  FAQs
                </a>
              </li>
              <li>
                <a href="/shipping" className="text-gray-600 hover:text-orange-500 transition-colors duration-200 flex items-center gap-2 group">
                  <ArrowRight size={14} className="opacity-0 group-hover:opacity-100 transition-opacity text-orange-500" />
                  Shipping Info
                </a>
              </li>
              <li>
                <a href="/returns" className="text-gray-600 hover:text-orange-500 transition-colors duration-200 flex items-center gap-2 group">
                  <ArrowRight size={14} className="opacity-0 group-hover:opacity-100 transition-opacity text-orange-500" />
                  Returns & Exchanges
                </a>
              </li>
              <li>
                <a href="/warranty" className="text-gray-600 hover:text-orange-500 transition-colors duration-200 flex items-center gap-2 group">
                  <ArrowRight size={14} className="opacity-0 group-hover:opacity-100 transition-opacity text-orange-500" />
                  Warranty
                </a>
              </li>
            </ul>
          </div>
          
          {/* Company & Legal */}
          <div>
            <h3 className="font-bold text-lg mb-6 text-white">Company</h3>
            <ul className="space-y-3">
              <li>
                <a href="/about" className="text-gray-400 hover:text-white transition-colors duration-200 flex items-center gap-2 group">
                  <ArrowRight size={14} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                  About Us
                </a>
              </li>
              <li>
                <a href="/careers" className="text-gray-400 hover:text-white transition-colors duration-200 flex items-center gap-2 group">
                  <ArrowRight size={14} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                  Careers
                </a>
              </li>
              <li>
                <a href="/press" className="text-gray-400 hover:text-white transition-colors duration-200 flex items-center gap-2 group">
                  <ArrowRight size={14} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                  Press & Media
                </a>
              </li>
              <li>
                <a href="/privacy" className="text-gray-400 hover:text-white transition-colors duration-200 flex items-center gap-2 group">
                  <ArrowRight size={14} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="/terms" className="text-gray-400 hover:text-white transition-colors duration-200 flex items-center gap-2 group">
                  <ArrowRight size={14} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                  Terms of Service
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="border-t border-gray-700">
        <div className="max-w-6xl mx-auto px-6 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="text-gray-400 text-center md:text-left">
              <p>&copy; 2024 SnapMob. All rights reserved. | Trusted by 50,000+ customers worldwide</p>
            </div>
            
            {/* Social Media Links */}
            <div className="flex items-center gap-4">
              <span className="text-gray-400 text-sm mr-2">Follow us:</span>
              <a href="#" className="text-gray-400 hover:text-white transition-colors duration-200 p-2 hover:bg-gray-700 rounded-lg">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors duration-200 p-2 hover:bg-gray-700 rounded-lg">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors duration-200 p-2 hover:bg-gray-700 rounded-lg">
                <Instagram size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors duration-200 p-2 hover:bg-gray-700 rounded-lg">
                <Linkedin size={20} />
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}