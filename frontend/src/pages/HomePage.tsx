import React, { Fragment, Suspense } from "react";

// Lazy load components
const Banner = React.lazy(() => import("../components/Banner/Banner"));
const Footer = React.lazy(() => import("../components/Footer/Footer"));
const Cards = React.lazy(() => import("../components/Cards/Cards"));
const HowItWorksSection = React.lazy(() => import("../components/Working/HowItWorks"));
const TestimonialsSection = React.lazy(() => import("../components/TestimonialsSection/TestimonialsSection"));
const AboutSection = React.lazy(() => import("../components/AboutSection/AboutSection"));
const BlogSection = React.lazy(() => import("../components/BlogSection/BlogSection"));
const FooterBanner = React.lazy(() => import("../components/Footer/FooterBanner"));
const FBanner = React.lazy(() => import("../components/FBanner/FBanner"));
const DoctorCarousel = React.lazy(() => import("../components/Categories/Categories"));

function HomePage() {
  return (
    <div>
      <Fragment>
        <Suspense fallback={<div>Loading...</div>}>
          <Banner />
          <br />
          <Cards />
          <br />
          <br />
          <DoctorCarousel />
          <br />
          <HowItWorksSection />
          <TestimonialsSection />
         
          <BlogSection />
          <AboutSection />
          <FBanner />
          <FooterBanner />
          <Footer />
        </Suspense>
      </Fragment>
    </div>
  );
}

export default HomePage;
