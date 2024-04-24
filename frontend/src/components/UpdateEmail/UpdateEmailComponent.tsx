

import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { useSelector, useDispatch } from "react-redux";
import { updateEmail } from "../../Redux/slices/authSlice";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../AxiosConfig/axiosInstance";

const UpdateEmailComponent: React.FC = () => {

  const [newEmail, setNewEmail] = useState("");
  const [currentOtp, setCurrentOtp] = useState("");
  const [newOtp, setNewOtp] = useState("");
  const [showCurrentEmailInput, setShowCurrentEmailInput] = useState(true);
  const [showCurrentOtpInput, setShowCurrentOtpInput] = useState(false);
  const [showNewEmailInput, setShowNewEmailInput] = useState(false);
  const [showNewOtpInput, setShowNewOtpInput] = useState(false);
  const [showResendOTP, setShowResendOTP] = useState(false);
  const [timer, setTimer] = useState(60); // Initial timer value
  const user = useSelector((state: any) => state.persisted.auth.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    // Start the countdown when showResendOTP becomes true
    if (showResendOTP && timer > 0) {
      const interval = setInterval(() => {
        setTimer((prevTimer) => prevTimer - 1);
      }, 1000);

      // Clear interval when timer reaches 0
      return () => clearInterval(interval);
    } else if (timer === 0) {
      // Reset timer and hide the resend option after 60 seconds
      setTimer(60);
      setShowResendOTP(false);
    }
  }, [showResendOTP, timer]);

  const handleGetOtp = async (email: string) => {
    try {
      const data = { email };
      const response = await axiosInstance
        .post('/api/auth/generateOtp', data);
      if (response) {
        toast.success("OTP Sent Successfully");
        setShowCurrentOtpInput(true);
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
    handleGetOtp(user.email); // Resend OTP when the button is clicked
  };

  const handleVerifyCurrentOtp = async () => {
    try {
      const data = { otp: currentOtp, email: user.email };
      const response = await axiosInstance
        .post('/api/auth/checkOTP', data);
      if (response.data.status) {
        toast.success("OTP Verified Successfully");
        setShowCurrentEmailInput(false);
        setShowCurrentOtpInput(false);
        setShowNewEmailInput(true);
      } else {
        toast.error("OTP Verification Failed");
      }
    } catch (error) {
      console.error("Error verifying OTP:", error);
      toast.error("OTP Verification Failed");
    }
  };

  const handleVerifyNewOtp = async () => {
    try {
      const data = { otp: newOtp, email: newEmail };
      const response = await axiosInstance 
        .post( '/api/auth/checkOTP', data);
      if (response.data.status) {
        toast.success("OTP Verified Successfully");
        // Proceed with updating the email address
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
        email: user.email,
        newEmail,
      };
      const response = await axiosInstance
        .post('/api/auth/updateEmail', data);
      if (response.data.status) {
        toast.success("Email Updated Successfully");

        // // Retrieve user data from local storage
        // const userData = localStorage.getItem("User");

        // if (userData) {
        //   const user = JSON.parse(userData);

        //   user.email = newEmail;

        //   localStorage.setItem("User", JSON.stringify(user));
        // }
        // Retrieve user data from local storage
        const userData = localStorage.getItem("User");

        if (userData) {
          // Parse the stored user data
          const user = JSON.parse(userData);

          // Update only the email field
          user.data.email = newEmail;

          // Update the email field in the existing user object in local storage
          localStorage.setItem("User", JSON.stringify(user));
        }

        dispatch(updateEmail(newEmail));
        navigate("/myProfile");
      } else {
        // const updatedUser = { ...user, email: newEmail };

        // localStorage.setItem("User", JSON.stringify(updatedUser));
        // dispatch(setUser(newEmail));

        toast.warn("Email Updating Failed");
      }
    } catch (error) {}
  };

  return (
    <div className="flex h-auto">
      <div className="w-1/2 max-w-md mx-auto bg-slate-300 rounded-lg shadow-lg p-6 mt-10">
        <br />
        <h2 className="text-2xl font-bold mb-4">Email Updation</h2>
        <br />

        {showCurrentEmailInput && (
          <div className="mb-4">
            <label
              htmlFor="currentEmail"
              className="block text-sm font-medium text-gray-700"
            >
              Enter Your Current Email
            </label>
            <input
              type="email"
              id="currentEmail"
              className="mt-1 p-2 w-full rounded-md border border-gray-300 focus:outline-none focus:border-blue-500"
              value={user.email}
              readOnly
            />
            <button
              onClick={() => {
                setShowCurrentOtpInput(true);
                handleGetOtp(user.email);
              }}
              className="text-base text-red-600 mt-1"
              disabled={showResendOTP && timer > 0} // Disable button when the timer is running
            >
              Get OTP
            </button>
          </div>
        )}

        {showCurrentOtpInput && (
          <div className="mb-4">
            <label
              htmlFor="currentOtp"
              className="block text-sm font-medium text-gray-700"
            >
              Enter OTP
            </label>
            <input
              type="text"
              id="currentOtp"
              className="mt-1 p-2 w-full rounded-md border border-gray-300 focus:outline-none focus:border-blue-500"
              value={currentOtp}
              onChange={(e) => setCurrentOtp(e.target.value)}
            />
            <button
              onClick={handleVerifyCurrentOtp}
              className="text-base text-red-600 mt-1"
            >
              Verify OTP
            </button>
          </div>
        )}

        {showNewEmailInput && (
          <div className="mb-4">
            <label
              htmlFor="newEmail"
              className="block text-sm font-medium text-gray-700"
            >
              Enter Your New Email
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
                handleGetOtp(newEmail);
              }}
              className="text-base text-red-600 mt-1"
              disabled={showResendOTP && timer > 0} // Disable button when the timer is running
            >
              Get OTP
            </button>
          </div>
        )}

        {showNewOtpInput && (
          <div className="mb-4">
            <label
              htmlFor="newOtp"
              className="block text-sm font-medium text-gray-700"
            >
              Enter OTP for New Email
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

        <div>
          <button
            onClick={handleUpdateEmail}
            className="w-full bg-cyan-950 text-white py-2 rounded-md hover:bg-cyan-800 transition duration-300"
            disabled={!showNewOtpInput} // Disable button if new OTP input is not shown
          >
            Update Email
          </button>
        </div>

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
  );
};

export default UpdateEmailComponent;
