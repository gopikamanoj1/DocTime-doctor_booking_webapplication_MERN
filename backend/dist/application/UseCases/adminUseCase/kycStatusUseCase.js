"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
function kycStatusUseCase(dependencies) {
    const { adminRepository } = dependencies.repositery;
    const executeFunction = (doctorId, newStatus) => __awaiter(this, void 0, void 0, function* () {
        try {
            const response = yield adminRepository.changeKycStatus(doctorId, newStatus);
            if (response.status) {
                return { status: true, data: response };
            }
            else {
                return { status: false, message: "Failed to change KYC status" };
            }
        }
        catch (error) {
            console.error(error);
            return { status: false, message: "An error occurred while changing KYC status" };
        }
    });
    return { executeFunction };
}
exports.default = kycStatusUseCase;
