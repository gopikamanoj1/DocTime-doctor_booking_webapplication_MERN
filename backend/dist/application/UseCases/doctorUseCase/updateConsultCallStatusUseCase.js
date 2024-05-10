"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function updateConsultCallStatusUseCase(dependencies) {
    const { doctorRepositery } = dependencies.repositery;
    const executeFunction = async (data) => {
        try {
            const response = await doctorRepositery.updateConsultCallStatus(data);
            if (response.status) {
                return { status: true, data: response.data };
            }
            else {
                return { status: false, message: response.message };
            }
        }
        catch (error) {
            console.log(error, "error in  updateConsultCallStatus");
        }
    };
    return { executeFunction };
}
exports.default = updateConsultCallStatusUseCase;
