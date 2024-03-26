import { userRepositery } from '../repository'
import { adminRepository } from '../repository'
import { doctorRepositery } from '../repository'


import { loginUseCase, registerUseCase, verifyOtpUseCase, findDoctorUseCase,updatePatientProfileUseCase,viewDoctorDetailsUseCase } from '../../application/UseCases'
import { adminLoginUseCase, adminUserUseCase, adminDoctorUseCase, getKycDetailsUseCase, kycStatusUseCase, googleRegisterUseCase } from '../../application/UseCases'
import { doctorRegisterUseCase } from '../../application/UseCases'
import { doctorVerifyOtpUseCase } from '../../application/UseCases'
import { doctorLoginUseCase } from '../../application/UseCases'
import { doctorLogoutUseCase } from '../../application/UseCases'
import { kycUseCase } from '../../application/UseCases'
import { updateDoctorProfileUseCase } from '../../application/UseCases'
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
    viewDoctorDetailsUseCase







}


const repositery: any = {
    userRepositery,
    adminRepository,
    doctorRepositery

}


export default {
    useCase, repositery
}
