"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function getKycDetailsUseCase(dependencies) {
    const { adminRepository } = dependencies.repositery;
    const executeFunction = async (doctorId) => {
        try {
            const response = await adminRepository.getKycDetails(doctorId);
            console.log(response, "kittioo");
            if (response.status) {
                return { status: true, data: response };
            }
            else {
                return { status: false, message: response.message };
            }
        }
        catch (error) {
            console.log(error);
        }
    };
    return { executeFunction };
}
exports.default = getKycDetailsUseCase;
