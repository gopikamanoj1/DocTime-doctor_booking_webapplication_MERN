import React, { useState,useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../adminLogin/AdminLogin.css'
import { useSelector, useDispatch } from 'react-redux';
import { setAdmin,clearAdmin } from '../../Redux/slices/adminSlice';

const AdminLogin: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const Admin =  useSelector((state: any) => state.persisted.adminAuth);
  

  useEffect(() => {
    console.log(Admin);
  }, [dispatch]);

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const data = {
      email: email,
      password: password,
    };

    try {
      const response = await axios.create({ withCredentials: true }).post('http://localhost:3000/api/auth/admin', data);
      console.log(response.data, 'this is response');

      if (response.data && response.data.status) {
        dispatch(clearAdmin())
        dispatch(setAdmin(response.data.data));

        navigate('/admin/adminHome');
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
        
          <input value="Sign In" type="submit" className="login-button" />
     
      
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;
