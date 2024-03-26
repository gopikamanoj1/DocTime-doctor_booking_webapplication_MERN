import React, { useState } from 'react';
import './Register.css'
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import axios from 'axios'


const Register: React.FC = () => {
  const [name, setname] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [cpassword, setCpassword] = useState<string>("");
  const [error, setError] = useState<string>("");
  const navigate = useNavigate(); 


  const handleRegister = async() => {
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
  const response = await axios.create({ withCredentials: true }).post('http://localhost:3000/api/auth/register', data);

  console.log(response.data, 'this is response');

  // Check if registration is successful and then navigate
  if (response.data && response.data.status) {
    // Redirect to "/enterOtp" after successful registration
    navigate('/verifyOtp');
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

  return (
 <div className='register'>
     <section className="container2">
      <header> Patient Registration Form</header>
      <form className="form" onSubmit={(e) => e.preventDefault()}>
        
        <div className="input-box">
          <label> Name</label>
          <input
            placeholder="Enter  name"
            type="text"
              value={name}
              onChange={(e) => setname(e.target.value)}
          />
        </div>

        <div className="input-box">
          <label>Email</label>
          <input
            placeholder="Enter email "
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
    
        <div className="input-box">
          <label>Password</label>
          <input
            placeholder="Enter Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <div className="input-box">
          <label>Confirm Password</label>
          <input
            placeholder="Enter Confirm Password"
            type="password"
            value={cpassword}
            onChange={(e) => setCpassword(e.target.value)}
          />
        </div>

        <button onClick={handleRegister}>Submit&Send Otp</button>
      </form>

      {error && <div className="error">{error}</div>}
    </section>
  <div>  <p>Alreay Have An Account ?<Link className="lgg" to='/login'>Login</Link></p>
  </div>
<br />
<br />
 </div>
  );
};

export default Register;
