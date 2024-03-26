import React from 'react';

const HowItWorksSection: React.FC = () => {
  return (
    <section className="py-12 bg-gray-100">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-semibold text-center text-gray-800 mb-8">
          How It Works
        </h2>
        <div className="flex flex-col md:flex-row md:justify-between space-y-8 md:space-y-0">
          {/* Step 1: Search */}
          <div className="flex flex-col items-center">
            <div className="flex items-center justify-center w-16 h-16 bg-cyan-950 text-white rounded-full mb-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-8 w-8"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zM3 10a7 7 0 1114 0 7 7 0 01-14 0z"
                  clipRule="evenodd"
                />
                <path
                  fillRule="evenodd"
                  d="M9.293 8.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l2-2a1 1 0 10-1.414-1.414L11 9.586V4a1 1 0 10-2 0v5.586l-1.293-1.293z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">
              Search
            </h3>
            <p className="text-gray-600 text-center">
              Find the right doctor by searching specialties, location, or
              availability.
            </p>
          </div>
          {/* Step 2: Book */}
          <div className="flex flex-col items-center">
            <div className="flex items-center justify-center w-16 h-16 bg-cyan-950 text-white rounded-full mb-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-8 w-8"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M2 4a1 1 0 011-1h14a1 1 0 011 1v4a1 1 0 01-1 1H3a1 1 0 01-1-1V4zm0 10a1 1 0 011-1h6a1 1 0 011 1v4a1 1 0 01-1 1H3a1 1 0 01-1-1v-4zm14-4V4h-6v6h6zm-8 0V4H3v6h5z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">Book</h3>
            <p className="text-gray-600 text-center">
              Schedule your appointment with just a few clicks, no hassle.
            </p>
          </div>
          {/* Step 3: Confirm */}
          <div className="flex flex-col items-center">
            <div className="flex items-center justify-center w-16 h-16 bg-cyan-950 text-white rounded-full mb-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-8 w-8"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M14 4a1 1 0 011 1v1h1a1 1 0 011 1v8a1 1 0 01-1 1H5a1 1 0 01-1-1V7a1 1 0 011-1h1V5a1 1 0 112 0v1h6V5a1 1 0 011-1zM6 8v6h8V8H6z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">
              Confirm
            </h3>
            <p className="text-gray-600 text-center">
              Receive instant confirmation and reminders for your appointment.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
