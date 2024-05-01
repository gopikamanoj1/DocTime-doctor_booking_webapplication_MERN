import React from "react";
import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
// import Navbar from './DoctorComponent/DoctorNavbar/AdminNavbar';
import DoctorNavbar from "./DoctorComponent/DoctorNavbar/DoctorNavbar";
function DoctorApp() {
  return (
    <div >
      <div>
      <DoctorNavbar />
      </div>
     
      <ToastContainer position="top-center" />
      <Outlet />
    </div>
  );
}

export default DoctorApp;
