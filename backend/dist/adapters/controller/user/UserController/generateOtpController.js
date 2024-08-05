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
exports.default = (dependencies) => {
    const { generateOtpUseCase } = dependencies.useCase;
    const generateOtpController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { email } = req.body;
            // Assuming generateOtpUseCase is correctly implemented
            const response = yield generateOtpUseCase(dependencies).executeFunction({ email });
            // console.log('res', response);
            if (response.status) {
                req.session.Otp = response.data;
                console.log(req.session.Otp, "jjj");
                res.json({ status: true });
            }
            else {
                res.json({ status: false, message: response.message });
            }
        }
        catch (error) {
            console.error("Error in generateOtp controller:", error);
            res.status(500).json({ status: false, message: "Internal Server Error" });
        }
    });
    return generateOtpController;
};
