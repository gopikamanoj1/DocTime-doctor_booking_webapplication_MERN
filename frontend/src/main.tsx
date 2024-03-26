import React from 'react';
import ReactDOM from 'react-dom';
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from 'react-router-dom';
import './index.css';
import { Provider } from 'react-redux';


import {Store} from './Redux/store';
import App from './App';
import AdminApp from './AdminApp';
import LoginPage from './pages/LoginPage';
import AdminLoginPage from './AdminPages/AdminLoginPage';
import HomePage from './pages/HomePage';
import DoctorApp from './DoctorApp';
import RegisterPage from './pages/RegisterPage';
import VerifyOTP from './pages/VerifyOTP';
import AdminHomePage from './AdminPages/AdminHomePage';
import MyProfile from './pages/MyProfile';
import LandingPage from './pages/LandingPage';
import {DoctorPrivateRoute, PrivateRoute} from './PrivateRoute/PrivateRoute';
import { AdminPrivateRoute } from './PrivateRoute/PrivateRoute';
import DoctorLoginPage from './DoctorPages/DoctorLoginPage';
import DoctorRegisterPage from './DoctorPages/doctorRegisterPage';
import DoctorOtpPage from './DoctorPages/DoctorOtpPage';
import DoctorHomePage from './DoctorPages/DoctorHomePage';
import KYC from './DoctorPages/KYCPage';
import UserListingPage from './AdminPages/UserListingPage';
import DoctorListingPage from './AdminPages/DoctorListingPage';
import DoctorProfilePage from './DoctorPages/DoctorProfilePage';
import AddDepartmentPage from './AdminPages/AddDepartmentPage';
import ShowingKycDetails from './AdminPages/ShowingKycDetails';
import FindingDoctorPage from './pages/FindingDoctorPage';
import ViewDoctorDetailsPage from './pages/ViewDoctorDetailsPage';


// USER_ROUTES
// ==========================================================================================================

const userRoutes = (
  <Route path="/" element={<App />}>
    <Route index={true} element={<LandingPage />} />
    <Route path="/login" element={<LoginPage />} />
    <Route path='/register' element={<RegisterPage/>}></Route>
    <Route path='' element={<PrivateRoute />}>
    <Route path="/home" element={<HomePage />} />
    </Route>
    <Route path='/verifyOtp' element={<VerifyOTP/>}></Route>
    <Route path='/myProfile' element={<MyProfile/>}></Route>
    <Route path='/findDoctor' element={<FindingDoctorPage/>}></Route>
    <Route path='/viewDoctorDetails/:id' element={<ViewDoctorDetailsPage/>}></Route>




  </Route>
);


// DOCTOR_ROUTER
// ==========================================================================================================

const doctorRouter=(
  <Route path="/" element={< DoctorApp/>}>

        <Route path="/doctorLogin" index={true} element={<DoctorLoginPage />} />
        <Route path='/DoctorRegister' element={<DoctorRegisterPage/>}></Route>
        <Route path='/doctorVerifyOtp' element={<DoctorOtpPage/>}></Route>
        <Route path='' element={<DoctorPrivateRoute />}>
        <Route path='/doctorHome' element={<DoctorHomePage/>}></Route>
        </Route>
        <Route path='/doctorProfile' element={<DoctorProfilePage/>}> </Route>
        <Route path='/kycAuth' element={<KYC/>}></Route>


        


  </Route>
)

// ADMIN_ROUTES
// ==========================================================================================================

const adminRoute = (
  <Route path="/admin" element={<AdminApp />}>
    <Route  index={true} element={<AdminLoginPage />} />
    <Route path='' element={<AdminPrivateRoute />}>
    <Route path="/admin/adminHome" element={<AdminHomePage />} />
    <Route path="/admin/getAllUsers" element={<UserListingPage />} />
    <Route path='/admin/getAllDoctors' element={<DoctorListingPage/>}></Route>
    <Route path='/admin/department' element={<AddDepartmentPage/>}></Route>
    <Route path="/admin/getKycDetails/:doctorId"  element={<ShowingKycDetails/>}></Route>



    </Route>


  </Route>
);

// Combine both user and admin routes
const allRoutes = (
  <>
    {userRoutes}
    {adminRoute}
    {doctorRouter}
  </>
);

// Create the router
const router = createBrowserRouter(createRoutesFromElements(allRoutes));

// Render the app
ReactDOM.render(
  <Provider store={Store}>
    <React.StrictMode>
      <RouterProvider router={router} />
    </React.StrictMode>
  </Provider>,
  document.getElementById('root')
);
