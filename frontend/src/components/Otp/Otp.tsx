import React, { useState, useRef } from 'react';
import axios from 'axios';
import '../Otp/Otp.css';
import { Link, useNavigate } from 'react-router-dom';


function Otp() {
  const [enteredOtp, setEnteredOtp] = useState('');
  const inputRefs = [
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
  ];
  const [error, setError] = useState<string>("");
  const navigate = useNavigate(); 



  const handleInputChange = (index: number, value: string) => {
    // Handle input change and move to the next input field
    if (value) {
      setEnteredOtp((prevOtp) => prevOtp + value);
    }

    if (index < inputRefs.length - 1) {
      inputRefs[index + 1].current?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    // Handle backspace to remove the last entered digit
    if (e.key === 'Backspace' && index > 0) {
      const currentInput = inputRefs[index].current;
      const previousInput = inputRefs[index - 1].current;

      // If the current input is empty, remove the digit from the previous input
      if (currentInput && previousInput && !currentInput.value) {
        setEnteredOtp((prevOtp) => prevOtp.slice(0, -1));
        previousInput.focus();
      }
    }
  };

  const handleVerify = async () => {
    try {
      console.log("hhhhhhhhhhhhh");
      const response = await axios.create({ withCredentials: true }).post('http://localhost:3000/api/auth/verifyOtp', {
        enteredOtp: enteredOtp,
      });

      // Handle the response from the backend
      console.log(response.data);
      if (response.data && response.data.status) {
        // Redirect to "/enterOtp" after successful registration
        navigate('/home');
      } else {
        setError("User registration failed");
      }
    } catch (error) {
      console.error('Error verifying OTP:', error);
    }
  };



  return (
    <div className='otpDiv'>
      <form className="otp-Form">
        <span className="mainHeading">Enter OTP</span>
        <p className="otpSubheading">We have sent a verification code to your Email</p>
        <div className="inputContainer">
          {[0, 1, 2, 3].map((index) => (
            <input
              key={index}
              ref={inputRefs[index]}
              required
              maxLength={1}
              type="text"
              className="otp-input"
              onChange={(e) => handleInputChange(index, e.target.value)}
              onKeyDown={(e) => handleKeyDown(index, e)}
            />
          ))}
        </div>
        <button type="button" className="verifyButton" onClick={handleVerify}>
          Verify
        </button>
        <button className="exitBtn">×</button>
        <p className="resendNote">
          Didn't receive the code? <Link to='/resendOtp' className="resendBtn">Resend Code</Link>
        </p>
      </form>
    </div>
  );
}

export default Otp;
