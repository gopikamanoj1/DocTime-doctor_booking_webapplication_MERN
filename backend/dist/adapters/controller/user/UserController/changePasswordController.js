"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("../../../../utils");
exports.default = (dependencies) => {
    const { changePasswordUseCase } = dependencies.useCase;
    const changePasswordController = async (req, res) => {
        try {
            const { email, newPassword, currentPassword } = req.body;
            const hashedNewPassword = await (0, utils_1.hashPassword)(newPassword);
            const data = {
                email, currentPassword, hashedNewPassword
            };
            const response = await changePasswordUseCase(dependencies).executeFunction(data);
            console.log(response, "contro res");
            if (response && response.status && response.data) {
                res.json({ status: true, data: response.data });
            }
            else {
                res.json({ status: false, data: response.data });
            }
        }
        catch (error) {
            res.json({ status: false, data: "somehting went wrong" });
        }
    };
    return changePasswordController;
};
