import { Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectUser,UserIsAuthenticated } from '../Redux/slices/authSlice';
import { DoctorIsAuthenticated } from '../Redux/slices/doctorAuthSlice';
import { AdminIsAuthenticated } from '../Redux/slices/adminSlice';


// PublicRoute for general users
export const PublicRoute = () => {
  const isAuthenticated = useSelector(UserIsAuthenticated);
  return isAuthenticated ? <Navigate to="/home" replace /> : <Outlet />;
};

export const PrivateRoute = () => {
  const isAuthenticated = useSelector(UserIsAuthenticated);
  return isAuthenticated ? <Outlet /> : <Navigate to="/login" replace />;
};



export const AdminPrivateRoute = () => {
  const  isAuthenticated  = useSelector(AdminIsAuthenticated);
  console.log(isAuthenticated," true");
  
  return isAuthenticated ? <Outlet /> : <Navigate to='/admin' replace />;
};

export const DoctorPublicRoute = () => {
  const isAuthenticated = useSelector(DoctorIsAuthenticated);
  return isAuthenticated ? <Navigate to="/doctorHome" replace /> : <Outlet />;
};
export const DoctorPrivateRoute = () => {
  const  isAuthenticated  = useSelector(DoctorIsAuthenticated);
  
  return isAuthenticated ? <Outlet /> : <Navigate to='/doctorLogin' replace />;

};