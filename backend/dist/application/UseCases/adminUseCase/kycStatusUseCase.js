"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function kycStatusUseCase(dependencies) {
    const { adminRepository } = dependencies.repositery;
    const executeFunction = async (doctorId, newStatus) => {
        try {
            const response = await adminRepository.changeKycStatus(doctorId, newStatus);
            if (response.status) {
                return { status: true, data: response };
            }
            else {
                return { status: false, message: "Failed to change KYC status" };
            }
        }
        catch (error) {
            console.error(error);
            return { status: false, message: "An error occurred while changing KYC status" };
        }
    };
    return { executeFunction };
}
exports.default = kycStatusUseCase;
