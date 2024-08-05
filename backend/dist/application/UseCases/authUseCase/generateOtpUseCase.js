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
function generateOtpUseCase(dependencies) {
    const { userRepositery } = dependencies.repositery;
    const executeFunction = (data) => __awaiter(this, void 0, void 0, function* () {
        try {
            const userExists = yield userRepositery.getUserByEmail(data);
            // if (userExists) {
            //   return { status: false, message: 'User already exists' };
            // }
            console.log(data.email, "email fron use case");
            const response = yield (0, nodemailer_1.sendOtp)(data.email);
            if (response.status) {
                return { status: true, data: response.otp };
            }
            else {
                return { status: false, message: response.message };
            }
        }
        catch (error) {
            console.error('Error in generateOtpUseCase :', error);
            return { status: false, message: 'Internal Server Error' };
        }
    });
    return { executeFunction };
}
exports.default = generateOtpUseCase;
