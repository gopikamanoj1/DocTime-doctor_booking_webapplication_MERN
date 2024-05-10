import React from 'react'
import AppointmentDetails from '../components/AppointmentDetails/AppointmentDetails'
import Footer from '../components/Footer/Footer'

function AppointmentDetailsPage() {
  return (
    <div>
      <AppointmentDetails appointment={undefined}/>
      <br /> <br /> <br />
      <Footer/>
    </div>
  )
}

export default AppointmentDetailsPage
