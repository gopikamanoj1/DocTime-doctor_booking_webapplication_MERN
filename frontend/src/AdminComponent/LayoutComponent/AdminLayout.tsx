import React, { ReactNode } from "react";
import AdminSidebar from "../SideNavBar/SideNavBar";

// Define the props type to include children
interface AdminLayoutProps {
  children: ReactNode;
}

const AdminLayout: React.FC<AdminLayoutProps> = ({ children }) => {
  return (
    <>
   
      <div className="flex justify-center items-center h-16 dark:bg-gray-800">
        <h1 className="text-2xl font-bold text-white">Admin Dashboard</h1>
      </div>
      <div className="flex">
        <AdminSidebar />
        <div className="flex flex-col w-full">
          <main className="p-6">{children}</main>
        </div>
      </div>
    </>
  );
};

export default AdminLayout;
