"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const controller_1 = require("../../controller");
const controller_2 = require("../../controller");
const controller_3 = require("../../controller");
const controller_4 = require("../../controller");
const controller_5 = require("../../controller");
const controller_6 = require("../../controller");
const multerConfig_1 = __importDefault(require("../../../utils/multerConfig"));
exports.default = (dependencies) => {
    const router = (0, express_1.default)();
    // ===============================================================================================
    // USER ROUTES
    // ===============================================================================================
    const { loginController, registerController, verifyOtpController, logoutController, resendOtpController, findDoctorController, updatePatientProfileController, viewDoctorDetailsController, generateOtpController, getAvailableSlotController, bookAppointmentController, createPaymentIntentController, loadSuccessController, searchDoctrsController, checkOTPController, appointmentDetailsController, changePasswordController, updateEmailController, sendMessegesController, createConverstationController, getConverstationByIdController, getConverstationsController, getConsultCallStatusController, forgotPasswordController, getSearchQueryController, downloadPrescriptionController } = (0, controller_1.UserController)(dependencies);
    router.post('/login', loginController);
    router.post('/register', registerController);
    router.post('/verifyOtp', verifyOtpController);
    router.get('/logout', logoutController);
    router.get('/resendOtp', resendOtpController);
    router.get('/findDoctor', findDoctorController);
    router.post('/updatePatientProfile', multerConfig_1.default.single('image'), updatePatientProfileController);
    router.get('/viewDoctorDetails/:id', viewDoctorDetailsController);
    router.get('/getAvailableSlot/:id', getAvailableSlotController);
    router.post('/generateOtp', generateOtpController);
    router.post('/bookAppointment', bookAppointmentController);
    router.post('/create-payment-intent', createPaymentIntentController);
    router.post('/loadSuccess', loadSuccessController);
    router.post('/checkOTP', checkOTPController);
    router.post('/searchDoctrs', searchDoctrsController);
    router.post('/appointmentDetails', appointmentDetailsController);
    router.post('/changePassword', changePasswordController);
    router.post('/forgotPassword', forgotPasswordController);
    router.post('/updateEmail', updateEmailController);
    router.post('/sendMesseges', sendMessegesController);
    router.post('/createConverstation', createConverstationController);
    router.get('/getConverstationById', getConverstationByIdController);
    router.get('/getConverstations', getConverstationsController);
    router.get('/getConsultCallStatus', getConsultCallStatusController);
    router.get("/getSearchQuery", getSearchQueryController);
    router.post('/downloadPrescription', downloadPrescriptionController);
    // ===============================================================================================
    // DOCTOR ROUTES
    // ===============================================================================================
    const { doctorRegisterController, doctorVerifyOtpController, doctorLoginController, doctorLogoutController, kycController, updateDoctorProfileController, googleRegisterController, addSlotController, showAppoinmentsController, getAlreadyScheduledSlotesController, getDoctorConverstationByIdController, doctorSendMessegesController, getDoctorConverstationsController, getKycStatusController, getAppoinmentDetailsController, getConvetsationIdForVideoCallController, addPrescriptionController, updateConsultCallStatusController, changePasswordForDocController, forgotPasswordForDocController, updateEmailFORDOCController, uploadImageController } = (0, controller_3.doctorController)(dependencies);
    router.post('/doctorRegister', doctorRegisterController);
    router.post('/doctorLogin', doctorLoginController);
    router.post('/doctorVerifyOtp', doctorVerifyOtpController);
    router.get('/doctorLogout', doctorLogoutController);
    router.post('/kycAuth', kycController);
    router.post('/updateDoctorProfile', multerConfig_1.default.single('image'), updateDoctorProfileController);
    router.get('/google', googleRegisterController);
    // router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));
    router.post('/addSlot', addSlotController);
    router.post('/showAppoinments', showAppoinmentsController);
    router.post('/getAlreadyScheduledSlotes', getAlreadyScheduledSlotesController);
    router.get('/getConverstationById', getDoctorConverstationByIdController);
    router.post('/sendFromDocMesseges', doctorSendMessegesController);
    router.get('/getDoctorConverstations', getDoctorConverstationsController);
    // router.post('/handleDeleteForScheduledSlot',handleDeleteForScheduledSlotController)
    router.post('/getKycStatus', getKycStatusController);
    router.post('/getAppoinmentDetails', getAppoinmentDetailsController);
    router.post('/getConvetsationIdForVideoCall', getConvetsationIdForVideoCallController);
    router.post('/addPrescription', addPrescriptionController);
    router.post('/handleLeave', updateConsultCallStatusController);
    router.post('/changePasswordForDoc', changePasswordForDocController);
    router.post('/forgotPasswordForDoc', forgotPasswordForDocController);
    router.post('/updateEmailFORDOC', updateEmailFORDOCController);
    router.post('/upload', uploadImageController);
    // ===============================================================================================
    // ADMIN ROUTES
    // ===============================================================================================
    const { adminLoginController, adminLogoutController } = (0, controller_2.adminAuthController)(dependencies);
    router.post('/admin', adminLoginController);
    router.get('/adminHome', adminLoginController);
    router.post('/adminLogout', adminLogoutController);
    // ========== //  
    const { adminUserController, handleUserBlockController } = (0, controller_4.adminPatientController)(dependencies);
    router.get('/getAllUsers', adminUserController);
    router.put('/handleUserBlock/:userId', handleUserBlockController);
    // ========== //
    const { adminDoctorListingController, getKycDetailsController, kycStatusController, handleDoctorBlockController } = (0, controller_5.adminDoctorController)(dependencies);
    router.get('/getAllDoctors', adminDoctorListingController);
    router.get('/getKycDetails/:doctorId', getKycDetailsController);
    router.put('/kycStatus/:doctorId', kycStatusController);
    router.put('/handleDoctorBlock/:doctorId', handleDoctorBlockController);
    const { getAllAppoinmentsController } = (0, controller_6.adminDashBoardController)(dependencies);
    router.get('/getAllAppoinments', getAllAppoinmentsController);
    return router;
};
