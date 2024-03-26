
import randomstring from 'randomstring';
import {AuthenticationSchema} from '../database'
import { log } from 'console';



let otp: string;
  

   export default {
  
  finduser: async (email: any) => {
    try {
      console.log("finding User");
      
      const finduser = await AuthenticationSchema.User.findOne({
        email: email,
      });
      ;
      if (finduser) {
        return { status: true, user: finduser };
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


  createUser:async(data:any)=>{
    // console.log(data,"createUserdata");
    
    try {
      const { name, email, password} = data;
  
  
      
  
      const user = new AuthenticationSchema.User({
        name,
        email,
        password
      });
  
      // Uncomment the following lines if you want to save the user to the database
      const response = await user.save();
      if (response) {
          return { status: true, data: response };
      } else {
          return { status: false, message: "user login failed" };
      }
  
    
    } catch (error) {
      console.log("error in repository authentication repo in create user ", error);
    }
  },
  
  getUserByEmail : async (email:any) => {
    try {
      const user = await AuthenticationSchema.User.findOne({
        email: email,
      });
      return user;
    } catch (error) {
      console.error('Error in getUserByEmail:', error);
      throw error;
    }
  },


  updatePatientProfile: async (data: any) => {
    try {
      const { name, email, phone, gender, street, city, state, bloodGroup, image, age, dob } = data;

      // Find the doctor by email
      const findUser = await AuthenticationSchema.User.findOne({ email });

      if (findUser) {
        // Update doctor's profile fields
        findUser.name = name;
        findUser.email = email;
        findUser.phone = phone;
        findUser.gender = gender;
        findUser.bloodGroup = bloodGroup;
        findUser.image = image;
        findUser.age = age;
        findUser.dob = dob;

        // Check if the address already exists
        const existingAddressIndex = findUser.address.findIndex(addr =>
          addr.street === street &&
          addr.city === city &&
          addr.state === state 
        );

        if (existingAddressIndex !== -1) {
          // If address exists, update it
          findUser.address[existingAddressIndex].street = street;
          findUser.address[existingAddressIndex].city = city;
          findUser.address[existingAddressIndex].state = state;
        } else {
          // If address doesn't exist, create a new one and add it to the array
          const newAddress = {
            street: street,
            city: city,
            state: state,
          };
          findUser.address.push(newAddress);
        }

        // Save the changes to the database
        await findUser.save();

        console.log(findUser, "true");

        return { status: true, data: findUser };
      } else {
        return { status: false, message: 'User not found' };
      }
    } catch (error) {
      console.error('Error in update User Profile repo:', error);
      return { status: false, message: 'Error updating doctor profile' };
    }
  },



  getAllDetailsOfDoctor: async (id: string) => {
    try {
        const doctor = await AuthenticationSchema.Doctor.findById(id);
        console.log(doctor,"doctor kitti")
        if (doctor) {
            // Doctor found, return the details
            return { status: true, data:doctor };
        } else {
            // Doctor not found
            return { status: false, message: "Doctor not found" };
        }
    } catch (error) {
        console.log(error, "error in getAllDetailsOfDoctor in user repo");
        return { status: false, message: "Error fetching doctor details" };
    }
}






























};






