"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const nodemailer_1 = require("../../../utils/nodemailer");
function generateOtpUseCase(dependencies) {
    const { userRepositery } = dependencies.repositery;
    const executeFunction = async (data) => {
        try {
            const userExists = await userRepositery.getUserByEmail(data);
            // if (userExists) {
            //   return { status: false, message: 'User already exists' };
            // }
            console.log(data.email, "email fron use case");
            const response = await (0, nodemailer_1.sendOtp)(data.email);
            if (response.status) {
                return { status: true, data: response.otp };
            }
            else {
                return { status: false, message: response.message };
            }
        }
        catch (error) {
            console.error('Error in generateOtpUseCase :', error);
            return { status: false, message: 'Internal Server Error' };
        }
    };
    return { executeFunction };
}
exports.default = generateOtpUseCase;
