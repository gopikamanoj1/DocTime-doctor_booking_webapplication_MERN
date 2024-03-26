import React from 'react'
import { ToastContainer } from 'react-toastify';

import DoctorKYCDetails from '../AdminComponent/DoctorKYCDetails/DoctorKYCDetails'
import AdminLayout from '../AdminComponent/LayoutComponent/AdminLayout'
function ShowingKycDetails() {
  return (
    <div>
       <AdminLayout>
       <ToastContainer />

       <DoctorKYCDetails/>

        </AdminLayout> 
    </div>
  )
}

export default ShowingKycDetails
