"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("../../../utils");
const utils_2 = require("../../../utils");
function doctorLoginUseCase(dependencies) {
    const { doctorRepositery } = dependencies.repositery;
    const executeFunction = async (data) => {
        console.log('this is data', data);
        const response = await doctorRepositery.findDoctor(data.email);
        console.log(response, "responseresponseresponse");
        console.log("hyyy");
        if (response.status) {
            const user = response.user; // Assuming the user data is within the 'user' property
            // Check if the entered password is correct
            const isPasswordCorrect = await (0, utils_1.verifyHashPassword)(data.password, user.password);
            if (isPasswordCorrect) {
                // Generate tokens
                const { token } = (0, utils_2.generateToken)({ userId: user._id });
                // console.log(token,"token");
                return { status: true, data: user, token };
            }
            else {
                return { status: false, message: 'Incorrect password' };
            }
        }
        else {
            return { status: false, message: response.message };
        }
    };
    return { executeFunction };
}
exports.default = doctorLoginUseCase;
