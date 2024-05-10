"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function getDoctorConverstationByIdUseCase(dependencies) {
    const { doctorRepositery } = dependencies.repositery;
    const executeFunction = async (data) => {
        try {
            const response = await doctorRepositery.getConverstationById(data);
            if (response.status) {
                return { status: true, data: response.data };
            }
            else {
                return { status: false, message: response.message };
            }
        }
        catch (error) {
            console.log(error);
            return { status: false, message: "Error in getConverstationById use case" };
        }
    };
    return { executeFunction };
}
exports.default = getDoctorConverstationByIdUseCase;
