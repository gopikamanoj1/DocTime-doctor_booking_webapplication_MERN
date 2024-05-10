import React from 'react';
import { Transition } from '@headlessui/react';
import { FaHandPointer, FaStar, FaBell } from 'react-icons/fa'; // Using Font Awesome for icons

const AboutSection: React.FC = () => {
  return (
    <section className="bg-gradient-to-r from-cyan-600 to-cyan-950 py-16">
      <div className="max-w-6xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-extrabold text-white">About Us</h2>
          <p className="text-sm text-gray-200 mt-4">
            Welcome to our doctor booking platform! Our mission is to revolutionize the way people access healthcare
            services by making the process of booking appointments simple, convenient, and efficient.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          <Transition
            show={true} // No need to hide this component
            enter="transform transition duration-500"
            enterFrom="opacity-0 translate-y-10"
            enterTo="opacity-100 translate-y-0"
            leave="transform transition duration-500"
            leaveFrom="opacity-100 translate-y-0"
            leaveTo="opacity-0 translate-y-10"
          >
            <div className="bg-white rounded-lg shadow-xl p-8 hover:shadow-2xl transition duration-300">
              <div className="flex items-center mb-3">
                <FaHandPointer className="text-indigo-500 w-8 h-8" />
                <h3 className="text-2xl font-semibold text-gray-900 ml-4">Simplified Booking</h3>
              </div>
              <p className="text-sm text-gray-700">
                Our platform streamlines the appointment booking process, allowing users to find and book appointments
                with doctors in just a few clicks. Say goodbye to long waiting times and phone calls.
              </p>
            </div>
          </Transition>
          
          <div className="bg-white rounded-lg shadow-xl p-8 hover:shadow-2xl transition duration-300">
            <div className="flex items-center mb-3">
              <FaStar className="text-purple-500 w-8 h-8" />
              <h3 className="text-2xl font-semibold text-gray-900 ml-4">Unique Features</h3>
            </div>
            <p className="text-sm text-gray-700">
              We offer a range of unique features, including real-time availability of doctors, patient reviews and
              ratings, telemedicine options, and personalized recommendations based on user preferences.
            </p>
          </div>
          
          <div className="bg-white rounded-lg shadow-xl p-8 hover:shadow-2xl transition duration-300">
            <div className="flex items-center mb-3">
              <FaBell className="text-indigo-500 w-8 h-8" />
              <h3 className="text-2xl font-semibold text-gray-900 ml-4">Advantages</h3>
            </div>
            <p className="text-sm text-gray-700">
              Our platform provides several advantages over traditional booking methods, such as 24/7 accessibility,
              comprehensive doctor profiles, appointment reminders, and easy rescheduling options.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
