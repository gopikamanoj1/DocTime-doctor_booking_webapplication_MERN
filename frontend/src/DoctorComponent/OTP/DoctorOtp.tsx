// import React, { useState, useRef } from 'react';
// import './Otp.css';
// import {  useNavigate } from 'react-router-dom';
// import axiosInstance from '../../AxiosConfig/axiosInstance';
// import { toast } from "react-toastify";

// function DoctorOtp() {
//   const [enteredOtp, setEnteredOtp] = useState('');
//   const inputRefs = [
//     useRef<HTMLInputElement>(null),
//     useRef<HTMLInputElement>(null),
//     useRef<HTMLInputElement>(null),
//     useRef<HTMLInputElement>(null),
//   ];
//   const [error, setError] = useState<string>("");
//   const navigate = useNavigate(); 



//   const handleInputChange = (index: number, value: string) => {
//     // Handle input change and move to the next input field
//     if (value) {
//       setEnteredOtp((prevOtp) => prevOtp + value);
//     }

//     if (index < inputRefs.length - 1) {
//       inputRefs[index + 1].current?.focus();
//     }
//   };

//   const handleGetOtp = async () => {
//     try {
//       const email = localStorage.getItem("doctorEmail");
//       const data = {
//         email,
//       };
//       const response = await axiosInstance.post("/api/auth/generateOtp", data);
//       if (response) {
//         toast.success("OTP Sent Successfully");
//       } else {
//         toast.error("Failed to Send OTP");
//       }
//     } catch (error) {
//       console.error("Error sending OTP:", error);
//       toast.error("Failed to Send OTP");
//     }
//   };
//   const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
//     // Handle backspace to remove the last entered digit
//     if (e.key === 'Backspace' && index > 0) {
//       const currentInput = inputRefs[index].current;
//       const previousInput = inputRefs[index - 1].current;

//       // If the current input is empty, remove the digit from the previous input
//       if (currentInput && previousInput && !currentInput.value) {
//         setEnteredOtp((prevOtp) => prevOtp.slice(0, -1));
//         previousInput.focus();
//       }
//     }
//   };

//   const handleVerify = async () => {
//     try {
//       const response = await axiosInstance.post('/api/auth/doctorVerifyOtp', {
//         enteredOtp: enteredOtp,
//       });

//       // Handle the response from the backend
//       console.log(response.data);
//       if (response.data && response.data.status) {
//         localStorage.removeItem("doctorEmail");
//         navigate('/doctorLogin');
//       } else {
//         setError("User registration failed");
//       }
//     } catch (error) {
//       console.error('Error verifying OTP:', error);
//     }
//   };



//   return (
//     <div className='otpDiv'>
//       <form className="otp-Form">
//         <span className="mainHeading">Enter OTP</span>
//         <p className="otpSubheading">We have sent a verification code to your Email</p>
//         <div className="inputContainer">
//           {[0, 1, 2, 3].map((index) => (
//             <input
//               key={index}
//               ref={inputRefs[index]}
//               required
//               maxLength={1}
//               type="text"
//               className="otp-input"
//               onChange={(e) => handleInputChange(index, e.target.value)}
//               onKeyDown={(e) => handleKeyDown(index, e)}
//             />
//           ))}
//         </div>
//         <button type="button" className="verifyButton" onClick={handleVerify}>
//           Verify
//         </button>
//         <button className="exitBtn">×</button>
//         <p className="resendNote">
//           Didn't receive the code? <button onClick={handleGetOtp} className="resendBtn">Resend Code</button>
//         </p>
//       </form>
//     </div>
//   );
// }

// export default DoctorOtp;







import React, { useState, useEffect } from 'react';

const DoctorOtp = () => {
  const [otp, setOtp] = useState(['', '', '', '']);
  const [resendEnabled, setResendEnabled] = useState(false);
  const [countdown, setCountdown] = useState(60);

  useEffect(() => {
    if (countdown > 0) {
      const timer = setInterval(() => {
        setCountdown(countdown - 1);
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

  const handleVerify = () => {
    // Add your OTP verification logic here
    console.log('OTP entered:', otp.join(''));
  };

  const handleResend = () => {
    // Add your OTP resend logic here
    setCountdown(60);
    setResendEnabled(false);
    console.log('OTP resent');
  };

  return (
    <div className="flex flex-col items-center justify-center  h-96 ">
      <div className="bg-slate-200 p-8 rounded shadow-md w-80">
        <h2 className="text-xl font-bold mb-4 text-center">Enter OTP</h2>
        <p className="text-gray-600 mb-6 text-center">We have sent a verification code to your Email</p>
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

export default DoctorOtp;

