"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function getConsultCallStatusUseCase(dependencies) {
    const { userRepositery } = dependencies.repositery;
    const executeFunction = async (data) => {
        try {
            // Pass the ID to the repository method
            const response = await userRepositery.getConsultCallStatus(data);
            if (response.status) {
                return { status: true, data: response.data };
            }
            else {
                return { status: false, message: response.message };
            }
        }
        catch (error) {
            console.log("Error in getConsultCallStatusUseCase", error);
            return { status: false, message: "Error in getConsultCallStatusUseCase" };
        }
    };
    return { executeFunction };
}
exports.default = getConsultCallStatusUseCase;
