"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function getAllAppoinmentsUseCase(dependencies) {
    const { adminRepository } = dependencies.repositery;
    const executeFunction = async () => {
        try {
            const response = await adminRepository.getAllAppoinments();
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
exports.default = getAllAppoinmentsUseCase;
