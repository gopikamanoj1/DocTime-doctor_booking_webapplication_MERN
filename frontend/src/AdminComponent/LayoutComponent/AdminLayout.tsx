import React from 'react';
import AdminSidebar from '../SideNavBar/SideNavBar';
import AdminNavbar from '../Header/AdminNavbar';

const AdminLayout = ({ children }) => {
  return (
    <div className="flex">
      <AdminSidebar />
      <div className="flex flex-col w-full">
        <AdminNavbar />
        <main className="p-6">{children}</main>
      </div>
    </div>
  );
};

export default AdminLayout;
