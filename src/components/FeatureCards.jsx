export default function FeatureCards() {
  const features = [
    {
      icon: '📱',
      title: "Latest Models",
      desc: "Get the newest smartphones before they hit stores"
    },
    {
      icon: '💰',
      title: "Best Prices",
      desc: "Price match guarantee on all devices"
    },
    {
      icon: '🚚',
      title: "Fast Delivery",
      desc: "Free shipping on orders over $299"
    }
  ];

  return (
    <section className="py-16 bg-white px-6">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-12">Why Choose SnapMob?</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index}
              className="border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-shadow"
            >
              <span className="text-4xl mb-4 block">{feature.icon}</span>
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}