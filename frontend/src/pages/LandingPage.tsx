import React, { Fragment } from 'react'
import Banner from '../components/Banner/Banner'
import Footer from '../components/Footer/Footer'
import Cards from '../components/Cards/Cards'
import HowItWorksSection from '../components/Working/HowItWorks'
import BlogSection from "../components/BlogSection/BlogSection";
import FooterBanner from "../components/Footer/FooterBanner";
import FBanner from "../components/FBanner/FBanner";
import TestimonialsSection from "../components/TestimonialsSection/TestimonialsSection";
import AboutSection from "../components/AboutSection/AboutSection";
import FAQ from '../components/AboutSection/FAQ'

function LandingPage() {
  return (
    <div >
      <Fragment>
        {/* <Navbar /> */}
        <Banner />
        <br />
        <Cards />
        <br />
        <HowItWorksSection />
        <TestimonialsSection />
       
        <BlogSection />
        <AboutSection />
        <FAQ/>
        <FBanner />
        <FooterBanner />
        <Footer />
      </Fragment>

    </div>
  )
}

export default LandingPage
