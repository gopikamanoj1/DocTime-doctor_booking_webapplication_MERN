"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// import loginController from "./loginController"
const doctorRegisterController_1 = __importDefault(require("./doctorRegisterController"));
const doctorVerifyOtpController_1 = __importDefault(require("./doctorVerifyOtpController"));
const doctorLoginController_1 = __importDefault(require("./doctorLoginController"));
const doctorLogoutController_1 = __importDefault(require("./doctorLogoutController"));
const kycController_1 = __importDefault(require("./kycController"));
const updateDoctorProfileController_1 = __importDefault(require("./updateDoctorProfileController"));
const googleRegisterController_1 = __importDefault(require("./googleRegisterController"));
const addSlotController_1 = __importDefault(require("./addSlotController"));
const showAppoinmentsController_1 = __importDefault(require("./showAppoinmentsController"));
const getAlreadyScheduledSlotesController_1 = __importDefault(require("./getAlreadyScheduledSlotesController"));
const getDoctorConverstationByIdController_1 = __importDefault(require("./getDoctorConverstationByIdController"));
const doctorSendMessegesController_1 = __importDefault(require("./doctorSendMessegesController"));
const getDoctorConverstationsController_1 = __importDefault(require("./getDoctorConverstationsController"));
const getKycStatusController_1 = __importDefault(require("./getKycStatusController"));
const getAppoinmentDetailsController_1 = __importDefault(require("./getAppoinmentDetailsController"));
const getConvetsationIdForVideoCallController_1 = __importDefault(require("./getConvetsationIdForVideoCallController"));
const addPrescriptionController_1 = __importDefault(require("./addPrescriptionController"));
const updateConsultCallStatusController_1 = __importDefault(require("./updateConsultCallStatusController"));
const changePasswordForDocController_1 = __importDefault(require("./changePasswordForDocController"));
const forgotPasswordForDocController_1 = __importDefault(require("./forgotPasswordForDocController"));
const updateEmailFORDOCController_1 = __importDefault(require("./updateEmailFORDOCController"));
const uploadImageController_1 = __importDefault(require("./uploadImageController"));
exports.default = (dependencies) => {
    return {
        doctorRegisterController: (0, doctorRegisterController_1.default)(dependencies),
        doctorVerifyOtpController: (0, doctorVerifyOtpController_1.default)(dependencies),
        doctorLoginController: (0, doctorLoginController_1.default)(dependencies),
        doctorLogoutController: (0, doctorLogoutController_1.default)(dependencies),
        kycController: (0, kycController_1.default)(dependencies),
        updateDoctorProfileController: (0, updateDoctorProfileController_1.default)(dependencies),
        googleRegisterController: (0, googleRegisterController_1.default)(dependencies),
        addSlotController: (0, addSlotController_1.default)(dependencies),
        showAppoinmentsController: (0, showAppoinmentsController_1.default)(dependencies),
        getAlreadyScheduledSlotesController: (0, getAlreadyScheduledSlotesController_1.default)(dependencies),
        getDoctorConverstationByIdController: (0, getDoctorConverstationByIdController_1.default)(dependencies),
        doctorSendMessegesController: (0, doctorSendMessegesController_1.default)(dependencies),
        getDoctorConverstationsController: (0, getDoctorConverstationsController_1.default)(dependencies),
        getKycStatusController: (0, getKycStatusController_1.default)(dependencies),
        getAppoinmentDetailsController: (0, getAppoinmentDetailsController_1.default)(dependencies),
        getConvetsationIdForVideoCallController: (0, getConvetsationIdForVideoCallController_1.default)(dependencies),
        addPrescriptionController: (0, addPrescriptionController_1.default)(dependencies),
        updateConsultCallStatusController: (0, updateConsultCallStatusController_1.default)(dependencies),
        changePasswordForDocController: (0, changePasswordForDocController_1.default)(dependencies),
        forgotPasswordForDocController: (0, forgotPasswordForDocController_1.default)(dependencies),
        updateEmailFORDOCController: (0, updateEmailFORDOCController_1.default)(dependencies),
        uploadImageController: (0, uploadImageController_1.default)(dependencies)
    };
};
