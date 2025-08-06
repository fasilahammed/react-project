import { Link } from 'react-router-dom';
import HeroSection from '../components/HeroSection';
import FeatureCards from '../components/FeatureCards';
import AboutSection from '../components/AboutSection';
import LandingProduct from '../components/LandingProduct';

export default function Home() {
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