"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function updateEmailForDOCUseCase(dependencies) {
    const { doctorRepositery } = dependencies.repositery;
    const executeFunction = async (data) => {
        const response = await doctorRepositery.updateEmailDoc(data);
        console.log(response, "use resssso");
        if (response.status) {
            return { status: true, data: response.data };
        }
        else {
            return { status: false, message: response.message };
        }
    };
    return { executeFunction };
}
exports.default = updateEmailForDOCUseCase;
