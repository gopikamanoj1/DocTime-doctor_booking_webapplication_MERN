import React, { useState, useEffect } from 'react';
import { AiOutlineClose, AiOutlineMenu } from 'react-icons/ai';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { selectDoctor, clearDoctor, DoctorIsAuthenticated } from '../../Redux/slices/doctorAuthSlice';

import './DoctorNavbar.css';

const DoctorNavbar = () => {
  const dispatch = useDispatch();
  const user = useSelector(selectDoctor);
  const isAuthenticated = useSelector(DoctorIsAuthenticated);
  const navigate = useNavigate();

  const storedNavState = localStorage.getItem('nav');
  const [nav, setNav] = useState(storedNavState ? JSON.parse(storedNavState) : false);

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/doctorHome');
    }
  }, [isAuthenticated, navigate]);

  useEffect(() => {
    localStorage.setItem('nav', JSON.stringify(nav));
  }, [nav]);

  const handleNav = () => {
    setNav(!nav);
  };

  const handleLogout = () => {
    dispatch(clearDoctor());
    localStorage.removeItem('doctorProfile');
  };

  return (
    <nav className="bg-cyan-950 flex mx-auto px-4 text-white">
      <img src="/public/imgs/logo 2 p222.png" alt="img" width={100} height={100} />
           {/* Search Bar */}
           <div className="relative mt-7">
        <input
          type="text"
          placeholder="Search"
          className="px-4 py-2 pr-10 border rounded-full bg-gray-100 text-gray-900 focus:outline-none focus:bg-white focus:border-blue-500"
        />
        <button className="absolute top-0 right-0 mt-2 mr-3" onClick={() => console.log('Search clicked')}>
          <svg
            className="h-5 w-5 text-gray-700"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path d="M21 21l-6-6m4-6a8 8 0 11-16 0 8 8 0 0116 0z"></path>
          </svg>
        </button>
      </div>  

      <ul className="hidden md:flex justify-between items-center h-24">
        <li className="p-4 hover:bg-[#96ebd0] rounded-xl m-2 cursor-pointer duration-300 hover:text-black">
          {isAuthenticated ? <Link to="/doctorHome">Home</Link> : <Link to="/">Home</Link>}
        </li>
        <li className="p-4 hover:bg-[#96ebd0] rounded-xl m-2 cursor-pointer duration-300 hover:text-black">
          {isAuthenticated ? <Link to="/addSlot">Add Slot</Link> : <Link to="/login">Find Doctor</Link>}
        </li>
        <li className="p-4 hover:bg-[#96ebd0] rounded-xl m-2 cursor-pointer duration-300 hover:text-black">
          {isAuthenticated ? <Link to="/showAppoinments">Appointments</Link> : <Link to="/login">Video Consultation</Link>}
        </li>
        <li className="p-4 hover:bg-[#96ebd0] rounded-xl m-2 cursor-pointer duration-300 hover:text-black">
          {isAuthenticated ? <Link to="/kycAuth">Complete Your KYC</Link> : <Link to="/login">Chat With Doctor</Link>}
        </li>
      </ul>

 

      {/* Buttons */}
      <div className="btt">
        <div>
          {isAuthenticated ? (
            <>
              <Link to="/doctorProfile">
                <button className="btn2">
                  <span className="spn2">Dr.Profile</span>
                </button>
              </Link>
              <button onClick={handleLogout} className="btn2">
                <span className="spn2">Logout</span>
              </button>
            </>
          ) : (
            <>
              <Link to="/login">
                <button className="btn2">
                  <span className="spn2">Patient</span>
                </button>
              </Link>
              <Link to="/doctorLogin">
                <button className="btn2">
                  <span className="spn2">Doctor</span>
                </button>
              </Link>
            </>
          )}
        </div>
      </div>

      <div onClick={handleNav} className="block md:hidden">
        {nav ? <AiOutlineClose size={20} /> : <AiOutlineMenu size={20} />}
      </div>

      <ul
        className={
          nav
            ? 'fixed md:hidden left-0 top-0 w-[40%] h-full border-r border-r-gray-900 bg-[#000300] ease-in-out duration-500'
            : 'ease-in-out w-[60%] duration-500 fixed top-0 bottom-0 left-[-100%]'
        }
      >
        <img src="/public/imgs/logo 2 p222.png" alt="img" width={100} height={100} />

        <li className="p-3 border-b rounded-xl hover:bg-[#96ebd0] duration-300 hover:text-black cursor-pointer border-gray-600">
          Home
        </li>
        <li className="p-3 border-b rounded-xl hover:bg-[#96ebd0] duration-300 hover:text-black cursor-pointer border-gray-600">
          Find Doctor
        </li>
        <li className="p-3 border-b rounded-xl hover:bg-[#96ebd0] duration-300 hover:text-black cursor-pointer border-gray-600">
          Video Consultation
        </li>
        <li className="p-3 border-b rounded-xl hover:bg-[#96ebd0] duration-300 hover:text-black cursor-pointer border-gray-600">
          Chat With Doctor
        </li>
        <li className="p-3 border-b rounded-xl hover:bg-[#96ebd0] duration-300 hover:text-black cursor-pointer border-gray-600">
          About
        </li>
      </ul>
    </nav>
  );
};

export default DoctorNavbar
