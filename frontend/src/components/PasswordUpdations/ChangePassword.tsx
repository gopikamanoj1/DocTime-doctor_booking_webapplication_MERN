import { useState } from "react";
import { toast } from "react-toastify";
import axiosInstance from "../../AxiosConfig/axiosInstance";
import { useNavigate } from "react-router-dom";

const ChangePassword = () => {
    const navigate=useNavigate()
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const patientProfileData = JSON.parse(localStorage.getItem("User") || "{}");
  const storedEmail = patientProfileData.data.email;
  const handleChangePassword = async () => {
    try {
      if (!currentPassword) {
        toast.warn("Please enter your current password");
      } else if (newPassword !== confirmPassword) {
        toast.warn("New Password and Confirm Password is not matching ");
      }
      const data = {
        currentPassword,
        newPassword,
        email: storedEmail,
      };
      const response = await axiosInstance.post(
        "/api/auth/changePassword",
        data
      );
      if (response.data.status) {
        toast.success(response.data.data)
        navigate('/myprofile')
        console.log(response);
      }else if(response.data.status===false){
            toast.warn(response.data.data)
      }
    } catch (error) {}
  };

  return (
    <div className="min-w-screen min-h-screen flex items-center justify-center px-5 py-5">
      <div
        className="bg text-gray-500 rounded-3xl shadow-xl w-full overflow-hidden"
        style={{ maxWidth: "1000px" }}
      >
        <div className="md:flex w-full">
          <div className="hidden md:block w-1/2 bg-500 py-10 px-10">
            {/* Add any desired SVG or graphical design here */}
            <img
              src="/imgs/Tiny people carrying key to open padlock.jpg"
              alt=""
            />
          </div>

          <div className="w-full md:w-1/2 py-10 px-5 md:px-10">
            <div className="text-center mb-10">
              <h1 className="font-bold text-xl text-gray-900">
                CHANGE PASSWORD
              </h1>
              <p>Update your password to keep your account secure</p>
            </div>

            <div>
              {/* Current Password */}
              <div className="w-full px-3 mb-5">
                <label className="text-xs font-semibold px-1">
                  Current Password
                </label>
                <div className="flex">
                  <div className="w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center">
                    <i className="mdi mdi-lock-outline text-gray-400 text-lg"></i>
                  </div>
                  <input
                    type="password"
                    className="w-full -ml-10 pl-10 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-indigo-500"
                    placeholder="Current password"
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                  />
                </div>
              </div>

              {/* New Password */}
              <div className="w-full px-3 mb-5">
                <label className="text-xs font-semibold px-1">
                  New Password
                </label>
                <div className="flex">
                  <div className="w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center">
                    <i className="mdi mdi-lock-outline text-gray-400 text-lg"></i>
                  </div>
                  <input
                    type="password"
                    className="w-full -ml-10 pl-10 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-indigo-500"
                    placeholder="New password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                  />
                </div>
              </div>

              {/* Confirm Password */}
              <div className="w-full px-3 mb-5">
                <label className="text-xs font-semibold px-1">
                  Confirm Password
                </label>
                <div className="flex">
                  <div className="w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center">
                    <i className="mdi mdi-lock-outline text-gray-400 text-lg"></i>
                  </div>
                  <input
                    type="password"
                    className="w-full -ml-10 pl-10 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-indigo-500"
                    placeholder="Confirm new password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                </div>
              </div>

              {/* Change Password Button */}
              <div className="w-full px-3 mb-5">
                <button
                  onClick={handleChangePassword}
                  className="block w-full max-w-xs mx-auto bg-cyan-950 hover:bg-cyan-800  text-white rounded-lg px-3 py-3 font-semibold"
                >
                  CHANGE PASSWORD
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChangePassword;
