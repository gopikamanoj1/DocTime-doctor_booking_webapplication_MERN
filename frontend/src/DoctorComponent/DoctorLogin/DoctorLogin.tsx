import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './DoctorlLogin.css';
import { useSelector, useDispatch } from 'react-redux';
import {clearDoctor,setDoctor  } from '../../Redux/slices/doctorAuthSlice';
import { GoogleLogin, GoogleOAuthProvider } from '@react-oauth/google';




const DoctorLogin: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const Doctor = useSelector((state:any)=>state.persisted.doctorAuth);


useEffect(()=>{
  console.log(Doctor);
  
},[dispatch])

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const data = {
      email: email,
      password: password,
    };

    try {
      const response = await axios.create({ withCredentials: true }).post('http://localhost:3000/api/auth/doctorLogin', data);

      if (response.data && response.data.status) {
        console.log(response.data,'THIS IS RESPONCE');
        localStorage.setItem("doctorProfile", JSON.stringify(response.data));
        dispatch(clearDoctor())
        dispatch(setDoctor(response.data.data));
        navigate('/doctorHome');
      } 

    } catch (error) {
      console.error('Error during login:', error);
    }
  };
  const handleGoogleLogin = () => {
    // Implement Google Sign-In logic here
    // You can use Google Sign-In API or Firebase Authentication for this purpose
  };
  const handleGoogleLoginSuccess = (response: any) => {
    console.log(response); // Handle Google login success
    // You can dispatch an action to handle the logged-in user or navigate to a different page
  };

  const handleGoogleLoginFailure = (error: any) => {
    console.error('Error during Google login:', error); // Handle Google login failure
  };


  return (
    <>
    <GoogleOAuthProvider clientId='39339182818-5i8mc5be6q31kap48eqrc5p4ik1bnrma.apps.googleusercontent.com'>

    <div className='Login'>
      <div className="container">
        <div className="heading">Welcome Doc</div>
        <form className="form" onSubmit={handleLogin}>
          <input
            placeholder="E-mail"
            id="email"
            name="email"
            type="email"
            className="input"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            placeholder="Password"
            id="password"
            name="password"
            type="password"
            className="input"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <span className="forgot-password">
            <a href="#">Forgot Password?</a>
          </span>
          <input value="Sign In" type="submit" className="login-button" />


          <div>  <p>Don't Have Account ?<Link className="lgg" to='/doctorRegister'>  Register</Link></p>
          </div>
        </form>
        <div id="signInButton">
                <GoogleLogin
                  type='standard'
                  // theme='filled_white'
                  size='large'
                  onSuccess={response => {
                    axios.post('/google', response)
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
        
      </div>
    </div>
    </div>
    </GoogleOAuthProvider>
    </>

  );
};

export default DoctorLogin;









