

import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../AxiosConfig/axiosInstance";
import { toast } from "react-toastify";

const Otp = () => {
  const [otp, setOtp] = useState(['', '', '', '']);
  const [resendEnabled, setResendEnabled] = useState(false);
  const [countdown, setCountdown] = useState(60);
  const navigate = useNavigate();
  const [error, setError] = useState<string>("");

  useEffect(() => {
    if (countdown > 0) {
      const timer = setInterval(() => {
        setCountdown((prevCountdown) => prevCountdown - 1);
      }, 1000);
      return () => clearInterval(timer);
    } else {
      setResendEnabled(true);
    }
  }, [countdown]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const { value } = e.target;
    if (/^[0-9]$/.test(value) || value === '') {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);
    }
  };

  const handleVerify = async () => {
    try {
      const enteredOtp = otp.join('');
      const response = await axiosInstance.post("/api/auth/verifyOtp", {
        enteredOtp: enteredOtp
      });

      if (response.data && response.data.status)  {
        localStorage.removeItem("userEmail");
        navigate("/login");
        toast.success('Registration Completed')
      } else {
        setError("User registration failed");
        toast.error("OTP verification failed");
      }
    } catch (error) {
      console.error("Error verifying OTP:", error);
      setError("An error occurred during OTP verification");
      toast.error("An error occurred during OTP verification");
    }
  };

  const handleResend = async () => {
    try {
      const email = localStorage.getItem("userEmail");
      const data = { email };

      const response = await axiosInstance.post("/api/auth/generateOtp", data);
      if (response) {
        toast.success("OTP Resent Successfully");
      } else {
        toast.error("Failed to Send OTP");
      }
    } catch (error) {
      console.error("Error sending OTP:", error);
      toast.error("Failed to Send OTP");
    }
    setCountdown(60);
    setResendEnabled(false);
  };

  return (
    <div className="flex flex-col items-center justify-center ">
      <div className="bg-slate-200 p-8 rounded shadow-md w-80">
        <h2 className="text-xl font-bold mb-4 text-center">Enter OTP</h2>
        <p className="text-gray-600 mb-6 text-center">
          We have sent a verification code to your Email
        </p>
        <div className="flex justify-center mb-4">
          {otp.map((digit, index) => (
            <input
              key={index}
              type="text"
              maxLength={1}
              value={digit}
              onChange={(e) => handleChange(e, index)}
              className="w-10 h-10 m-2 text-center text-xl border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-cyan-900"
            />
          ))}
        </div>
        <button
          onClick={handleVerify}
          className="w-full py-2 bg-cyan-900 text-white rounded hover:bg-cyan-950 transition-colors"
        >
          Verify
        </button>
        {error && <p className="text-red-500 mt-2 text-center">{error}</p>}
        <div className="mt-4 text-center">
          {countdown > 0 ? (
            <p className="text-gray-600">Resend Code in {countdown}s</p>
          ) : (
            <button
              onClick={handleResend}
              disabled={!resendEnabled}
              className="text-purple-600 underline hover:text-purple-700 focus:outline-none"
            >
              Resend Code
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Otp;
 