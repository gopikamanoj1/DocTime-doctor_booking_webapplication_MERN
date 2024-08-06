

import  { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axiosInstance from "../../AxiosConfig/axiosInstance";
import { toast } from "react-toastify";
import Loading from "../../Loading/Loading";
const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [cpassword, setCpassword] = useState("");
  const [nameError, setNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [cpasswordError, setCpasswordError] = useState("");
  const [isLoading, setIsLoading] = useState(false); // Loading state

  const navigate = useNavigate();

  const clearValidationErrors = () => {
    setTimeout(() => {
      setNameError("");
      setEmailError("");
      setPasswordError("");
      setCpasswordError("");
    }, 3000); 
  };

  const validate = () => {
    let isValid = true;

    if (name.trim() === "") {
      setNameError("Name is required");
      isValid = false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (email.trim() === "" || !emailRegex.test(email)) {
      setEmailError("Valid email is required");
      isValid = false;
    }

    if (password.trim() === "") {
      setPasswordError("Password is required");
      isValid = false;
    }

    if (cpassword !== password) {
      setCpasswordError("Passwords do not match");
      isValid = false;
    }

    if (!isValid) {
      clearValidationErrors();
    }

    return isValid;
  };

  const handleRegister = async () => {
    if (!validate()) {
      return; // Exit if validation fails
    }
    // Start the loading when registration begins
    setIsLoading(true);
    try {
      const data = {
        name,
        email,
        password,
      };
      const response = await axiosInstance.post("/api/auth/register", data);

      if (response.data && response.data.status) {
        // Navigation happens after successful registration
        navigate('/verifyOtp');
        localStorage.removeItem("userEmail");

        localStorage.setItem("userEmail", email);

      } else {
        toast.warn(response.data.data);
        setIsLoading(false); // Stop loading if registration fails
      }
    } catch (err) {
      console.error('Error during registration:', err);
      toast.error('User registration failed');
      setIsLoading(false); // Stop loading on error
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
      <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-md">
        <h1 className="text-2xl font-bold text-center mb-4">
          Patient Registration Form
        </h1>

        <form
          className="flex flex-col gap-4"
          onSubmit={(e) => {
            e.preventDefault();
            handleRegister(); // Trigger registration when submitting
          }}
        >
          {/* Form fields for name, email, password, confirm password */}
          <div>
            <label className="block text-sm font-semibold">Name</label>
            <input
              className="w-full p-2 mt-1 border border-gray-300 rounded-lg focus:border-indigo-500"
              type="text"
              placeholder="Enter your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            {nameError && (
              <p className="text-red-600 text-sm mt-1">{nameError}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-semibold">Email</label>
            <input
              className="w-full p-2 mt-1 border border-gray-300 rounded-lg focus:border-indigo-500"
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            {emailError && (
              <p className="text-red-600 text-sm mt-1">{emailError}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-semibold">Password</label>
            <input
              className="w-full p-2 mt-1 border border-gray-300 rounded-lg focus:border-indigo-500"
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}

            />
            {passwordError && (
              <p className="text-red-600 text-sm mt-1">{passwordError}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-semibold">Confirm Password</label>
            <input
              className="w-full p-2 mt-1 border border-gray-300 rounded-lg focus:border-indigo-500"
              type="password"
              placeholder="Confirm your password"
              value={cpassword}
              onChange={(e) => setCpassword(e.target.value)}
            />
            {cpasswordError && (
              <p className="text-red-600 text-sm mt-1">{cpasswordError}</p>
            )}
          </div>

          <button
            type="submit"
            className={`w-full p-3 bg-cyan-800 text-white rounded-lg hover:bg-cyan-800  ${isLoading ? 'opacity-1 ' : ''}`} // Apply opacity to indicate loading
            disabled={isLoading} // Disable button when loading
          >
            {isLoading ? (
              <div className="flex items-center justify-center">
                <Loading /> 
              
              </div>
            ) : (
              'Submit & Send OTP' // Button text when not loading
            )}
          </button>
        </form>

        <p className="mt-6 text-center text-sm">
          Already have an account?{" "}
          <Link className="text-indigo-600 hover:underline" to="/login">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
