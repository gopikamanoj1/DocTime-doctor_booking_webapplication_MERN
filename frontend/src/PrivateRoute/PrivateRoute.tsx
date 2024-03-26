import { Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { UserIsAuthenticated } from '../Redux/slices/authSlice';
import { DoctorIsAuthenticated } from '../Redux/slices/doctorAuthSlice';
import { AdminIsAuthenticated } from '../Redux/slices/adminSlice';


export const PrivateRoute = () => {
  const  isAuthenticated  = useSelector(UserIsAuthenticated);
  return isAuthenticated ? <Outlet /> : <Navigate to='/login' replace />;
};




export const AdminPrivateRoute = () => {
  const  isAuthenticated  = useSelector(AdminIsAuthenticated);
  console.log(isAuthenticated,"ano true");
  
  return isAuthenticated ? <Outlet /> : <Navigate to='/admin' replace />;
};


export const DoctorPrivateRoute = () => {
  const  isAuthenticated  = useSelector(DoctorIsAuthenticated);
  console.log(isAuthenticated,"is Authhh");
  
  return isAuthenticated ? <Outlet /> : <Navigate to='/doctorLogin' replace />;

};