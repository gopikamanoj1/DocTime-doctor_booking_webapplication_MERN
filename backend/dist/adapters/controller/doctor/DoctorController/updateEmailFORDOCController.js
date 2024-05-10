"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (dependencies) => {
    const { updateEmailForDOCUseCase } = dependencies.useCase;
    const updateEmailFORDOCController = async (req, res) => {
        try {
            const { email, newEmail } = req.body;
            const data = {
                email, newEmail
            };
            const response = await updateEmailForDOCUseCase(dependencies).executeFunction(data);
            console.log(response, "res ion contr");
            if (response && response.status && response.data) {
                res.json({ status: true, data: response.data });
            }
            else {
                res.json({ status: false, message: "Data not found" });
            }
        }
        catch (error) {
        }
    };
    return updateEmailFORDOCController;
};
