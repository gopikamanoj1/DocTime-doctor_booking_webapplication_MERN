import authController from "./user/authController";
import adminAuthController from "./admin/adminAuthController";
import doctorAuthController from "./doctor/doctorAuthController"
import adminPatientController from "./admin/adminPatientController";
import adminDoctorController from "./admin/adminDoctorController";


export {

    // AUTH
    authController,
    adminAuthController ,
    doctorAuthController,

    // Listing of Pateint and Doctor
    adminPatientController,
    adminDoctorController

   

    
}