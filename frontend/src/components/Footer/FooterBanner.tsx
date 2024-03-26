import React from 'react';

const FooterBanner: React.FC = () => {
  return (
    <footer className="bg-cyan-950 py-6">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
        <p className="text-lg">
          Sign up for our newsletter to receive updates and exclusive offers!
        </p>
        <div className="mt-4 flex justify-center">
          <input
            type="email"
            placeholder="Enter your email"
            className="w-64 px-4 py-2 mr-2 rounded-l-lg focus:outline-none"
          />
          <button className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-r-lg focus:outline-none">
            Subscribe
          </button>
        </div>
      </div>
    </footer>
  );
};

export default FooterBanner;
