import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

export default function HeroSection() {
    const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
    const videos = [
        {
            src: "https://www.apple.com/105/media/us/iphone/family/2025/e7ff365a-cb59-4ce9-9cdf-4cb965455b69/anim/welcome/large_2x.mp4#t=8.380244",
            title: "Discover the Best Mobile Deals",
            subtitle: "SnapMob brings you exclusive offers on the latest smartphones. Join thousands of satisfied customers today.",
            highlight: "Mobile Deals"
        },
        {
            src:"https://storage.googleapis.com/mannequin/blobs/7ff7a741-6b49-405b-a6d8-b9b1e09ad9e1.mp4" ,
            title: "Experience Cutting-Edge Technology",
            subtitle: "Explore the latest innovations in mobile technology with our premium selection.",
            highlight: "Technology"
        },
        {
            src: "https://cdn.pixabay.com/video/2021/03/25/68962-529839776_large.mp4",
            title: "Fashion Meets Motion",
            subtitle: "Unleash your style with fluid movement and modern elegance.",
            highlight: "Style"
        }
    ];

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentVideoIndex((prevIndex) =>
                prevIndex === videos.length - 1 ? 0 : prevIndex + 1
            );
        }, 8000); // Change video every 8 seconds

        return () => clearInterval(interval);
    }, [videos.length]);

    return (
        <section className="relative w-full h-screen overflow-hidden">
            {/* Video background with slider */}
            {videos.map((video, index) => (
                <video
                    key={index}
                    autoPlay
                    muted
                    loop
                    playsInline
                    className={`absolute top-0 left-0 w-full h-full object-cover z-10 transition-opacity duration-1000 ${index === currentVideoIndex ? 'opacity-100' : 'opacity-0'}`}
                >
                    <source src={video.src} type="video/mp4" />
                    Your browser does not support the video tag.
                </video>
            ))}

            {/* Dark overlay for better text contrast */}
            <div className="absolute inset-0 bg-black bg-opacity-50 z-1"></div>

            {/* Content container */}
            <div className="relative z-20 flex flex-col md:flex-row items-center justify-between h-full max-w-6xl mx-auto px-6">
                {/* Left Column - Text */}
                <div className="md:w-1/2 mb-10 md:mb-0 text-white">
                    <h1 className="text-4xl md:text-5xl font-bold mb-4">
                        {videos[currentVideoIndex].title.split(videos[currentVideoIndex].highlight)[0]}
                        <span className="text-orange-400"> {videos[currentVideoIndex].highlight}</span>
                    </h1>
                    <p className="text-lg mb-8">
                        {videos[currentVideoIndex].subtitle}
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
                            className="bg-white text-orange-600 hover:bg-orange-50 px-6 py-3 rounded-lg border border-orange-600 transition-colors"
                        >
                            Browse Phones
                        </Link>
                    </div>
                </div>

                {/* Right Column - Optional (can be removed if not needed) */}
                <div className="md:w-1/2 flex justify-center">
                    {/* Additional content or empty for spacing */}
                </div>
            </div>

            {/* Slider indicators */}
            <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20 flex gap-2">
                {videos.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => setCurrentVideoIndex(index)}
                        className={`w-3 h-3 rounded-full ${index === currentVideoIndex ? 'bg-orange-500' : 'bg-white bg-opacity-50'}`}
                        aria-label={`Go to slide ${index + 1}`}
                    />
                ))}
            </div>
        </section>
    );
}