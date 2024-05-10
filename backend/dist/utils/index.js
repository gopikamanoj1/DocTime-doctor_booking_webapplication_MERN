"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateToken = exports.verifyHashPassword = exports.hashPassword = exports.sendOtp = void 0;
// import { sentOtp } from "../utils/nodemailer";
const nodemailer_1 = require("../utils/nodemailer");
Object.defineProperty(exports, "sendOtp", { enumerable: true, get: function () { return nodemailer_1.sendOtp; } });
const hashPassword_1 = require("./hashPassword");
Object.defineProperty(exports, "hashPassword", { enumerable: true, get: function () { return hashPassword_1.hashPassword; } });
Object.defineProperty(exports, "verifyHashPassword", { enumerable: true, get: function () { return hashPassword_1.verifyHashPassword; } });
const generateToken_1 = __importDefault(require("./generateToken"));
exports.generateToken = generateToken_1.default;
