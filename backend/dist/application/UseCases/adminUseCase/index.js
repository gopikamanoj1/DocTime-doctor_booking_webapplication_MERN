"use strict";
// authUseCase.js
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllAppoinmentsUseCase = exports.adminLogoutUseCase = exports.handleDoctorBlockUseCase = exports.handleUserBlockUseCase = exports.kycStatusUseCase = exports.getKycDetailsUseCase = exports.adminDoctorUseCase = exports.adminUserUseCase = exports.adminLoginUseCase = void 0;
const adminLoginUseCase_1 = __importDefault(require("./adminLoginUseCase"));
exports.adminLoginUseCase = adminLoginUseCase_1.default;
const adminLogoutUseCase_1 = __importDefault(require("./adminLogoutUseCase"));
exports.adminLogoutUseCase = adminLogoutUseCase_1.default;
const adminUserUseCase_1 = __importDefault(require("./adminUserUseCase"));
exports.adminUserUseCase = adminUserUseCase_1.default;
const adminDoctorUseCase_1 = __importDefault(require("./adminDoctorUseCase"));
exports.adminDoctorUseCase = adminDoctorUseCase_1.default;
const getKycDetailsUseCase_1 = __importDefault(require("./getKycDetailsUseCase"));
exports.getKycDetailsUseCase = getKycDetailsUseCase_1.default;
const kycStatusUseCase_1 = __importDefault(require("./kycStatusUseCase"));
exports.kycStatusUseCase = kycStatusUseCase_1.default;
const handleUserBlockUseCase_1 = __importDefault(require("./handleUserBlockUseCase"));
exports.handleUserBlockUseCase = handleUserBlockUseCase_1.default;
const handleDoctorBlockUseCase_1 = __importDefault(require("./handleDoctorBlockUseCase"));
exports.handleDoctorBlockUseCase = handleDoctorBlockUseCase_1.default;
const getAllAppoinmentsUseCase_1 = __importDefault(require("./getAllAppoinmentsUseCase"));
exports.getAllAppoinmentsUseCase = getAllAppoinmentsUseCase_1.default;
