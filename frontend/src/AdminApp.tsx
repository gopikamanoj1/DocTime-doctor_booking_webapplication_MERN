import { Outlet } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AdminSidebar from './AdminComponent/SideNavBar/SideNavBar';
import AdminNavbar from './AdminComponent/Header/AdminNavbar';
const App = () => {
  return (
    <>
{/* <AdminSidebar/> */}
{/* <AdminNavbar/> */}
      <ToastContainer />
        <Outlet />
    </>
  );
};

export default App;