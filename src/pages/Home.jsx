import { Link } from 'react-router-dom';
import HeroSection from '../components/HeroSection';
import FeatureCards from '../components/FeatureCards';
import Testimonials from '../components/Testimonials';
import CTA from '../components/CTA';
import Navbar from '../components/Navbar'; // Reuse your auth navbar
import Footer from '../components/Footer';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50 to-gray-50">
      
      
      <main>
        <HeroSection />
        <FeatureCards />
        <Testimonials />
        <CTA />
      </main>

      <Footer />
    </div>
  );
}