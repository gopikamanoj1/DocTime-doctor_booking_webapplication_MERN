"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function adminUserUseCase(dependencies) {
    const { adminRepository } = dependencies.repositery;
    const executeFunction = async (requestData) => {
        try {
            const response = await adminRepository.getAllUser(requestData);
            // console.log(response,"ggggggggggggg");
            if (response.status) {
                return { status: true, data: response.user };
            }
            else {
                return { status: false, message: response.message };
            }
        }
        catch (error) {
            console.log(error);
            return { status: false, message: "Error in adminUserUseCase" };
        }
    };
    return { executeFunction };
}
exports.default = adminUserUseCase;
