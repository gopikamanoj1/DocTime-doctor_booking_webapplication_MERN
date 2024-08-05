// import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import { toast } from "react-toastify";
// import axiosInstance from "../../AxiosConfig/axiosInstance";

// const ForgotPasswordForDoc = () => {
//   const navigate = useNavigate();
//   const [email, setEmail] = useState("");
//   const [showSendOTPButton, setShowSendOTPButton] = useState(true);
//   const [showOTPField, setShowOTPField] = useState(false);
//   const [otp, setOTP] = useState("");
//   const [showPasswordFields, setShowPasswordFields] = useState(false);
//   const [newPassword, setNewPassword] = useState("");
//   const [confirmPassword, setConfirmPassword] = useState("");
//   const [verified, setVerified] = useState(false);
//   const [countdown, setCountdown] = useState(60); // Countdown for OTP timer in seconds
//   const [resendDisabled, setResendDisabled] = useState(true);

//   useEffect(() => {
//     if (showOTPField) {
//       const interval = setInterval(() => {
//         if (countdown > 0) {
//           setCountdown((prev) => prev - 1);
//         } else {
//           clearInterval(interval);
//           setResendDisabled(false); // Enable resend button when countdown reaches zero
//         }
//       }, 1000);

//       return () => clearInterval(interval); // Cleanup interval on component unmount
//     }
//   }, [showOTPField, countdown]);

//   const handleSendOTP = async () => {
//     const data = {
//       email: email,
//     };
//     const response = await axiosInstance.post("/api/auth/generateOtp", data);
//     if (response.data.status) {
//       toast.success("OTP Sent Successfully");
//       setCountdown(60); // Reset countdown timer when OTP is sent
//     } else {
//       toast.warn("OTP Sent Failed");
//     }

//     setShowSendOTPButton(false);
//     setShowOTPField(true);
//     setResendDisabled(true); // Disable resend button after OTP is sent
//   };

//   const handleVerifyOTP = async () => {
//     const data = {
//       otp,
//       email,
//     };

//     try {
//       const response = await axiosInstance.post("/api/auth/checkOTP", data);

//       if (response.data.status) {
//         toast.success("OTP Verified");
//         setShowPasswordFields(true); // Show password fields after OTP verification
//         setVerified(true);
//         setCountdown(0); // Stop countdown when OTP is verified
//       } else {
//         toast.warn(response.data.data);
//       }
//     } catch (error) {
//       console.error("Error verifying OTP:", error);
//       toast.error("An error occurred while verifying OTP");
//     }
//   };

//   const handleResendOTP = () => {
//     handleSendOTP(); // Resend OTP and reset the countdown
//   };

//   const handleSavePassword = async () => {
//     try {
//       if (newPassword !== confirmPassword) {
//         toast.warn("Please enter the correct password");
//       } else {
//         const data = {
//           email,
//           newPassword,
//         };
//         const response = await axiosInstance.post(
//           "/api/auth/forgotPasswordForDoc",
//           data
//         );
//         console.log(response,"change password ");
//         if (response.data.status) {
//           toast.success("Password Changed ");
//           navigate("/doctorLogin");
//         }else if ( response.data.status===false){
//           toast.error(" password updation failed")
//         }
//       }
//     } catch (error) {
//       console.log(error, "error in password changing");
//     }
//   };

//   return (
//     <div className="flex flex-auto p-10 justify-center">
//       <div className="w-full">
//         <section className="bg-white">
//           <div className="flex justify-center mx-auto md:h-screen lg:py-0">
//             <div className="w-full p-6 bg-slate-300 rounded-lg shadow md:mt-0 sm:max-w-md sm:p-8">
//               <h2 className="mb-1 text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
//                 Forgot Password
//               </h2>
//               <form className="mt-4 space-y-4 lg:mt-5 md:space-y-5" action="#">
//                 <div>
//                   <label
//                     htmlFor="email"
//                     className="block mb-2 text-sm font-medium text-gray-500"
//                   >
//                     Your email
//                   </label>
//                   <input
//                     type="email"
//                     name="email"
//                     id="email"
//                     value={email}
//                     onChange={(e) => setEmail(e.target.value)}
//                     className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
//                     placeholder="example@gmail.com"
//                     required
//                     disabled={verified} // Set disabled attribute based on the verified state
//                   />
//                 </div>
//                 {showSendOTPButton && (
//                   <button
//                     disabled={verified} // Set disabled attribute based on the verified state
//                     type="button"
//                     className="w-full text-white bg-cyan-800 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
//                     onClick={handleSendOTP}
//                   >
//                     Send OTP
//                   </button>
//                 )}
//                 {showOTPField && (
//                   <>
//                     <div>
//                       <label
//                         htmlFor="otp"
//                         className="block mb-2 text-sm font-medium text-gray-500"
//                       >
//                         Enter OTP  <p className=" text-red-800  ">(Countdown: {countdown}s)</p>
//                       </label>
//                       <input
//                         type="text"
//                         name="otp"
//                         id="otp"
//                         value={otp}
//                         onChange={(e) => setOTP(e.target.value)}
//                         className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
//                         placeholder="****"
//                         minLength={4}
//                         maxLength={4}
//                         required
//                         disabled={verified} // Set disabled attribute based on the verified state
//                       />
//                     </div>
//                     <button
//                       type="button"
//                       className="w-full text-white bg-cyan-800 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
//                       onClick={handleVerifyOTP}
//                     >
//                       Verify OTP
//                     </button>
//                     {!resendDisabled && (
//                       <button
//                         type="button"
//                         className="text-red-500 underline hover:red-blue-700 focus:outline-none" // Makes it look like a link
//                         onClick={handleResendOTP}
//                       >
//                         Resend OTP
//                       </button>
//                     )}
//                   </>
//                 )}
//                 {showPasswordFields && ( // Conditionally render password fields
//                   <>
                   
//                     <div>
//                       <label
//                         htmlFor="newPassword"
//                         className="block mb-2 text-sm font-medium text-gray-500"
//                       >
//                         New Password
//                       </label>
//                       <input
//                         type="password"
//                         name="newPassword"
//                         id="newPassword"
//                         value={newPassword}
//                         onChange={(e) => setNewPassword(e.target.value)}
//                         className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
//                         placeholder="Enter new password"
//                         required
//                       />
//                     </div>
//                     <div>
//                       <label
//                         htmlFor="confirmPassword"
//                         className="block mb-2 text-sm font-medium text-gray-500"
//                       >
//                         Confirm Password
//                       </label>
//                       <input
//                         type="password"
//                         name="confirmPassword"
//                         id="confirmPassword"
//                         value={confirmPassword}
//                         onChange={(e) => setConfirmPassword(e.target.value)}
//                         className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
//                         placeholder="Confirm new password"
//                         required
//                       />
//                     </div>
//                     <button
//                       type="button"
//                       className="w-full text-white bg-cyan-800 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
//                       onClick={handleSavePassword}
//                     >
//                       Save New Password
//                     </button>
//                   </>
//                 )}
//               </form>
//             </div>
//           </div>
//         </section>
//       </div>
//     </div>
//   );
// };

// export default ForgotPasswordForDoc;














import  { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axiosInstance from "../../AxiosConfig/axiosInstance";

const ForgotPasswordForDoc = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [showSendOTPButton, setShowSendOTPButton] = useState(true);
  const [showOTPField, setShowOTPField] = useState(false);
  const [otp, setOTP] = useState("");
  const [showPasswordFields, setShowPasswordFields] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [verified, setVerified] = useState(false);
  const [countdown, setCountdown] = useState(60); // Countdown for OTP timer in seconds
  const [resendDisabled, setResendDisabled] = useState(true);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let interval:any;
    if (showOTPField) {
      interval = setInterval(() => {
        if (countdown > 0) {
          setCountdown((prev) => prev - 1);
        } else {
          clearInterval(interval);
          setResendDisabled(false); // Enable resend button when countdown reaches zero
        }
      }, 1000);
    }
    return () => clearInterval(interval); // Cleanup interval on component unmount
  }, [showOTPField, countdown]);

  const handleSendOTP = async () => {
    if (!email) {
      toast.warn("Please enter your email");
      return;
    }
    setLoading(true);
    try {
      const data = { email };
      const response = await axiosInstance.post("/api/auth/generateOtp", data);
      if (response.data.status) {
        toast.success("OTP Sent Successfully");
        setCountdown(60); // Reset countdown timer when OTP is sent
        setShowSendOTPButton(false);
        setShowOTPField(true);
        setResendDisabled(true); // Disable resend button after OTP is sent
      } else {
        toast.warn("OTP Sent Failed");
      }
    } catch (error) {
      toast.error("An error occurred while sending OTP");
    }
    setLoading(false);
  };

  const handleVerifyOTP = async () => {
    if (!otp) {
      toast.warn("Please enter the OTP");
      return;
    }
    setLoading(true);
    try {
      const data = { otp, email };
      const response = await axiosInstance.post("/api/auth/checkOTP", data);
      if (response.data.status) {
        toast.success("OTP Verified");
        setShowPasswordFields(true); // Show password fields after OTP verification
        setVerified(true);
        setCountdown(0); // Stop countdown when OTP is verified
      } else {
        toast.warn(response.data.data);
      }
    } catch (error) {
      toast.error("An error occurred while verifying OTP");
    }
    setLoading(false);
  };

  const handleResendOTP = async () => {
    if (!resendDisabled) {
      await handleSendOTP(); // Resend OTP and reset the countdown
    }
  };

  const handleSavePassword = async () => {
    if (!newPassword || !confirmPassword) {
      toast.warn("Please fill in both password fields");
      return;
    }
    if (newPassword !== confirmPassword) {
      toast.warn("Passwords do not match");
      return;
    }
    setLoading(true);
    try {
      const data = { email, newPassword };
      const response = await axiosInstance.post("/api/auth/forgotPasswordForDoc", data);
      if (response.data.status) {
        toast.success("Password Changed Successfully");
        navigate("/doctorLogin");
      } else {
        toast.error("Password update failed");
      }
    } catch (error) {
      toast.error("An error occurred while changing the password");
    }
    setLoading(false);
  };

  return (
    <div className="flex flex-auto p-10 justify-center">
      <div className="w-full">
        <section className="bg-white">
          <div className="flex justify-center mx-auto md:h-screen lg:py-0">
            <div className="w-full p-6 bg-slate-300 rounded-lg shadow md:mt-0 sm:max-w-md sm:p-8">
              <h2 className="mb-1 text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
                Forgot Password
              </h2>
              <form className="mt-4 space-y-4 lg:mt-5 md:space-y-5" action="#">
                <div>
                  <label
                    htmlFor="email"
                    className="block mb-2 text-sm font-medium text-gray-500"
                  >
                    Your email
                  </label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                    placeholder="example@gmail.com"
                    required
                    disabled={verified} // Set disabled attribute based on the verified state
                  />
                </div>
                {showSendOTPButton && (
                  <button
                    disabled={loading || verified} // Disable button during loading or if verified
                    type="button"
                    className="w-full text-white bg-cyan-800 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                    onClick={handleSendOTP}
                  >
                    {loading ? "Sending OTP..." : "Send OTP"}
                  </button>
                )}
                {showOTPField && (
                  <>
                    <div>
                      <label
                        htmlFor="otp"
                        className="block mb-2 text-sm font-medium text-gray-500"
                      >
                        Enter OTP <p className="text-red-800">(Countdown: {countdown}s)</p>
                      </label>
                      <input
                        type="text"
                        name="otp"
                        id="otp"
                        value={otp}
                        onChange={(e) => setOTP(e.target.value)}
                        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
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
                      disabled={loading || verified} // Disable button during loading or if verified
                    >
                      {loading ? "Verifying OTP..." : "Verify OTP"}
                    </button>
                    {!resendDisabled || !verified && (
                      <button
                        type="button"
                        className="text-red-500 underline hover:text-blue-700 focus:outline-none" // Makes it look like a link
                        onClick={handleResendOTP}
                        disabled={loading} // Disable button during loading
                      >
                        Resend OTP
                      </button>
                    )}
                  </>
                )}
                {showPasswordFields && ( // Conditionally render password fields
                  <>
                    <div>
                      <label
                        htmlFor="newPassword"
                        className="block mb-2 text-sm font-medium text-gray-500"
                      >
                        New Password
                      </label>
                      <input
                        type="password"
                        name="newPassword"
                        id="newPassword"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                        placeholder="Enter new password"
                        required
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="confirmPassword"
                        className="block mb-2 text-sm font-medium text-gray-500"
                      >
                        Confirm Password
                      </label>
                      <input
                        type="password"
                        name="confirmPassword"
                        id="confirmPassword"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                        placeholder="Confirm new password"
                        required
                      />
                    </div>
                    <button
                      type="button"
                      className="w-full text-white bg-cyan-800 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                      onClick={handleSavePassword}
                      disabled={loading} // Disable button during loading
                    >
                      {loading ? "Saving Password..." : "Save New Password"}
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

export default ForgotPasswordForDoc;
