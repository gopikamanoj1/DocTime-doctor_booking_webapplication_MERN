"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function adminDoctorUseCase(dependencies) {
    const { adminRepository } = dependencies.repositery;
    const executeFunction = async (requestData) => {
        try {
            const response = await adminRepository.getAllDoctors(requestData);
            if (response.status) {
                return { status: true, data: response.doctors };
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
exports.default = adminDoctorUseCase;
