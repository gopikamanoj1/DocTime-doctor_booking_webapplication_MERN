"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function addPrescriptionUseCase(dependencies) {
    const { doctorRepositery } = dependencies.repositery;
    const executeFunction = async (data) => {
        const response = await doctorRepositery.addPrescription(data);
        if (response.status) {
            return { status: true, data: response.data };
        }
        else {
            return { status: false, message: response.message };
        }
    };
    return { executeFunction };
}
exports.default = addPrescriptionUseCase;
