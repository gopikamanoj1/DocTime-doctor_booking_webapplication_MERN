
import React, { useState } from 'react';
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom';

const DoctorRegister: React.FC = () => {

  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [cpassword, setCpassword] = useState<string>("");
  const [error, setError] = useState<string>("");
  const navigate = useNavigate(); 






  const handleRegister =async (event: React.FormEvent) => {
    event.preventDefault();

    if (name.trim() === "") {
      setError("Name cannot be empty");
    } else if(email.trim()==""){
      setError("Email cannot be empty")
    }else if(password.trim()==''){
      setError("Password cannot be empty")
    }else if(cpassword.trim()==""){
      setError("Confirm password cannot be empty")
    }
    else {
      setError("");
    }
    const data={
  
      name:name,
      email:email,
      password:password,
      
  }
  
  try {
    const response = await axios.create({ withCredentials: true }).post('http://localhost:3000/api/auth/doctorRegister', data);
  
    console.log(response.data, 'this is response');
  
    // Check if registration is successful and then navigate
    if (response.data && response.data.status) {
      // Redirect to "/enterOtp" after successful registration
      navigate('/doctorVerifyOtp');
    } else {
      // setError("User Already Exist !!...");
    }
    setTimeout(() => {
      setError("");
    }, 5000);
  
  } catch (error) {
    console.error("Error during registration:", error);
    setError("User registration failed");
  }

  
  setTimeout(() => {
    setError("");
  }, 5000);
    
  };
  const handleGoogleSignIn = () => {
    try {
      // Open the Google authentication window
      window.open("http://localhost:3000/api/auth/google", "_blank", "width=600,height=600");
    } catch (error) {
      console.error("Error during Google Sign-In:", error);
      setError("Google Sign-In failed");
    }
  };
  
  

    return (
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
              </div>
    
              <button
                type="submit"
                className="w-full bg-sky-950 text-white py-2 rounded-md hover:bg-sky-900 transition duration-300"
              >
                Register
              </button>
              <button
            type="button"
            onClick={handleGoogleSignIn}
            className="w-full bg-red-600 text-white py-2 rounded-md hover:bg-red-700 transition duration-300"
          >
            Sign in with Google
          </button>
          {/* Error message */}
          {error && <p className="text-red-600">{error}</p>}
          <p className="text-sm text-gray-600 mt-2">
            Already have an account?{' '}
            <Link to='/doctorLogin' className="text-sky-900 hover:underline">
              Sign in
            </Link>
          </p>
        </form>
          </div>
        </div>
      );
    };
    
    export default DoctorRegister;