"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (dependecies) => {
    const { verifyOtpUseCase } = dependecies.useCase;
    const verifyOtpController = async (req, res) => {
        const { enteredOtp } = req.body;
        console.log(req.body, "reqqqqqqqqqbodyyyyyyyyy");
        const userData = req.session.userData;
        if (req.session.Otp === enteredOtp) {
            const responce = await verifyOtpUseCase(dependecies).executeFunction(userData);
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
    };
    return verifyOtpController;
};
