"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const repository_1 = require("../repository");
const repository_2 = require("../repository");
const repository_3 = require("../repository");
const UseCases_1 = require("../../application/UseCases");
const UseCases_2 = require("../../application/UseCases");
const UseCases_3 = require("../../application/UseCases");
const useCase = {
    loginUseCase: UseCases_1.loginUseCase,
    registerUseCase: UseCases_1.registerUseCase,
    verifyOtpUseCase: UseCases_1.verifyOtpUseCase,
    adminLoginUseCase: UseCases_3.adminLoginUseCase,
    doctorRegisterUseCase: UseCases_2.doctorRegisterUseCase,
    doctorVerifyOtpUseCase: UseCases_2.doctorVerifyOtpUseCase,
    doctorLoginUseCase: UseCases_2.doctorLoginUseCase,
    doctorLogoutUseCase: UseCases_2.doctorLogoutUseCase,
    kycUseCase: UseCases_2.kycUseCase,
    adminUserUseCase: UseCases_3.adminUserUseCase,
    adminDoctorUseCase: UseCases_3.adminDoctorUseCase,
    getKycDetailsUseCase: UseCases_3.getKycDetailsUseCase,
    kycStatusUseCase: UseCases_3.kycStatusUseCase,
    updateDoctorProfileUseCase: UseCases_2.updateDoctorProfileUseCase,
    findDoctorUseCase: UseCases_1.findDoctorUseCase,
    googleRegisterUseCase: UseCases_3.googleRegisterUseCase,
    updatePatientProfileUseCase: UseCases_1.updatePatientProfileUseCase,
    viewDoctorDetailsUseCase: UseCases_1.viewDoctorDetailsUseCase,
    generateOtpUseCase: UseCases_1.generateOtpUseCase,
    addSlotUseCase: UseCases_2.addSlotUseCase,
    getAvailableSlotUseCase: UseCases_1.getAvailableSlotUseCase,
    bookAppointmentUseCase: UseCases_1.bookAppointmentUseCase,
    loadSuccessUseCase: UseCases_1.loadSuccessUseCase,
    searchDoctrsUseCase: UseCases_1.searchDoctrsUseCase,
    checkOTPUseCase: UseCases_1.checkOTPUseCase,
    appointmentDetailsUseCase: UseCases_1.appointmentDetailsUseCase,
    showAppoinmentsUseCase: UseCases_2.showAppoinmentsUseCase,
    getAlreadyScheduledSlotesUseCase: UseCases_2.getAlreadyScheduledSlotesUseCase,
    changePasswordUseCase: UseCases_1.changePasswordUseCase,
    updateEmailUseCase: UseCases_1.updateEmailUseCase,
    sendMessegesUseCase: UseCases_1.sendMessegesUseCase,
    createConverstationUseCase: UseCases_1.createConverstationUseCase,
    getConverstationByIdUseCase: UseCases_1.getConverstationByIdUseCase,
    getConverstationsUseCase: UseCases_1.getConverstationsUseCase,
    getDoctorConverstationByIdUseCase: UseCases_2.getDoctorConverstationByIdUseCase,
    doctorSendMessegesUseCase: UseCases_2.doctorSendMessegesUseCase,
    getDoctorConverstationsUseCase: UseCases_2.getDoctorConverstationsUseCase,
    handleUserBlockUseCase: UseCases_3.handleUserBlockUseCase,
    handleDoctorBlockUseCase: UseCases_3.handleDoctorBlockUseCase,
    adminLogoutUseCase: UseCases_3.adminLogoutUseCase,
    getKycStatusUseCase: UseCases_2.getKycStatusUseCase,
    getAppoinmentDetailsUseCase: UseCases_2.getAppoinmentDetailsUseCase,
    getConvetsationIdForVideoCallUseCase: UseCases_2.getConvetsationIdForVideoCallUseCase,
    addPrescriptionUseCase: UseCases_2.addPrescriptionUseCase,
    getAllAppoinmentsUseCase: UseCases_3.getAllAppoinmentsUseCase,
    createConsultuseCase: UseCases_2.createConsultuseCase,
    getConsultCallStatusUseCase: UseCases_1.getConsultCallStatusUseCase,
    updateConsultCallStatusUseCase: UseCases_2.updateConsultCallStatusUseCase,
    forgotPasswordUseCase: UseCases_1.forgotPasswordUseCase,
    getSearchQueryUseCase: UseCases_1.getSearchQueryUseCase,
    changePasswordForDocUseCase: UseCases_2.changePasswordForDocUseCase,
    forgotPasswordForDocUseCase: UseCases_2.forgotPasswordForDocUseCase,
    updateEmailForDOCUseCase: UseCases_2.updateEmailForDOCUseCase,
    downloadPrescriptionUseCase: UseCases_1.downloadPrescriptionUseCase,
    sendAudioUseCase: UseCases_1.sendAudioUseCase,
    sendImageUseCase: UseCases_1.sendImageUseCase
};
const repositery = {
    userRepositery: repository_1.userRepositery,
    adminRepository: repository_2.adminRepository,
    doctorRepositery: repository_3.doctorRepositery
};
exports.default = {
    useCase, repositery
};
