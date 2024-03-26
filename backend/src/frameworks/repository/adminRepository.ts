import { log } from 'console';
import { AuthenticationSchema } from '../database'



export default {

  findAdmin: async (email: any) => {
    try {
      console.log("finding Admin");


      const findadmin = await AuthenticationSchema.Admin.findOne({
        email: email

      });

      console.log(findadmin, "findadminfindadmin");

      if (findadmin) {
        return { status: true, user: findadmin };
      } else {
        return { status: false };
      }
    } catch (error) {
      console.log(
        "error in repositery authencation repo in userEmailexist",
        error
      );
    }
  },


  getAllUser: async () => {
    try {

      const Users = await AuthenticationSchema.User.find();
      // console.log(Users,"funnnnnnn");

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
      const Doctors = await AuthenticationSchema.Doctor.find();
      console.log(Doctors, "funnnnnnn");

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
      const doctor = await AuthenticationSchema.Doctor.findById(doctorId)

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
      const doctor = await AuthenticationSchema.Doctor.findById(doctorId)

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
  }















}