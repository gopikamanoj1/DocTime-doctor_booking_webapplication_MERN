"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function bookAppointmentUseCase(dependencies) {
    const { userRepositery } = dependencies.repositery;
    const executeFunction = async (data) => {
        try {
            const response = await userRepositery.bookAppointment(data);
            if (response.status) {
                return { status: true, data: response.data };
            }
            else {
                return { status: false, data: response.data };
            }
        }
        catch (error) {
            console.log(error);
            return { status: false, message: "Error in bookAppointmentUseCase" };
        }
    };
    return { executeFunction };
}
exports.default = bookAppointmentUseCase;
