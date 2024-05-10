"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const database_1 = require("../database");
const Schema_1 = __importDefault(require("../database/Schema"));
let otp;
exports.default = {
    finduser: async (email) => {
        try {
            console.log("finding User");
            const finduser = await database_1.DatabaseSchema.User.findOne({
                email: email,
            });
            ;
            if (finduser) {
                return { status: true, user: finduser };
            }
            else {
                return { status: false };
            }
        }
        catch (error) {
            console.log("error in repositery authencation repo in userEmailexist", error);
        }
    },
    createUser: async (data) => {
        // console.log(data,"createUserdata");
        try {
            const { name, email, password } = data;
            const user = new database_1.DatabaseSchema.User({
                name,
                email,
                password
            });
            // Uncomment the following lines if you want to save the user to the database
            const response = await user.save();
            if (response) {
                return { status: true, data: response };
            }
            else {
                return { status: false, message: "user login failed" };
            }
        }
        catch (error) {
            console.log("error in repository authentication repo in create user ", error);
        }
    },
    getUserByEmail: async (data) => {
        try {
            const { email } = data;
            const user = await database_1.DatabaseSchema.User.findOne({
                email: email,
            });
            return user;
        }
        catch (error) {
            console.error('Error in getUserByEmail:', error);
            throw error;
        }
    },
    getUserByEmailForRegister: async (data) => {
        try {
            const { email } = data;
            console.log(`Email to query: ${email}`);
            const user = await database_1.DatabaseSchema.User.findOne({
                email: email,
            });
            console.log(user, "usermmmmmmmmmmmmmmmmm");
            if (user) {
                console.log("User found:", user); // Confirm if a user is actually found
                return { data: user };
            }
            else {
                console.log("No user found"); // Check if this gets logged when there's no user
                return { status: false };
            }
        }
        catch (error) {
            console.error('Error in getUserByEmail:', error);
            throw error;
        }
    },
    updatePatientProfile: async (data) => {
        try {
            const { name, email, phone, gender, street, city, state, bloodGroup, image, age, dob } = data;
            // Find the doctor by email
            const findUser = await database_1.DatabaseSchema.User.findOne({ email });
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
                const existingAddressIndex = findUser.address.findIndex((addr) => addr.street === street &&
                    addr.city === city &&
                    addr.state === state);
                if (existingAddressIndex !== -1) {
                    // If address exists, update it
                    findUser.address[existingAddressIndex].street = street;
                    findUser.address[existingAddressIndex].city = city;
                    findUser.address[existingAddressIndex].state = state;
                }
                else {
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
            }
            else {
                return { status: false, message: 'User not found' };
            }
        }
        catch (error) {
            console.error('Error in update User Profile repo:', error);
            return { status: false, message: 'Error updating doctor profile' };
        }
    },
    getAllDetailsOfDoctor: async (id) => {
        try {
            const doctor = await database_1.DatabaseSchema.Doctor.findById(id);
            if (doctor) {
                // Doctor found, return the details
                return { status: true, data: doctor };
            }
            else {
                // Doctor not found
                return { status: false, message: "Doctor not found" };
            }
        }
        catch (error) {
            console.log(error, "error in getAllDetailsOfDoctor in user repo");
            return { status: false, message: "Error fetching doctor details" };
        }
    },
    getAvailableSlot: async (id) => {
        try {
            const slots = await database_1.DatabaseSchema.Slot.find({ doctor: id });
            if (slots) {
                return { status: true, data: slots };
            }
            else {
                return { status: false, message: "Doctor not found" };
            }
        }
        catch (error) {
            console.log(error, "error in getAvailableSlot repo");
        }
    },
    bookAppointment: async (data) => {
        try {
            const { doctorEmail, selectedDate, selectedTime } = data;
            const doctor = await database_1.DatabaseSchema.Doctor.findOne({ email: doctorEmail });
            if (!doctor) {
                throw new Error("Doctor not found");
            }
            const existingAppointment = await database_1.DatabaseSchema.Appointment.findOne({
                doctorId: doctor._id,
                date: selectedDate,
                time: selectedTime,
            });
            if (existingAppointment) {
                return { status: false, data: "Another patient already booked at the same time and date" };
            }
            const time = await database_1.DatabaseSchema.Slot.find({ slotTime: selectedTime });
            return { status: true, data: { doctor, time, selectedDate } };
        }
        catch (error) {
            console.log(error, "error in getDataForCheckout repo");
            return { status: false, message: "Error retrieving data for checkout" };
        }
    },
    checkOTP: async (data) => {
        try {
            const { otp, email } = data;
            const user = await database_1.DatabaseSchema.User.findOne({
                email: email,
            });
            return { status: true, data: "Otp Verification Success" };
        }
        catch (error) {
            console.log(error, "error in checkOTP repo");
        }
    },
    loadSuccess: async (data) => {
        try {
            const { userId, doctorId, date, time } = data;
            // Create a new appointment instance
            const newAppointment = new database_1.DatabaseSchema.Appointment({
                userId: userId,
                doctorId: doctorId,
                date: date,
                time: time,
            });
            const savedAppointment = await newAppointment.save();
            return { status: true, data: savedAppointment };
        }
        catch (error) {
            console.log(error, "error in loadSuccess repo");
        }
    },
    searchDoctors: async (searchParams) => {
        try {
            const doctors = await database_1.DatabaseSchema.Doctor.find({
                name: { $regex: new RegExp(searchParams.doctorName, 'i') },
                kycStatus: "approved",
            }).exec();
            if (doctors) {
                return { status: true, data: doctors };
            }
            else {
                return { status: false, messege: " search doctor not found" };
            }
        }
        catch (error) {
            console.log(error);
            return { status: false, message: "Error in searchDoctors repository" };
        }
    },
    appointmentDetails: async (data) => {
        try {
            const { userId } = data;
            // Find all appointments for the given user
            const appointments = await database_1.DatabaseSchema.Appointment.find({ userId });
            if (!appointments.length) {
                return { status: false, data: "No Appointments" };
            }
            // Fetch the user details
            const user = await database_1.DatabaseSchema.User.findById(userId);
            // Fetch the doctor details for each appointment
            const doctorDetails = await Promise.all(appointments.map(async (appointment) => {
                // Use the doctorId from the appointment to find the corresponding doctor
                return await database_1.DatabaseSchema.Doctor.findById(appointment.doctorId);
            }));
            // Structure the response to include appointment, doctor, and user details
            const result = appointments.map((appointment, index) => ({
                appointment,
                doctor: doctorDetails[index],
                user,
            }));
            return { status: true, data: result };
        }
        catch (error) {
            console.error("Error in appointmentDetails:", error);
            return { status: false, message: "Error fetching appointment details." };
        }
    },
    changePassword: async (data) => {
        try {
            const { email, currentPassword, hashedNewPassword } = data;
            console.log("uiui", data);
            // Find the user by email
            const user = await database_1.DatabaseSchema.User.findOne({ email: email });
            console.log(user, "user in repo");
            if (user) {
                // Update the password field
                user.password = hashedNewPassword;
                // Save the updated user
                await user.save();
                return { status: true, data: "Password changed successfully" };
            }
            else {
                // Return false if user is not found
                return { status: false, data: "User not found" };
            }
        }
        catch (error) {
            // Log and handle errors
            console.log(error, "error in changing password repo");
            return { status: false, data: "Internal Server Error" };
        }
    },
    updateEmail: async (data) => {
        try {
            const { email, newEmail } = data;
            console.log(newEmail, "ppp");
            const user = await database_1.DatabaseSchema.User.findOne({ email: email });
            console.log(user, "user in repo");
            if (user) {
                user.email = newEmail;
                await user.save();
                return { status: true, data: user };
            }
            else {
                return { status: false, data: "Email Updating failed" };
            }
        }
        catch (error) {
            console.log(error, "error in update email repo");
            return { status: false, data: "Password updation failed" };
        }
    },
    sendMesseges: async (data) => {
        try {
            const { content, recieverId, senderId, type, converstationId } = data;
            const message = new database_1.DatabaseSchema.Messages({
                converstationId: converstationId,
                content: content,
                senderId: senderId,
                receiverId: recieverId,
                type: type,
            });
            const responce = await message.save();
            if (responce) {
                return { status: true, data: data };
            }
            else {
                return { status: true, message: "Message failed..!" };
            }
        }
        catch (error) {
            console.log(error);
            return { status: true, message: `something went wrong failed ${error}` };
        }
    },
    sendAudio: async (data) => {
        try {
            const { recieverId, senderId, type, converstationId, timestamp, content } = data;
            console.log(data, "updatedData=========================");
            const message = new database_1.DatabaseSchema.Messages({
                converstationId: converstationId,
                content: content,
                senderId: senderId,
                receiverId: recieverId,
                type: type,
            });
            const responce = await message.save();
            console.log(responce, "saved");
            if (responce) {
                return { status: true, data: responce };
            }
            else {
                return { status: true, message: "Message failed..!" };
            }
        }
        catch (error) {
            console.log(error);
            return { status: true, message: `something went wrong failed ${error}` };
        }
    },
    sendImage: async (data) => {
        try {
            const { recieverId, senderId, type, converstationId, timestamp, content } = data;
            console.log(data, "updatedData==== iamge =====================");
            const message = new database_1.DatabaseSchema.Messages({
                converstationId: converstationId,
                content: content,
                senderId: senderId,
                receiverId: recieverId,
                type: type,
                timestamp
            });
            const responce = await message.save();
            console.log(responce, "saved");
            if (responce) {
                return { status: true, data: responce };
            }
            else {
                return { status: true, message: "image auload  failed..!" };
            }
        }
        catch (error) {
            console.log(error);
            return { status: true, message: `something went wrong failed ${error}` };
        }
    },
    createConversation: async (data) => {
        try {
            const { senderId, recieverId } = data;
            console.log(data, "dtyt");
            // Check if conversation already exists between senderId and recieverId
            const existingConversation = await database_1.DatabaseSchema.Conversation.findOne({
                members: {
                    $elemMatch: {
                        doctorId: recieverId,
                        userId: senderId
                    }
                }
            });
            if (existingConversation) {
                return { status: true, data: existingConversation };
            }
            else {
                // Conversation does not exist, create a new conversation
                const conversation = new database_1.DatabaseSchema.Conversation({
                    members: [
                        {
                            doctorId: recieverId,
                            userId: senderId
                        }
                    ]
                });
                const response = await conversation.save();
                // console.log(response,"res");
                if (response) {
                    return { status: true, data: response };
                }
                else {
                    return { status: false, message: "No conversation created..!" };
                }
            }
        }
        catch (error) {
            return { status: false, message: `Something went wrong: ${error}` };
        }
    },
    getConverstationById: async (data) => {
        try {
            const { id } = data;
            const response = await database_1.DatabaseSchema.Messages.find({ converstationId: id });
            if (response) {
                return { status: true, data: response };
            }
            else {
                return { status: false, message: "Messages not found ..!" };
            }
        }
        catch (error) {
            console.log(error);
            return { status: false, message: `Messages not found ..!${error}` };
        }
    },
    getConverstation: async (data) => {
        try {
            const { id } = data;
            console.log(id, 'id');
            // Find conversations where the senderId matches the given id
            const conversations = await database_1.DatabaseSchema.Conversation.find({ "members.userId": id });
            // Array to store objects containing both doctor and conversation details
            const doctorConversations = [];
            for (let i = 0; i < conversations.length; i++) {
                // Get the receiverId from the conversation object
                const receiverId = conversations[i].members[0].doctorId;
                // Find the doctor details based on the receiverId
                const doctor = await database_1.DatabaseSchema.Doctor.findById(receiverId);
                // Construct an object containing both doctor and conversation details
                const doctorConversation = {
                    doctor: doctor,
                    conversation: conversations[i]
                };
                // Push the object to the array
                doctorConversations.push(doctorConversation);
            }
            if (doctorConversations.length > 0) {
                return { status: true, data: doctorConversations };
            }
            else {
                return { status: true, data: [] };
            }
        }
        catch (error) {
            console.error(error);
            return { status: false, message: "An error occurred while fetching conversations" };
        }
    },
    getConsultCallStatus: async (data) => {
        const { userId } = data;
        try {
            const response = await database_1.DatabaseSchema.Consult.find({ userId: userId, read: false });
            if (response) {
                if (response.length > 0) {
                    return { status: true, data: response };
                }
                else {
                    return { status: true, data: [] };
                }
            }
            else {
                return { status: false, message: "getitng the consult data error" };
            }
        }
        catch (error) {
            return { status: false, message: `Something went wrong ${error}` };
        }
    },
    forgotPassword: async (data) => {
        try {
            console.log("hai ");
            const { email, hashedNewPassword } = data;
            const user = await database_1.DatabaseSchema.User.findOne({ email: email });
            console.log(user, "user  user");
            if (user) {
                user.password = hashedNewPassword;
                await user.save();
                return { status: true, data: " password Updated succesfully " };
            }
            else {
                return { status: false, data: " something went wrong " };
            }
        }
        catch (error) {
            console.log(error);
            return { status: false, data: " something went wrong " };
        }
    },
    getSearchQuery: async (data) => {
        const { query } = data;
        try {
            if (query == "") {
                return { status: true, data: [] };
            }
            const response = await database_1.DatabaseSchema.Doctor.find({
                kycStatus: "approved",
                $or: [
                    { name: { $regex: "^" + query, $options: "i" } },
                    { specialization: { $regex: "^" + query, $options: "i" } }
                ]
            });
            if (response) {
                return { status: true, data: response };
            }
            else {
                return { status: false, message: "Search data not found ..!" };
            }
        }
        catch (error) {
            return { status: false, message: `Something went wrong ...!${error}` };
        }
    },
    downloadPrescription: async (data) => {
        try {
            const { appoinmentId } = data;
            const prescription = await Schema_1.default.Prescription.findOne({
                appointmentId: appoinmentId,
            });
            if (!prescription) {
                return { status: false, data: [] };
            }
            // Extract the doctorId and userId from the found prescription
            const { doctorId, userId } = prescription;
            // Find the doctor separately using the doctorId
            const doctor = await Schema_1.default.Doctor.findById(doctorId);
            if (!doctor) {
                return { status: false, message: "Doctor not found." };
            }
            // Find the user separately using the userId
            const user = await Schema_1.default.User.findById(userId);
            if (!user) {
                return { status: false, message: "User not found." };
            }
            // Return all related information
            return {
                status: true,
                message: "Prescription, doctor, and user found.",
                data: {
                    prescription,
                    doctor,
                    user,
                },
            };
        }
        catch (error) {
            console.log(error);
        }
    }
};
