import { log } from 'console';
import { DatabaseSchema } from '../database'



export default {
  findAdmin: async (email: any) => {
    try {
      console.log("finding Admin");
      const findadmin = await DatabaseSchema.Admin.findOne({
        email: email
      });
      console.log(findadmin, "findadminfindadmin");
      if (findadmin) {
        return { status: true, data: findadmin };
      } else {
        return { status: false, messege: "Invalid Credentials" };
      }
    } catch (error) {
      console.log(
        "error in repositery authencation repo in userEmailexist",
        error
      );
    }
  },

  adminLogout :async (email:string)=>{
    try {
      const response=await DatabaseSchema.Admin.findOne({email:email})
      if(response){
        return {status:true, data:response}
      }else{
        return {status:false, mmessege:" error in admin logout "}
      }
    } catch (error) {
      console.log(error);
      return {status:false, mmessege:" error in admin logout "}

      
    }
  },


  getAllUser: async () => {
    try {

      const Users = await DatabaseSchema.User.find();

      if (Users) {
        return { status: true, user: Users };
      } else {
        return { status: false };
      }

    } catch (error) {
      console.log(error);

    }
  }
  ,



  getAllDoctors: async () => {
    try {
      const Doctors = await DatabaseSchema.Doctor.find();

      if (Doctors) {
        return { status: true, doctors: Doctors };
      } else {
        return { status: false };
      }
    } catch (error) {
      console.log(error);

    }
  }
  ,


  getKycDetails: async (doctorId: string) => {
    try {
      const doctor = await DatabaseSchema.Doctor.findById(doctorId)

      if (doctor) {
        return { status: true, doctor: doctor };

      } else {
        return { status: false };

      }

    } catch (error) {
      console.error("Error fetching doctor KYC details:", error);
      throw error; // You can choose to throw the error to handle it elsewhere
    }
  },


  changeKycStatus: async (doctorId: string, newStatus: any) => {
    try {
      const doctor = await DatabaseSchema.Doctor.findById(doctorId)

      if (doctor) {
        doctor.kycStatus = newStatus;
        await doctor.save();
        return { status: true };
      } else {
        return { status: false };
      }

    } catch (error) {
      console.log(error);

    }
  },

  handleUserBlock: async (userId: string) => {
    try {
      const user = await DatabaseSchema.User.findById(userId);
      if (user) {
        user.isBlocked = !user.isBlocked; // Toggle isBlocked
        const response = await user.save();
        if (response) {
          return { status: true, data: response };
        } else {
          return { status: false, message: "User blocking/unblocking failed" };
        }
      } else {
        return { status: false, message: "User not found" };
      }
    } catch (error) {
      console.error("Error in handleUserBlock repository:", error);
      return { status: false, message: "User blocking/unblocking failed" };
    }
  },

  handleDoctorBlock: async (doctorId: any) => {

    try {
      console.log(doctorId, "id");

      const doctor: any = await DatabaseSchema.Doctor.findById(doctorId);
      console.log(doctor, "jijiji");

      if (doctor) {
        doctor.isBlocked = !doctor.isBlocked;
        const response = await doctor.save();
        if (response) {
          return { status: true, data: response };
        } else {
          return { status: false, message: "Doctor blocking/unblocking failed" };
        }
      } else {
        return { status: false, message: "Doctor not found" };
      }
    } catch (error) {
      console.error("Error in handleDoctorBlock repository:", error);
      return { status: false, message: "Doctor blocking/unblocking failed" };
    }
  }

















}