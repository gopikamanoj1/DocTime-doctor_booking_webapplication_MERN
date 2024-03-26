import React from 'react';
import { Link } from 'react-router-dom';

export const AdminSidebar = () => {
 return (
    <div className="w-64 bg-black text-white h-screen">
      <div className="p-6">
        
        <ul>
          <li className="mb-3 bg-gray-700 rounded-lg p-2 mx-2">
            <Link to="/admin/adminHome" className="flex items-center space-x-2">
              <span>Dashboard</span>
            </Link>
          </li>
          <li className="mb-3 bg-gray-700 rounded-lg p-2 mx-2">
            <Link to="/admin/getAllUsers" className="flex items-center space-x-2">
              <span>Patient List</span>
            </Link>
          </li>
          <li className="mb-3 bg-gray-700 rounded-lg p-2 mx-2">
            <Link to="/admin/getAllDoctors" className="flex items-center space-x-2">
              <span>Doctor List</span>
            </Link>
          </li>
          <li className="mb-3 bg-gray-700 rounded-lg p-2 mx-2">
            <Link to="/admin/department" className="flex items-center space-x-2">
              <span>Department</span>
            </Link>
          </li>
        </ul>
      </div>
    </div>
 );
};


export default AdminSidebar;