"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function getAvailableSlotUseCase(dependencies) {
    const { userRepositery } = dependencies.repositery;
    const executeFunction = async (id) => {
        try {
            // Pass the ID to the repository method
            const response = await userRepositery.getAvailableSlot(id);
            if (response.status) {
                return { status: true, data: response.data };
            }
            else {
                return { status: false, message: response.message };
            }
        }
        catch (error) {
            console.log(error);
            return { status: false, message: "Error in viewDoctorDetailsUseCase" };
        }
    };
    return { executeFunction };
}
exports.default = getAvailableSlotUseCase;
