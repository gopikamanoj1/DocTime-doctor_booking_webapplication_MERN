"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function createConsultuseCase(dependencies) {
    const { doctorRepositery } = dependencies.repositery;
    const executeFunction = async (data) => {
        try {
            const response = await doctorRepositery.createConsultation(data);
            if (response.status) {
                return { status: response.status, data: response.data };
            }
            else {
                return { status: response.status, message: response.message };
            }
        }
        catch (error) {
            console.error('Error in register use case:', error);
            return { status: false, message: 'Internal Server Error' };
        }
    };
    return { executeFunction };
}
exports.default = createConsultuseCase;
