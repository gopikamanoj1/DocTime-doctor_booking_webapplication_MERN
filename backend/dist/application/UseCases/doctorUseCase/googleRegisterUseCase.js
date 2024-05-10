"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function googleRegisterUseCase(dependencies) {
    const { doctorRepositery } = dependencies.repositery;
    const executeFunction = async (data) => {
        try {
            const { googleId, name, email } = data;
            // Check if the user with the given email already exists
            const doctorExists = await doctorRepositery.getDoctorByEmail(email);
            if (doctorExists) {
                return { status: false, message: 'Doctor already exists' };
            }
            // If the user doesn't exist, create a new doctor entry
            const response = await doctorRepositery.createDoctor({
                googleId,
                name,
                email,
            });
            if (response.status) {
                return { status: true };
            }
            else {
                return { status: false, message: "Doctor registration failed" };
            }
        }
        catch (error) {
            console.error('Error in Google register use case:', error);
            return { status: false, message: 'Internal Server Error' };
        }
    };
    return { executeFunction };
}
exports.default = googleRegisterUseCase;
