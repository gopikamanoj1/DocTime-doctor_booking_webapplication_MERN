
import randomstring from 'randomstring';
import { AuthenticationSchema } from '../database'




let otp: string;


export default {

  findDoctor: async (email: any) => {
    try {
      console.log("finding Doctor");

      const findDoctor = await AuthenticationSchema.Doctor.findOne({
        email: email,
      });



      console.log(findDoctor, "findDoctorfindDoctor");

      if (findDoctor) {
        return { status: true, user: findDoctor };
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


  createDoctor: async (data: any) => {
    try {
      const { name, email, password } = data;

      const doctor = new AuthenticationSchema.Doctor({
        name,
        email,
        password
      });

      const response = await doctor.save();
      if (response) {
        return { status: true, data: response };
      } else {
        return { status: false, message: "user login failed" };
      }
    } catch (error) {
      console.log("error in repository authentication repo in create user ", error);
    }
  },

  getDoctorByEmail: async (email: any) => {
    try {
      const doctor = await AuthenticationSchema.Doctor.findOne({
        email: email,
      });
      return doctor;
    } catch (error) {
      console.error('Error in getUserByEmail:', error);
      throw error;
    }
  },


  kycAuth: async (data: any) => {
    try {
      console.log(data, "repo data");

      if (!data) {
        console.error('Data is undefined');
        return { status: false, message: 'Data is undefined' };
      }

      const { email, kycDetails } = data;

      const doctor = await AuthenticationSchema.Doctor.findOne({ email });

      if (!doctor) {
        console.error('Doctor not found');
        return { status: false, message: 'Doctor not found' };
      }

      // Push each kycDetails object individually into the kycDetails array
      kycDetails.forEach((detail: any) => {
        doctor.kycDetails.push(detail);
      });

      const response = await doctor.save();
      console.log(response, "kiokookokokoko");

      if (response) {
        return { status: true, data: response };
      } else {
        return { status: false, message: 'KYC submission failed' };
      }
    } catch (error) {
      console.error('Error in kycAuth:', error);
      return { status: false, message: 'Internal Server Error' };
    }
  },


  updateDoctorProfile: async (data: any) => {
    try {
      const { name, email, phone, specialization, street, city, state, zipcode, fees, image, age, dob } = data;

      // Find the doctor by email
      const findDoctor = await AuthenticationSchema.Doctor.findOne({ email });

      if (findDoctor) {
        // Update doctor's profile fields
        findDoctor.name = name;
        findDoctor.email = email;
        findDoctor.phone = phone;
        findDoctor.fees = fees;
        findDoctor.specialization = specialization;
        findDoctor.image = image;
        findDoctor.age = age;
        findDoctor.dob = dob;

        // Check if the address already exists
        const existingAddressIndex = findDoctor.address.findIndex(addr =>
          addr.street === street &&
          addr.city === city &&
          addr.state === state &&
          addr.zipCode === zipcode
        );

        if (existingAddressIndex !== -1) {
          // If address exists, update it
          findDoctor.address[existingAddressIndex].street = street;
          findDoctor.address[existingAddressIndex].city = city;
          findDoctor.address[existingAddressIndex].state = state;
          findDoctor.address[existingAddressIndex].zipCode = zipcode;
        } else {
          // If address doesn't exist, create a new one and add it to the array
          const newAddress = {
            street: street,
            city: city,
            state: state,
            zipCode: zipcode
          };
          findDoctor.address.push(newAddress);
        }

        // Save the changes to the database
        await findDoctor.save();

        console.log(findDoctor, "true");

        return { status: true, data: findDoctor };
      } else {
        return { status: false, message: 'Doctor not found' };
      }
    } catch (error) {
      console.error('Error in updateDoctorProfile repo:', error);
      return { status: false, message: 'Error updating doctor profile' };
    }
  },

  getAllDoctors: async () => {
    try {
      const Doctors = await AuthenticationSchema.Doctor.find({ kycStatus: 'approved' });
      console.log(Doctors, "funnnnnnn");

      if (Doctors) {
        return { status: true, doctors: Doctors };
      } else {
        return { status: false };
      }
    } catch (error) {
      console.log(error);

    }
  },

























};






