import React, { FC, useEffect, useState } from 'react';
import Chart from 'react-apexcharts';
import axiosInstance from '../../AxiosConfig/axiosInstance';
import { Doctor } from "../../Interfaces/Doctor/DoctorInteface";
import { User } from '../../Interfaces/User/UserInterface';

const DonutChart: FC = () => {
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [chartData, setChartData] = useState({
    options: {
      labels: ['Doctors', 'Users'], // Updated to reflect the entities being displayed
    },
    series: [0, 0], // Initial counts set to 0
  });

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const response = await axiosInstance.get('/api/auth/getAllDoctors');
        if (Array.isArray(response.data.data)) {
          setDoctors(response.data.data);
        }
      } catch (error) {
        console.error('Error fetching doctors:', error);
      }
    };

    const fetchUsers = async () => {
      try {
        const response = await axiosInstance.get('/api/auth/getAllUsers');
        if (Array.isArray(response.data.data)) {
          setUsers(response.data.data);
        }
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchDoctors();
    fetchUsers();
  }, []);

  useEffect(() => {
    setChartData({
      options: {
        labels: ['Doctors', 'Users'], // Ensures labels reflect actual data sources
      },
      series: [doctors.length, users.length], // The counts of doctors and users
    });
  }, [doctors, users]); // Updates chart data when doctors or users change

  return (
    <div className="pl-64 flex justify-center items-center">
      <div className="w-full max-w-4xl">
        <div className="donut">
          <Chart
            options={chartData.options}
            series={chartData.series}
            type="donut"
            width="380"
          />
        </div>
      </div>
    </div>
  );
};

export default DonutChart;
