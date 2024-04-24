import React, { useState, useEffect, ChangeEvent, useCallback } from "react";
import { Link } from "react-router-dom";
import SearchBar from "../Navbar/SearchBar";
import _ from 'lodash'; 
import { Doctor } from "../../Interfaces/Doctor/DoctorInteface";
import axiosInstance from "../../AxiosConfig/axiosInstance";

const DoctorCard: React.FC = () => {

  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [searchResults, setSearchResults] = useState<Doctor[]>([]);
  const [searchValue, setSearchValue] = useState("");


  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosInstance.get<{ data: Doctor[] }>('/api/auth/findDoctor',
     
        );
        setDoctors(response.data.data);
      } catch (error) {
        console.error("Error fetching doctors:", error);
      }
    };

    fetchData();
  }, []);

  
  const debouncedHandleSearch = useCallback(
    _.debounce((value: string) => {
      if (value.trim()) {
        axiosInstance.post('/api/auth/searchDoctrs', { doctorName: value }, { withCredentials: true })
          .then(response => {
            setSearchResults(response.data.data);
            
          })
          
          .catch(error => {
            
            console.error("Error performing search:", error);
          });
      } else {
        setSearchResults([]);
      }
    }, 100),
    []
  );


  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchValue(value);
    debouncedHandleSearch(value); // Call the debounced search function
  };
  return (
    <>
      <SearchBar value={searchValue} onChange={handleInputChange} onSearch={() => debouncedHandleSearch(searchValue)} />
      <div className="mt-10 ml-10  mr-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {searchResults.length > 0 ? (
            searchResults.map((doctor, index) => (
              <DoctorItem key={index} doctor={doctor} />
            ))
          ) : (
            doctors.map((doctor, index) => (
              <DoctorItem key={index} doctor={doctor} />
            ))
          )}
        </div>
      </div>
    </>
  );
};

interface DoctorItemProps {
  doctor: Doctor;
}

const DoctorItem: React.FC<DoctorItemProps> = ({ doctor }) => (
  <div className="our-team bg-gray-200 rounded-lg overflow-hidden shadow-md transition duration-300 ease-in-out transform hover:scale-105">
  <div className="picture relative overflow-hidden h-48">
    <img className="w-min h-auto" src={doctor.image} alt={`Doctor ${doctor.name}`} />
  </div>
  <div className="team-content py-4 px-6 flex flex-col justify-center items-center">
    <h3 className="name text-xl font-semibold mb-2">{`DR. ${doctor.name}`}</h3>
    <p className="text-rose-800 font-semibold">{doctor.specialization}</p>
    <p className="text-gray-600">{doctor.email}</p>
    <p className="text-green-950 font-semibold">{`FEES:  Rs.${doctor.fees}`}</p>
    <div className="mt-4 flex items-center justify-center">
      <Link to={`/viewDoctorDetails/${doctor._id}`}>
        <button className="bg-cyan-800 hover:bg-cyan-950 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
          View Details
        </button>
      </Link>
    </div>
  </div>
</div>
);

export default DoctorCard;
