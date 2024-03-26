import express from 'express';

import { authController } from '../../controller';
import { adminAuthController } from '../../controller';
import { doctorAuthController } from '../../controller'
import {adminPatientController} from '../../controller'
import {adminDoctorController} from '../../controller';

export default (dependencies: any) => {
  const router = express();

  const { loginController, registerController, verifyOtpController, logoutController, resendOtpController,findDoctorController ,updatePatientProfileController,viewDoctorDetailsController} = authController(dependencies);
  router.post('/login', loginController);
  router.post('/register', registerController);
  router.post('/verifyOtp', verifyOtpController);
  router.get('/logout', logoutController)
  router.get('/resendOtp', resendOtpController)
  router.get('/findDoctor',findDoctorController)
  router.post('/updatePatientProfile',updatePatientProfileController)
  router.get('/viewDoctorDetails/:id',viewDoctorDetailsController)

  // ===========================================================================================================

  const { doctorRegisterController, doctorVerifyOtpController, doctorLoginController ,doctorLogoutController,kycController,updateDoctorProfileController,googleRegisterController} = doctorAuthController(dependencies)


  router.post('/doctorRegister', doctorRegisterController)
  router.post('/doctorLogin', doctorLoginController)
  router.post('/doctorVerifyOtp', doctorVerifyOtpController);
  router.get('/doctorLogout', doctorLogoutController)
  router.post('/kycAuth',kycController);
  router.post('/updateDoctorProfile',updateDoctorProfileController)
  router.get('/google',googleRegisterController);
  // router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));





  // ===========================================================================================================

  const { adminLoginController, } = adminAuthController(dependencies);
  router.post('/admin', adminLoginController);
  router.get('/adminHome', adminLoginController);

                // ========== //
  const {adminUserController}=adminPatientController(dependencies)
  router.get('/getAllUsers',adminUserController)
                    
                // ========== //
  const {adminDoctorListingController,getKycDetailsController,kycStatusController}= adminDoctorController(dependencies)

  router.get('/getAllDoctors',adminDoctorListingController)
  router.get('/getKycDetails/:doctorId',getKycDetailsController)
  router.put('/kycStatus/:doctorId',kycStatusController)





















    return router;
  };
