import { Link } from 'react-router-dom';
import { ArrowRight, Check, Smartphone, Shield, Truck, Headphones } from 'lucide-react';
import { useState, useEffect } from 'react';

// Import your images (replace with actual paths)
import ctaHero from '../assets/cta-hero.jpg';
import phone1 from '../assets/phone-1.png';
import phone2 from '../assets/phone-2.png';
import phone3 from '../assets/phone-3.png';
import techLogo1 from '../assets/tech-logo-1.svg';
import techLogo2 from '../assets/tech-logo-2.svg';
import techLogo3 from '../assets/tech-logo-3.svg';
import techLogo4 from '../assets/tech-logo-4.svg';
import techLogo5 from '../assets/tech-logo-5.svg';

export default function CTA() {
  const [currentDeviceIndex, setCurrentDeviceIndex] = useState(0);
  const devices = [
    { name: "iPhone 15 Pro", price: "₹99,999", image: phone1 },
    { name: "Samsung S24 Ultra", price: "₹1,29,999", image: phone2 },
    { name: "OnePlus 12", price: "₹69,999", image: phone3 }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentDeviceIndex((prev) => (prev === devices.length - 1 ? 0 : prev + 1));
    }, 3000);
    return () => clearInterval(interval);
  }, [devices.length]);

  const techLogos = [techLogo1, techLogo2, techLogo3, techLogo4, techLogo5];

  return (
    <section className="bg-gradient-to-b from-orange-500 to-orange-600 text-white relative overflow-hidden">
      {/* Floating phone images */}
      <div className="absolute hidden lg:block right-0 top-1/2 transform -translate-y-1/2 w-1/3 h-full">
        <div className="relative h-full">
          {devices.map((device, index) => (
            <div 
              key={index}
              className={`absolute inset-0 transition-opacity duration-1000 ${currentDeviceIndex === index ? 'opacity-100' : 'opacity-0'}`}
            >
              <img 
                src={device.image} 
                alt={device.name}
                className="absolute right-0 top-1/2 transform -translate-y-1/2 w-64 h-auto object-contain"
              />
              <div className="absolute right-0 bottom-20 bg-white bg-opacity-20 backdrop-blur-sm rounded-lg p-4 text-center">
                <p className="font-bold">{device.name}</p>
                <p className="text-orange-100">{device.price}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Column - Content */}
          <div className="text-center lg:text-left">
            <h2 className="text-3xl sm:text-4xl font-bold mb-6">
              Ready to Upgrade Your Mobile Experience?
            </h2>
            <p className="text-xl mb-8 max-w-lg mx-auto lg:mx-0">
              Join <span className="font-semibold">10,000+</span> satisfied customers who found their perfect device with us.
            </p>
            
            <div className="mb-10 space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
                  <Check size={16} className="text-white" />
                </div>
                <span>Free shipping on all orders</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
                  <Check size={16} className="text-white" />
                </div>
                <span>1-year warranty included</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
                  <Check size={16} className="text-white" />
                </div>
                <span>Easy 14-day returns</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Link 
                to="/products" 
                className="inline-flex items-center justify-center bg-white text-orange-600 hover:bg-gray-100 px-6 py-3 rounded-lg shadow-md text-lg font-medium transition-colors hover:scale-105 transform duration-200"
              >
                Browse Phones <ArrowRight className="ml-2" size={18} />
              </Link>
              <Link 
                to="/register" 
                className="inline-flex items-center justify-center bg-transparent border-2 border-white hover:bg-white hover:bg-opacity-10 px-6 py-3 rounded-lg text-lg font-medium transition-colors hover:scale-105 transform duration-200"
              >
                Create Account
              </Link>
            </div>
          </div>

          {/* Right Column - Features Grid (Mobile) */}
          <div className="lg:hidden grid grid-cols-2 gap-4">
            <div className="bg-white bg-opacity-10 p-6 rounded-xl backdrop-blur-sm">
              <div className="w-12 h-12 bg-white bg-opacity-20 rounded-lg flex items-center justify-center mb-4">
                <Smartphone size={24} className="text-white" />
              </div>
              <h3 className="font-bold mb-2">Latest Models</h3>
              <p className="text-sm opacity-90">All new 2024 smartphones</p>
            </div>
            <div className="bg-white bg-opacity-10 p-6 rounded-xl backdrop-blur-sm">
              <div className="w-12 h-12 bg-white bg-opacity-20 rounded-lg flex items-center justify-center mb-4">
                <Shield size={24} className="text-white" />
              </div>
              <h3 className="font-bold mb-2">Verified Quality</h3>
              <p className="text-sm opacity-90">Rigorous testing</p>
            </div>
            <div className="bg-white bg-opacity-10 p-6 rounded-xl backdrop-blur-sm">
              <div className="w-12 h-12 bg-white bg-opacity-20 rounded-lg flex items-center justify-center mb-4">
                <Truck size={24} className="text-white" />
              </div>
              <h3 className="font-bold mb-2">Fast Delivery</h3>
              <p className="text-sm opacity-90">Next-day shipping</p>
            </div>
            <div className="bg-white bg-opacity-10 p-6 rounded-xl backdrop-blur-sm">
              <div className="w-12 h-12 bg-white bg-opacity-20 rounded-lg flex items-center justify-center mb-4">
                <Headphones size={24} className="text-white" />
              </div>
              <h3 className="font-bold mb-2">24/7 Support</h3>
              <p className="text-sm opacity-90">Dedicated help center</p>
            </div>
          </div>
        </div>

        {/* Trust Indicators */}
        <div className="mt-16 pt-8 border-t border-white border-opacity-20">
          <p className="text-center text-sm opacity-80 mb-6">TRUSTED BY TECH ENTHUSIASTS AT</p>
          <div className="flex flex-wrap justify-center items-center gap-6 md:gap-8 opacity-80">
            {techLogos.map((logo, index) => (
              <img 
                key={index}
                src={logo}
                alt="Tech brand logo"
                className="h-8 md:h-10 object-contain grayscale brightness-0 invert opacity-80 hover:opacity-100 transition-opacity"
              />
            ))}
          </div>
        </div>
      </div>

      {/* Mobile Device Carousel */}
      <div className="lg:hidden mt-12 px-4">
        <div className="relative h-64">
          {devices.map((device, index) => (
            <div 
              key={index}
              className={`absolute inset-0 transition-opacity duration-1000 flex flex-col items-center ${currentDeviceIndex === index ? 'opacity-100' : 'opacity-0'}`}
            >
              <img 
                src={device.image} 
                alt={device.name}
                className="h-48 w-auto object-contain"
              />
              <div className="mt-4 bg-white bg-opacity-20 backdrop-blur-sm rounded-lg p-3 text-center">
                <p className="font-bold">{device.name}</p>
                <p className="text-orange-100">{device.price}</p>
              </div>
            </div>
          ))}
          <div className="absolute bottom-0 left-0 right-0 flex justify-center gap-2">
            {devices.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentDeviceIndex(index)}
                className={`w-3 h-3 rounded-full ${currentDeviceIndex === index ? 'bg-white' : 'bg-white bg-opacity-30'}`}
                aria-label={`View device ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}