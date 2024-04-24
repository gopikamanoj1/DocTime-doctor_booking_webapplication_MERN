import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Doctor } from "../../Interfaces/Doctor/DoctorInteface";
import Search from "../UserListing/Search";
import axiosInstance from "../../AxiosConfig/axiosInstance";



const DoctorListing = () => {
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage] = useState(5); // Adjust the number of items per page as needed
  const [totalPages, setTotalPages] = useState(0); // Define totalPages state variable
  const [totalDoctors, setTotalDoctors] = useState(0); // Define totalDoctors state variable
  const [filteredUsers, setFilteredUsers] = useState<Doctor[]>([]);
  const [filter, setFilter] = useState<"all" | "blocked" | "unblocked">("all"); // State for the filter

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const response = await axiosInstance.get(
          `/api/auth/getAllDoctors?page=${currentPage}&perPage=${perPage}`
        );
        if (Array.isArray(response.data.data)) {
          setDoctors(response.data.data);
          setTotalDoctors(response.data.length);
          setFilteredUsers(response.data.data);

          const totalPages = Math.ceil(response.data.totalDoctors / perPage);
          setTotalPages(totalPages); // Set totalPages state
        } else {
          console.error("Invalid doctor data:", response.data.data);
        }
      } catch (error) {
        console.error("Error fetching doctors:", error);
      }
    };

    fetchDoctors();
  }, [currentPage, perPage]);

  const handleDoctorBlock = async (doctorId: any) => {
    try {
      const response = await axiosInstance.put(
        `/api/auth/handleDoctorBlock/${doctorId}`
      );
      const updatedDoctor = response.data.data;
      setFilteredUsers(
        doctors.map((doctor) =>
          doctor._id === updatedDoctor._id ? updatedDoctor : doctor
        )
      );
    } catch (error) {
      console.error("Error toggling block status:", error);
    }
  };

  const handleSearch = (query: string) => {
    const lowerCaseQuery = query.toLowerCase();
    const filtered = doctors.filter(
      (doctors) =>
        doctors.name.toLowerCase().includes(lowerCaseQuery) ||
        doctors.email.toLowerCase().includes(lowerCaseQuery)
    );
    setFilteredUsers(filtered);
  };

  useEffect(() => {
    applyFilter(doctors, filter);
  }, [filter, doctors]); // Reapply filter when filter changes or users are updated

  const applyFilter = (
    allUsers: Doctor[],
    filterType: "all" | "blocked" | "unblocked"
  ) => {
    if (filterType === "all") {
      setFilteredUsers(allUsers);
    } else {
      const filtered = allUsers.filter(
        (user) => user.isBlocked === (filterType === "blocked")
      );
      setFilteredUsers(filtered);
    }
  };

  return (
    <div className="pl-64 flex justify-center items-center">
      <div className="w-full max-w-4xl">
        <div className="text-center my-4">
          <h1 className="text-2xl font-bold">Doctors List</h1>{" "}
        </div>
        <div className="flex justify-between mb-4">
          {/* Search bar on the left */}
          <div className="flex">
            <Search onSearch={handleSearch} />
          </div>

          {/* Filter buttons on the right */}
          <div className="flex items-center">
            <button
              onClick={() => setFilter("all")}
              className={`px-4 py-2 mr-2 rounded-lg transition-all ${
                filter === "all"
                  ? "bg-blue-600 text-white"
                  : "bg-gray-300 text-gray-700"
              } hover:bg-blue-700`}
            >
              All
            </button>
            <button
              onClick={() => setFilter("blocked")}
              className={`px-4 py-2 mr-2 rounded-lg transition-all ${
                filter === "blocked"
                  ? "bg-blue-600 text-white"
                  : "bg-gray-300 text-gray-700"
              } hover:bg-blue-700`}
            >
              Blocked
            </button>
            <button
              onClick={() => setFilter("unblocked")}
              className={`px-4 py-2 mr-2 rounded-lg transition-all ${
                filter === "unblocked"
                  ? "bg-blue-600 text-white"
                  : "bg-gray-300 text-gray-700"
              } hover:bg-blue-700`}
            >
              Unblocked
            </button>
          </div>
        </div>
       
        <table className="min-w-full bg-white rounded-lg overflow-hidden shadow-lg">
          <thead className="bg-gray-800 text-white">
         
            <tr>
              <th className="px-6 py-3 border-b-2 border-gray-300 text-xs font-semibold uppercase">
                Name
              </th>
              <th className="px-6 py-3 border-b-2 border-gray-300 text-xs font-semibold uppercase">
                Email
              </th>
              <th className="px-6 py-3 border-b-2 border-gray-300 text-xs font-semibold uppercase">
                Specialization
              </th>
              <th className="px-6 py-3 border-b-2 border-gray-300 text-xs font-semibold uppercase">
                KYC Status
              </th>
              <th className="px-6 py-3 border-b-2 border-gray-300 text-xs font-semibold uppercase">
                KYC
              </th>
              <th className="px-6 py-3 border-b-2 border-gray-300 text-xs font-semibold uppercase">
                Action
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
          
            {filteredUsers.map((doctor) => (
              <tr key={doctor._id} className="hover:bg-gray-100 transition-all">
            
                <td className="px-6 py-4 text-sm text-gray-800">
                  {doctor.name}
                </td>
                <td className="px-6 py-4 text-sm text-gray-800">
                  {doctor.email}
                </td>
                <td className="px-6 py-4 text-sm text-gray-800">
                  {doctor.specialization}
                </td>
                <td className="px-6 py-4 text-sm text-gray-800">
                  {doctor.kycStatus}
                </td>
                <td className="px-6 py-4 text-center text-sm font-medium">
                  {doctor.kycDetails && doctor.kycDetails.length > 0 ? (
                    <Link
                      to={`/admin/getKycDetails/${doctor._id}`}
                      className="inline-block  text-green-500 py-1 px-3 rounded-3xl"
                    >
                      View KYC Details And Change Status
                    </Link>
                  ) : (
                    <button
                      className=" text-red-500 py-1 px-3 rounded-3xl"
                      disabled
                    >
                      Not Submitted KYC
                    </button>
                  )}
                </td>
                <td className="px-6 py-4 text-right text-sm font-medium">
                  <button
                    onClick={() => handleDoctorBlock(doctor._id)}
                    className={`mr-2 ${
                      doctor.isBlocked
                        ? "bg-green-500 hover:bg-green-700"
                        : "bg-red-500 hover:bg-red-700"
                    } text-white py-1 px-3 rounded-full`}
                  >
                    {doctor.isBlocked ? "Unblock" : "Block"}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="flex justify-end mt-4">
          <button
            className="bg-gray-200 hover:bg-gray-300 py-2 px-4 rounded-l"
            onClick={() => setCurrentPage(currentPage - 1)}
            disabled={currentPage === 1}
          >
            Previous
          </button>
          <button
            className="bg-gray-200 hover:bg-gray-300 py-2 px-4 rounded-r"
            onClick={() => setCurrentPage(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default DoctorListing;
