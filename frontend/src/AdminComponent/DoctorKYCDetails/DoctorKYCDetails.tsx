

import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Swal from "sweetalert2";
import { DoctorDetails } from "../../Interfaces/Doctor/DoctorInteface";
import { KYCDetail } from "../../Interfaces/Doctor/DoctorInteface";
import axiosInstance from "../../AxiosConfig/axiosInstance";
const DoctorKYCDetails: React.FC = () => {
  const { doctorId } = useParams<{ doctorId: string }>();
  const [doctorDetails, setDoctorDetails] = useState<DoctorDetails | null>(
    null
  );

  useEffect(() => {
    fetchDoctorsKYCDetails();
  }, []);

  const fetchDoctorsKYCDetails = async () => {
    try {
      const response = await axiosInstance.get<{
        status: boolean;
        data: { doctor: DoctorDetails };
      }>(`/api/auth/getKycDetails/${doctorId}`);
      console.log(response.data, "frontend data");

      if (response.data.status && response.data.data.doctor) {
        setDoctorDetails(response.data.data.doctor);
      } else {
        console.error("Error: No doctor details found.");
      }
    } catch (error) {
      console.error("Error fetching doctor KYC details:", error);
    }
  };

  if (!doctorDetails) {
    return <div>Loading...</div>;
  }

  const handleStatusChange = async (doctorId: string, newStatus: any) => {
    try {
      if (newStatus === "rejected") {
        const { value: reason } = await Swal.fire({
          title: 'Enter reason for rejection',
          input: 'text',
          inputLabel: 'Reason',
          inputPlaceholder: 'Enter reason here...',
          inputValidator: (value) => {
            if (!value) {
              return 'You need to enter a reason!';
            }
          }
        });

        if (reason) {
          await axiosInstance.put(`/api/auth/kycStatus/${doctorId}`, {
            kycStatus: newStatus,
            rejectionReason: reason
          });
        } else {
          // User clicked Cancel or closed the modal
          return;
        }
      } else {
        await axiosInstance.put(`/api/auth/kycStatus/${doctorId}`, {
          kycStatus: newStatus,
        });
      }

      // Update the local state to reflect the change
      setDoctorDetails((prevDoctorDetails) => ({
        ...prevDoctorDetails!,
        kycStatus: newStatus,
      }));
      toast.success("KYC status updated successfully");
    } catch (error) {
      console.error("Error updating KYC status:", error);
      toast.error("Failed to update KYC status");
    }
  };

  const getStatusColorClass = (status: string) => {
    switch (status) {
      case "pending":
        return "text-orange-500 font-bold";
      case "approved":
        return "text-green-500 font-bold";
      case "rejected":
        return "text-red-500 font-bold";
      default:
        return "";
    }
  };

  return (
    <div className="pl-64 flex justify-center items-center">
    <div className="w-full max-w-4xl">
      <div className="w-full flex justify-center items-center h-16  text-lg font-bold ">KYC Details</div>
      <div className="bg-white rounded-lg shadow-md  flex w-full h-full justify-between  p-5">
       <div className="w-1/2 h-full  flex flex-col pl-5">
           <div className="w-full h-9  items-center flex ">
           <h3 className="text-1xl font-semibold ">{doctorDetails.name}</h3>
           </div>
           <div>
           <p className="text-gray-600 ">{doctorDetails.email}</p>
           </div>
           <div className="w-full  pt-2 mt-3">
           <div className=" ">
          <h4 className="text-xl font-semibold mb-2">KYC Status</h4>
          <div className="flex items-center">
            <p className={`mr-4 ${getStatusColorClass(doctorDetails.kycStatus)}`}>
              {doctorDetails.kycStatus}
            </p>
            <select
              className="border rounded px-3 py-1"
              value={doctorDetails.kycStatus}
              onChange={(e) => handleStatusChange(doctorDetails._id, e.target.value)}
            >
              <option value="pending" className="font-semibold text-orange-500">Pending</option>
              <option value="approved" className="font-semibold text-green-500">Approved</option>
              <option value="rejected" className="font-semibold text-red-500">Rejected</option>
            </select>
          </div>
        </div>
           </div>
        <div className="w-full justify-center flex flex-col gap-5 mt-6">
        {doctorDetails.kycDetails.map((detail: KYCDetail, ) => (<>
            <p className="text-gray-600 mb-2">Aadhaar Number: <span className="font-semibold text-red-500">{detail.aadhaarNumber}</span></p>
            <p className="text-gray-600 mb-2">Years of Experience: <span className="font-semibold text-red-500">{detail.yearsOfExperience}</span></p>
          <p className="text-gray-600 mb-2">Hospital Name: <span className="font-semibold text-red-500">{detail.hospitalName}</span></p>
           </>))}
        </div>
       </div>
       <div className="w-1/2 h-full  flex justify-center">
       <div className="w-full h-full  p-10  ">
            {doctorDetails.kycDetails.map((detail: KYCDetail, index: number) => (
              <div key={index} className="bg-gray-100 rounded-lg p-4 flex flex-col ">
                <div className="w-full flex justify-center items-center">
                 <div>
                 <p className="text-gray-600 mb-2">Certificate Image</p>
                  <img
                    src={detail.certificateImage}
                    alt="Certificate Image"
                    className="h-40 w-10/12 object-cover mb-4 rounded-md "
                    onError={() => console.error("Error loading certificate image")}
                  />
                 </div>
                </div>
                <div className="w-full flex justify-center items-center" >
                  <div>
                  <p className="text-gray-600 mb-2">Qualification Image</p>
                  <img
                    src={detail.qualificationImage}
                    alt="Qualification Image"
                    className="h-40 w-10/12 object-cover mb-4 rounded-md"
                    onError={() => console.error("Error loading qualification image")}
                  />
                  </div>
                </div>
              </div>
            ))}
          </div>
       </div>
      </div>
    </div>
    </div>

  );
};

export default DoctorKYCDetails;

