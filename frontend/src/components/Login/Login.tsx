import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "../Login/Login.css";
import { useSelector, useDispatch } from "react-redux";
import { clearUser, setUser } from "../../Redux/slices/authSlice";
import Google from "./Google";

const Login: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const User = useSelector((state: any) => state.persisted.auth);

  useEffect(() => {
    console.log(User);
  }, [dispatch]);

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const data = {
      email: email,
      password: password,
    };

    try {
      const response = await axios
        .create({ withCredentials: true })
        .post("http://localhost:3000/api/auth/login", data);


      if (response.data && response.data.status) {
        dispatch(clearUser());
        dispatch(setUser(response.data.data));
        localStorage.setItem("User", JSON.stringify(response.data));

        navigate("/home");
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
      <div className="container">
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
            <a href="#">Forgot Password?</a>
          </span>
          <input value="Sign In" type="submit" className="login-button" />

          <div className="social-account-container">
            <span className="title">Or Sign in with</span>
            <div className="social-accounts">
              <div className="google-login-button" onClick={handleGoogleLogin}>
                <Google height="1.5em" width="1.5em" />
                <span style={{ marginLeft: "30px" }}>Google</span>
              </div>
            </div>
          </div>

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
