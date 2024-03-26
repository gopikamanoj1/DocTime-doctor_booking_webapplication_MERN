import {
    loginUseCase,
    registerUseCase,
    verifyOtpUseCase,
    logoutUseCase,
    findDoctorUseCase,
    updatePatientProfileUseCase,
    viewDoctorDetailsUseCase
    
} from './authUseCase'



export {
    loginUseCase,
    registerUseCase,
    verifyOtpUseCase,
    logoutUseCase,
    findDoctorUseCase,
    updatePatientProfileUseCase,
    viewDoctorDetailsUseCase


}


// ============================================================================================

import { doctorRegisterUseCase ,doctorVerifyOtpUseCase,doctorLoginUseCase,doctorLogoutUseCase,kycUseCase,updateDoctorProfileUseCase,googleRegisterUseCase} from './doctorUseCase'

export{
    doctorRegisterUseCase,
    doctorVerifyOtpUseCase,
    doctorLoginUseCase,
    doctorLogoutUseCase,
    kycUseCase,
    updateDoctorProfileUseCase,
    googleRegisterUseCase




}


// ======================================================================================
import { adminLoginUseCase,adminUserUseCase,adminDoctorUseCase,getKycDetailsUseCase,kycStatusUseCase} from './adminUseCase'



export{
    adminLoginUseCase,
    adminUserUseCase,
    adminDoctorUseCase,
    getKycDetailsUseCase,
    kycStatusUseCase


    
}