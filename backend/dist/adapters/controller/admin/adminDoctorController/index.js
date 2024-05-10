"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const adminDoctorListingController_1 = __importDefault(require("./adminDoctorListingController"));
const getKycDetailsController_1 = __importDefault(require("./getKycDetailsController"));
const kycStatusController_1 = __importDefault(require("./kycStatusController"));
const handleDoctorBlockController_1 = __importDefault(require("./handleDoctorBlockController"));
exports.default = (dependencies) => {
    return {
        adminDoctorListingController: (0, adminDoctorListingController_1.default)(dependencies),
        getKycDetailsController: (0, getKycDetailsController_1.default)(dependencies),
        kycStatusController: (0, kycStatusController_1.default)(dependencies),
        handleDoctorBlockController: (0, handleDoctorBlockController_1.default)(dependencies),
    };
};
