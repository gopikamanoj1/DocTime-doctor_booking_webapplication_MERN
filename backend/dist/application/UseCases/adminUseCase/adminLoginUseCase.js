"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function adminLoginUseCase(dependencies) {
    const { adminRepository } = dependencies.repositery;
    const executeFunction = async (data) => {
        const responce = await adminRepository.findAdmin(data.email);
        if (responce.status) {
            return { status: true, data: responce.data };
        }
        else {
            return { status: false, message: responce.messege };
        }
    };
    return { executeFunction };
}
exports.default = adminLoginUseCase;
