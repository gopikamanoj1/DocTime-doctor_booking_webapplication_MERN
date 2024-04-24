import { ToastContainer } from 'react-toastify';
import AdminLayout from '../AdminComponent/LayoutComponent/AdminLayout';

import DoctorKYCDetails from '../AdminComponent/DoctorKYCDetails/DoctorKYCDetails'
function ShowingKycDetails() {
  return (
    <div>
       <ToastContainer />
        <AdminLayout>
        <DoctorKYCDetails/>

        </AdminLayout>

      </div>
  )
}

export default ShowingKycDetails
