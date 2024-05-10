"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function sendMessegesUseCase(dependencies) {
    const { userRepositery } = dependencies.repositery;
    const executeFunction = async (data) => {
        const response = await userRepositery.sendMesseges(data);
        console.log(response, "use resssso");
        if (response.status) {
            return { status: true, data: response.data };
        }
        else {
            return { status: false, message: response.message };
        }
    };
    return { executeFunction };
}
exports.default = sendMessegesUseCase;
