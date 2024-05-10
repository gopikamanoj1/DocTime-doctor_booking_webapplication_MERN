"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("../../../utils");
function loginUseCase(dependencies) {
    const { userRepositery } = dependencies.repositery;
    const executeFunction = async (data) => {
        console.log('this is data', data);
        const response = await userRepositery.finduser(data.email);
        console.log(response, "responseresponseresponse");
        if (response.status) {
            const user = response.user; // Assuming the user data is within the 'user' property
            // Check if the entered password is correct
            const isPasswordCorrect = await (0, utils_1.verifyHashPassword)(data.password, user.password);
            if (isPasswordCorrect) {
                return { status: true, data: user };
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
exports.default = loginUseCase;
