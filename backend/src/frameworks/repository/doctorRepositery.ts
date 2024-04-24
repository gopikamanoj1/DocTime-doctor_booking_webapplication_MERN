
import randomstring from 'randomstring';
import { DatabaseSchema } from '../database'

let otp: string;

export default {

  findDoctor: async (email: any) => {
    try {
      console.log("finding Doctor");
      const findDoctor = await DatabaseSchema.Doctor.findOne({
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


  getkycStatus:async (data:any)=>{
    try {
      const {id}=data
      const  doctor=await DatabaseSchema.Doctor.findById(id)
    if(doctor){
      const kycStatus=doctor.kycStatus

      console.log(kycStatus,"kyc status");
      
      return {status:true,data:kycStatus}
    }else{
      return { status:false, data:"error in getting kyc status"}
    } 
    } catch (error) {
      console.log("error",error);
      
    }
  },
  
  createDoctor: async (data: any) => {
    try {
      const { name, email, password } = data;

      const doctor = new DatabaseSchema.Doctor({
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
      const doctor = await DatabaseSchema.Doctor.findOne({
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

      const doctor = await DatabaseSchema.Doctor.findOne({ email });

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
      const findDoctor = await DatabaseSchema.Doctor.findOne({ email });

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
      const Doctors = await DatabaseSchema.Doctor.find({ kycStatus: 'approved' });

      if (Doctors) {
        return { status: true, doctors: Doctors };
      } else {
        return { status: false };
      }
    } catch (error) {
      console.log(error);

    }
  },


  addSlot: async (data: any) => {
    try {
      const { doctorId, startDate, endDate, slotTime } = data;

      // Check if slot with the same doctor, startDate, and endDate already exists
      const existingSlot = await DatabaseSchema.Slot.findOne({
        doctor: doctorId,
        startDate,
        endDate
      });

      if (existingSlot) {
        // Update the slotTime array if slot already exists
        existingSlot.slotTime = [...new Set([...existingSlot.slotTime, ...slotTime])];
        await existingSlot.save();
        return { status: true, message: 'Slots updated successfully' };
      } else {
        // Create a new slot if it doesn't exist
        const slot = new DatabaseSchema.Slot({
          doctor: doctorId,
          startDate,
          endDate,
          slotTime
        });
        await slot.save();
        return { status: true, message: 'Slots added successfully' };
      }
    } catch (error) {
      console.log(error, "error in add slot repository");
      return { status: false, message: 'Error adding slots' };
    }
  },




  appointmentList: async (data: any) => {
    try {
      const { doctorId } = data

      const appointment = await DatabaseSchema.Appointment.findOne({ doctorId: doctorId });

      if (appointment) {

        const doctor = await DatabaseSchema.Doctor.findById(appointment?.doctorId)
        const user = await DatabaseSchema.User.findById(appointment?.userId)
        return { status: true, data: { appointment, doctor, user } }
      }
      else {
        return { status: false, data: "No Appoinments" }
      }
    } catch (error) {
      console.log(error, "error in appoinment data repo");
    }
  },



  getAlreadyScheduledSlotes: async (data: any) => {
    try {
      const { doctorId } = data
      const appointments = await DatabaseSchema.Slot.find({ doctor: doctorId });
      console.log(appointments, "hyhy");
      if (appointments) {
        return { status: true, data: appointments }

      } else {
        return { status: false, data: "No Scheduled Slotes" }

      }

    } catch (error) {
      console.log(error, "error in getAlreadyScheduledSlotes repository ");

    }
  },

  getConverstationById: async (data: any) => {
    try {
      const { id } = data
      const response = await DatabaseSchema.Messages.find({ converstationId: id })
      if (response) {
        return { status: true, data: response }
      } else {
        return { status: false, message: "Messages not found ..!" }
      }
    } catch (error) {
      console.log(error);
      return { status: false, message: `Messages not found ..!${error}` }
    }
  },




  getDoctorConverstation: async (data: any) => {
    try {
      const { id } = data


      const conversation: any = await DatabaseSchema.Conversation.find({ "members.doctorId": id })

      

      const userConversations: any = [];
      for (let i = 0; i < conversation.length; i++) {

        const userId = conversation[i].members[0].userId;
       

        const user: any = await DatabaseSchema.User.findById(userId);
          // Construct an object containing both doctor and conversation details
          const userConversation = {
            user: user,
            conversation: conversation[i]
          };

        userConversations.push(userConversation);
      }

      if (userConversations.length > 0) {

        return { status: true, data: userConversations }

      }

      else {
        return { status: true, data: "users not Found" }
      }
    } catch (error) {
      console.log(error);

    }
  },


  
  getAppoinmentDetails: async (data:any)=>{
    try {
      const { id } = data; // Extract the doctorId from the data object
      const appointments = await DatabaseSchema.Appointment.find({ doctorId: id }); // Use 'find' with query object
      
      if (appointments.length > 0) {
        console.log(appointments, "Appointments");
        return { status: true, data: appointments }; // Return all matching appointments
      } else {
        return { status: false, data: "No appointments found" }; // If no appointments are found
      }
    } catch (error) {
      console.error(error); 
      return { status: false, data: "An error occurred while fetching appointments" }; 
  }
},



  getConvetsationIdForVideoCall: async (data:any)=>{
    try {
      const { userId, doctorId}=data

      const response=await DatabaseSchema.Conversation.findOne({
        userId: userId,
        doctorId: doctorId,
      });
      console.log(response,"reddddddddd");
      
      if(response){
        return { status: true , data : response}
      }else{
        return { status: false , messege : "data not found"}
      }
    } catch (error) {
      console.log(error);
      return { status: false , messege : "data not found"}
    }
  }

















};






