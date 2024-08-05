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
    const { checkOTPUseCase } = dependencies.useCase;
    const checkOTPController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { otp, email } = req.body;
            const data = {
                otp, email
            };
            // console.log(data,"nniii");
            if (req.session.Otp === data.otp) {
                const response = yield checkOTPUseCase(dependencies).executeFunction(data);
                // console.log(response,"cintr");
                // if (response && response.status && response.data) {
                if (response.status)
                    res.json({ status: true, data: "Otp Verified" });
            }
            else {
                res.json({ status: false, data: "Wrong Otp" });
            }
        }
        catch (error) {
            console.error("Error in checkOTPController:", error);
            res.status(500).json({ status: false, message: "Internal Server Error" });
        }
    });
    return checkOTPController;
};
