import loginController from "./loginController"
import registerController from "./registerController"
import verifyOtpController from "./verifyOtpController"
import logoutController from "./logoutController"
import resendOtpController from "./resendOtpController"
import findDoctorController from './findDoctorController'
import updatePatientProfileController from "./updatePatientProfileController"
import viewDoctorDetailsController from "./viewDoctorDetailsController"
import generateOtpController from "./generateOtpController"
import getAvailableSlotController from "./getAvailableSlotController"
import bookAppointmentController from "./bookAppointmentController"
import createPaymentIntentController from "./createPaymentIntentController"
import loadSuccessController from "./loadSuccessController"
import searchDoctrsController from "./searchDoctrsController"
import checkOTPController from "./checkOTPController"
import appointmentDetailsController from "./appointmentDetailsController"
import changePasswordController from "./changePasswordController"
import updateEmailController from "./updateEmailController"
import sendMessegesController from "./sendMessegesController"
import createConverstationController from "./createConverstationController"
import getConverstationByIdController from "./getConverstationByIdController"
import getConverstationsController from "./getConverstationsController"
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
    generateOtpController:generateOtpController(dependencies),
    getAvailableSlotController:getAvailableSlotController(dependencies),
    bookAppointmentController:bookAppointmentController(dependencies),
    createPaymentIntentController:createPaymentIntentController(dependencies),
    loadSuccessController:loadSuccessController(dependencies),
    searchDoctrsController:searchDoctrsController(dependencies),
    checkOTPController:checkOTPController(dependencies),
    appointmentDetailsController:appointmentDetailsController(dependencies),
    changePasswordController:changePasswordController(dependencies),
    updateEmailController:updateEmailController(dependencies),
    sendMessegesController:sendMessegesController(dependencies),
    createConverstationController:createConverstationController(dependencies),
    getConverstationByIdController:getConverstationByIdController(dependencies),
    getConverstationsController:getConverstationsController(dependencies),



    


 }

}