"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// kycUseCase.ts
function getKycStatusUseCase(dependencies) {
    const { doctorRepositery } = dependencies.repositery;
    const executeFunction = async (data) => {
        try {
            const response = await doctorRepositery.getkycStatus(data);
            return { status: true, data: response.data };
        }
        catch (error) {
            console.error("Error in getKycStatusUseCase:", error);
            return { status: false, message: "An error occurred in the use case" };
        }
    };
    return { executeFunction };
}
exports.default = getKycStatusUseCase;
