"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function updatePatientProfileUseCase(dependencies) {
    const { userRepositery } = dependencies.repositery;
    const executeFunction = async (data) => {
        try {
            const response = await userRepositery.updatePatientProfile(data);
            console.log(response, "res in usecase ");
            if (response.status) {
                return { status: true, data: response.data };
            }
            else {
                return { status: false, message: response.message };
            }
        }
        catch (error) {
            console.log(error, "error in  updatePatientrProfileUseCase");
        }
    };
    return { executeFunction };
}
exports.default = updatePatientProfileUseCase;
