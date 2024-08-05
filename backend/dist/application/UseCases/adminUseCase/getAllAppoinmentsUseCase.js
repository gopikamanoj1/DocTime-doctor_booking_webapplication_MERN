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
function getAllAppoinmentsUseCase(dependencies) {
    const { adminRepository } = dependencies.repositery;
    const executeFunction = () => __awaiter(this, void 0, void 0, function* () {
        try {
            const response = yield adminRepository.getAllAppoinments();
            if (response.status) {
                return { status: true, data: response };
            }
            else {
                return { status: false, message: response.message };
            }
        }
        catch (error) {
            console.log(error);
        }
    });
    return { executeFunction };
}
exports.default = getAllAppoinmentsUseCase;
