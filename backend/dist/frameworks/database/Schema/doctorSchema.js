"use strict";
// Doctor Model
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Doctor = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const doctorSchema = new mongoose_1.default.Schema({
    name: {
        type: String,
    },
    password: {
        type: String
    },
    specialization: {
        type: String,
    },
    image: String,
    phone: {
        type: String,
    },
    email: {
        type: String,
        unique: true,
    },
    address: [{
            street: String,
            city: String,
            state: String,
            zipCode: String,
        }],
    age: {
        type: Number
    },
    dob: {
        type: Date
    },
    fees: {
        type: Number
    },
    kycStatus: {
        type: String,
        enum: ['pending', 'approved', 'rejected'],
        default: 'pending',
    },
    kycDetails: [{
            _id: false,
            certificateImage: { type: String },
            qualificationImage: { type: String },
            aadhaarNumber: String,
            yearsOfExperience: Number,
            hospitalName: String
        }],
    isBlocked: {
        type: Boolean,
        default: false
    }
});
const Doctor = mongoose_1.default.model("Doctor", doctorSchema);
exports.Doctor = Doctor;
