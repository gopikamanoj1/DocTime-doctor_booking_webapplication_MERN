import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Login.css";
import { useSelector, useDispatch } from "react-redux";
import { clearUser, setUser,UserIsAuthenticated } from "../../Redux/slices/authSlice";
import Google from "./Google";
import { toast } from "react-toastify";
import axiosInstance from "../../AxiosConfig/axiosInstance";


const Login: React.FC = () => {


  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const User = useSelector((state: any) => state.persisted.auth);
  const isAuth = useSelector((state: any) => state.persisted.isAuthenticated);
  const isAuthenticated = useSelector(UserIsAuthenticated);
  const doctorProfile = JSON.parse(localStorage.getItem('doctorProfile') || '{}');
  const token = doctorProfile.token;

  useEffect(() => {
    if (!token) {
      // If no token, redirect to login
      navigate('/login');
    }
  }, [token, navigate]);

  
  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
    }
  }, [isAuthenticated, navigate]);

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const data = {
      email: email,
      password: password,
    };

    try {
      const response = await axiosInstance
        .post('/api/auth/login', data);
      if (response.data && response.data.status) {
        toast.info("Successfully logged in!");
        dispatch(clearUser());
        dispatch(setUser(response.data.data));
        localStorage.setItem("User", JSON.stringify(response.data));
        navigate("/home");
      } else if (response.data.status === false) {
        toast.error("Invalid Credentials");
      }
    } catch (error) {
      console.error("Error during login:", error);
    }
  };
  const handleGoogleLogin = () => {
    // Implement Google Sign-In logic here
    // You can use Google Sign-In API or Firebase Authentication for this purpose
  };

  return (
    <div className="Login">
      <div className="container bg-black">
        <div className="heading">Welcome</div>
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
            <Link to='/forgotPassword'>Forgot Password?</Link>
          </span>
          <input value="Sign In" type="submit" className="login-button" />

          {/* <div className="social-account-container">
            <span className="title">Or Sign in with</span>
            <div className="social-accounts">
              <div className="google-login-button" onClick={handleGoogleLogin}>
                <Google height="1.5em" width="1.5em" />
                <span style={{ marginLeft: "30px" }}>Google</span>
              </div>
            </div>
          </div> */}

          <div>
            {" "}
            <p>
              Don't Have Account ?
              <Link className="lgg" to="/register">
                {" "}
                Register
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
