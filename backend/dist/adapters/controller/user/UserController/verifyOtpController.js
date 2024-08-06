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
    const { verifyOtpUseCase } = dependecies.useCase;
    const verifyOtpController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const { enteredOtp } = req.body;
        console.log(req.body, "reqqqqqqqqqbodyyyyyyyyy");
        const userData = req.session.userData;
        if (req.session.Otp == enteredOtp) {
            const responce = yield verifyOtpUseCase(dependecies).executeFunction(userData);
            if (responce.status) {
                res.json({ status: true, data: responce.data });
            }
            else {
                res.json({ status: false, data: "Wrong OTP" });
            }
        }
        else {
            res.status(400).json({ status: false, message: "Wrong otp" });
        }
    });
    return verifyOtpController;
};
