"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function checkOTPUseCase(dependencies) {
    const { userRepositery } = dependencies.repositery;
    const executeFunction = async (data) => {
        try {
            const response = await userRepositery.checkOTP(data);
            console.log('jijijij', "r", response);
            if (response.status) {
                return { status: true, data: response.data };
            }
            else {
                return { status: false, data: "Wrong Otp" };
            }
        }
        catch (error) {
            console.error('Error in verifyOtpUseCase:', error);
            return { status: false, message: 'Internal Server Error' };
        }
    };
    return { executeFunction };
}
exports.default = checkOTPUseCase;
