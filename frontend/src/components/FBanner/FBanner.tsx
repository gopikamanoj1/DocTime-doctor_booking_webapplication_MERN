import React from 'react';
import backgroundImage from '../../../public/Banner/modern-healthcare-approach-doctors-using-tablets-records.jpg'; // Adjust the path to your image file


const FBanner: React.FC = () => {
  return (
    <section className="relative   bg-cover bg-center bg-no-repeat " style={{ backgroundImage: `url(${backgroundImage})`  }}>
      <div className="absolute inset-0  sm:bg-transparent sm:f sm:to-white/25 ltr:sm:bg-gradient-to-r rtl:sm:bg-gradient-to-l"></div>
      <div className="relative mx-auto max-w-screen-xl px-4 py-32 sm:px-6 lg:flex lg:h-screen lg:items-center lg:px-8">
      </div>
    </section>
  );
};

export default FBanner;
