import React, { useState, useEffect } from 'react';
import axios from "axios";
import {Link} from  'react-router-dom'

interface Doctor {
    _id: string;
    name: string;
    password: string;
    email: string;
    kycStatus: string;
    __v: number;
    address: any[]; // Update the type based on the actual structure of address
    age: number;
    dob: string;
    fees: number;
    image: string;
    phone: string;
    specialization: string;
    kycDetails: any[]; // Update the type based on the actual structure of kycDetails
}

const DoctorCard: React.FC = () => {
    const [doctors, setDoctors] = useState<Doctor[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get<{ data: Doctor[] }>("http://localhost:3000/api/auth/findDoctor", { withCredentials: true });
                setDoctors(response.data.data);
            } catch (error) {
                console.error("Error fetching doctors:", error);
            }
        };

        fetchData();
    }, []);

    return (
        <div className="mt-10 ml-10  mr-10"> {/* Add margin-top for spacing */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {doctors.map((doctor, index) => (
                   <div key={index} className="our-team bg-gray-200 rounded-lg overflow-hidden shadow-md transition duration-300 ease-in-out transform hover:scale-105">
                <div className="picture relative overflow-hidden h-48"> 
                       <img
                           className="w-min h-auto "
                           src={doctor.image}
                           alt={`Doctor ${doctor.name}`}
                       />
                   </div>
                   <div className="team-content py-4 px-6 flex flex-col justify-center items-center">
                       <h3 className="name text-xl font-semibold mb-2">{`DR. ${doctor.name}`}</h3>
                       <p className="text-rose-800 font-semibold">{doctor.specialization}</p>
                       <p className="text-gray-600">{doctor.email}</p>
                       <p className="text-green-950 font-semibold">{`FEES:  Rs.${doctor.fees}`}</p>

                       {/* Add more details as needed */}
                       <div className="mt-4 flex items-center justify-center">
                           <button className="bg-cyan-950 hover:bg-cyan-800 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Book Appointment</button>
                       </div>
                       <div className="mt-4 flex items-center justify-center">
                        <Link to={`/viewDoctorDetails/${doctor._id}`}>
                        <button className="bg-cyan-800 hover:bg-cyan-950 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">View Details</button>

                        </Link>
                       </div>
                   </div>
               </div>
               
                ))}
            </div>
        </div>
    );
};

export default DoctorCard;
