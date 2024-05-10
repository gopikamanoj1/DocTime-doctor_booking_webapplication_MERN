"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function showAppoinmentsUseCase(dependencies) {
    const { doctorRepositery } = dependencies.repositery;
    const executeFunction = async (data) => {
        try {
            const response = await doctorRepositery.appointmentList(data);
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
            return { status: false, message: "Error in bookAppointmentUseCase" };
        }
    };
    return { executeFunction };
}
exports.default = showAppoinmentsUseCase;
