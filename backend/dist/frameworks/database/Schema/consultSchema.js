"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Consult = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const consultSchema = new mongoose_1.default.Schema({
    userId: {
        type: String
    },
    doctorId: {
        type: String
    },
    appointmentId: {
        type: String
    },
    read: {
        type: Boolean,
        default: false
    },
    roomId: {
        type: String
    }
}, {
    timestamps: true
});
const Consult = mongoose_1.default.model("Consult", consultSchema);
exports.Consult = Consult;
