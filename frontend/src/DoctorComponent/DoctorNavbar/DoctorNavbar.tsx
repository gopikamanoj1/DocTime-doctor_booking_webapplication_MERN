

import { useState } from "react";
import { AiOutlineClose, AiOutlineMenu } from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  
  clearDoctor,
  DoctorIsAuthenticated,
} from "../../Redux/slices/doctorAuthSlice";

import "./DoctorNavbar.css";
import { toast } from "react-toastify";

const DoctorNavbar = () => {
  const dispatch = useDispatch();
  const doctor = useSelector((state: any) => state.persisted.doctorAuth);
  const isAuthenticated = useSelector(DoctorIsAuthenticated);
  const navigate=useNavigate()
  const storedNavState = localStorage.getItem("nav");
  const [nav, setNav] = useState(
    storedNavState ? JSON.parse(storedNavState) : false
  );

  const [kycStatus, setKycStatus] = useState("");

  const handleNav = () => {
    setNav(!nav);
  };

  const handleLogout = () => {
    dispatch(clearDoctor());
    localStorage.removeItem("doctorProfile");
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    navigate('/doctorLogin')

  };

  return (
    <nav className="bg-cyan-950 flex mx-auto px-4 text-white">
      <img
        src="/public/imgs/logo 2 p222.png"
        alt="img"
        width={100}
        height={100}
      />

      <ul className="hidden md:flex justify-between items-center h-24">
        <li className="p-4 hover:bg-[#96ebd0] rounded-xl m-2 cursor-pointer duration-300 hover:text-black">
          {isAuthenticated ? (
            <Link to="/doctorHome">Home</Link>
          ) : (
            <Link to="/">Home</Link>
          )}
        </li>
        <li className="p-4 hover:bg-[#96ebd0] rounded-xl m-2 cursor-pointer duration-300 hover:text-black">
          {isAuthenticated ? (
            <Link to="/addSlot">Add Slot</Link>
          ) : (
            <button onClick={()=>toast.warn("Please Login")}>
            Add Slot
              </button>
          )}
        </li>
        <li className="p-4 hover:bg-[#96ebd0] rounded-xl m-2 cursor-pointer duration-300 hover:text-black">
          {isAuthenticated ? (
            <Link to="/showDoctorAppoinment">Your Appoinment</Link>
          ) : (
            <button onClick={()=>toast.warn("Please Login")}>
          Your Appoinment
            </button>

          
          )}
        </li>

        <li className="p-4 hover:bg-[#96ebd0] rounded-xl m-2 cursor-pointer duration-300 hover:text-black">
          {isAuthenticated ? (
                      <Link to="/showChat/index">Chat</Link>

          ) : (
            <button onClick={()=> toast.warn('Please Login')}>
              Chat

            </button>
          ) }
        </li>



        <li className="p-4 hover:bg-[#96ebd0] rounded-xl m-2 cursor-pointer duration-300 hover:text-black">
          {isAuthenticated ? (
            <Link to="/kycAuth">kyc
            
            
            </Link>
          ) : (
            // <Link to="/login">Video Consultation</Link>
            <button onClick={()=>toast.warn("Please Login")}>
              kyc
            </button>
          )}
        </li>

        {/* <li className="p-4 hover:bg-[#96ebd0] rounded-xl m-2 cursor-pointer duration-300 hover:text-black">
          {kycStatus === "approved" && <span>KYC Status: Approved</span>}
          {kycStatus === "pending" && <span>KYC Status: Pending</span>}
          {kycStatus === "rejected" && <span>KYC Status: Rejected</span>}
        </li> */}


      </ul>

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
                  <span className="spn2">Patient Login</span>
                </button>
              </Link>
              <Link to="/doctorLogin">
                <button className="btn2">
                  <span className="spn2">Doctor Login</span>
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
            ? "fixed md:hidden left-0 top-0 w-[40%] h-full border-r border-r-gray-900 bg-[#000300] ease-in-out duration-500"
            : "ease-in-out w-[60%] duration-500 fixed top-0 bottom-0 left-[-100%]"
        }
      >
        <img
          src="/public/imgs/logo 2 p222.png"
          alt="img"
          width={100}
          height={100}
        />

        <li className="p-3 border-b rounded-xl hover:bg-[#96ebd0] duration-300 hover:text-black cursor-pointer border-gray-600">
          <Link to={isAuthenticated ? "/doctorHome" : "/"}>Home</Link>
        </li>
        <li className="p-3 border-b rounded-xl hover:bg-[#96ebd0] duration-300 hover:text-black cursor-pointer border-gray-600">
          <Link to={isAuthenticated ? "/addSlot" : "/login"}>
            {isAuthenticated ? "Add Slot" : "Find Doctor"}
          </Link>
        </li>
        <li className="p-3 border-b rounded-xl hover:bg-[#96ebd0] duration-300 hover:text-black cursor-pointer border-gray-600">
          <Link to="/showDoctorAppoinment">Your Appoinment</Link>
        </li>
        <li className="p-3 border-b rounded-xl hover:bg-[#96ebd0] duration-300 hover:text-black cursor-pointer border-gray-600">
          <Link to="/showChat/index">Chat With Doctor</Link>
        </li>
        <li className="p-3 border-b rounded-xl hover:bg-[#96ebd0] duration-300 hover:text-black cursor-pointer border-gray-600">
          <Link to={isAuthenticated ? "/kycAuth" : "/login"}>
            {isAuthenticated ? "KYC" : "Video Consultation"}
          </Link>
        </li>
        {kycStatus && (
          <li className="p-3 border-b rounded-xl hover:bg-[#96ebd0] duration-300 hover:text-black cursor-pointer border-gray-600">
            KYC Status: {kycStatus.charAt(0).toUpperCase() + kycStatus.slice(1)}
          </li>
        )}
      </ul>
    </nav>
  );
};

export default DoctorNavbar;
