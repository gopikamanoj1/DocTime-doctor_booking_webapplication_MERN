// import loginController from "./loginController"
import doctorRegisterController from "./doctorRegisterController";
import doctorVerifyOtpController from "./doctorVerifyOtpController";
import doctorLoginController from "./doctorLoginController";
import doctorLogoutController from "./doctorLogoutController";
import kycController from "./kycController";
import updateDoctorProfileController from './updateDoctorProfileController'
import googleRegisterController from "./googleRegisterController";
import addSlotController from "./addSlotController";
import showAppoinmentsController from "./showAppoinmentsController";
import getAlreadyScheduledSlotesController from "./getAlreadyScheduledSlotesController";
import getDoctorConverstationByIdController from "./getDoctorConverstationByIdController";
import doctorSendMessegesController from "./doctorSendMessegesController";
import getDoctorConverstationsController from "./getDoctorConverstationsController";
import getKycStatusController from "./getKycStatusController";
import getAppoinmentDetailsController from "./getAppoinmentDetailsController";
import getConvetsationIdForVideoCallController from "./getConvetsationIdForVideoCallController";




export default (dependencies: any) => {
   return {

      doctorRegisterController: doctorRegisterController(dependencies),
      doctorVerifyOtpController: doctorVerifyOtpController(dependencies),
      doctorLoginController: doctorLoginController(dependencies),
      doctorLogoutController:doctorLogoutController(dependencies),
      kycController:kycController(dependencies),
      updateDoctorProfileController:updateDoctorProfileController(dependencies),
      googleRegisterController:googleRegisterController(dependencies),
      addSlotController:addSlotController(dependencies),
      showAppoinmentsController:showAppoinmentsController(dependencies),
      getAlreadyScheduledSlotesController:getAlreadyScheduledSlotesController(dependencies),
      getDoctorConverstationByIdController:getDoctorConverstationByIdController(dependencies),
      doctorSendMessegesController:doctorSendMessegesController(dependencies),
      getDoctorConverstationsController:getDoctorConverstationsController(dependencies),
      getKycStatusController:getKycStatusController(dependencies),
      getAppoinmentDetailsController:getAppoinmentDetailsController(dependencies),
      getConvetsationIdForVideoCallController:getConvetsationIdForVideoCallController(dependencies),


   }

} 