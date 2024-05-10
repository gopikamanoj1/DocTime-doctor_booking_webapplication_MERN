"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.adminDashBoardController = exports.adminDoctorController = exports.adminPatientController = exports.adminAuthController = exports.doctorController = exports.UserController = void 0;
const UserController_1 = __importDefault(require("./user/UserController"));
exports.UserController = UserController_1.default;
const adminAuthController_1 = __importDefault(require("./admin/adminAuthController"));
exports.adminAuthController = adminAuthController_1.default;
const DoctorController_1 = __importDefault(require("./doctor/DoctorController"));
exports.doctorController = DoctorController_1.default;
const adminPatientController_1 = __importDefault(require("./admin/adminPatientController"));
exports.adminPatientController = adminPatientController_1.default;
const adminDoctorController_1 = __importDefault(require("./admin/adminDoctorController"));
exports.adminDoctorController = adminDoctorController_1.default;
const adminDashBoardController_1 = __importDefault(require("./admin/adminDashBoardController"));
exports.adminDashBoardController = adminDashBoardController_1.default;
