"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("../../../../utils");
exports.default = (dependencies) => {
    const { forgotPasswordUseCase } = dependencies.useCase;
    const forgotPasswordController = async (req, res) => {
        try {
            const { email, newPassword } = req.body;
            const hashedNewPassword = await (0, utils_1.hashPassword)(newPassword);
            console.log(hashedNewPassword, "hashedNewPassword");
            const data = {
                email, hashedNewPassword
            };
            const response = await forgotPasswordUseCase(dependencies).executeFunction(data);
            console.log(response, ";;;;;;;;;;;;;;;;;;;;;;");
            if (response && response.status && response.data) {
                res.json({ status: true, data: response.data });
            }
            else {
                res.json({ status: false, data: response.data });
            }
        }
        catch (error) {
            res.json({ status: false, data: "something went wrong " });
        }
    };
    return forgotPasswordController;
};
