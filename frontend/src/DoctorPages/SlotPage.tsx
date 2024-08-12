import React from 'react'
import Footer from '../components/Footer/Footer'
import DescriptionAddSlot from '../DoctorComponent/Slot/DescriptionAddSlot'

function SlotPage() {
  return (
    <div>
       

        <div className="flex flex-col min-h-screen">  {/* Ensure it grows with screen height */}
      <div className="flex-grow">  {/* Make this part grow to take up available space */}
<DescriptionAddSlot/>
      </div>
      {/* <Footer />   */}
      

    </div>
      <Footer/>
    </div>
  )
}

export default SlotPage
