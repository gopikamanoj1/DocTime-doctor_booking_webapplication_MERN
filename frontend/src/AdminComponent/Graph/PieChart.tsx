import React, { useEffect, useState } from 'react';
import Chart from 'react-apexcharts';
import { ApexOptions } from 'apexcharts';
import axiosInstance from '../../AxiosConfig/axiosInstance';
import { Doctor } from '../../Interfaces/Doctor/DoctorInteface';
import { User } from '../../Interfaces/User/UserInterface';

const PieChart: React.FC = () => {
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [appointments, setAppointments] = useState<number>(0); // To store the number of appointments
  const [slots, setSlots] = useState<number>(0); // To store the number of slots

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch doctors
        const doctorResponse = await axiosInstance.get('/api/auth/getAllDoctors');
        if (Array.isArray(doctorResponse.data.data)) {
          setDoctors(doctorResponse.data.data);
        }

        // Fetch users
        const userResponse = await axiosInstance.get('/api/auth/getAllUsers');
        if (Array.isArray(userResponse.data.data)) {
          setUsers(userResponse.data.data);
        }

        // Fetch appointments and slots from a single API endpoint
        const appointmentResponse = await axiosInstance.get('/api/auth/getAllAppoinments');
        console.log(appointmentResponse,"appointmentResponse");
        
        if (appointmentResponse.data?.data.data) {
          const { appoinment, slotes } = appointmentResponse.data.data.data;

          if (Array.isArray(appoinment)) {
            setAppointments(appoinment.length);
          }

          if (Array.isArray(slotes)) {
            setSlots(slotes.length);
          }
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []); // Fetch all necessary data on component mount

  const chartOptions: ApexOptions = {
    chart: {
      type: 'pie',
      width: 380,
    },
    labels: ['Doctors', 'Users', 'Appointments', 'Slots'], // Updated to reflect new data
    responsive: [
      {
        breakpoint: 480,
        options: {
          chart: {
            width: 200,
          },
          legend: {
            position: 'bottom',
          },
        },
      },
    ],
  };

  // Update the series with the counts of the actual data
  const series = [doctors.length, users.length, appointments, slots];

  return (
    <div className="pl-64 flex justify-center items-center">
      <div className="w-full max-w-4xl">
        <Chart
          options={chartOptions}
          series={series} // Use the counts from the data
          type="pie" // Explicitly set to 'pie'
          width="380"
        />
      </div>
    </div>
  );
};

export default PieChart;
