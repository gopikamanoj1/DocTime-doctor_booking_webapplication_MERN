"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (dependencies) => {
    const { updateEmailUseCase } = dependencies.useCase;
    const updateEmailController = async (req, res) => {
        try {
            const { email, newEmail } = req.body;
            const data = {
                email, newEmail
            };
            const response = await updateEmailUseCase(dependencies).executeFunction(data);
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
    return updateEmailController;
};
