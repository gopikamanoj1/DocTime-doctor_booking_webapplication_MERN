"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("../../../utils");
function changePasswordUseCase(dependencies) {
    const { userRepositery } = dependencies.repositery;
    const executeFunction = async (data) => {
        try {
            const response1 = await userRepositery.finduser(data.email);
            if (response1.status) {
                const user = response1.user;
                const isPasswordCorrect = await (0, utils_1.verifyHashPassword)(data.currentPassword, user.password);
                console.log(isPasswordCorrect, "ddd");
                if (isPasswordCorrect) {
                    const response = await userRepositery.changePassword(data);
                    console.log(response, "use case res");
                    if (response.status) {
                        return { status: true, data: response.data };
                    }
                    else {
                        return { status: false, message: response.message };
                    }
                }
                else {
                    return { status: false, data: "  Current Password is Wrong" };
                }
            }
            else {
                return { status: false, data: "invalid Current password" };
            }
        }
        catch (error) {
            console.log(error);
            return { status: false, message: "Error in changePasswordUseCase" };
        }
    };
    return { executeFunction };
}
exports.default = changePasswordUseCase;
