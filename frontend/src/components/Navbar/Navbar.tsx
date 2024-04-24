

import  { useState } from "react";
import { AiOutlineClose, AiOutlineMenu } from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { clearUser, UserIsAuthenticated } from "../../Redux/slices/authSlice";
import "./Navbar.css";
import { toast } from "react-toastify";

const Navbar = () => {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector(UserIsAuthenticated);
  const navigate = useNavigate();
  const [navOpen, setNavOpen] = useState(false);
  const handleToggleNav = () => {
    setNavOpen(!navOpen);
  };

  const handleLogout = () => {
    dispatch(clearUser());
    navigate('/login')
  };


  return (
    <div>
    <nav className="navbar bg-cyan-950 flex justify-between items-center mx-auto px-4 text-white">
      <div className="flex items-center space-x-4">
        <Link to="/">
          <img
            src="/public/imgs/logo 2 p222.png"
            alt="img"
            width={100}
            height={100}
          />
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
          to="/home"
          label="Home"
          isAuthenticated={isAuthenticated}
          onClick={() => navigate('/')}
        />

        <NavItem
          to="/findDoctor"
          label="Find Doctor"
          isAuthenticated={isAuthenticated}
          onClick={() => navigate('/findDoctor')}

        />

        <NavItem
          to="/appointmentDetails"
          label="Appointment Details"
          isAuthenticated={isAuthenticated}
          onClick={() => toast.warn("Please login")}
        />
        <NavItem
          to="/showChatPage/index"
          label="Chat with Doctor"
          isAuthenticated={isAuthenticated}
          onClick={() => toast.warn("Please login")}
        />

        <div className="flex space-x-4">
          {isAuthenticated ? (
            <>
              <Link to="/myprofile" className="btn2">
                <span className="spn2">My Profile</span>
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



{/* ====================================================================================== */}



    </div>

  );
};

const NavItem = ({
  to,
  label,
  isAuthenticated,
  onClick,
}: {
  to: string;
  label: string;
  isAuthenticated: boolean;
  onClick?: () => void;
}) => {
  return (
    <li className="p-4 hover:bg-[#96ebd0] rounded-xl m-2 cursor-pointer duration-300 hover:text-black">
      {isAuthenticated ? (
        <Link to={to}>{label}</Link>
      ) : (
        <button onClick={onClick}>{label}</button>
      )}
    </li>
  );
};

export default Navbar;
