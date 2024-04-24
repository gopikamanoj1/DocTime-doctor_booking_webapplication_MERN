import adminDoctorListingController from './adminDoctorListingController'
import getKycDetailsController from './getKycDetailsController'
import kycStatusController from './kycStatusController'
import handleDoctorBlockController from './handleDoctorBlockController'

export default (dependencies:any)=>{
    return {
   
        adminDoctorListingController:adminDoctorListingController(dependencies),
        getKycDetailsController:getKycDetailsController(dependencies),
        kycStatusController:kycStatusController(dependencies),
        handleDoctorBlockController:handleDoctorBlockController(dependencies),
   
    }
   
   }