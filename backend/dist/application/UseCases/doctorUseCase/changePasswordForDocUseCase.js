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
const utils_1 = require("../../../utils");
function changePasswordForDocUseCase(dependencies) {
    const { doctorRepositery } = dependencies.repositery;
    const executeFunction = (data) => __awaiter(this, void 0, void 0, function* () {
        try {
            const response1 = yield doctorRepositery.findDoctorForChangePassword(data.email);
            if (response1.status) {
                const user = response1.data;
                const isPasswordCorrect = yield (0, utils_1.verifyHashPassword)(data.currentPassword, user.password);
                console.log(isPasswordCorrect, "ddd");
                if (isPasswordCorrect) {
                    const response = yield doctorRepositery.changePasswordForDoc(data);
                    console.log(response, "use case res");
                    if (response.status) {
                        return { status: true, data: response.data };
                    }
                    else {
                        return { status: false, message: response.message };
                    }
                }
                else {
                    return { status: false, data: "  Current Password is Wrong" };
                }
            }
            else {
                return { status: false, data: "invalid Current password" };
            }
        }
        catch (error) {
            console.log(error);
            return { status: false, message: "Error in changePasswordUseCase" };
        }
    });
    return { executeFunction };
}
exports.default = changePasswordForDocUseCase;
