import React from 'react'
import AdminLayout from '../AdminComponent/LayoutComponent/AdminLayout';
import DoctorListing from '../AdminComponent/DoctorListing/DoctorListing';
import AdminFooter from '../AdminComponent/Footer/AdminFooter';

const DoctorListingPage = () => {
    return (
      <>
       <AdminLayout>
        <DoctorListing/>

      </AdminLayout>
              <AdminFooter/>
      </>
     

    );
  };
  
  export default DoctorListingPage;
