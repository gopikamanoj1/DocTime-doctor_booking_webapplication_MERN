"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (dependencies) => {
    const { generateOtpUseCase } = dependencies.useCase;
    const generateOtpController = async (req, res) => {
        try {
            const { email } = req.body;
            // Assuming generateOtpUseCase is correctly implemented
            const response = await generateOtpUseCase(dependencies).executeFunction({ email });
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
    };
    return generateOtpController;
};
