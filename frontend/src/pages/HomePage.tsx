import React, { Fragment } from "react";
import Banner from "../components/Banner/Banner";
import Footer from "../components/Footer/Footer";
import Cards from "../components/Cards/Cards";
import Navbar from "../components/Navbar/Navbar";
import HowItWorksSection from "../components/Working/HowItWorks";
import TestimonialsSection from "../components/TestimonialsSection/TestimonialsSection";
import AboutSection from "../components/AboutSection/AboutSection";
// import SearchBar from '../components/SearchBar/SearchBar'
import BlogSection from "../components/BlogSection/BlogSection";
import FooterBanner from "../components/Footer/FooterBanner";
import FBanner from "../components/FBanner/FBanner";

function HomePage() {
  return (
    <div>
      <Fragment>
        {/* <SearchBar/> */}
        <Banner />
        <br />
        <Cards />
        <br />
        <HowItWorksSection />
        <TestimonialsSection />
        <AboutSection />
        <BlogSection />
        <FBanner />
        <FooterBanner />
        <Footer />
      </Fragment>
    </div>
  );
}

export default HomePage;
