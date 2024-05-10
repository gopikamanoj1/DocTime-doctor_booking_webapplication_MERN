"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function addSlotUseCase(dependencies) {
    const { doctorRepositery } = dependencies.repositery;
    const executeFunction = async (data) => {
        const response = await doctorRepositery.addSlot(data);
        if (response.status) {
            return { status: true, message: response.message };
        }
        else {
            return { status: false, message: response.message };
        }
    };
    return { executeFunction };
}
exports.default = addSlotUseCase;
