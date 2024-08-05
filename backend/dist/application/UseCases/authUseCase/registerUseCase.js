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
const nodemailer_1 = require("../../../utils/nodemailer");
function registerUseCase(dependencies) {
    const { userRepositery } = dependencies.repositery;
    const executeFunction = (data) => __awaiter(this, void 0, void 0, function* () {
        try {
            const userExists = yield userRepositery.getUserByEmailForRegister({ email: data.email });
            console.log(userExists, "userExists");
            if (userExists.data) {
                return { status: false, data: "User already exists" };
            }
            else {
                const response = yield (0, nodemailer_1.sendOtp)(data.email); // Send OTP only if user does not exist
                return response.status
                    ? { status: true, data: response.otp }
                    : { status: false, data: response.message };
            }
        }
        catch (error) {
            console.error('Error in register use case:', error);
            return { status: false, message: 'Internal Server Error' };
        }
    });
    return { executeFunction };
}
exports.default = registerUseCase;
