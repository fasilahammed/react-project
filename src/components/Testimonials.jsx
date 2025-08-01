export default function Testimonials() {
  const testimonials = [
    {
      quote: "SnapMob helped me upgrade my phone at half the retail price!",
      author: "Sarah J."
    },
    {
      quote: "Fast delivery and perfect condition. Will buy again!",
      author: "Michael T."
    }
  ];

  return (
    <section className="py-16 bg-gray-50 px-6">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-12">What Our Customers Say</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {testimonials.map((testimonial, index) => (
            <div 
              key={index}
              className="bg-white p-6 rounded-xl shadow-sm border border-gray-100"
            >
              <p className="text-gray-700 italic mb-4">"{testimonial.quote}"</p>
              <p className="text-orange-600 font-medium">— {testimonial.author}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}