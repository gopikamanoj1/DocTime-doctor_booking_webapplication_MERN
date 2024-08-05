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
const utils_2 = require("../../../utils");
function doctorLoginUseCase(dependencies) {
    const { doctorRepositery } = dependencies.repositery;
    const executeFunction = (data) => __awaiter(this, void 0, void 0, function* () {
        console.log('this is data', data);
        const response = yield doctorRepositery.findDoctor(data.email);
        console.log(response, "responseresponseresponse");
        console.log("hyyy");
        if (response.status) {
            const user = response.user; // Assuming the user data is within the 'user' property
            // Check if the entered password is correct
            const isPasswordCorrect = yield (0, utils_1.verifyHashPassword)(data.password, user.password);
            if (isPasswordCorrect) {
                // Generate tokens
                const { token } = (0, utils_2.generateToken)({ userId: user._id });
                // console.log(token,"token");
                return { status: true, data: user, token };
            }
            else {
                return { status: false, message: 'Incorrect password' };
            }
        }
        else {
            return { status: false, message: response.message };
        }
    });
    return { executeFunction };
}
exports.default = doctorLoginUseCase;
