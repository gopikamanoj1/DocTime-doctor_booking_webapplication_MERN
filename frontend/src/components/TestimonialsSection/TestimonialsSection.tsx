import React, { useState, useEffect } from 'react';
import { Transition } from '@headlessui/react';

const TestimonialsSection: React.FC = () => {
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
  ];

  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsVisible(true);
    }, 100);

    return () => clearTimeout(timeout);
  }, []);

  return (
    <section
      className="bg-gradient-to-r from-cyan-600 to-cyan-950 py-16 px-6 sm:px-8 lg:px-12 m-10 rounded-xl"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-8 lg:px-12"> {/* Responsive padding */}
        <h2 className="text-2xl font-extrabold text-white text-center mb-10">Testimonials</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"> {/* Adjusted grid layout */}
          {testimonials.map((testimonial) => (
            <Transition
              key={testimonial.id}
              show={isVisible}
              enter="transform transition duration-500"
              enterFrom="opacity-0 translate-y-10"
              enterTo="opacity-100 translate-y-0"
              leave="transform transition duration-500"
              leaveFrom="opacity-100 translate-y-0"
              leaveTo="opacity-0 translate-y-10"
            >
              <div className="bg-white rounded-lg shadow-xl p-6 sm:p-8 hover:shadow-2xl transition duration-300 ease-in-out"> {/* Adjusted padding */}
                <p className="text-sm sm:text-sm text-gray-800 mb-6 italic"> {/* Responsive text size */}
                  "{testimonial.testimonial}"
                </p>
                <div className="flex items-center">
                  <div className="bg-cyan-950 text-white rounded-full w-10 sm:w-12 h-10 sm:h-12 flex items-center justify-center text-sm font-bold"> {/* Responsive avatar size */}
                    {testimonial.name[0]}
                  </div>
                  <div className="ml-4">
                    <div className="text-lg sm:text-xl font-medium text-gray-900">{testimonial.name}</div> {/* Adjusted text size */}
                    <div className="text-sm text-gray-600">{testimonial.profession}</div>
                  </div>
                </div>
              </div>
            </Transition>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
