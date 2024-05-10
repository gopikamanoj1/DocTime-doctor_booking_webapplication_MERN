"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const nodemailer_1 = require("../../../utils/nodemailer");
function doctorRegisterUseCase(dependencies) {
    const { doctorRepositery } = dependencies.repositery;
    const executeFunction = async (data) => {
        try {
            const doctorExists = await doctorRepositery.getDoctorByEmail(data.email);
            if (doctorExists) {
                return { status: false, message: 'Doctor already exists' };
            }
            const response = await (0, nodemailer_1.sendOtp)(data.email);
            if (response.status) {
                return { status: true, data: response.otp };
            }
            else {
                return { status: false, message: response.message };
            }
        }
        catch (error) {
            console.error('Error in register use case:', error);
            return { status: false, message: 'Internal Server Error' };
        }
    };
    return { executeFunction };
}
exports.default = doctorRegisterUseCase;
