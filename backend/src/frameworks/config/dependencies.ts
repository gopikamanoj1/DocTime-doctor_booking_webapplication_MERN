import { userRepositery } from '../repository'
import { adminRepository } from '../repository'
import { doctorRepositery } from '../repository'


import {
    loginUseCase, registerUseCase, verifyOtpUseCase, findDoctorUseCase, updatePatientProfileUseCase,
    viewDoctorDetailsUseCase, generateOtpUseCase, getAvailableSlotUseCase, bookAppointmentUseCase, loadSuccessUseCase,
    searchDoctrsUseCase, checkOTPUseCase, appointmentDetailsUseCase, changePasswordUseCase, updateEmailUseCase,
    sendMessegesUseCase, createConverstationUseCase, getConverstationByIdUseCase, getConverstationsUseCase,getConsultCallStatusUseCase,forgotPasswordUseCase,getSearchQueryUseCase
} from '../../application/UseCases'


import {
    doctorRegisterUseCase, getDoctorConverstationByIdUseCase, doctorSendMessegesUseCase, getDoctorConverstationsUseCase,
    doctorVerifyOtpUseCase, doctorLoginUseCase, doctorLogoutUseCase, kycUseCase, updateDoctorProfileUseCase, addSlotUseCase,
    showAppoinmentsUseCase, getAlreadyScheduledSlotesUseCase,getKycStatusUseCase,getAppoinmentDetailsUseCase,getConvetsationIdForVideoCallUseCase,
    addPrescriptionUseCase,createConsultuseCase,updateConsultCallStatusUseCase,changePasswordForDocUseCase,forgotPasswordForDocUseCase,updateEmailForDOCUseCase
} from '../../application/UseCases'

import {
    adminLoginUseCase, adminUserUseCase, adminDoctorUseCase, getKycDetailsUseCase, kycStatusUseCase, googleRegisterUseCase,
    handleUserBlockUseCase,handleDoctorBlockUseCase,adminLogoutUseCase,getAllAppoinmentsUseCase
} from '../../application/UseCases'











const useCase: any = {
    loginUseCase,
    registerUseCase,
    verifyOtpUseCase,
    adminLoginUseCase,
    doctorRegisterUseCase,
    doctorVerifyOtpUseCase,
    doctorLoginUseCase,
    doctorLogoutUseCase,
    kycUseCase,
    adminUserUseCase,
    adminDoctorUseCase,
    getKycDetailsUseCase,
    kycStatusUseCase,
    updateDoctorProfileUseCase,
    findDoctorUseCase,
    googleRegisterUseCase,
    updatePatientProfileUseCase,
    viewDoctorDetailsUseCase,
    generateOtpUseCase,
    addSlotUseCase,
    getAvailableSlotUseCase,
    bookAppointmentUseCase,
    loadSuccessUseCase,
    searchDoctrsUseCase,
    checkOTPUseCase,
    appointmentDetailsUseCase,
    showAppoinmentsUseCase,
    getAlreadyScheduledSlotesUseCase,
    changePasswordUseCase,
    updateEmailUseCase,
    sendMessegesUseCase,
    createConverstationUseCase,
    getConverstationByIdUseCase,
    getConverstationsUseCase,
    getDoctorConverstationByIdUseCase,
    doctorSendMessegesUseCase,
    getDoctorConverstationsUseCase,
    handleUserBlockUseCase,
    handleDoctorBlockUseCase,
    adminLogoutUseCase,
    getKycStatusUseCase,
    getAppoinmentDetailsUseCase,
    getConvetsationIdForVideoCallUseCase,
    addPrescriptionUseCase,
    getAllAppoinmentsUseCase,
    createConsultuseCase,
    getConsultCallStatusUseCase,
    updateConsultCallStatusUseCase,
    forgotPasswordUseCase,
    getSearchQueryUseCase,
    changePasswordForDocUseCase,
    forgotPasswordForDocUseCase,
    updateEmailForDOCUseCase











}


const repositery: any = {
    userRepositery,
    adminRepository,
    doctorRepositery

}


export default {
    useCase, repositery
}
