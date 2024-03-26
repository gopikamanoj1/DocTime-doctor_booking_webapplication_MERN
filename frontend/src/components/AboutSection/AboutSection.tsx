import React from 'react';

const AboutSection: React.FC = () => {
  return (
    <section className="bg-gray-100 py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-gray-900 mb-6">About Us</h2>
          <p className="text-lg text-gray-700 mb-8">
            Welcome to our doctor booking platform! Our mission is to revolutionize the way people access healthcare
            services by making the process of booking appointments with doctors simple, convenient, and efficient.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h3 className="text-xl font-semibold text-gray-900 mb-3">Simplified Booking Process</h3>
            <p className="text-gray-700">
              Our platform streamlines the appointment booking process, allowing users to find and book appointments
              with doctors in just a few clicks. Say goodbye to long waiting times and phone calls.
            </p>
          </div>
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h3 className="text-xl font-semibold text-gray-900 mb-3">Unique Features</h3>
            <p className="text-gray-700">
              We offer a range of unique features, including real-time availability of doctors, patient reviews and
              ratings, telemedicine options, and personalized recommendations based on user preferences.
            </p>
          </div>
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h3 className="text-xl font-semibold text-gray-900 mb-3">Advantages</h3>
            <p className="text-gray-700">
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
