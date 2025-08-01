import React from 'react';
import { Link } from 'react-router-dom';

export default function HeroSection() {
    return (
        <section className="flex flex-col md:flex-row items-center justify-between px-6 py-16 md:py-24 max-w-6xl mx-auto">
            {/* Left Column - Text */}
            <div className="md:w-1/2 mb-10 md:mb-0">
                <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
                    Discover the Best <span className="text-orange-600">Mobile Deals</span>
                </h1>
                <p className="text-lg text-gray-600 mb-8">
                    SnapMob brings you exclusive offers on the latest smartphones.
                    Join thousands of satisfied customers today.
                </p>
                <div className="flex gap-4">
                    <Link
                        to="/register"
                        className="bg-orange-600 hover:bg-orange-700 text-white px-6 py-3 rounded-lg shadow-md transition-colors"
                    >
                        Get Started
                    </Link>
                    <Link
                        to="/products"
                        className="border border-orange-600 text-orange-600 hover:bg-orange-50 px-6 py-3 rounded-lg transition-colors"
                    >
                        Browse Phones
                    </Link>
                </div>
            </div>

            {/* Right Column - Image */}
            <div className="md:w-1/2 flex justify-center">
                <video
                    src="https://cdn.pixabay.com/video/2021/03/25/68962-529839776_large.mp4"
                    alt="Stream the Latest Movies and Shows"
                    className="w-full max-w-md object-contain"
                />
            </div>
        </section>
    );
}