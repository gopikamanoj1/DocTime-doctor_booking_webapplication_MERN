

import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { useSelector, useDispatch } from "react-redux";
import { updateEmail } from "../../Redux/slices/authSlice";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../AxiosConfig/axiosInstance";
import Footer from "../../components/Footer/Footer";

const UpdateEmailForDoc: React.FC = () => {
  const [newEmail, setNewEmail] = useState("");
  const [newOtp, setNewOtp] = useState("");
  const [showNewEmailInput, setShowNewEmailInput] = useState(true);
  const [showNewOtpInput, setShowNewOtpInput] = useState(false);
  const [showResendOTP, setShowResendOTP] = useState(false);
  const [timer, setTimer] = useState(60); // Initial timer value
  const doctor = useSelector((state: any) => state.persisted.doctorAuth);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (showResendOTP && timer > 0) {
      const interval = setInterval(() => {
        setTimer((prevTimer) => prevTimer - 1);
      }, 1000);

      return () => clearInterval(interval);
    } else if (timer === 0) {
      setTimer(60);
      setShowResendOTP(false);
    }
  }, [showResendOTP, timer]);

  const handleGetOtp = async (email: string) => {
    try {
      const data = { email };
      const response = await axiosInstance.post("/api/auth/generateOtp", data);
      if (response) {
        toast.success("OTP Sent Successfully");
        setShowNewOtpInput(true);
        setShowResendOTP(true); // Show resend OTP option
      } else {
        toast.error("Failed to Send OTP");
      }
    } catch (error) {
      console.error("Error sending OTP:", error);
      toast.error("Failed to Send OTP");
    }
  };

  const handleResendOTP = () => {
    handleGetOtp(newEmail); // Resend OTP when the button is clicked
  };

  const handleVerifyNewOtp = async () => {
    try {
      const data = { otp: newOtp, email: newEmail };
      const response = await axiosInstance.post("/api/auth/checkOTP", data);
      if (response.data.status) {
        toast.success("OTP Verified Successfully");
        handleUpdateEmail(); // Update email after successful OTP verification
      } else {
        toast.error("OTP Verification Failed");
      }
    } catch (error) {
      console.error("Error verifying OTP:", error);
      toast.error("OTP Verification Failed");
    }
  };

  const handleUpdateEmail = async () => {
    try {
      const data = {
        email: doctor.doctor.email,
        newEmail,
      };
      const response = await axiosInstance.post("/api/auth/updateEmailFORDOC", data);
      if (response.data.status) {
        toast.success("Email Updated Successfully");
        
        const userData = localStorage.getItem("doctorProfile");

        if (userData) {
          // Parse the stored user data
          const user = JSON.parse(userData);

          // Update only the email field
          user.data.email = newEmail;

          // Update the email field in local storage
          localStorage.setItem("User", JSON.stringify(user));
        }

        dispatch(updateEmail(newEmail));
        navigate("/doctorProfile");
      } else {
        toast.warn("Email Updating Failed");
      }
    } catch (error) {
      console.error("Error updating email:", error);
      toast.warn("Email Updating Failed");
    }
  };

  return (


    <>
    <div className="h-screen">
    <div className="flex h-auto">
      <div className="w-1/2 max-w-md mx-auto bg-slate-300 rounded-lg shadow-lg p-6 mt-10">
        <h2 className="text-2xl font-bold mb-4">Update Email</h2>
        
        {showNewEmailInput && (
          <div className="mb-4">
            <label htmlFor="newEmail" className="block text-sm font-medium text-gray-700">
              Enter New Email
            </label>
            <input
              type="email"
              id="newEmail"
              className="mt-1 p-2 w-full rounded-md border border-gray-300 focus:outline-none focus:border-blue-500"
              value={newEmail}
              onChange={(e) => setNewEmail(e.target.value)}
            />
            <button
              onClick={() => {
                setShowNewOtpInput(true);
                handleGetOtp(newEmail); // Get OTP for the new email
              }}
              className="text-base text-red-600 mt-1"
              disabled={showResendOTP && timer > 0} // Disable if the timer is running
            >
              Get OTP
            </button>
          </div>
        )}

        {showNewOtpInput && (
          <div className="mb-4">
            <label htmlFor="newOtp" className="block text-sm font-medium text-gray-700">
              Enter OTP
            </label>
            <input
              type="text"
              id="newOtp"
              className="mt-1 p-2 w-full rounded-md border border-gray-300 focus:outline-none focus:border-blue-500"
              value={newOtp}
              onChange={(e) => setNewOtp(e.target.value)}
            />
            <button
              onClick={handleVerifyNewOtp}
              className="text-base text-red-600 mt-1"
            >
              Verify OTP
            </button>
          </div>
        )}

        <button
          onClick={handleUpdateEmail}
          className="w-full bg-cyan-950 text-white py-2 rounded-md hover:bg-cyan-800 transition duration-300"
          disabled={!showNewOtpInput} // Only enable if the new OTP is shown
        >
          Update Email
        </button>

        {/* Display timer if the timer is running */}
        {showResendOTP && timer > 0 && (
          <p className="text-sm text-red-500 mt-2">
            Enter OTP in {timer} seconds
          </p>
        )}

        {/* Display Resend OTP button if the timer has expired */}
        {showResendOTP && timer === 0 && (
          <button
            onClick={handleResendOTP}
            className="text-sm text-red-600 mt-1"
          >
            Resend OTP
          </button>
        )}
      </div>
    </div>
    </div>
  
     

     <Footer/>


    </>
  
  );
};

export default UpdateEmailForDoc;

