import axios from "axios";
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

interface Doctor {
  _id: string;
  name: string;
  email: string;
  image:string
}

const ViewDoctorDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [doctor, setDoctor] = useState<Doctor | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get<Doctor>(`http://localhost:3000/api/auth/viewDoctorDetails/${id}`, { withCredentials: true });
        console.log(response.data, "Response in ViewDoctorDetails component");
        setDoctor(response.data.data);
      } catch (error) {
        console.error("Error fetching doctor details:", error);
      }
    };

    fetchData();
  }, [id]);

  return (
    <div className="p-16">
      {doctor && (
        <div className="p-8 bg-white shadow mt-24">
          <div className="grid grid-cols-1 md:grid-cols-3">
            {/* Doctor details */}
            <div className="grid grid-cols-3 text-center order-last md:order-first mt-20 md:mt-0">
              {/* Display doctor details here */}
              <div>
                <p className="font-bold text-black text-xl">{`Dr.${doctor.name}`}</p>
                <p className="text-gray-800">{doctor.email}</p>
              </div>
              {/* You can add more doctor details here */}
            </div>
            {/* Other sections of doctor details */}
            <div className="relative">
              <div className="w-48 h-48 bg-indigo-100 mx-auto rounded-full shadow-2xl absolute inset-x-0 top-0 -mt-24 flex items-center justify-center text-indigo-500">
                <img src={doctor.image}  alt="img" />
              </div>
            </div>
            {/* Other sections of doctor details */}
            <div className="space-x-8 flex justify-between mt-32 md:mt-0 md:justify-center">
              {/* Action buttons */}
              <button className="text-white py-2 px-4 uppercase rounded bg-blue-400 hover:bg-blue-500 shadow hover:shadow-lg font-medium transition transform hover:-translate-y-0.5">
                Connect
              </button>
              <button className="text-white py-2 px-4 uppercase rounded bg-gray-700 hover:bg-gray-800 shadow hover:shadow-lg font-medium transition transform hover:-translate-y-0.5">
                Message
              </button>
            </div>
          </div>
          {/* Other sections of doctor details */}
          <div className="mt-20 text-center border-b pb-12">
            <h1 className="text-4xl font-medium text-gray-700">
              {doctor.name}, <span className="font-light text-gray-500">27</span>
            </h1>
            <p className="font-light text-gray-600 mt-3">Bucharest, Romania</p>
            {/* You can add more sections of doctor details here */}
          </div>
          {/* Other sections of doctor details */}
          <div className="mt-12 flex flex-col justify-center">
            <p className="text-gray-600 text-center font-light lg:px-16">
              {/* Doctor description */}
              An artist of considerable range, Ryan — the name taken by
              Melbourne-raised, Brooklyn-based Nick Murphy — writes, performs and
              records all of his own music, giving it a warm, intimate feel with a
              solid groove structure. An artist of considerable range.
            </p>
            <button className="text-indigo-500 py-2 px-4 font-medium mt-4">
              Show more
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ViewDoctorDetails;
