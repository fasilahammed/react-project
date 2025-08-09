import { Link, useNavigate } from 'react-router-dom';
import HeroSection from '../components/HeroSection';
import FeatureCards from '../components/FeatureCards';
import AboutSection from '../components/AboutSection';
import LandingProduct from '../components/LandingProduct';

import { useAuth } from '../context/AuthContext';
import { useEffect } from 'react';

export default function Home() {
  // const { user } = useAuth();
  // const navigate = useNavigate();
  // useEffect(() => {
  //   if(user && user.role === 'admin') {
  //     navigate('/admin');
  //   }
  // }, []);
  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50 to-gray-50">
      <main>
        <HeroSection />
        <LandingProduct/>
        <FeatureCards />
        <AboutSection />
      </main>
    </div>
  );
}