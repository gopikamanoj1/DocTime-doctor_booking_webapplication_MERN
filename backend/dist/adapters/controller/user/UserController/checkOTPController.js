"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (dependencies) => {
    const { checkOTPUseCase } = dependencies.useCase;
    const checkOTPController = async (req, res) => {
        try {
            const { otp, email } = req.body;
            const data = {
                otp, email
            };
            // console.log(data,"nniii");
            if (req.session.Otp === data.otp) {
                const response = await checkOTPUseCase(dependencies).executeFunction(data);
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
    };
    return checkOTPController;
};
