"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyHashPassword = exports.hashPassword = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const hashPassword = async (password) => {
    try {
        const salt = await bcryptjs_1.default.genSalt(10);
        const hashedPassword = await bcryptjs_1.default.hash(password, salt);
        return hashedPassword;
    }
    catch (error) {
        throw new Error('Error hashing password');
    }
};
exports.hashPassword = hashPassword;
const verifyHashPassword = async (password, hashedPassword) => {
    try {
        console.log(password, hashedPassword, "comparing");
        const match = await bcryptjs_1.default.compare(password, hashedPassword);
        return match;
    }
    catch (error) {
        throw new Error('Error verifying password');
    }
};
exports.verifyHashPassword = verifyHashPassword;
