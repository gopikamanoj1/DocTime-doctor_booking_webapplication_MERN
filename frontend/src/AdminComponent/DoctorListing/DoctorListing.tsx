import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

interface Doctor {
  kycStatus: string;
  _id: number;
  name: string;
  email: string;
  specialization: string;
  blocked: boolean;
  kycDetails: {
    length: number;
    _id: string;
  } | null;
}

const DoctorListing = () => {
  const [doctors, setDoctors] = useState<Doctor[]>([]);

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3000/api/auth/getAllDoctors"
        );
        if (Array.isArray(response.data.data)) {
          setDoctors(response.data.data);
        } else {
          console.error("Invalid doctor data:", response.data.data);
        }
      } catch (error) {
        console.error("Error fetching doctors:", error);
      }
    };

    fetchDoctors();
  }, []);
  const toggleBlockStatus = async (_id: number) => {
    try {
      const response = await axios.put(
        `http://localhost:3000/api/doctors/toggleBlockStatus/${_id}`
      );
      const updatedDoctor = response.data.data;
      setDoctors(
        doctors.map((doctor) =>
          doctor._id === updatedDoctor._id ? updatedDoctor : doctor
        )
      );
    } catch (error) {
      console.error("Error toggling block status:", error);
    }
  };

  const handleApprove = (doctorId: number) => {
    // Implement the logic to handle doctor approval here
    console.log(`Approving doctor with ID ${doctorId}`);
  };

  return (
    <div className="">
      <table className="min-w-full bg-white rounded-lg overflow-hidden shadow-lg">
        <thead className="bg-gray-800 text-white">
          <tr>
            <th className="px-6 py-3 border-b-2 border-gray-300  text-xs font-semibold uppercase ">
              ID
            </th>
            <th className="px-6 py-3 border-b-2 border-gray-300  text-xs font-semibold uppercase ">
              Name
            </th>
            <th className="px-6 py-3 border-b-2 border-gray-300  text-xs font-semibold uppercase ">
              Email
            </th>
            <th className="px-6 py-3 border-b-2 border-gray-300  text-xs font-semibold uppercase ">
              Specialization
            </th>
            <th className="px-6 py-3 border-b-2 border-gray-300  text-xs font-semibold uppercase ">
              Action
            </th>
            <th className="px-6 py-3 border-b-2 border-gray-300  text-xs font-semibold uppercase ">
              KYC Status
            </th>
            <th className="px-6 py-3 border-b-2 border-gray-300  text-xs font-semibold uppercase ">
              KYC
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {doctors.map((doctor) => (
            <tr key={doctor._id} className="hover:bg-gray-100 transition-all">
              <td className="px-6 py-4  text-sm text-gray-800">
                {doctor._id}
              </td>
              <td className="px-6 py-4  text-sm text-gray-800">
                {doctor.name}
              </td>
              <td className="px-6 py-4  text-sm text-gray-800">
                {doctor.email}
              </td>
              <td className="px-6 py-4  text-sm text-gray-800">
                {doctor.specialization}
              </td>
          

              <td className="px-6 py-4  text-right text-sm font-medium">
                <button
                  onClick={() => toggleBlockStatus(doctor._id)}
                  className={`mr-2 ${
                    doctor.blocked
                      ? "bg-green-500 hover:bg-green-700"
                      : "bg-red-500 hover:bg-red-700"
                  } text-white py-1 px-3 rounded-full`}
                >
                  {doctor.blocked ? "Unblock" : "Block"}
                </button>
              </td>
              <td className="px-6 py-4  text-sm text-gray-800">
                {doctor.kycStatus}
              </td>
              <td className="px-6 py-4  text-center text-sm font-medium">
                {doctor.kycDetails && doctor.kycDetails.length > 0 ? (
                  
                  <Link
                  to={`/admin/getKycDetails/${doctor._id}`}
                  className="inline-block bg-green-500 hover:bg-green-700 text-white py-1 px-3 rounded-3xl transition duration-300"
                >
                  View KYC Details And Change Status
                </Link>
                ) : (
                  <button
                    className="bg-blue-500 hover:bg-blue-700 text-white py-1 px-3 rounded-3xl"
                    disabled
                  >
                    Not Submitted KYC 
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DoctorListing;
