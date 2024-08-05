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
function googleRegisterUseCase(dependencies) {
    const { doctorRepositery } = dependencies.repositery;
    const executeFunction = (data) => __awaiter(this, void 0, void 0, function* () {
        try {
            const { googleId, name, email } = data;
            // Check if the user with the given email already exists
            const doctorExists = yield doctorRepositery.getDoctorByEmail(email);
            if (doctorExists) {
                return { status: false, message: 'Doctor already exists' };
            }
            // If the user doesn't exist, create a new doctor entry
            const response = yield doctorRepositery.createDoctor({
                googleId,
                name,
                email,
            });
            if (response.status) {
                return { status: true };
            }
            else {
                return { status: false, message: "Doctor registration failed" };
            }
        }
        catch (error) {
            console.error('Error in Google register use case:', error);
            return { status: false, message: 'Internal Server Error' };
        }
    });
    return { executeFunction };
}
exports.default = googleRegisterUseCase;
