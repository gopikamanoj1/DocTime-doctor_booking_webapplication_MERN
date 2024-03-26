import React from 'react'
import UserListing from '../AdminComponent/UserListing/UserListing'
import AdminLayout from '../AdminComponent/LayoutComponent/AdminLayout';

const UserListingPage = () => {
    return (
      <AdminLayout>
        <UserListing />
      </AdminLayout>
    );
  };
  
  export default UserListingPage;
