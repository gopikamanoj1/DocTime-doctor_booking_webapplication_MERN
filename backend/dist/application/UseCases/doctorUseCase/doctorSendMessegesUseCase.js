"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function doctorSendMessegesUseCase(dependencies) {
    const { doctorRepositery } = dependencies.repositery;
    const executeFunction = async (data) => {
        const response = await doctorRepositery.sendMesseges(data);
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
exports.default = doctorSendMessegesUseCase;
