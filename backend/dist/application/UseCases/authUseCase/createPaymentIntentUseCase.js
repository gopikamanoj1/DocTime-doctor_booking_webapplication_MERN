"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function createPaymentIntentUseCase(dependencies) {
    const { userRepositery } = dependencies.repositery;
    const executeFunction = async (data) => {
        try {
            const response = await userRepositery.createPaymentIntent(data);
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
exports.default = createPaymentIntentUseCase;
