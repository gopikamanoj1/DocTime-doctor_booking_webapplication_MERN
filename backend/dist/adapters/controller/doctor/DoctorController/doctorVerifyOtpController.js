"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (dependecies) => {
    const { doctorVerifyOtpUseCase } = dependecies.useCase;
    const doctorVerifyOtpController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const { enteredOtp } = req.body;
        console.log(req.body, "reqqqqqqqqqbodyyyyyyyyy");
        const doctorData = req.session.doctorData;
        // Ensure both OTPs are strings and trimmed of whitespace
        const sessionOtp = (req.session.Otp || '').toString().trim();
        const inputOtp = (enteredOtp || '').toString().trim();
        console.log("Trimmed Entered OTP:", inputOtp); // Add this for debugging
        console.log("Trimmed Session OTP:", sessionOtp); // Add this for debugging
        if (sessionOtp == inputOtp) {
            const response = yield doctorVerifyOtpUseCase(dependecies).executeFunction(doctorData);
            if (response.status) {
                res.status(200).json({ status: true, data: response.data });
            }
            else {
                res.status(400).json({ status: false, message: response.message });
            }
        }
        else {
            res.status(400).json({ status: false, message: "Wrong otp" });
        }
    });
    return doctorVerifyOtpController;
};
