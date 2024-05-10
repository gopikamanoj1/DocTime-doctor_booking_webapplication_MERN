"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function searchDoctrsUseCase(dependencies) {
    const { userRepositery } = dependencies.repositery;
    const executeFunction = async (searchParams) => {
        try {
            const response = await userRepositery.searchDoctors(searchParams);
            if (response.status) {
                return { status: true, data: response.data };
            }
            else {
                return { status: false, message: response.message };
            }
        }
        catch (error) {
            console.log(error);
            return { status: false, message: "Error in searchDoctorsUseCase" };
        }
    };
    return { executeFunction };
}
exports.default = searchDoctrsUseCase;
