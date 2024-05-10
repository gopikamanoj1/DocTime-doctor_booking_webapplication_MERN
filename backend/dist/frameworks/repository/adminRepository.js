"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const database_1 = require("../database");
exports.default = {
    findAdmin: async (email) => {
        try {
            console.log("finding Admin");
            const findadmin = await database_1.DatabaseSchema.Admin.findOne({
                email: email
            });
            console.log(findadmin, "findadminfindadmin");
            if (findadmin) {
                return { status: true, data: findadmin };
            }
            else {
                return { status: false, messege: "Invalid Credentials" };
            }
        }
        catch (error) {
            console.log("error in repositery authencation repo in userEmailexist", error);
        }
    },
    adminLogout: async (email) => {
        try {
            const response = await database_1.DatabaseSchema.Admin.findOne({ email: email });
            if (response) {
                return { status: true, data: response };
            }
            else {
                return { status: false, mmessege: " error in admin logout " };
            }
        }
        catch (error) {
            console.log(error);
            return { status: false, mmessege: " error in admin logout " };
        }
    },
    getAllUser: async () => {
        try {
            const Users = await database_1.DatabaseSchema.User.find();
            if (Users) {
                return { status: true, user: Users };
            }
            else {
                return { status: false };
            }
        }
        catch (error) {
            console.log(error);
        }
    },
    getAllAppoinments: async () => {
        try {
            const appoinment = await database_1.DatabaseSchema.Appointment.find();
            const slotes = await database_1.DatabaseSchema.Slot.find();
            if (appoinment && slotes) {
                return { status: true, data: { appoinment, slotes } };
            }
            else {
                return { status: false, data: "not  found" };
            }
        }
        catch (error) {
            console.log(error);
            return { status: false, message: " something went wrong" };
        }
    },
    getAllDoctors: async () => {
        try {
            const Doctors = await database_1.DatabaseSchema.Doctor.find();
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
    },
    getKycDetails: async (doctorId) => {
        try {
            const doctor = await database_1.DatabaseSchema.Doctor.findById(doctorId);
            if (doctor) {
                return { status: true, doctor: doctor };
            }
            else {
                return { status: false };
            }
        }
        catch (error) {
            console.error("Error fetching doctor KYC details:", error);
            throw error; // You can choose to throw the error to handle it elsewhere
        }
    },
    changeKycStatus: async (doctorId, newStatus) => {
        try {
            const doctor = await database_1.DatabaseSchema.Doctor.findById(doctorId);
            if (doctor) {
                doctor.kycStatus = newStatus;
                await doctor.save();
                return { status: true };
            }
            else {
                return { status: false };
            }
        }
        catch (error) {
            console.log(error);
        }
    },
    handleUserBlock: async (userId) => {
        try {
            const user = await database_1.DatabaseSchema.User.findById(userId);
            if (user) {
                user.isBlocked = !user.isBlocked;
                const response = await user.save();
                if (response) {
                    return { status: true, data: response };
                }
                else {
                    return { status: false, message: "User blocking/unblocking failed" };
                }
            }
            else {
                return { status: false, message: "User not found" };
            }
        }
        catch (error) {
            console.error("Error in handleUserBlock repository:", error);
            return { status: false, message: "User blocking/unblocking failed" };
        }
    },
    handleDoctorBlock: async (doctorId) => {
        try {
            console.log(doctorId, "id");
            const doctor = await database_1.DatabaseSchema.Doctor.findById(doctorId);
            console.log(doctor, "jijiji");
            if (doctor) {
                doctor.isBlocked = !doctor.isBlocked;
                const response = await doctor.save();
                if (response) {
                    return { status: true, data: response };
                }
                else {
                    return { status: false, message: "Doctor blocking/unblocking failed" };
                }
            }
            else {
                return { status: false, message: "Doctor not found" };
            }
        }
        catch (error) {
            console.error("Error in handleDoctorBlock repository:", error);
            return { status: false, message: "Doctor blocking/unblocking failed" };
        }
    }
};
