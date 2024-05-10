"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function adminLogoutUseCase(dependencies) {
    const { adminRepository } = dependencies.repositery;
    const executeFunction = async (data) => {
        const responce = await adminRepository.adminLogout(data.email);
        if (responce.status) {
            return { status: true, data: responce.data };
        }
        else {
            return { status: false, mmessege: responce.messege };
        }
    };
    return { executeFunction };
}
exports.default = adminLogoutUseCase;
