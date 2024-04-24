import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axiosInstance from "../../AxiosConfig/axiosInstance";

const ChangePassword = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [showSendOTPButton, setShowSendOTPButton] = useState(true);
  const [showOTPField, setShowOTPField] = useState(false);
  const [otp, setOTP] = useState("");
  const [showPasswordFields, setShowPasswordFields] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [verified, setVerified] = useState(false);
  const handleSendOTP = async () => {
    const data = {
      email: email,
    };
    const response = await axiosInstance.post("/api/auth/generateOtp", data);
    if (response.data.status) {
      toast.success("OTP Sent Successfully");
    } else {
      toast.warn("OTP Sent Failed");
    }

    setShowSendOTPButton(false);
    setShowOTPField(true);
  };

  const handleVerifyOTP = async () => {
    const data = {
      otp,
      email,
    };

    try {
      const response = await axiosInstance.post("/api/auth/checkOTP", data);

      if (response.data.status) {
        toast.success("OTP Verified");
        setShowPasswordFields(true); // Show password fields after OTP verification
        setVerified(true);
      } else {
        toast.warn(response.data.data);
      }
    } catch (error) {
      console.error("Error verifying OTP:", error);
      toast.error("An error occurred while verifying OTP");
    }
  };

  const handleSavePassword = async () => {
    try {
      if (newPassword !== confirmPassword) {
        toast.warn("Please enter the correct password");
      } else {
        const data = {
          email,
          currentPassword,
          newPassword,
        };
        const response = await axiosInstance.post(
          "/api/auth/changePassword",
          data
        );
        if (response) {
          toast.success("Password Changed ");
          navigate("/myprofile");
        }
      }
    } catch (error) {
      console.log(error, "error in password changing");
    }
  };

  return (
    <div className="flex flex-auto p-10 justify-center">
      <div className="w-1/2 items-end pl-10 pt-10 border-r border-gray-200">
        <img src="/imgs/Tiny people carrying key to open padlock.jpg" alt="" />
      </div>

      <div className="w-1/2 pl-10 ">
        <section className="bg-white">
          <div className="flex flex-col items-start justify-center mx-auto md:h-screen lg:py-0">
            <div className="w-full p-6 bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md dark:bg-cyan-950 dark:border-gray-700 sm:p-8">
              <h2 className="mb-1 text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                Change Password
              </h2>
              <form className="mt-4 space-y-4 lg:mt-5 md:space-y-5" action="#">
                <div>
                  <label
                    htmlFor="email"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Your email
                  </label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-cyan-900 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="example@gmail.com"
                    required
                    disabled={verified} // Set disabled attribute based on the verified state
                  />
                </div>
                {showSendOTPButton && (
                  <button
                    disabled={verified} // Set disabled attribute based on the verified state
                    type="button"
                    className="w-full text-white bg-cyan-800 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                    onClick={handleSendOTP}
                  >
                    Send OTP
                  </button>
                )}
                {showOTPField && (
                  <>
                    <div>
                      <label
                        htmlFor="otp"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >
                        Enter OTP
                      </label>
                      <input
                        type="text"
                        name="otp"
                        id="otp"
                        value={otp}
                        onChange={(e) => setOTP(e.target.value)}
                        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-cyan-900 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="****"
                        minLength={4}
                        maxLength={4}
                        required
                        disabled={verified} // Set disabled attribute based on the verified state
                      />
                    </div>
                    <button
                      type="button"
                      className="w-full text-white bg-cyan-800 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                      onClick={handleVerifyOTP}
                    >
                      Verify OTP
                    </button>
                  </>
                )}
                {showPasswordFields && ( // Conditionally render password fields
                  <>
                    <div>
                      <label
                        htmlFor="currentPassword"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >
                        Current Password
                      </label>
                      <input
                        type="password"
                        name="currentPassword"
                        id="currentPassword"
                        value={currentPassword}
                        onChange={(e) => setCurrentPassword(e.target.value)}
                        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-cyan-900 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="Enter new current password"
                        required
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="newPassword"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >
                        New Password
                      </label>
                      <input
                        type="password"
                        name="newPassword"
                        id="newPassword"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-cyan-900 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="Enter new password"
                        required
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="confirmPassword"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >
                        Confirm Password
                      </label>
                      <input
                        type="password"
                        name="confirmPassword"
                        id="confirmPassword"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-cyan-900 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="Confirm new password"
                        required
                      />
                    </div>
                    <button
                      type="button"
                      className="w-full text-white bg-cyan-800 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                      onClick={handleSavePassword}
                    >
                      Save New Password
                    </button>
                  </>
                )}
              </form>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default ChangePassword;
