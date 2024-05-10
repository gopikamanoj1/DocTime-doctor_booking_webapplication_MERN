"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const nodemailer_1 = require("../../../utils/nodemailer");
function registerUseCase(dependencies) {
    const { userRepositery } = dependencies.repositery;
    const executeFunction = async (data) => {
        try {
            const userExists = await userRepositery.getUserByEmailForRegister({ email: data.email });
            console.log(userExists, "userExists");
            if (userExists.data) {
                return { status: false, data: "User already exists" };
            }
            else {
                const response = await (0, nodemailer_1.sendOtp)(data.email); // Send OTP only if user does not exist
                return response.status
                    ? { status: true, data: response.otp }
                    : { status: false, data: response.message };
            }
        }
        catch (error) {
            console.error('Error in register use case:', error);
            return { status: false, message: 'Internal Server Error' };
        }
    };
    return { executeFunction };
}
exports.default = registerUseCase;
