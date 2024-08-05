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
Object.defineProperty(exports, "__esModule", { value: true });
const database_1 = require("../database");
exports.default = {
    findAdmin: (email) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            console.log("finding Admin");
            const findadmin = yield database_1.DatabaseSchema.Admin.findOne({
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
    }),
    adminLogout: (email) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const response = yield database_1.DatabaseSchema.Admin.findOne({ email: email });
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
    }),
    getAllUser: () => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const Users = yield database_1.DatabaseSchema.User.find();
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
    }),
    getAllAppoinments: () => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const appoinment = yield database_1.DatabaseSchema.Appointment.find();
            const slotes = yield database_1.DatabaseSchema.Slot.find();
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
    }),
    getAllDoctors: () => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const Doctors = yield database_1.DatabaseSchema.Doctor.find();
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
    getKycDetails: (doctorId) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const doctor = yield database_1.DatabaseSchema.Doctor.findById(doctorId);
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
    }),
    changeKycStatus: (doctorId, newStatus) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const doctor = yield database_1.DatabaseSchema.Doctor.findById(doctorId);
            if (doctor) {
                doctor.kycStatus = newStatus;
                yield doctor.save();
                return { status: true };
            }
            else {
                return { status: false };
            }
        }
        catch (error) {
            console.log(error);
        }
    }),
    handleUserBlock: (userId) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const user = yield database_1.DatabaseSchema.User.findById(userId);
            if (user) {
                user.isBlocked = !user.isBlocked;
                const response = yield user.save();
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
    }),
    handleDoctorBlock: (doctorId) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            console.log(doctorId, "id");
            const doctor = yield database_1.DatabaseSchema.Doctor.findById(doctorId);
            console.log(doctor, "jijiji");
            if (doctor) {
                doctor.isBlocked = !doctor.isBlocked;
                const response = yield doctor.save();
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
    })
};
