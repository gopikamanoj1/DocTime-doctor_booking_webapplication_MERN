import React, { useState } from 'react';
import {  Link, useNavigate } from 'react-router-dom';
import '../adminLogin/AdminLogin.css'
import { useSelector, useDispatch } from 'react-redux';
import { setAdmin,clearAdmin } from '../../Redux/slices/adminSlice';
import { toast } from 'react-toastify';
import axiosInstance from '../../AxiosConfig/axiosInstance';


const AdminLogin: React.FC = () => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const Admin =  useSelector((state: any) => state.persisted.adminAuth);
  

  // useEffect(() => {
  //   console.log(Admin);
  // }, [dispatch]);

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const data = {
      email: email,
      password: password,
    };

    try {
      const response = await axiosInstance.post( '/api/auth/admin', data);
      console.log(response.data, 'this i666s response');

      if (response.data.status) {
        dispatch(clearAdmin())
        dispatch(setAdmin(response.data.data));

        navigate('/admin/adminHome'); 
      }else if ( response.data.status===false){
        toast.error("Invalid Credentials")
      }

    } catch (error) {
      console.error("Error during login:", error);
    }
  };

  return (
    <div className='Login'>
      <div className="container">
        <div className="heading">Welcome Admin</div>
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
            <Link to='/admin/forgotPassword' >Forgot Password?</Link>
          </span>
          <input value="Sign In" type="submit" className="login-button" />
     
      
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;
