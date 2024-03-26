import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

interface KYCDetail {
  certificateImage: string;
  qualificationImage: string;
  aadhaarNumber: string;
  yearsOfExperience: number;
  hospitalName: string;
}

interface DoctorDetails {
  _id: string;
  name: string;
  email: string;
  kycStatus: string;
  kycDetails: KYCDetail[];
}

const DoctorKYCDetails: React.FC = () => {
  const { doctorId } = useParams<{ doctorId: string }>();
  const [doctorDetails, setDoctorDetails] = useState<DoctorDetails | null>(
    null
  );
  const navigate = useNavigate();

  useEffect(() => {
    fetchDoctorsKYCDetails();
  }, []);

  const fetchDoctorsKYCDetails = async () => {
    try {
      const response = await axios.get<{
        status: boolean;
        data: { doctor: DoctorDetails };
      }>(`http://localhost:3000/api/auth/getKycDetails/${doctorId}`);
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
      await axios.put(`http://localhost:3000/api/auth/kycStatus/${doctorId}`, {
        kycStatus: newStatus,
      });
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
        return "text-orange-500 font-bold"; // or any other Tailwind CSS color class for orange
      case "approved":
        return "text-green-500 font-bold"; // or any other Tailwind CSS color class for green
      case "rejected":
        return "text-red-500 font-bold"; // or any other Tailwind CSS color class for red
      default:
        return "";
    }
  };

  return (
    <div className="">
      <div className="bg-white rounded-lg shadow-md p-8">
        <h3 className="text-lg font-semibold mb-4">{doctorDetails.name}</h3>
        <p className="text-gray-600 mb-4">{doctorDetails.email}</p>
        <div className="mb-6">
          <h4 className="text-lg font-semibold mb-2">
            <span style={{ fontWeight: "bold", color: "black" }}>
              {" "}
              KYC Status{" "}
            </span>
          </h4>
          <div className="flex items-center">
            <p
              className={`mr-4 ${getStatusColorClass(doctorDetails.kycStatus)}`}
            >
              {doctorDetails.kycStatus}
            </p>
            <select
              className="border rounded px-2 py-1"
              value={doctorDetails.kycStatus}
              onChange={(e) =>
                handleStatusChange(doctorDetails._id, e.target.value)
              }
            >
              <option
                value="pending"
                style={{ fontWeight: "bold", color: "orange" }}
              >
                Pending
              </option>
              <option
                value="approved"
                style={{ fontWeight: "bold", color: "green" }}
              >
                Approved
              </option>
              <option
                value="rejected"
                style={{ fontWeight: "bold", color: "red" }}
              >
                Rejected
              </option>
            </select>
          </div>
        </div>
        <div className="mb-6">
          <h4 className="text-lg font-semibold mb-2">KYC Details</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {doctorDetails.kycDetails.map(
              (detail: KYCDetail, index: number) => (
                <div key={index} className="bg-gray-100 rounded-lg p-4">
                  <p className="text-gray-600 mb-2">Certificate Image</p>
                  <img
                    src={detail.certificateImage}
                    alt="Certificate Image"
                    className="h-40 w-full object-cover mb-4 rounded-md"
                    onError={() =>
                      console.error("Error loading certificate image")
                    }
                  />
                  <p className="text-gray-600 mb-2">Qualification Image</p>
                  <img
                    src={detail.qualificationImage}
                    alt="Qualification Image"
                    className="h-40 w-full object-cover mb-4 rounded-md"
                    onError={() =>
                      console.error("Error loading qualification image")
                    }
                  />
                  <p className="text-gray-600 mb-2">
                    Aadhaar Number:{" "}
                    <span style={{ fontWeight: "bold", color: "red" }}>
                      {" "}
                      {detail.aadhaarNumber}
                    </span>
                  </p>
                  <p className="text-gray-600 mb-2">
                    Years of Experience:{" "}
                    <span style={{ fontWeight: "bold", color: "red" }}>
                      {detail.yearsOfExperience}
                    </span>
                  </p>
                  <p className="text-gray-600 mb-2">
                    Hospital Name:{" "}
                    <span style={{ fontWeight: "bold", color: "red" }}>
                      {detail.hospitalName}
                    </span>
                  </p>
                </div>
              )
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DoctorKYCDetails;
