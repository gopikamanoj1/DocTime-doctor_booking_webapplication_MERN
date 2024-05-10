"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function createConverstationUseCase(dependencies) {
    const { userRepositery } = dependencies.repositery;
    const executeFunction = async (data) => {
        try {
            const response = await userRepositery.createConversation(data);
            console.log(response, "lllll");
            if (response.status) {
                return { status: true, data: response.data };
            }
            else {
                return { status: false, data: response.message };
            }
        }
        catch (error) {
            console.error('Error in createConverstationUseCase:', error);
            return { status: false, message: 'Internal Server Error' };
        }
    };
    return { executeFunction };
}
exports.default = createConverstationUseCase;
