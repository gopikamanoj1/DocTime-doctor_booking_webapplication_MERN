import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

const KYCAuthDoctor: React.FC = () => {
  const [certificateImage, setCertificateImage] = useState<File | null>(null);
  const [qualificationImage, setQualificationImage] = useState<File | null>(
    null
  );
  const [aadhaarNumber, setAadhaarNumber] = useState<string>("");
  const [yearsOfExperience, setYearsOfExperience] = useState<number>(0);
  const [hospitalName, setHospitalName] = useState<string>("");
  const [convertedCertificateImage, setConvertedCertificateImage] = useState<string | ArrayBuffer | null>(null);
const [convertedQualificationImage, setConvertedQualificationImage] = useState<string | ArrayBuffer | null>(null);


  const [error, setError] = useState<string>("");
  const [step, setStep] = useState(1);
  const navigate = useNavigate();
  const Doctor = useSelector((state: any) => state.persisted.doctorAuth);

  // console.log(Doctor, "DoctorDoctorvvDoctor");
  const email = Doctor.doctor.email;

  const handleYearsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Convert the input value to a number using parseInt
    const value = parseInt(e.target.value, 10);
    // Check if the value is a valid number
    if (!isNaN(value)) {
      setYearsOfExperience(value);
    } else {
      // Handle invalid input
      // For example, you can set it to 0 or display an error message
      setYearsOfExperience(0);
    }
  };


  const onSelectFile = async (event: React.ChangeEvent<HTMLInputElement>): Promise<void> => {
    const file: File | null = event.target.files ? event.target.files[0] : null;
    console.log(file)
    if (file) {
        const convertedFile: string | ArrayBuffer | null = await convertToBase64(file);
        if (event.target.id === "certificateImageInput") {
            setConvertedCertificateImage(convertedFile);
        } else if (event.target.id === "qualificationImageInput") {
            setConvertedQualificationImage(convertedFile);
        }
    }
};


const convertToBase64 = (file: File): Promise<string | ArrayBuffer | null> => {
    return new Promise(resolve => {
        const reader: FileReader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
            resolve(reader.result);
        };
        reader.onerror = () => {
            resolve(null);
        };
    });
};


const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
 
  if (
      !convertedCertificateImage ||
      !convertedQualificationImage ||
      !aadhaarNumber ||
      !hospitalName
  ) {
      setError("Please fill in all fields.");
      return;
  }
 
  try {
      const data = {
          certificateImage: convertedCertificateImage,
          qualificationImage: convertedQualificationImage,
          aadhaarNumber: aadhaarNumber,
          yearsOfExperience: yearsOfExperience,
          hospitalName: hospitalName,
          email: email,
      };
  console.log(data,"randum ");
  
      const response = await axios
        .create({ withCredentials: true })
        .post("http://localhost:3000/api/auth/kycAuth", data);
  
      console.log(response.data, "responseresponse");
  
      if (response.data.status) {
        navigate("/doctorHome");
      } else {
        setError(response.data.message || "KYC submission failed.");
      }
    } catch (error) {
      console.error("Error during KYC submission:", error);
      setError("An error occurred. Please try again later.");
    }
  };
  

  const nextStep = () => {
    setStep(step + 1);
  };

  const prevStep = () => {
    setStep(step - 1);
  };

  return (
    <div>
      <div className="bg-gray-100 min-h-screen flex justify-center items-center">
        <img
          src="/kyc/KYC_verification_img__7e0787186a.jpg"
          width={600}
          height={100}
          alt="Step 1"
        />
        <div className="bg-gray-100 p-20 rounded-lg  w-200">
          {step === 1 && (
            <>
              <h2 className="text-2xl font-bold mb-4">KYC Authentication</h2>
              <p className="text-gray-600 mb-6">Doctor ID Verification</p>
              <div className="flex items-center mb-6">
                <button
                  className="bg-blue-500 text-white px-4 py-2 rounded-md"
                  onClick={nextStep}
                >
                  Start Verification
                </button>
              </div>
              <button
                className="text-blue-500 hover:underline"
                onClick={() => console.log("Need help?")}
              >
                Need help?
              </button>
            </>
          )}
          {step === 2 && (
            <>
              <h2 className="text-2xl font-bold mb-4">Verification Process</h2>
              <p className="text-gray-600 mb-6">
                Please provide the following information for verification:
              </p>
              <form onSubmit={handleSubmit}>
                <div className="flex items-center mb-6">
                  <img
                    src="/kyc/certificat.png"
                    alt="Certificate"
                    className="h-8 mr-4"
                  />
                  <span>Doctor Certificate </span>
                  <input type="file" accept="image/*" id="certificateImageInput" onChange={onSelectFile} />

                </div>
                <div className="flex items-center mb-6">
                  <img
                    src="/kyc/qualification.png"
                    alt="Qualification"
                    className="h-8 mr-4"
                  />
                  <span>Qualification</span>
                  <input type="file" accept="image/*" id="qualificationImageInput" onChange={onSelectFile} />

                </div>
                <div className="flex items-center mb-6">
                  <label htmlFor="aadhaar" className="mr-4">
                    Aadhaar Number:
                  </label>
                  <input
                    type="text"
                    id="aadhaar"
                    className="border border-gray-300 p-2"
                    value={aadhaarNumber}
                    onChange={(e) => setAadhaarNumber(e.target.value)}
                  />
                </div>

                <div className="flex items-center mb-6">
                  <label htmlFor="years" className="mr-4">
                    Years of Experience:
                  </label>
                  <input
                    type="number"
                    id="years"
                    className="border border-gray-300 p-2"
                    value={yearsOfExperience.toString()} // Ensure it's a string to prevent type mismatch warnings
                    onChange={handleYearsChange}
                  />
                </div>
                <div className="flex items-center mb-6">
                  <label htmlFor="hospital" className="mr-4">
                    Hospital Name:
                  </label>
                  <input
                    type="text"
                    id="hospital"
                    className="border border-gray-300 p-2"
                    value={hospitalName}
                    onChange={(e) => setHospitalName(e.target.value)}
                  />
                </div>
                <div className="flex justify-between">
                  <button
                    className="bg-gray-500 text-white px-4 py-2 rounded-md"
                    onClick={prevStep}
                  >
                    Back
                  </button>
                  <button  type="submit"  className="bg-blue-500 text-white px-4 py-2 rounded-md">
                    Submit
                  </button>
                </div>
              </form>
            </>
          )}

          {step === 3 && (
            <>
              <h2 className="text-2xl font-bold mb-4">Verification Complete</h2>
              <p className="text-gray-600 mb-6">
                Your documents have been submitted for verification.
              </p>
              <button
                className="bg-blue-500 text-white px-4 py-2 rounded-md"
                onClick={() => console.log("Continue")}
              >
                Continue
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default KYCAuthDoctor;
