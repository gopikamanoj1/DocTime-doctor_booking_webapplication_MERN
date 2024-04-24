import axios from 'axios';
import React, { ReactNode, useEffect, useState } from 'react';
import { useSelector } from "react-redux";
import { Appointment } from '../../Interfaces/Doctor/DoctorInteface';
import axiosInstance from '../../AxiosConfig/axiosInstance';

interface AppointmentDetailsProps {
  appointment?: Appointment; 
}

const ListOfAppointments: React.FC<AppointmentDetailsProps> = ({ appointment }) => {
  const [appointmentDetails, setAppointmentDetails] = useState<Appointment | null>(null);
  const doctor = useSelector((state:any)=>state.persisted.doctorAuth);

const doctorId=doctor? doctor._id: null;


  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosInstance.post('/api/auth/showAppoinments', { doctorId: doctorId });
        if (response.data && response.data.data) {
          setAppointmentDetails(response.data.data);
        }
      } catch (error) {
        console.error("Error fetching data in appointment details:", error);
      }
    };

    fetchData();
  }, [doctorId]); 

  if (!appointmentDetails) {
    return <div className=' text-red-500 font-semibold text-center p-10'>
        <h2>No Appointments</h2>
    </div>;
  }
  console.log(appointmentDetails,"kkkk");
  

 
  return (
<div className="bg-slate-400 pt-9 rounded-lg shadow-lg p-6 w-[800px] mx-auto m-10">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold text-gray-800">Appointment Details</h2>
       
      </div>
      <hr className="my-4 border-gray-600" />
      <div className="flex items-center justify-between">
        <div className="mt-4">
          <p className="text-gray-700 font-semibold">Date</p>
          <p className="text-gray-800 font-extrabold">{appointmentDetails.appointment.date}</p>
        </div>
      
     
      <div className="mt-4">
        <p className="text-gray-700 font-semibold">Patient Name</p>
        <p className="text-gray-800 font-extrabold">{appointmentDetails.user.name}</p>
      </div>
      <div className="mt-4">
          <p className="text-gray-700 font-semibold">Time</p>
          <p className="text-gray-800 font-extrabold ">{appointmentDetails.appointment.time}</p>
        </div>
      <div className="mt-4">
        <p className="text-gray-700 font-semibold">Specialty</p> 
        <p className="text-gray-800 font-extrabold">{appointmentDetails.doctor.specialization}</p>
      </div>
      </div>
      <div className="mt-6 flex justify-end">
        <button className="px-4 py-2 bg-blue-500 text-white rounded-lg shadow hover:bg-blue-600 focus:outline-none">
          Reschedule
        </button>
        <button className="px-4 py-2 bg-red-500 text-white rounded-lg shadow hover:bg-red-600 ml-4 focus:outline-none">
          Not Completed
        </button>
        {/* <button className="px-4 py-2 bg-green-500 text-white rounded-lg shadow hover:bg-green-600 ml-4 focus:outline-none">
           Completed
        </button> */}
      </div>
    </div>
  );
};

export default ListOfAppointments;
