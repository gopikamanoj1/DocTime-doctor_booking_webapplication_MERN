"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Appointment = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const appointmentSchema = new mongoose_1.default.Schema({
    userId: {
        type: String
    },
    doctorId: {
        type: String
    },
    date: {
        type: Date
    },
    time: {
        type: String
    },
    status: {
        type: String,
        enum: ['Pending', 'Completed'],
        default: 'Pending',
    }
});
const Appointment = mongoose_1.default.model("Appointment", appointmentSchema);
exports.Appointment = Appointment;
