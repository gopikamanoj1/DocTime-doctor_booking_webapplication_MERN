"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.doctorRepositery = exports.adminRepository = exports.userRepositery = void 0;
const userRepositery_1 = __importDefault(require("./userRepositery"));
exports.userRepositery = userRepositery_1.default;
const adminRepository_1 = __importDefault(require("./adminRepository"));
exports.adminRepository = adminRepository_1.default;
const doctorRepositery_1 = __importDefault(require("./doctorRepositery"));
exports.doctorRepositery = doctorRepositery_1.default;
