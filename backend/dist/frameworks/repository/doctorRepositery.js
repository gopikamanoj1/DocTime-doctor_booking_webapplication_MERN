"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const database_1 = require("../database");
const Schema_1 = __importDefault(require("../database/Schema"));
let otp;
exports.default = {
    findDoctor: (email) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            console.log("finding Doctor");
            const findDoctor = yield database_1.DatabaseSchema.Doctor.findOne({
                email: email,
            });
            console.log(findDoctor, "findDoctorfindDoctor");
            if (findDoctor) {
                return { status: true, user: findDoctor };
            }
            else {
                return { status: false };
            }
        }
        catch (error) {
            console.log("error in repositery authencation repo in userEmailexist", error);
        }
    }),
    getkycStatus: (data) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { id } = data;
            const doctor = yield database_1.DatabaseSchema.Doctor.findById(id);
            if (doctor) {
                const kycStatus = doctor.kycStatus;
                console.log(kycStatus, "kyc status");
                return { status: true, data: kycStatus };
            }
            else {
                return { status: false, data: "error in getting kyc status" };
            }
        }
        catch (error) {
            console.log("error", error);
        }
    }),
    createDoctor: (data) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { name, email, password } = data;
            const doctor = new database_1.DatabaseSchema.Doctor({
                name,
                email,
                password
            });
            const response = yield doctor.save();
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
    }),
    getDoctorByEmail: (email) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const doctor = yield database_1.DatabaseSchema.Doctor.findOne({
                email: email,
            });
            return doctor;
        }
        catch (error) {
            console.error('Error in getUserByEmail:', error);
            throw error;
        }
    }),
    kycAuth: (data) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            console.log(data, "repo data");
            if (!data) {
                console.error('Data is undefined');
                return { status: false, message: 'Data is undefined' };
            }
            const { email, kycDetails } = data;
            const doctor = yield database_1.DatabaseSchema.Doctor.findOne({ email });
            if (!doctor) {
                console.error('Doctor not found');
                return { status: false, message: 'Doctor not found' };
            }
            // Push each kycDetails object individually into the kycDetails array
            kycDetails.forEach((detail) => {
                doctor.kycDetails.push(detail);
            });
            const response = yield doctor.save();
            console.log(response, "kiokookokokoko");
            if (response) {
                return { status: true, data: response };
            }
            else {
                return { status: false, message: 'KYC submission failed' };
            }
        }
        catch (error) {
            console.error('Error in kycAuth:', error);
            return { status: false, message: 'Internal Server Error' };
        }
    }),
    updateDoctorProfile: (data) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { name, email, phone, specialization, street, city, state, zipcode, fees, image, age, dob } = data;
            // Find the doctor by email
            const findDoctor = yield database_1.DatabaseSchema.Doctor.findOne({ email });
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
                const existingAddressIndex = findDoctor.address.findIndex(addr => addr.street === street &&
                    addr.city === city &&
                    addr.state === state &&
                    addr.zipCode === zipcode);
                if (existingAddressIndex !== -1) {
                    // If address exists, update it
                    findDoctor.address[existingAddressIndex].street = street;
                    findDoctor.address[existingAddressIndex].city = city;
                    findDoctor.address[existingAddressIndex].state = state;
                    findDoctor.address[existingAddressIndex].zipCode = zipcode;
                }
                else {
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
                yield findDoctor.save();
                console.log(findDoctor, "true");
                return { status: true, data: findDoctor };
            }
            else {
                return { status: false, message: 'Doctor not found' };
            }
        }
        catch (error) {
            console.error('Error in updateDoctorProfile repo:', error);
            return { status: false, message: 'Error updating doctor profile' };
        }
    }),
    getAllDoctors: () => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const Doctors = yield database_1.DatabaseSchema.Doctor.find({ kycStatus: 'approved' });
            if (Doctors) {
                return { status: true, doctors: Doctors };
            }
            else {
                return { status: false };
            }
        }
        catch (error) {
            console.log(error);
        }
    }),
    addSlot: (data) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { doctorId, startDate, endDate, startTime, endTime, breakDuration, consultationDuration, slots, isMultipleDays } = data;
            console.log('Received data:', data);
            // Check if the doctor has already reached the maximum allowed slots
            const existingSlotsCount = yield Schema_1.default.Slot.countDocuments({ doctor: doctorId });
            if (existingSlotsCount >= 5) {
                return { status: false, message: 'Maximum of 5 slots allowed per doctor' };
            }
            // Check for overlapping date ranges
            const overlappingSlot = yield Schema_1.default.Slot.findOne({
                doctor: doctorId,
                $or: [
                    { startDate: { $lte: endDate }, endDate: { $gte: startDate } }
                ]
            });
            if (overlappingSlot) {
                console.log('Overlapping slots found:', overlappingSlot);
                return { status: false, message: 'Slot date range overlaps with an existing slot' };
            }
            const formattedSlots = slots.map((time) => ({
                time: time,
                duration: consultationDuration,
                available: true
            }));
            const newSlot = new Schema_1.default.Slot({
                doctor: doctorId,
                startDate,
                endDate,
                slots: formattedSlots,
                isMultipleDays
            });
            yield newSlot.save();
            console.log('New slot added successfully:', newSlot);
            return { status: true, message: 'Slot added successfully' };
        }
        catch (error) {
            if (error.code === 11000) {
                console.log('Duplicate error details:', error.keyValue);
                return { status: false, message: 'Duplicate slot detected' };
            }
            console.log('Error in add slot repository:', error);
            return { status: false, message: 'Error in add slot repository' };
        }
    }),
    appointmentList: (data) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { doctorId } = data;
            const appointment = yield database_1.DatabaseSchema.Appointment.findOne({ doctorId: doctorId });
            if (appointment) {
                const doctor = yield database_1.DatabaseSchema.Doctor.findById(appointment === null || appointment === void 0 ? void 0 : appointment.doctorId);
                const user = yield database_1.DatabaseSchema.User.findById(appointment === null || appointment === void 0 ? void 0 : appointment.userId);
                return { status: true, data: { appointment, doctor, user } };
            }
            else {
                return { status: false, data: "No Appoinments" };
            }
        }
        catch (error) {
            console.log(error, "error in appoinment data repo");
        }
    }),
    getAlreadyScheduledSlotes: (data) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { doctorId } = data;
            const appointments = yield database_1.DatabaseSchema.Slot.find({ doctor: doctorId });
            console.log(appointments, "hyhy");
            if (appointments) {
                return { status: true, data: appointments };
            }
            else {
                return { status: false, data: "No Scheduled Slotes" };
            }
        }
        catch (error) {
            console.log(error, "error in getAlreadyScheduledSlotes repository ");
        }
    }),
    getConverstationById: (data) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { id } = data;
            const response = yield database_1.DatabaseSchema.Messages.find({ converstationId: id });
            if (response) {
                return { status: true, data: response };
            }
            else {
                return { status: false, data: [] };
            }
        }
        catch (error) {
            console.log(error);
            return { status: false, message: `Messages not found ..!${error}` };
        }
    }),
    getDoctorConverstation: (data) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { id } = data;
            const conversation = yield database_1.DatabaseSchema.Conversation.find({ "members.doctorId": id });
            const userConversations = [];
            for (let i = 0; i < conversation.length; i++) {
                const userId = conversation[i].members[0].userId;
                const user = yield database_1.DatabaseSchema.User.findById(userId);
                console.log(userId, "THIS IS USER ", i);
                if (user) {
                    const userConversation = {
                        user: user,
                        conversation: conversation[i]
                    };
                    userConversations.push(userConversation);
                }
            }
            if (userConversations.length > 0) {
                return { status: true, data: userConversations };
            }
            else {
                return { status: true, data: [] };
            }
        }
        catch (error) {
            console.log(error);
            return { status: true, data: [] };
        }
    }),
    getAppoinmentDetails: (data) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { id } = data; // Extract the doctorId from the data object
            const appointments = yield database_1.DatabaseSchema.Appointment.find({ doctorId: id }); // Use 'find' with query object
            if (appointments.length > 0) {
                console.log(appointments, "Appointments");
                return { status: true, data: appointments }; // Return all matching appointments
            }
            else {
                return { status: false, data: "No appointments found" }; // If no appointments are found
            }
        }
        catch (error) {
            console.error(error);
            return { status: false, data: "An error occurred while fetching appointments" };
        }
    }),
    getConvetsationIdForVideoCall: (data) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { userId, doctorId } = data;
            const response = yield database_1.DatabaseSchema.Conversation.findOne({
                userId: userId,
                doctorId: doctorId,
            });
            console.log(response, "reddddddddd");
            if (response) {
                return { status: true, data: response };
            }
            else {
                return { status: false, messege: "data not found" };
            }
        }
        catch (error) {
            console.log(error);
            return { status: false, messege: "data not found" };
        }
    }),
    addPrescription: (data) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { appointmentId, prescriptionDate, medicines, fees } = data;
            // Find the appointment by its ID
            const appointment = yield Schema_1.default.Appointment.findById(appointmentId);
            if (!appointment) {
                return { status: false, message: "Appointment not found" };
            }
            const { userId, doctorId } = appointment; // Extract the doctorId and userId
            if (!prescriptionDate || !medicines.length) {
                return { status: false, message: "Required fields are missing" };
            }
            // Create the new Prescription document
            const newPrescription = new Schema_1.default.Prescription({
                appointmentId,
                doctorId,
                userId,
                prescriptionDate,
                medicines,
            });
            // Save the new prescription
            const savedPrescription = yield newPrescription.save();
            return {
                status: true,
                data: savedPrescription,
            };
        }
        catch (error) {
            console.error("Error adding prescription:", error);
            return {
                status: false,
                message: "Internal Server Error",
            };
        }
    }),
    createConsultation: (data) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { userId, doctorId, appointmentId, roomId } = data;
            const responce = yield database_1.DatabaseSchema.Consult.create({
                userId,
                doctorId,
                appointmentId,
                roomId
            });
            if (responce) {
                return { status: true, data: responce };
            }
            else {
                return { status: false, message: "consult reation failed" };
            }
        }
        catch (error) {
            return { status: false, message: `something went wrong ${error}` };
        }
    }),
    updateConsultCallStatus: (data) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { appoinmentId } = data;
            const response = yield database_1.DatabaseSchema.Consult.findOneAndUpdate({ appoinmentId: appoinmentId }, {
                read: true
            }, { new: true });
            if (response) {
                return { status: true, data: response };
            }
            else {
                return { status: false, data: " data not found" };
            }
        }
        catch (error) {
            console.log(error);
            return { status: false, data: " something weny wrong" };
        }
    }),
    findDoctorForChangePassword: (email) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const doctor = yield Schema_1.default.Doctor.findOne({ email: email });
            console.log(doctor, "iceeee");
            if (doctor) {
                return { status: true, data: doctor };
            }
            else {
                return { status: false };
            }
        }
        catch (error) {
            console.log(error);
        }
    }),
    changePasswordForDoc: (data) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { email, currentPassword, hashedNewPassword } = data;
            console.log("uiui", data);
            // Find the user by email
            const user = yield database_1.DatabaseSchema.Doctor.findOne({ email: email });
            console.log(user, "user in repo");
            if (user) {
                // Update the password field
                user.password = hashedNewPassword;
                // Save the updated user
                yield user.save();
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
    }),
    forgotPasswordForDoc: (data) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            console.log("hai ");
            const { email, hashedNewPassword } = data;
            const user = yield database_1.DatabaseSchema.Doctor.findOne({ email: email });
            console.log(user, "user  user");
            if (user) {
                user.password = hashedNewPassword;
                yield user.save();
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
    }),
    updateEmailDoc: (data) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { email, newEmail } = data;
            console.log(newEmail, "ppp");
            const user = yield database_1.DatabaseSchema.Doctor.findOne({ email: email });
            console.log(user, "user in repo");
            if (user) {
                user.email = newEmail;
                yield user.save();
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
    }),
};
