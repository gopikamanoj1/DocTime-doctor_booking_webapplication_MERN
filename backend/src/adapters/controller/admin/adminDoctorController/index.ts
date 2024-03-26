import adminDoctorListingController from './adminDoctorListingController'
import getKycDetailsController from './getKycDetailsController'
import kycStatusController from './kycStatusController'


export default (dependencies:any)=>{
    return {
   
        adminDoctorListingController:adminDoctorListingController(dependencies),
        getKycDetailsController:getKycDetailsController(dependencies),
        kycStatusController:kycStatusController(dependencies)
   
    }
   
   }