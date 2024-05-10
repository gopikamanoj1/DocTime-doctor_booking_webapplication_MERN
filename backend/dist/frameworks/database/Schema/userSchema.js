"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const userSChema = new mongoose_1.default.Schema({
    name: String,
    email: String,
    // password:String,
    password: { type: String, required: true },
    phone: Number,
    dob: Date,
    image: String,
    gender: {
        type: String,
        enum: ['male', 'female']
    },
    address: [{
            street: String,
            city: String,
            state: String
        }],
    // Contry:String,
    // City:String,
    bloodGroup: String,
    age: Number,
    isBlocked: {
        type: Boolean,
        default: false
    },
    isAdmin: {
        default: Number
    }
});
const User = mongoose_1.default.model("User", userSChema);
exports.User = User;
