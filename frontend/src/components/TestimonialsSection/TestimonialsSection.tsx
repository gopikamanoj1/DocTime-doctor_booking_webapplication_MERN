import React from 'react';

const TestimonialsSection: React.FC = () => {
  // Sample testimonials data (replace with actual data from your backend)
  const testimonials = [
    {
      id: 1,
      name: 'Dr. Sarah Johnson',
      profession: 'Cardiologist',
      testimonial:
        'Using this platform has significantly improved my patient management. It\'s user-friendly and saves me time scheduling appointments.',
    },
    {
      id: 2,
      name: 'John Smith',
      profession: 'Patient',
      testimonial:
        'I love how easy it is to find and book appointments with the best doctors in my area. This platform has been a game-changer for me.',
    },
    {
      id: 3,
      name: 'Dr. Michael Lee',
      profession: 'Pediatrician',
      testimonial:
        'As a pediatrician, I rely on this platform to efficiently manage my appointments and provide better care to my young patients. Highly recommended!',
    },
    // Add more testimonials as needed
  ];

  return (
    <section className="bg-gray-100 py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-extrabold text-gray-900 mb-6">Testimonials</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial) => (
            <div key={testimonial.id} className="bg-white rounded-lg shadow-lg p-6">
              <p className="text-lg text-gray-800 mb-4">{testimonial.testimonial}</p>
              <div className="flex items-center">
               
                <div className="ml-4">
                  <div className="text-base font-medium text-gray-900">{testimonial.name}</div>
                  <div className="text-sm text-gray-500">{testimonial.profession}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
