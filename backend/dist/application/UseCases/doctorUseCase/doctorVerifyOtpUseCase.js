"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function doctorVerifyOtpUseCase(dependencies) {
    const { doctorRepositery } = dependencies.repositery;
    const executeFunction = async (data) => {
        try {
            const { name, email, password } = data;
            const doctorData = {
                name,
                email,
                password
            };
            // Check if the entered OTP is correct and save user data
            const response = await doctorRepositery.createDoctor(doctorData);
            if (response.status) {
                return { status: true, data: response.data };
            }
            else {
                return { status: false, message: response.message };
            }
        }
        catch (error) {
            console.error('Error in verifyOtpUseCase:', error);
            return { status: false, message: 'Internal Server Error' };
        }
    };
    return { executeFunction };
}
exports.default = doctorVerifyOtpUseCase;
