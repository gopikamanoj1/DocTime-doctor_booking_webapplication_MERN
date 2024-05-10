

import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { GoogleLogin, GoogleOAuthProvider } from '@react-oauth/google';
import {clearDoctor,setDoctor  } from '../../Redux/slices/doctorAuthSlice';
import { useSelector, useDispatch } from 'react-redux';
import axiosInstance from '../../AxiosConfig/axiosInstance';
import { toast } from "react-toastify";



const DoctorRegister: React.FC = () => {

  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [cpassword, setCpassword] = useState<string>("");
  const [errors, setErrors] = useState<{[key: string]: string}>({});
  const dispatch = useDispatch();
  const Doctor = useSelector((state:any)=>state.persisted.doctorAuth);
  const navigate = useNavigate(); 



  const handleRegister = async (event: React.FormEvent) => {
    event.preventDefault();

    const errorsObj: {[key: string]: string} = {};

    if (name.trim() === "") {
      errorsObj.name = "Name cannot be empty";
    }
    if (email.trim() === "") {
      errorsObj.email = "Email cannot be empty";
    }
    if (password.trim() === "") {
      errorsObj.password = "Password cannot be empty";
    }
    if (cpassword.trim() === "") {
      errorsObj.cpassword = "Confirm password cannot be empty";
    }
    if (password.trim() !== cpassword.trim()) {
      errorsObj.cpassword = "Passwords do not match";
    }

    if (Object.keys(errorsObj).length > 0) {
      setErrors(errorsObj);
      return;
    }

    // Clear errors if there are no validation errors
    setErrors({});

    const data = {
      name: name,
      email: email,
      password: password,
    };

    try {
      const response = await axiosInstance.post('/api/auth/doctorRegister', data);
  
      console.log(response.data, 'this is response');
  
      // Check if registration is successful and then navigate
      if (response.data && response.data.status) {
        localStorage.removeItem("doctorEmail");
        navigate('/doctorVerifyOtp');
        localStorage.setItem("DoctorEmail", email);

      }  else {
        toast.warn(response.data.message);
      }
      setTimeout(() => {
        setErrors({});
      }, 5000);
  
    } catch (error) {
      console.error("Error during registration:", error);
      // setError("User registration failed");
      setErrors({ registration: "User registration failed" });
    }
  };
  
  const handleGoogleSignIn = () => {
    try {
      // Open the Google authentication window
      window.open("http://localhost:3000/api/auth/google", "_blank", "width=600,height=600");
    } catch (error) {
      console.error("Error during Google Sign-In:", error);
      // setError("Google Sign-In failed");
      setErrors({ googleSignIn: "Google Sign-In failed" });
    }
  };
  
  return (
    <>
      <GoogleOAuthProvider clientId='39339182818-5i8mc5be6q31kap48eqrc5p4ik1bnrma.apps.googleusercontent.com'>
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
          <div className="bg-white p-8 rounded shadow-md max-w-md w-full">
            <h2 className="text-3xl font-semibold mb-6 text-center">Doctor Register</h2>
            <form className="space-y-4" onSubmit={handleRegister}>
              <div>
                <label className="block text-sm font-medium text-gray-700">Name</label>
                <input
                  type="name" 
                  className="mt-1 p-2 w-full rounded-md border border-gray-300 focus:outline-none  focus:border-blue-500"
                  placeholder="Dr.name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
                {errors.name && <p className="text-red-600">{errors.name}</p>}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Email</label>
                <input
                  type="email"
                  className="mt-1 p-2 w-full rounded-md border border-gray-300 focus:outline-none focus:border-blue-500"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                {errors.email && <p className="text-red-600">{errors.email}</p>}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Password</label>
                <input
                  type="password"
                  className="mt-1 p-2 w-full rounded-md border border-gray-300 focus:outline-none focus:border-blue-500"
                  placeholder="********"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                {errors.password && <p className="text-red-600">{errors.password}</p>}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Confirm Password</label>
                <input
                  type="password"
                  className="mt-1 p-2 w-full rounded-md border border-gray-300 focus:outline-none focus:border-blue-500"
                  placeholder="********"
                  value={cpassword}
                  onChange={(e) => setCpassword(e.target.value)}
                />
                {errors.cpassword && <p className="text-red-600">{errors.cpassword}</p>}
              </div>
              <button
                type="submit"
                className="w-full bg-sky-950 text-white py-2 rounded-md hover:bg-sky-900 transition duration-300"
              >
                Register
              </button>
              {/* <div id='signInButton'>
                <GoogleLogin
                  type='standard'
                  // theme='filled_white'
                  size='large'
                  onSuccess={response => {
                    axiosInstance.post('/google', response)
                      .then((res) => {
                        console.log(res, 'google @')
                        if (res.data.message) {
                          dispatch(setDoctor(res.data.userData));
                          // toast.success(res.data.message);
                          navigate('/home');
                        }
                      })
                      .catch((error) => {
                        console.log(error);
                        // toast.error(error.response.data.error);
                      });
                  }}
                />
              </div> */}
              {/* Error message */}
              {errors.registration && <p className="text-red-600">{errors.registration}</p>}
              {errors.googleSignIn && <p className="text-red-600">{errors.googleSignIn}</p>}
              <p className="text-sm text-gray-600 mt-2">
                Already have an account?{' '}
                <Link to='/doctorLogin' className="text-sky-900 hover:underline">
                  Sign in
                </Link>
              </p>
            </form>
          </div>
        </div>
      </GoogleOAuthProvider>
    </>
  );
};

export default DoctorRegister;
  