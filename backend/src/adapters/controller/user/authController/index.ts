import loginController from "./loginController"
import registerController from "./registerController"
import verifyOtpController from "./verifyOtpController"
import logoutController from "./logoutController"
import resendOtpController from "./resendOtpController"
import findDoctorController from './findDoctorController'
import updatePatientProfileController from "./updatePatientProfileController"
import viewDoctorDetailsController from "./viewDoctorDetailsController"
export default (dependencies:any)=>{
 return {

    loginController:loginController(dependencies),
    registerController:registerController(dependencies),
    verifyOtpController:verifyOtpController(dependencies),
    logoutController:logoutController(dependencies),
    resendOtpController:resendOtpController(dependencies),
    findDoctorController:findDoctorController(dependencies),
    updatePatientProfileController:updatePatientProfileController(dependencies),
    viewDoctorDetailsController:viewDoctorDetailsController(dependencies),


 }

}