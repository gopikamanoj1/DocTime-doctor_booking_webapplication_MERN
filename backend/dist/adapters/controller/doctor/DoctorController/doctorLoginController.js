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
exports.default = (dependecies) => {
    const { doctorLoginUseCase } = dependecies.useCase;
    const doctorLoginController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const { email, password } = req.body;
        console.log(req.body, "hfffffffffffh");
        const data = {
            email,
            password,
        };
        const responce = yield doctorLoginUseCase(dependecies).executeFunction(data);
        if (responce.status) {
            const { token } = responce;
            res.cookie('jwt', token, {
                httpOnly: true,
                secure: process.env.NODE_ENV !== 'development',
                sameSite: 'strict',
                maxAge: 15 * 60 * 1000, // Access token expires in 15 minutes
            });
            res.json({ status: true, data: responce.data, token }); // Include refreshToken here
        }
        else {
            res.json({ status: false, message: responce.message });
        }
    });
    return doctorLoginController;
};
