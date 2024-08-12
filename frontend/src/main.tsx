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
import {DoctorPrivateRoute, PrivateRoute,PublicRoute,DoctorPublicRoute} from './PrivateRoute/PrivateRoute';
import { AdminPrivateRoute } from './PrivateRoute/PrivateRoute';
import DoctorLoginPage from './DoctorPages/DoctorLoginPage';
import DoctorRegisterPage from './DoctorPages/doctorRegisterPage';
import DoctorOtpPage from './DoctorPages/DoctorOtpPage';
import DoctorHomePage from './DoctorPages/DoctorHomePage';
import KYC from './DoctorPages/KYCPage';
import UserListingPage from './AdminPages/UserListingPage';
import DoctorListingPage from './AdminPages/DoctorListingPage';
import DoctorProfilePage from './DoctorPages/DoctorProfilePage';
import ShowingKycDetails from './AdminPages/ShowingKycDetails';
import FindingDoctorPage from './pages/FindingDoctorPage';
import ViewDoctorDetailsPage from './pages/ViewDoctorDetailsPage';
import UpdateEmailComponent from './components/UpdateEmail/UpdateEmailComponent';
import CelenderPage from './DoctorPages/CelenderPage';
import CheckoutPage from './pages/CheckoutPage';
import ForgotPassword from './pages/ForgotPasswordPage';
import SuccessPage from './pages/SuccessPage';
import AppointmentDetailsPage from './pages/AppointmentDetailsPage';
import AppointmentListPage from './DoctorPages/AppointmentListPage';
import ChatPage from './pages/ChatPage';
import ChatPageForDoc from './pages/ChatPageForDoc';
import ErrorPage from './Error/ErrorPage';
import VideoCall from './REAL_TIME/VIDEO_CALL/VideoCall';
import DoctorAppointmentTablePage from './DoctorPages/DoctorAppointmentTablePage';
import WalletPage from './AdminPages/WalletPage';
import ChangePasswordForDocPage from './DoctorPages/changePasswordForDocPage';
import ChangePasswordPage from './pages/ChangePasswordPage';
import ForgotPasswordForDocPage from './DoctorPages/ForgotPasswordForDocPage';
import UpdateEmailForDoc from './DoctorComponent/DoctorProfile/UpdateEmailForDoc';
import SlotPage from './DoctorPages/SlotPage';
import SlotCreatePage from './DoctorPages/SlotCreatePage';

// USER_ROUTES
// ==========================================================================================================

const userRoutes = (
  <Route path="/" element={<App />}>
    <Route  index={true} element={<LandingPage />} />

    <Route path="/" element={<PublicRoute />}>
    <Route path="/login" element={<LoginPage />} />
    <Route path="/register" element={<RegisterPage />} />
    </Route>


    <Route path='' element={<PrivateRoute />}>
    <Route path="/home" element={<HomePage />} />
    </Route>

    <Route path='/verifyOtp' element={<VerifyOTP/>}></Route>
    <Route path='/myProfile' element={<MyProfile/>}></Route>
    <Route path='/findDoctor' element={<FindingDoctorPage/>}></Route>
    <Route path='/viewDoctorDetails/:id' element={<ViewDoctorDetailsPage/>}></Route>
    <Route path='/updateEmail' element={<UpdateEmailComponent/>}></Route>
    <Route path='/bookAppointment' element={<CheckoutPage/>}></Route>
    <Route path='/successAppointment' element={<SuccessPage/>}></Route>
    <Route path='/forgotPassword' element={<ForgotPassword/>}></Route>
    <Route path='/appointmentDetails' element={<AppointmentDetailsPage/>}></Route>
    <Route path='/showChatPage/:convesationId' element={<ChatPage/>}> </Route>
    <Route path='/changePassword' element={<ChangePasswordPage/>} ></Route>
  </Route>
); 
 

// DOCTOR_ROUTER
// ==========================================================================================================

const doctorRouter=(
  <Route path="/" element={< DoctorApp/>}>

        <Route path='' element={<DoctorPublicRoute />}>
        <Route path="/doctorLogin"  element={<DoctorLoginPage  />} />
        <Route path='/DoctorRegister' element={<DoctorRegisterPage/>}></Route>
        </Route>
        <Route path='' element={<DoctorPrivateRoute />}>
        <Route path='/doctorHome' element={<DoctorHomePage/>}></Route>
        </Route>
        <Route path='/doctorVerifyOtp' element={<DoctorOtpPage/>}></Route>
        <Route path='/doctorProfile' element={<DoctorProfilePage/>}> </Route>
        <Route path='/kycAuth' element={<KYC/>}></Route>
        <Route path='/addingSlot' element={<SlotPage/>}></Route>

        <Route path='/createSlot' element={<SlotCreatePage/>}></Route>

        <Route path='/addSlot' element={<CelenderPage/>}></Route>
        <Route path='/showAppoinments' element={<AppointmentListPage/>}></Route>
        <Route path='/showChat/:convesationId' element={<ChatPageForDoc/>}> </Route>
        <Route  path='/showDoctorAppoinment' element={<DoctorAppointmentTablePage/>} ></Route>
        <Route path='/videoCall/:roomId/:appoinmentId' element={<VideoCall/>} ></Route>
        <Route path='/changePasswordForDoc' element={<ChangePasswordForDocPage/>} ></Route>
          <Route  path='/forgotPasswordForDoc' element={<ForgotPasswordForDocPage/>} ></Route>
          <Route path='/UpdateEmailForDoc' element={<UpdateEmailForDoc/>}>

          </Route>


  </Route>
)

// ADMIN_ROUTES
// ==========================================================================================================

const adminRoute = (
  <Route path="/admin" element={<AdminApp  />}>


    <Route  index={true} element={<AdminLoginPage />} />


    <Route path='' element={<AdminPrivateRoute />}>
    <Route path="/admin/adminHome" element={<AdminHomePage />} />
    <Route path="/admin/getAllUsers" element={<UserListingPage />} />
    <Route path='/admin/getAllDoctors' element={<DoctorListingPage/>}></Route>
    <Route path="/admin/getKycDetails/:doctorId"  element={<ShowingKycDetails/>}></Route>
    <Route path='/admin/wallet' element={<WalletPage/>} ></Route> 
    
  </Route>
  </Route>
);

const catchAllRoute = (
  <Route path="*" element={<ErrorPage />} />
);

// Combine both user and admin routes
const allRoutes = (
  <>
    {userRoutes}
    {adminRoute}
    {doctorRouter}
    {catchAllRoute}

  </>
);

// Create the router
// const router = createBrowserRouter(createRoutesFromElements(allRoutes));
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
