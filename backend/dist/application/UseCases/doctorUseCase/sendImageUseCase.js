"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function sendImageUseCase(dependencies) {
    const { doctorRepositery } = dependencies.repositery;
    const executeFunction = async (data) => {
        try {
            const response = await doctorRepositery.sendImage(data);
            console.log(response, "ll");
            if (response.status) {
                return { status: true, data: response.data };
            }
            else {
                return { status: false, message: response.data };
            }
        }
        catch (error) {
            console.log(error);
            return { status: false, message: "Error in sendImageUseCase" };
        }
    };
    return { executeFunction };
}
exports.default = sendImageUseCase;
