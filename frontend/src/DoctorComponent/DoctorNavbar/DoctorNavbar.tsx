

import { useState } from "react";
import { AiOutlineClose, AiOutlineMenu } from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { clearDoctor, DoctorIsAuthenticated } from "../../Redux/slices/doctorAuthSlice";
import { toast } from "react-toastify";

import "./DoctorNavbar.css"; // Add CSS for your new structure and responsive design

const DoctorNavbar = () => {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector(DoctorIsAuthenticated);
  const navigate = useNavigate();
  const [navOpen, setNavOpen] = useState(false);

  const handleToggleNav = () => {
    setNavOpen(!navOpen);
  };

  const handleLogout = () => {
    dispatch(clearDoctor());
    localStorage.removeItem("doctorProfile");
    localStorage.removeItem("token");
    navigate("/doctorLogin");
  };

  return (
    <nav className="navbar bg-cyan-950 flex justify-between items-center mx-auto px-4 text-white">
      <div className="flex items-center space-x-4">
        <Link to="/">
          <img src="https://res.cloudinary.com/dik3qbts6/image/upload/v1723634538/images/orglogo_eyotqj.png"
           alt="logo" width={100} height={100} />
        </Link>
      </div>

      <div className="md:hidden">
        <button onClick={handleToggleNav}>
          {navOpen ? <AiOutlineClose size={20} /> : <AiOutlineMenu size={20} />}
        </button>
      </div>

      <ul
        className={`md:flex ${
          navOpen ? "flex flex-col" : "hidden"
        } md:flex-row justify-between items-center md:h-auto w-full md:w-auto`}
      >
        <NavItem
          to={isAuthenticated ? "/doctorHome" : "/"}
          label="Home"
          onClick={() => !isAuthenticated && toast.warn("Please login")}
        />

      

        <NavItem
          to={isAuthenticated ? "/showDoctorAppoinment" : "/doctorLogin"}
          label="Consultations"
          onClick={() => !isAuthenticated && toast.warn("Please login")}
        />

        <NavItem
          to={isAuthenticated ? "/showChat/index" : "/doctorLogin"}
          label="Chat"
          onClick={() => !isAuthenticated && toast.warn("Please login")}
        />

        {/* <NavItem
          to={isAuthenticated ? "/kycAuth" : "/doctorLogin"}
          label="KYC"
          onClick={() => !isAuthenticated && toast.warn("Please login")}
        /> */}
  <NavItem
          to={isAuthenticated ? "/addingSlot" : "/doctorLogin"}
          label="Slot"
          onClick={() => !isAuthenticated && toast.warn("Please login")}
        />

<NavItem
          to={isAuthenticated ? "/createSlot" : "/doctorLogin"}
          label="Manage Slots"
          onClick={() => !isAuthenticated && toast.warn("Please login")}
        />

        <div className="flex space-x-4">
          {isAuthenticated ? (
            <>
              <Link to="/doctorProfile" className="btn2">
                <span className="spn2">Dr. Profile</span>
              </Link>
              <button onClick={handleLogout} className="btn2">
                <span className="spn2">Logout</span>
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="btn2">
                <span className="spn2">Patient Login</span>
              </Link>
              <Link to="/doctorLogin" className="btn2">
                <span className="spn2">Doctor Login</span>
              </Link>
            </>
          )}
        </div>
      </ul>
    </nav>
  );
};

const NavItem = ({ to, label, onClick }) => (
  <li className="p-2 hover:bg-[#ffffff] m-2 cursor-pointer duration-300 hover:text-black">
    <Link to={to} onClick={onClick}>
      {label}
    </Link>
  </li>
);

export default DoctorNavbar;






