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
function sendImageUseCase(dependencies) {
    const { doctorRepositery } = dependencies.repositery;
    const executeFunction = (data) => __awaiter(this, void 0, void 0, function* () {
        try {
            const response = yield doctorRepositery.sendImage(data);
            console.log(response, "ll");
            if (response.status) {
                return { status: true, data: response.data };
            }
            else {
                return { status: false, message: response.data };
            }
        }
        catch (error) {
            console.log(error);
            return { status: false, message: "Error in sendImageUseCase" };
        }
    });
    return { executeFunction };
}
exports.default = sendImageUseCase;
