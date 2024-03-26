// import loginController from "./loginController"
import doctorRegisterController from "./doctorRegisterController";
import doctorVerifyOtpController from "./doctorVerifyOtpController";
import doctorLoginController from "./doctorLoginController";
import doctorLogoutController from "./doctorLogoutController";
import kycController from "./kycController";
import updateDoctorProfileController from './updateDoctorProfileController'
import googleRegisterController from "./googleRegisterController";
export default (dependencies: any) => {
   return {

      doctorRegisterController: doctorRegisterController(dependencies),
      doctorVerifyOtpController: doctorVerifyOtpController(dependencies),
      doctorLoginController: doctorLoginController(dependencies),
      doctorLogoutController:doctorLogoutController(dependencies),
      kycController:kycController(dependencies),
      updateDoctorProfileController:updateDoctorProfileController(dependencies),
      googleRegisterController:googleRegisterController(dependencies)



   }

}