

import React, { ReactNode } from 'react';
import AdminSidebar from '../SideNavBar/SideNavBar';

// Define the props type to include children
interface AdminLayoutProps {
  children: ReactNode;
}

const AdminLayout: React.FC<AdminLayoutProps> = ({ children }) => {
  return (
    <div className="flex">
      <AdminSidebar />
      <div className="flex flex-col w-full">
        <main className="p-6">{children}</main>
      </div>
    </div>
  );
};

export default AdminLayout;
