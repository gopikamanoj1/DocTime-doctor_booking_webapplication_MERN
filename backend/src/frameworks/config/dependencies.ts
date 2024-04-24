import { userRepositery } from '../repository'
import { adminRepository } from '../repository'
import { doctorRepositery } from '../repository'


import {
    loginUseCase, registerUseCase, verifyOtpUseCase, findDoctorUseCase, updatePatientProfileUseCase,
    viewDoctorDetailsUseCase, generateOtpUseCase, getAvailableSlotUseCase, bookAppointmentUseCase, loadSuccessUseCase,
    searchDoctrsUseCase, checkOTPUseCase, appointmentDetailsUseCase, changePasswordUseCase, updateEmailUseCase,
    sendMessegesUseCase, createConverstationUseCase, getConverstationByIdUseCase, getConverstationsUseCase
} from '../../application/UseCases'


import {
    doctorRegisterUseCase, getDoctorConverstationByIdUseCase, doctorSendMessegesUseCase, getDoctorConverstationsUseCase,
    doctorVerifyOtpUseCase, doctorLoginUseCase, doctorLogoutUseCase, kycUseCase, updateDoctorProfileUseCase, addSlotUseCase,
    showAppoinmentsUseCase, getAlreadyScheduledSlotesUseCase,getKycStatusUseCase,getAppoinmentDetailsUseCase,getConvetsationIdForVideoCallUseCase
} from '../../application/UseCases'

import {
    adminLoginUseCase, adminUserUseCase, adminDoctorUseCase, getKycDetailsUseCase, kycStatusUseCase, googleRegisterUseCase,
    handleUserBlockUseCase,handleDoctorBlockUseCase,adminLogoutUseCase
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
    getConvetsationIdForVideoCallUseCase











}


const repositery: any = {
    userRepositery,
    adminRepository,
    doctorRepositery

}


export default {
    useCase, repositery
}
