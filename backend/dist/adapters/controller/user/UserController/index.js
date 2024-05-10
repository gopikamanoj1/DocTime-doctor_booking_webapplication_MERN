"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const loginController_1 = __importDefault(require("./loginController"));
const registerController_1 = __importDefault(require("./registerController"));
const verifyOtpController_1 = __importDefault(require("./verifyOtpController"));
const logoutController_1 = __importDefault(require("./logoutController"));
const resendOtpController_1 = __importDefault(require("./resendOtpController"));
const findDoctorController_1 = __importDefault(require("./findDoctorController"));
const updatePatientProfileController_1 = __importDefault(require("./updatePatientProfileController"));
const viewDoctorDetailsController_1 = __importDefault(require("./viewDoctorDetailsController"));
const generateOtpController_1 = __importDefault(require("./generateOtpController"));
const getAvailableSlotController_1 = __importDefault(require("./getAvailableSlotController"));
const bookAppointmentController_1 = __importDefault(require("./bookAppointmentController"));
const createPaymentIntentController_1 = __importDefault(require("./createPaymentIntentController"));
const loadSuccessController_1 = __importDefault(require("./loadSuccessController"));
const searchDoctrsController_1 = __importDefault(require("./searchDoctrsController"));
const checkOTPController_1 = __importDefault(require("./checkOTPController"));
const appointmentDetailsController_1 = __importDefault(require("./appointmentDetailsController"));
const changePasswordController_1 = __importDefault(require("./changePasswordController"));
const updateEmailController_1 = __importDefault(require("./updateEmailController"));
const sendMessegesController_1 = __importDefault(require("./sendMessegesController"));
const createConverstationController_1 = __importDefault(require("./createConverstationController"));
const getConverstationByIdController_1 = __importDefault(require("./getConverstationByIdController"));
const getConverstationsController_1 = __importDefault(require("./getConverstationsController"));
const getConsultCallStatusConstroller_1 = __importDefault(require("./getConsultCallStatusConstroller"));
const forgotPasswordController_1 = __importDefault(require("./forgotPasswordController"));
const getSearchQueryController_1 = __importDefault(require("./getSearchQueryController"));
const downloadPrescriptionController_1 = __importDefault(require("./downloadPrescriptionController"));
exports.default = (dependencies) => {
    return {
        loginController: (0, loginController_1.default)(dependencies),
        registerController: (0, registerController_1.default)(dependencies),
        verifyOtpController: (0, verifyOtpController_1.default)(dependencies),
        logoutController: (0, logoutController_1.default)(dependencies),
        resendOtpController: (0, resendOtpController_1.default)(dependencies),
        findDoctorController: (0, findDoctorController_1.default)(dependencies),
        updatePatientProfileController: (0, updatePatientProfileController_1.default)(dependencies),
        viewDoctorDetailsController: (0, viewDoctorDetailsController_1.default)(dependencies),
        generateOtpController: (0, generateOtpController_1.default)(dependencies),
        getAvailableSlotController: (0, getAvailableSlotController_1.default)(dependencies),
        bookAppointmentController: (0, bookAppointmentController_1.default)(dependencies),
        createPaymentIntentController: (0, createPaymentIntentController_1.default)(dependencies),
        loadSuccessController: (0, loadSuccessController_1.default)(dependencies),
        searchDoctrsController: (0, searchDoctrsController_1.default)(dependencies),
        checkOTPController: (0, checkOTPController_1.default)(dependencies),
        appointmentDetailsController: (0, appointmentDetailsController_1.default)(dependencies),
        changePasswordController: (0, changePasswordController_1.default)(dependencies),
        updateEmailController: (0, updateEmailController_1.default)(dependencies),
        sendMessegesController: (0, sendMessegesController_1.default)(dependencies),
        createConverstationController: (0, createConverstationController_1.default)(dependencies),
        getConverstationByIdController: (0, getConverstationByIdController_1.default)(dependencies),
        getConverstationsController: (0, getConverstationsController_1.default)(dependencies),
        getConsultCallStatusController: (0, getConsultCallStatusConstroller_1.default)(dependencies),
        forgotPasswordController: (0, forgotPasswordController_1.default)(dependencies),
        getSearchQueryController: (0, getSearchQueryController_1.default)(dependencies),
        downloadPrescriptionController: (0, downloadPrescriptionController_1.default)(dependencies)
    };
};
