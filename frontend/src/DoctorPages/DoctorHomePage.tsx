import React, { useEffect } from 'react'
import Footer from '../components/Footer/Footer'
import Banner from '../components/Banner/Banner'
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import HowItWorksSection from '../components/Working/HowItWorks';
import TestimonialsSection from '../components/TestimonialsSection/TestimonialsSection';
import AboutSection from '../components/AboutSection/AboutSection';
import BlogSection from '../components/BlogSection/BlogSection';
import FBanner from '../components/FBanner/FBanner';
import FooterBanner from '../components/Footer/FooterBanner';


function DoctorHomePage() {

  const Doctor = useSelector((state:any)=>state.persisted.doctorAuth);

  const navigate=useNavigate()

  useEffect(()=>{
     if(Doctor.doctor == null ){
      navigate('/doctorLogin')
     }
  },[])
  return (
    <div>
     
      
      <Banner/>
      <HowItWorksSection />
        <TestimonialsSection />
        <AboutSection />
        <BlogSection />
        <FBanner />
        <FooterBanner />
      <Footer/>
    </div>
  )
}

export default DoctorHomePage

