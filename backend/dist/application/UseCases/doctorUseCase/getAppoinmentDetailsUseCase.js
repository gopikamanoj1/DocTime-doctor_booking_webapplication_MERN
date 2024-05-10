"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function getAppoinmentDetailsUseCase(dependencies) {
    const { doctorRepositery } = dependencies.repositery;
    const executeFunction = async (data) => {
        try {
            const response = await doctorRepositery.getAppoinmentDetails(data);
            if (response.status) {
                return { status: true, data: response.data };
            }
            else {
                return { status: false, message: response.data };
            }
        }
        catch (error) {
            console.log(error);
            return { status: false, message: "Error in getAppoinmentDetails" };
        }
    };
    return { executeFunction };
}
exports.default = getAppoinmentDetailsUseCase;
