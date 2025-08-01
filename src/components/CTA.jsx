import { Link } from 'react-router-dom';

export default function CTA() {
  return (
    <section className="py-16 bg-orange-600 text-white px-6">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-3xl font-bold mb-6">Ready to Upgrade Your Device?</h2>
        <p className="text-xl mb-8">Join thousands of happy customers today</p>
        <Link 
          to="/register" 
          className="inline-block bg-white text-orange-600 hover:bg-gray-100 px-8 py-3 rounded-lg shadow-md text-lg font-medium transition-colors"
        >
          Sign Up Free
        </Link>
      </div>
    </section>
  );
}