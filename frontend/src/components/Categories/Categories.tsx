import React, { useState, useEffect } from "react";
import { Carousel, CarouselResponsiveOption } from "primereact/carousel";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../AxiosConfig/axiosInstance";
import { Doctor } from "../../Interfaces/User/UserInterface";


export default function DoctorCarousel() {

  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosInstance.get<{ data: Doctor[] }>(
          "/api/auth/findDoctor",
          { withCredentials: true }
        );
        setDoctors(response.data.data);
      } catch (error) {
        console.error("Error fetching doctors:", error);
      }
    };

    fetchData();
  }, []);

  const handleClick = async (doctorId: string) => {
    try {
      navigate(`/viewDoctorDetails/${doctorId}`);
    } catch (error) {
      console.error("Error navigating to doctor details:", error);
    }
  };

  const responsiveOptions: CarouselResponsiveOption[] = [
    {
      breakpoint: "1400px",
      numVisible: 4,
      numScroll: 1,
    },
    {
      breakpoint: "1199px",
      numVisible: 4,
      numScroll: 1,
    },
    {
      breakpoint: "767px",
      numVisible: 4,
      numScroll: 1,
    },
    {
      breakpoint: "575px",
      numVisible: 4,
      numScroll: 1,
    },
  ];

  const doctorTemplate = (doctor: Doctor) => {
    return (
      <div className="p-10 flex justify-center items-center">
        <button onClick={() => handleClick(doctor._id)}>
          <div className="p-shadow-5 p-p-2 p-mb-2 p-rounded-lg p-text-center doctor-card">
            <div className="w-40 h-40 bg-indigo-100 mx-auto rounded-full  relative">
              <img
                src={doctor.image}
                alt="Doctor's Profile"
                className="w-full h-full object-cover rounded-full"
              />
              <div className="absolute bottom-0 left-0 right-0 p-1 bg-white bg-opacity-75 rounded-b-full">
                <h5 className="text-center text-lg font-bold text-gray-800">
                  {doctor.specialization}
                </h5>
                <h6 className="text-center text-sm text-gray-600">
                  {doctor.name}
                </h6>
              </div>
            </div>
          </div>
        </button>
      </div>
    );
  };

  return (
    <div className="card">
      <Carousel
        value={doctors}
        numVisible={3}
        numScroll={3}
        responsiveOptions={responsiveOptions}
        itemTemplate={doctorTemplate}
      />
    </div>
  );
}
